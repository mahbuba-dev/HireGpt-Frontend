"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAIRecommendedJobs } from "@/src/services/job.services";
import type { Job } from "@/src/types/job.types";

const MAX = 4;

export default function AIRecommendedHotJobs() {
  const { data: aiResult } = useQuery({
    queryKey: ["ai-hot-jobs", MAX],
    queryFn: () => getAIRecommendedJobs({ limit: MAX }),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  const jobs: Job[] = useMemo(() => {
    return Array.isArray(aiResult) ? aiResult.slice(0, MAX) : [];
  }, [aiResult]);

  return (
    <section
      id="ai-hot-jobs"
      className="content-container section-spacing glass-card"
    >
      <div className="mb-6 section-grid md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="text-container space-y-2">
          <Badge variant="secondary" className="ai-glow gap-1">
            <Flame className="size-3.5" />
            Hot Jobs
          </Badge>
          <h2 className="h2">AI Recommended Hot Jobs</h2>
          <p className="text-base muted">
            Powered by our AI ranking and real-time job analytics.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-orange-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-orange-200 md:inline-flex">
          <TrendingUp className="size-3.5" />
          Updates daily
        </div>
      </div>
      {jobs.length === 0 ? (
        <div className="glass-card border-orange-100 bg-orange-50/40 p-5 text-sm text-orange-900 dark:border-orange-500/20 dark:bg-orange-500/5 dark:text-orange-100">
          No hot jobs available yet.
        </div>
      ) : (
        <div className="section-grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.map((job, idx) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="group block h-full">
              <Card className="glass-card relative h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-[0_28px_70px_-26px_rgba(251,146,60,0.4)] dark:hover:border-orange-400/40">
                <CardContent className="flex h-full flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <Badge className="gap-1 rounded-full bg-orange-500/10 text-[10px] font-bold text-orange-700 hover:bg-orange-500/20 dark:bg-orange-500/15 dark:text-orange-200">
                      <Flame className="size-3" />#{idx + 1}
                    </Badge>
                    <span className="text-[10px] font-medium uppercase tracking-wide muted">
                      Trending
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-sm font-semibold">{job.title}</h3>
                    <p className="line-clamp-1 text-xs muted">{job.type} • {job.location || "Remote"}</p>
                    <p className="line-clamp-1 text-[11px] font-medium text-orange-700 dark:text-orange-300">
                      {job.salaryMin && job.salaryMax ? `${job.salaryMin} - ${job.salaryMax} ${job.currency}` : "Salary not disclosed"}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-sm muted">{job.description?.slice(0, 100) || "No description provided."}</p>
                  <div className="mt-auto flex items-center justify-between text-xs font-medium text-orange-700 transition-colors group-hover:text-orange-600 dark:text-orange-300">
                    <span>View job</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
