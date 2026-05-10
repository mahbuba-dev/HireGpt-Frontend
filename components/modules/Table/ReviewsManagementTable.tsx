"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ReviewSummaryCards from "@/components/modules/shared/ReviewSummaryCards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { getTestimonials } from "@/src/services/job.services";
import type { ITestimonial } from "@/src/types/testimonial.types";
import Table, { type DataTableFilterValues } from "./Table";
import { useServerDataTable } from "@/src/hooks/useServerDataTable";

type TestimonialWithFallbacks = ITestimonial & {
  fullName?: string | null;
  clientName?: string | null;
  reviewerName?: string | null;
  email?: string | null;
  clientEmail?: string | null;
  reviewerEmail?: string | null;
  user?: {
    email?: string | null;
    name?: string | null;
  } | null;
  consultationStatus?: string | null;
  sessionStatus?: string | null;
  bookingStatus?: string | null;
  consultationDate?: string | null;
  sessionDate?: string | null;
  date?: string | null;
};

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

const getReviewerName = (review: ITestimonial) => {
  return (
    review.candidate?.fullName ||
    review.candidate?.user?.name ||
    review.reviewerName ||
    review.candidate?.email ||
    review.candidate?.user?.email ||
    "Verified Client"
  );
};

const getReviewerEmail = (review: ITestimonial) => {
  return (
    review.candidate?.email ||
    review.candidate?.user?.email ||
    // reviewer.reviewerEmail removed: not in ITestimonial
    ""
  );
};

const getSessionStatus = (review: ITestimonial) => {
  return (
    review.interview?.status ||
    review.status ||
    review.moderationStatus ||
    "PENDING"
  );
};

const getSessionDate = (review: ITestimonial) => {
  return (
    review.interview?.date ||
    review.createdAt
  );
};

const getVisibilityStatus = (review: ITestimonial) => {
  const rawReview = review as TestimonialWithFallbacks;

  if (review.status) {
    return review.status;
  }

  if (rawReview.moderationStatus === "APPROVED" || rawReview.moderationStatus === "HIDDEN") {
    return rawReview.moderationStatus;
  }

  if (typeof review.isHidden === "boolean") {
    return review.isHidden ? "HIDDEN" : "APPROVED";
  }

  return "PENDING";
};

const formatDateTime = (value?: string) => {
  if (!value) return "—";
  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? "—" : parsedDate.toLocaleString();
};

const truncateText = (value?: string | null, maxLength = 120) => {
  if (!value) return "No written feedback provided.";
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return maybeError.response?.data?.message ?? maybeError.message ?? fallback;
  }
  return fallback;
};

const getRatingBadge = (rating?: number) => {
  const normalizedRating = Number(rating || 0);

  if (normalizedRating >= 4.5) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/15">
        {normalizedRating.toFixed(1)} ★
      </Badge>
    );
  }

  if (normalizedRating >= 3) {
    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-200 dark:hover:bg-amber-500/15">
        {normalizedRating.toFixed(1)} ★
      </Badge>
    );
  }

  return <Badge variant="destructive">{normalizedRating.toFixed(1)} ★</Badge>;
};

const getConsultationStatusBadge = (status?: string | null) => {
  if (!status) return <Badge variant="outline">No status</Badge>;

  const normalizedStatus = status.toUpperCase();

  if (normalizedStatus === "COMPLETED") {
    return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/15">Completed</Badge>;
  }

  if (normalizedStatus === "CONFIRMED") {
    return <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-500/15 dark:text-sky-200 dark:hover:bg-sky-500/15">Confirmed</Badge>;
  }

  if (normalizedStatus === "CANCELLED") {
    return <Badge variant="destructive">Cancelled</Badge>;
  }

  return <Badge variant="secondary">{normalizedStatus}</Badge>;
};

const getVisibilityBadge = (status?: string) => {
  if (status === "HIDDEN") {
    return (
      <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-500/30 dark:text-amber-200">
        Hidden
      </Badge>
    );
  }

  if (status === "APPROVED") {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/15">
        Visible
      </Badge>
    );
  }

  return <Badge variant="secondary">{status || "Unknown"}</Badge>;
};

