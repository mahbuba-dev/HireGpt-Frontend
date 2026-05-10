"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MessageSquare,
  Search,
  Sparkles,
  UserCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OverviewDashboardContent from "../OverviewDashboardContent";
import RecentConsultationsTable from "../shared/RecentConsultationsTable";
import StatsCard from "../shared/StatsCard";
import { MiniStatsRibbon } from "../MiniStatsRibbon";
import { QuickActions } from "../QuickActions";
import { clientMiniStats, clientQuickActions } from "@/src/lib/navItems";
import { getDashboardData } from "@/src/services/dashboard.services";
import type { ApiResponse } from "@/src/types/api.types";
import type { ICandidateDashboardStats } from "@/src/types/candidate.dashboard";

const formatStatusLabel = (status: string) =>
  status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const CandidateDashboardContent = () => {
  const { data: candidateDashboardResponse, isLoading, isError } = useQuery({
    queryKey: ["candidate-dashboard-data"],
    queryFn: () => getDashboardData<ICandidateDashboardStats>(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // ...existing code...

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-xl bg-muted/60" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Unable to load candidate dashboard</CardTitle>
          <CardDescription>
            Please refresh the page to retrieve your dashboard stats.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <OverviewDashboardContent role="CANDIDATE" />
      {/* Mini stats ribbon */}
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Total", value: data?.consultationCount || 0 }, { label: "Done", value: completedCount }, { label: "Live", value: activeCount }].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-white/70">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { title: "Browse jobs", desc: "Find opportunities", href: "/jobs", icon: Search, gradient: "from-blue-500 to-cyan-500" },
          { title: "Saved jobs", desc: "Bookmarked", href: "/jobs/saved", icon: Compass, gradient: "from-cyan-500 to-teal-500" },
        ].map((action) => (
          <Link key={action.title} href={action.href} className="w-full">
            <Button className={`w-full bg-linear-to-r ${action.gradient} text-white shadow-md hover:opacity-90`}>
              <action.icon className="mr-2 size-4" />
              {action.title}
            </Button>
          </Link>
        ))}
      </div>
      <MiniStatsRibbon stats={clientMiniStats(data)} />
      <QuickActions actions={clientQuickActions} />
    </div>
  );
};

export default CandidateDashboardContent;
