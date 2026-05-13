import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";

import { getAllJobs } from "@/src/services/job.services";

export default async function PublicJobsPage() {
  let jobs: any[] = [];
  let error = null;

  try {
    const jobsResponse = await getAllJobs();

    jobs = Array.isArray(jobsResponse)
      ? jobsResponse
      : jobsResponse?.data || [];
  } catch (e) {
    error = "Error loading jobs.";
    console.error("Error fetching jobs:", e);
  }

  return (
    <section className="">
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {/* gradient glows */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#640D5F]/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#EB5B00]/15 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#FFCC00]/10 blur-[120px]" />

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-7 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#FFCC00] backdrop-blur-xl">
            <Sparkles className="size-3.5" />
            AI-Powered Career Opportunities
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Discover Premium
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
              {" "}
              AI-Powered Jobs
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Explore premium opportunities from modern companies hiring top
            talent through intelligent recruitment workflows.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300 backdrop-blur-xl">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {jobs.length === 0 && !error && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-24 text-center backdrop-blur-2xl">
            <h3 className="text-xl font-semibold text-white">
              No jobs found
            </h3>

            <p className="mt-2 text-white/50">
              New opportunities will appear here soon.
            </p>
          </div>
        )}

        {/* GRID */}
    {/* GRID */}
<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
  {jobs.map((job) => (
    <div
      key={job.id}
      className="group relative rounded-[26px] p-[1px] bg-gradient-to-br from-[#640D5F]/80 via-[#EB5B00]/60 to-[#FFCC00]/60 transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.01]"
    >
      {/* CARD */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#09090F]/90 p-4 backdrop-blur-2xl">
        {/* glow */}
        <div className="absolute inset-0">
          <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-[#640D5F]/20 blur-3xl transition-all duration-700 group-hover:scale-125" />

          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#EB5B00]/15 blur-3xl transition-all duration-700 group-hover:scale-125" />

          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_40%)]" />
        </div>

        {/* TOP BAR */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col">
          {/* TYPE */}
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex rounded-full border border-[#EB5B00]/20 bg-[#EB5B00]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFCC00]">
              {job.type?.replace("_", " ") || "Full Time"}
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <BriefcaseBusiness className="size-4 text-[#FFCC00]" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFCC00]">
            {job.title}
          </h2>

          {/* COMPANY */}
          <p className="mt-1.5 text-xs font-medium text-white/50">
            {job.companyName || "Confidential Company"}
          </p>

          {/* INFO */}
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-xl">
              <MapPin className="size-3 text-[#FFCC00]" />

              {job.location || "Remote"}
            </div>

            {job.salaryMin && job.salaryMax && (
              <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-xl">
                <Wallet className="size-3 text-[#FFCC00]" />

                ${job.salaryMin.toLocaleString()} - $
                {job.salaryMax.toLocaleString()}
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 line-clamp-3 text-xs leading-6 text-white/60">
            {job.description}
          </p>

          {/* TAGS */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(job.tags || []).slice(0, 3).map((tag: string) => (
              <div
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-xl"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
            <Link
              href={`/job/${job.id}`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#EB5B00]/30 hover:bg-white/[0.08]"
            >
              Details
            </Link>

            <Link
              href={`/job/${job.id}/apply`}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00] px-3 text-xs font-semibold text-white shadow-lg shadow-[#EB5B00]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#EB5B00]/40"
            >
              Apply

              <ArrowRight className="ml-1.5 size-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}