import Link from "next/link";
import ApplyJobButton from "./ApplyJobButton";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Wallet,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/src/types/job.types";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatCurrency = (min?: number, max?: number, currency = "USD") => {
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
  return "Contact";
};



export default function JobCard({ job }: { job: Job }) {
  const recruiter = job.recruiter;
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_28px_70px_-26px_rgba(34,211,238,0.45)] dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 dark:hover:border-cyan-400/40">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="-mx-4 -mt-4 mb-1 h-1.5 bg-linear-to-r from-blue-500 via-cyan-400 to-teal-400" aria-hidden="true" />
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <Avatar size="default" className="size-12 border-2 border-cyan-100 ring-2 ring-cyan-50 dark:border-white/15 dark:ring-white/10">
              <AvatarFallback className="text-slate-900">
                {getInitials(recruiter?.fullName || "?")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 flex-1 space-y-0.5">
            <h3 className="line-clamp-1 flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
              {job.title}
            </h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">{job.location} {job.isRemote ? "(Remote)" : ""}</p>
            {job.jobCategory?.name ? (
              <p className="line-clamp-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                {job.jobCategory.name}
              </p>
            ) : null}
          </div>
        </div>
        <p className="line-clamp-3 min-h-18 text-sm leading-6 text-slate-600 dark:text-slate-300">{job.description}</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5">
            <div className="mb-0.5 flex items-center gap-1 text-cyan-700 dark:text-cyan-300">
              <BriefcaseBusiness className="size-3" />
              <span className="text-[9px] font-medium uppercase tracking-wide">Type</span>
            </div>
            <p className="text-xs font-semibold text-foreground">
              {job.type}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-white/5">
            <div className="mb-0.5 flex items-center gap-1 text-cyan-700 dark:text-cyan-300">
              <Wallet className="size-3" />
              <span className="text-[9px] font-medium uppercase tracking-wide">Salary</span>
            </div>
            <p className="text-xs font-semibold text-foreground">
              {formatCurrency(job.salaryMin, job.salaryMax, job.currency)}
            </p>
          </div>
        </div>
        <div className="mt-auto grid gap-2.5 sm:grid-cols-2">
          <Button
            asChild
            size="sm"
            className="h-9 w-full bg-linear-to-r from-blue-600 to-cyan-500 text-xs text-white shadow-md shadow-cyan-500/25 transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <Link href={`/jobs/${job.id}`}>
              View details
              <ArrowRight className="ml-1.5 size-3.5" />
            </Link>
          </Button>
        </div>
        <ApplyJobButton job={job} />
      </CardContent>
    </Card>
  );
}

