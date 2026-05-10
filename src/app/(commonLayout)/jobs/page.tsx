// Public Jobs Listing Page
import React from "react";
import Link from "next/link";
import { getAllJobs } from "@/src/services/job.services";

export default async function PublicJobsPage() {
    // Remove direct fetch debug, use getAllJobs only
  let jobs: any[] = [];
  let error = null;
  try {
    const jobsResponse = await getAllJobs();
    console.log("Raw jobs response:", jobsResponse);
    jobs = Array.isArray(jobsResponse) ? jobsResponse : jobsResponse?.data || [];
    console.log("Final jobs array:", jobs);
  } catch (e) {
    error = "Error loading jobs.";
    console.error("Error fetching jobs:", e);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Premium Job Listings</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {jobs.length === 0 && !error && (
          <div className="col-span-full text-gray-400 text-center text-lg">No jobs found.</div>
        )}
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/job/${job.id}`}
            className="group relative flex flex-col rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 hover:border-emerald-400"
          >
            <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm dark:bg-emerald-900 dark:text-emerald-200">
              {job.type?.replace('_', ' ') || 'Full Time'}
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              {job.title}
            </h2>
            <div className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-300">
              {job.companyName || 'Confidential Company'}
            </div>
            <div className="mb-4 text-xs text-slate-400 dark:text-slate-400 flex items-center gap-2">
              <span>{job.location || 'Remote'}</span>
              {job.salaryMin && job.salaryMax && (
                <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} {job.currency || 'USD'}
                </span>
              )}
            </div>
            <div className="mb-3 line-clamp-4 text-sm text-slate-600 dark:text-slate-300">
              {job.description}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {(job.tags || []).slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
