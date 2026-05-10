import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Building2,
  CalendarRange,
  ChevronLeft,
  Sparkles,
  Users,
} from "lucide-react";

import RecruiterCard from "@/components/modules/JobsAction/RecruiterCard";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  IndustryHeroCTA,
  IndustryRelatedLink,
  IndustryViewAllCTA,
} from "./_IndustryCTAs";

import {
  getAllJobCategories,
  getJobCategoryById,
} from "@/src/services/industry.services";

import { getAllRecruiters } from "@/src/services/recruiter.service";

import type { Recruiter, IRecruiter } from "@/src/types/recruiter.types";
import type { IJobCategory } from "@/src/types/jobCategory.types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Map Recruiter (API) to IRecruiter (UI)
function toIRecruiter(r: Recruiter): IRecruiter {
  return {
    id: r.id,
    fullName: r.fullName,
    email: r.email,
    phone: r.phone ?? "",
    title: r.designation ?? "",
    bio: r.bio ?? "",
    experience: r.experience,
    price: undefined,
    consultationFee: undefined,
    isVerified: r.verified,
    isSeeded: r.isSeeded,
    profilePhoto: r.profilePhoto ?? null,
    resumeUrl: undefined,
    jobCategoryId:
      Array.isArray(r.industries) &&
      r.industries.length > 0 &&
      typeof r.industries[0] === "object" &&
      r.industries[0] !== null &&
      "id" in r.industries[0]
        ? (r.industries[0] as any).id
        : "",
    jobCategory: undefined,
    userId: r.userId,
    user: undefined,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

const formatDate = (iso?: string) => {
  if (!iso) return "—";

  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
};

export default async function IndustryDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [
    industryResult,
    recruitersResult,
    industriesResult,
  ] = await Promise.allSettled([
    getJobCategoryById(id),
    getAllRecruiters(),
    getAllJobCategories(),
  ]);

  if (
    industryResult.status !== "fulfilled" ||
    !industryResult.value?.data
  ) {
    notFound();
  }

  const industry: IJobCategory = industryResult.value.data;

  const allRecruiters: Recruiter[] =
    recruitersResult.status === "fulfilled" &&
    Array.isArray(recruitersResult.value?.data)
      ? recruitersResult.value.data
      : [];

  // Convert to IRecruiter for UI
  const allIRecruiters: IRecruiter[] =
    allRecruiters.map(toIRecruiter);

  const relatedRecruiters = allIRecruiters
    .filter(
      (recruiter) =>
        recruiter.jobCategoryId === industry.id
    )
    .slice(0, 8);

  const allIndustries: IJobCategory[] =
    industriesResult.status === "fulfilled" &&
    Array.isArray(industriesResult.value?.data)
      ? industriesResult.value.data
      : [];

  const relatedIndustries = allIndustries.filter(
    (item) => item.id !== industry.id
  );

  const verifiedRecruiterCount =
    relatedRecruiters.filter(
      (recruiter) => recruiter.isVerified
    ).length;

  const keyInfo: Array<{
    label: string;
    value: string;
    icon: typeof Users;
  }> = [
    {
      label: "Available recruiters",
      value: String(relatedRecruiters.length),
      icon: Users,
    },
    {
      label: "Verified recruiters",
      value: String(verifiedRecruiterCount),
      icon: BadgeCheck,
    },
    {
      label: "Listed on",
      value: formatDate(industry.createdAt),
      icon: CalendarRange,
    },
    {
      label: "Job category",
      value: "Professional hiring",
      icon: Building2,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden pb-20">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-136 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(34,211,238,0.18),transparent_45%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-white via-blue-50/40 to-cyan-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
      />

      {/* Hero */}
      <section className="relative px-4 pt-10 md:px-12 md:pt-14">
        <div className="mx-auto max-w-360">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft
              className="size-4"
              aria-hidden="true"
            />
            All job categories
          </Link>

          <div className="mt-6 grid items-center gap-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:grid-cols-[auto_1fr] md:gap-10 md:p-10 dark:border-white/10 dark:bg-slate-900/70">
            {industry.icon ? (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-linear-to-br from-blue-50 to-cyan-50 ring-1 ring-blue-100/70 md:mx-0 md:h-36 md:w-36 dark:from-blue-500/10 dark:to-cyan-500/10 dark:ring-white/10">
                <Image
                  src={industry.icon}
                  alt={industry.name}
                  width={112}
                  height={112}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-linear-to-br from-blue-100 to-cyan-100 text-blue-700 md:mx-0 md:h-36 md:w-36 dark:from-blue-500/20 dark:to-cyan-500/20 dark:text-cyan-200">
                <Building2
                  className="size-12"
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="space-y-4 text-center md:text-left">
              <Badge className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-cyan-200">
                <Sparkles
                  className="mr-1 size-3.5"
                  aria-hidden="true"
                />
                Job Category
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {industry.name}
              </h1>

              {industry.description ? (
                <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground md:mx-0 md:text-lg">
                  {industry.description}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
                <IndustryHeroCTA
                  industryId={industry.id}
                  industryName={industry.name}
                />

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                >
                  <Link href="/contact">
                    Talk to our team
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}