"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Star,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Job } from "@/src/types/job.types";

type JobDetailsProps = {
  job: Job;
  isLoggedIn?: boolean;
  userRole?: string | null;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatCurrency = (
  min?: number,
  max?: number,
  currency = "USD"
) => {
  if (typeof min === "number" && typeof max === "number") {
    return `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(min)} - ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(max)}`;
  }

  if (typeof min === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(min);
  }

  return "Contact for salary";
};

export default function JobDetails({
  job,
}: JobDetailsProps) {
  const recruiter = job.recruiter;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-6 lg:py-8">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-900"
      >
        <ArrowLeft className="size-4" />
        Back to jobs
      </Link>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[32px] border border-blue-200/60 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 text-white shadow-[0_30px_80px_-28px_rgba(91,33,182,0.55)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_0%,transparent_42%)]" />

        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          {/* Left */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/10 text-white hover:bg-white/10">
                <BriefcaseBusiness className="mr-1 size-3.5" />
                {job.jobCategory?.name || "General"}
              </Badge>

              <Badge className="bg-emerald-500/20 text-white hover:bg-emerald-500/20">
                {job.type}
              </Badge>

              <Badge className="bg-blue-500/20 text-white hover:bg-blue-500/20">
                {job.experienceLevel}
              </Badge>

              {job.status === "OPEN" && (
                <Badge className="bg-green-500/20 text-white hover:bg-green-500/20">
                  Open
                </Badge>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              <Avatar className="size-24 border-4 border-white/20 shadow-2xl sm:size-28 md:size-36">
                <AvatarFallback className="text-lg font-semibold text-slate-900">
                  {getInitials(recruiter?.fullName || "RC")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  {job.title}
                </h1>

                <p className="mt-2 text-sm text-white/85 sm:text-base md:text-lg">
                  {job.location}{" "}
                  {job.isRemote ? "(Remote)" : ""}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge className="border-white/15 bg-white/10 text-white hover:bg-white/10">
                    {job.jobCategory?.name || "General"}
                  </Badge>

                  <Badge className="border-white/15 bg-white/10 text-white hover:bg-white/10">
                    {job.experienceLevel}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              {job.description}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:flex-wrap">
              <Button className="w-full bg-white text-slate-900 hover:bg-white/90 md:w-auto">
                <CalendarDays className="mr-2 size-4" />
                Apply for this job
              </Button>

              {recruiter?.email && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white md:w-auto"
                >
                  <a href={`mailto:${recruiter.email}`}>
                    <Mail className="mr-2 size-4" />
                    Email recruiter
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right Card */}
          <Card className="border-white/10 bg-white/10 text-white shadow-none backdrop-blur-md">
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-sm text-white/70">
                  Salary range
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {formatCurrency(
                    job.salaryMin,
                    job.salaryMax,
                    job.currency
                  )}
                </p>

                <p className="text-sm text-white/70">
                  Per year
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/65">
                    Category
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {job.jobCategory?.name || "General"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/65">
                    Recruiter
                  </p>

                  <p className="mt-1 break-all font-medium text-white">
                    {recruiter?.fullName || "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/65">
                    Contact
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {recruiter?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Details */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* About Job */}
        <Card className="relative overflow-hidden border-border/60 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400" />

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25">
                <BriefcaseBusiness className="size-4" />
              </span>

              About this job
            </CardTitle>

            <CardDescription>
              Learn more about the role and requirements.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="leading-7 text-muted-foreground">
              {job.description}
            </p>

            {job.responsibilities && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-cyan-300">
                  Responsibilities
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {job.responsibilities}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-cyan-300">
                Requirements
              </p>

              <p className="mt-1 font-medium text-foreground">
                {job.requirements}
              </p>
            </div>

            {job.aiSummary && (
              <div className="rounded bg-blue-50 p-3 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100">
                <strong>AI Summary:</strong>{" "}
                {job.aiSummary}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recruiter Info */}
        <Card className="relative overflow-hidden border-border/60 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-md shadow-cyan-500/25">
                <Star className="size-4" />
              </span>

              Recruiter info
            </CardTitle>

            <CardDescription>
              Contact and company details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recruiter
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {recruiter?.fullName || "N/A"}
              </p>

              <p className="text-sm text-muted-foreground">
                {recruiter?.email || "Email not provided"}
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Job Type
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {job.type}
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Experience Level
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {job.experienceLevel}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}