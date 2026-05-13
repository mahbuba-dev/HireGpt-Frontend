import Link from "next/link";
import ApplyJobButton from "./ApplyJobButton";
import {
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const formatCurrency = (
  min?: number,
  max?: number,
  currency = "USD",
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

  return "Contact";
};

export default function JobCard({ job }: { job: Job }) {
  const recruiter = job.recruiter;

  return (
    <div className="group relative h-full rounded-[30px] p-[1px] bg-gradient-to-br from-[#640D5F]/80 via-[#EB5B00]/60 to-[#FFCC00]/60 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015]">
      <Card className="relative h-full overflow-hidden rounded-[30px] border-0 bg-[#09090F]/90 backdrop-blur-2xl">
        {/* PREMIUM BACKGROUND */}
        <div className="absolute inset-0">
          {/* glass shine */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />

          {/* purple glow */}
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#640D5F]/20 blur-3xl transition-all duration-700 group-hover:scale-125" />

          {/* orange glow */}
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#EB5B00]/15 blur-3xl transition-all duration-700 group-hover:scale-125" />

          {/* grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04]" />
        </div>

        <CardContent className="relative z-10 flex h-full flex-col p-5">
          {/* TOP BAR */}
          <div className="-mx-5 -mt-5 mb-5 h-[3px] bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

          {/* HEADER */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#640D5F] to-[#EB5B00] blur-md opacity-50" />

              <Avatar className="relative size-14 border border-white/10 bg-[#111118]">
                <AvatarFallback className="bg-transparent text-sm font-bold text-white">
                  {getInitials(recruiter?.fullName || "?")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-white">
                  {job.title}
                </h3>

                <Sparkles className="size-4 text-[#FFCC00]" />
              </div>

              <p className="mt-1 line-clamp-1 text-sm text-white/60">
                {job.location} {job.isRemote ? "• Remote" : ""}
              </p>

              {job.jobCategory?.name ? (
                <div className="mt-2 inline-flex rounded-full border border-[#EB5B00]/20 bg-[#EB5B00]/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#FFCC00] backdrop-blur-xl">
                  {job.jobCategory.name}
                </div>
              ) : null}
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-5 line-clamp-3 min-h-[72px] text-sm leading-6 text-white/65">
            {job.description}
          </p>

          {/* STATS */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* TYPE */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
              <div className="mb-1 flex items-center gap-1.5 text-[#FFCC00]">
                <BriefcaseBusiness className="size-3.5" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                  Type
                </span>
              </div>

              <p className="text-sm font-semibold text-white">
                {job.type}
              </p>
            </div>

            {/* SALARY */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
              <div className="mb-1 flex items-center gap-1.5 text-[#FFCC00]">
                <Wallet className="size-3.5" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                  Salary
                </span>
              </div>

              <p className="text-sm font-semibold text-white">
                {formatCurrency(
                  job.salaryMin,
                  job.salaryMax,
                  job.currency,
                )}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 grid gap-3">
            <Button
              asChild
              className="h-11 rounded-2xl border border-white/10 bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00] text-sm font-semibold text-white shadow-lg shadow-[#EB5B00]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#EB5B00]/40"
            >
              <Link href={`/jobs/${job.id}`}>
                View Details

                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <ApplyJobButton job={job} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}