const columns: ColumnDef<ITestimonial>[] = [
  {
    accessorKey: "client",
    header: "Reviewer",
    cell: ({ row }) => {
      const review = row.original;
      const reviewerEmail = getReviewerEmail(review);

      return (
        <div className="space-y-1 min-w-0">
          <p className="font-medium text-foreground whitespace-normal wrap-break-word">{getReviewerName(review)}</p>
          <p className="text-xs text-muted-foreground whitespace-normal break-all">
            {reviewerEmail || "Email unavailable"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => getRatingBadge(row.original.rating),
  },
  {
    accessorKey: "status",
    header: "Visibility",
    cell: ({ row }) => getVisibilityBadge(getVisibilityStatus(row.original)),
  },
  {
    accessorKey: "comment",
    header: "Feedback",
    cell: ({ row }) => (
      <p className="max-w-xs text-sm text-muted-foreground whitespace-normal wrap-break-word">
        {truncateText(row.original.comment)}
      </p>
    ),
  },
  {
    accessorKey: "consultation",
    header: "Session",
    cell: ({ row }) => {
      const review = row.original;
      return (
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{formatDateTime(getSessionDate(review))}</p>
          {getConsultationStatusBadge(getSessionStatus(review))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTime(row.original.createdAt)}
      </span>
    ),
  },
];

export default function ReviewsManagementTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<DataTableFilterValues>({});

  // -------------------------------------------------------------------
  // Server-side pagination with URL sync
  // -------------------------------------------------------------------
  const {
    paginationState,
    onPaginationChange,
    sortingState,
    onSortingChange,
    queryParams,
  } = useServerDataTable({ defaultPageSize: 10 });

  const { data: reviewsResponse, isLoading, isFetching, isError, error, refetch } =
    useQuery({
      queryKey: ["reviews-management-table"],
      queryFn: getTestimonials,
      staleTime: 60 * 1000,
      placeholderData: (prev) => prev,
    });

  // Map Testimonial[] to ITestimonial[] for table usage
  const reviews: ITestimonial[] = useMemo(() => {
    if (!Array.isArray(reviewsResponse)) return [];
    return reviewsResponse.map((t) => ({
      id: t.id,
      rating: t.rating,
      comment: t.content || null,
      candidateId: t.userId || "",
      recruiterId: "",
      reviewerName: t.user?.name || null,
      reviewerImage: t.user?.profilePhoto || null,
      interviewId: "",
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      isHidden: undefined,
      status: undefined,
      recruiterReply: undefined,
      repliedAt: undefined,
      moderationStatus: undefined,
      candidate: undefined,
      recruiter: undefined,
      interview: undefined,
    }));
  }, [reviewsResponse]);

  const filteredReviews = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const ratingFilter = typeof filterValues.rating === "string" ? filterValues.rating : undefined;
    const visibilityFilter =
      typeof filterValues.visibility === "string" ? filterValues.visibility : undefined;
    const timeframeFilter =
      typeof filterValues.timeframe === "string" ? filterValues.timeframe : undefined;
    const thirtyDaysAgo = new Date().getTime() - THIRTY_DAYS_IN_MS;

    return reviews.filter((review: ITestimonial) => {
      const reviewDate = new Date(review.createdAt).getTime();
      const matchesSearch =
        !normalizedSearch ||
        [
          getReviewerName(review),
          getReviewerEmail(review),
          review.recruiter?.fullName,
          review.recruiter?.title,
          review.comment,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch));

      const matchesRating =
        !ratingFilter || Number(Math.round(review.rating || 0)) === Number(ratingFilter);

      const visibilityStatus = getVisibilityStatus(review);
      const matchesVisibility =
        !visibilityFilter ||
        (visibilityFilter === "hidden"
          ? visibilityStatus === "HIDDEN"
          : visibilityStatus !== "HIDDEN");

      const matchesTimeframe =
        !timeframeFilter ||
        (timeframeFilter === "last-30"
          ? reviewDate >= thirtyDaysAgo
          : Number.isNaN(reviewDate) || reviewDate < thirtyDaysAgo);

      return matchesSearch && matchesRating && matchesVisibility && matchesTimeframe;
    });
  }, [filterValues, reviews, searchTerm]);

  return (
    <div className="space-y-6">
      <ReviewSummaryCards reviews={reviews} />
      <Card className="relative overflow-hidden border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400" />
        <div className="pointer-events-none absolute -right-24 -top-24 hidden size-72 rounded-full bg-cyan-500/10 blur-3xl dark:block" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-bold tracking-tight">Review workspace</CardTitle>
          <CardDescription>
            View and search all client reviews. Moderation actions are not available in this build.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Could not load reviews</AlertTitle>
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "The reviews feed is unavailable right now."}
              </AlertDescription>
            </Alert>
          ) : null}
          <Table
            data={filteredReviews}
            columns={columns}
            tableClassName="w-full min-w-[900px]"
            headCellClassName="whitespace-nowrap align-middle"
            bodyCellClassName="whitespace-normal wrap-break-word align-top"
            isLoading={isLoading || isFetching}
            emptyMessage={
              Boolean(searchTerm.trim()) || Object.values(filterValues).some(Boolean)
                ? "No reviews match the current search or filters."
                : "No client reviews have been submitted yet."
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
