// This file has been replaced by JobManageTable.tsx. Please use JobManageTable.tsx instead.
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Table, {
  type DataTableFilterConfig,
  type DataTableFilterValues,
  type DataTableRangeValue,
} from "./Table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@/src/types/job.types";
import { useServerDataTable } from "@/src/hooks/useServerDataTable";
import { useJobMutations } from "@/src/hooks/useJobs";
import * as jobService from "@/src/services/job.service";

const formatDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString();
};

const formatCurrency = (value?: number) => {
  if (typeof value !== "number") {
    return "—";
  }

  return `$${value.toLocaleString()}`;
};

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="space-y-1">
          <p className="font-medium">{job.title}</p>
          <p className="text-xs text-muted-foreground">{job.location || "No location"}</p>
          <p className="text-xs text-muted-foreground">{job.type}</p>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.jobCategory?.name ?? "Unassigned",
    id: "jobCategory",
    header: "Job Category",
    cell: ({ row }) => row.original.jobCategory?.name ?? "Unassigned",
  },
  {
    accessorKey: "experienceLevel",
    header: "Experience Level",
    cell: ({ row }) => row.original.experienceLevel,
  },
  {
    accessorKey: "salaryMin",
    header: "Salary Range",
    cell: ({ row }) => {
      const min = row.original.salaryMin;
      const max = row.original.salaryMax;
      if (min && max) return `${formatCurrency(min)} - ${formatCurrency(max)}`;
      if (min) return formatCurrency(min);
      return "—";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={row.original.status === "OPEN" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Posted",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];

export default function JobManageTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<DataTableFilterValues>({});
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [jobTarget, setJobTarget] = useState<Job | null>(null);

  // Server-side pagination with URL sync
  const {
    paginationState,
    onPaginationChange,
    sortingState,
    onSortingChange,
    queryParams,
  } = useServerDataTable({ defaultPageSize: 10 });

  // Fetch jobs
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["job-management-table", queryParams],
    queryFn: () => jobService.getAllJobs({
      page: queryParams.page,
      limit: queryParams.limit,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
      searchTerm: searchTerm.trim() || undefined,
    }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  // Extract jobs and meta from API response
  const jobs = useMemo<Job[]>(() => {
    return Array.isArray(data?.data?.jobs) ? data.data.jobs : [];
  }, [data]);
  const meta = data?.meta;

  // Delete mutation
  const { deleteJob } = useJobMutations();
  const isActionPending = deleteJob.isPending;

  const submitDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJob.mutateAsync(jobToDelete.id);
      toast.success(`Job "${jobToDelete.title}" deleted.`);
      setJobToDelete(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete job.");
    }
  };

  const categoryOptions = useMemo(
    () =>
      [...new Set(jobs.map((job) => job.jobCategory?.name).filter(Boolean))]
        .sort()
        .map((name) => ({ label: name as string, value: name as string })),
    [jobs],
  );

  const filterConfigs = useMemo<DataTableFilterConfig[]>(
    () => [
      {
        id: "jobCategory",
        label: "Job Category",
        type: "single-select",
        options: categoryOptions,
      },
      {
        id: "experienceLevel",
        label: "Experience Level",
        type: "single-select",
        options: [
          { label: "Entry", value: "ENTRY" },
          { label: "Mid", value: "MID" },
          { label: "Senior", value: "SENIOR" },
        ],
      },
      {
        id: "status",
        label: "Status",
        type: "single-select",
        options: [
          { label: "Open", value: "OPEN" },
          { label: "Closed", value: "CLOSED" },
        ],
      },
    ],
    [categoryOptions],
  );

  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const categoryFilter = typeof filterValues.jobCategory === "string" ? filterValues.jobCategory : undefined;
    const experienceLevelFilter = typeof filterValues.experienceLevel === "string" ? filterValues.experienceLevel : undefined;
    const statusFilter = typeof filterValues.status === "string" ? filterValues.status : undefined;

    return jobs.filter((job) => {
      const matchesSearch =
        !normalizedSearch ||
        [job.title, job.location, job.type, job.jobCategory?.name]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch));

      const matchesCategory = !categoryFilter || job.jobCategory?.name === categoryFilter;
      const matchesExperienceLevel = !experienceLevelFilter || job.experienceLevel === experienceLevelFilter;
      const matchesStatus = !statusFilter || job.status === statusFilter;

      return matchesSearch && matchesCategory && matchesExperienceLevel && matchesStatus;
    });
  }, [jobs, filterValues, searchTerm]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Job management</CardTitle>
          <CardDescription>
            Search, filter, sort, and paginate through the job postings.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Could not load jobs</AlertTitle>
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "The job list is unavailable right now."}
              </AlertDescription>
            </Alert>
          ) : null}

          <Table
            data={filteredJobs}
            columns={columns}
            meta={meta}
            isLoading={isLoading || isFetching}
            emptyMessage="No jobs match the current search or filters."
            pagination={{
              state: paginationState,
              onPaginationChange,
            }}
            sorting={{
              state: sortingState,
              onSortingChange,
            }}
            actions={{
              items: (job) => [
                {
                  label: "View job",
                  onClick: () => setJobTarget(job),
                },
                {
                  label: "Open details",
                  onClick: () => router.push(`/jobs/${job.id}`),
                },
                {
                  label: "Delete",
                  onClick: () => setJobToDelete(job),
                  disabled: isActionPending,
                  destructive: true,
                },
              ],
            }}
            search={{
              initialValue: searchTerm,
              placeholder: "Search jobs by title, location, type...",
              onDebouncedChange: setSearchTerm,
            }}
            filters={{
              configs: filterConfigs,
              values: filterValues,
              onFilterChange: (filterId, value) => {
                setFilterValues((current) => ({
                  ...current,
                  [filterId]: value,
                }));
              },
              onClearAll: () => setFilterValues({}),
            }}
            toolbarAction={
              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
                disabled={isLoading || isFetching || isActionPending}
              >
                <RefreshCw className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            }
          />
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(jobToDelete)}
        onOpenChange={(open) => {
          if (!open) setJobToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete job posting?</AlertDialogTitle>
            <AlertDialogDescription>
              {jobToDelete
                ? `This will permanently remove the job "${jobToDelete.title}" from the job list.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => void submitDelete()}
              disabled={isActionPending}
            >
              {isActionPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
