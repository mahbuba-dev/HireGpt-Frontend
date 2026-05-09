"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarRange,
  MessageSquare,
  MessageSquareQuote,
  Sparkles,
  Star,
  TrendingUp,
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
import { getMe } from "@/src/services/auth.services";
import { getDashboardData } from "@/src/services/dashboard.services";
import { getTestimonialsForExpertContext } from "@/src/services/testimonial.services";
import type { ApiResponse } from "@/src/types/api.types";
import type { IUserProfile } from "@/src/types/auth.types";
import type { IRecruiterDashboardStats } from "@/src/types/recruiter.dashboard";
import type { ITestimonial } from "@/src/types/testimonial.types";
import OverviewDashboardContent from "./OverviewDashboardContent";
import RecentConsultationsTable from "../shared/RecentConsultationsTable";
import StatsCard from "../shared/StatsCard";
import { MiniStatsRibbon } from "./MiniStatsRibbon";
import { QuickActions } from "./QuickActions";
import { expertMiniStats, expertQuickActions } from "@/src/lib/navItems";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatStatusLabel = (status: string) =>
  status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const ExpertDashboardContent = () => {
  const { data: expertDashboardResponse, isLoading, isError } = useQuery({
    queryKey: ["recruiter-dashboard-data"],
    queryFn: () => getDashboardData<IRecruiterDashboardStats>(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // ...existing code...

  const { data: profile } = useQuery<IUserProfile>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });

  const expertId = profile?.expert?.id;
  const userId = profile?.id;

  const { data: testimonials = [] } = useQuery<ITestimonial[]>({
    queryKey: ["expert-testimonials", expertId, userId],
    queryFn: () => getTestimonialsForExpertContext([expertId, userId]),
    enabled: Boolean(expertId || userId),
    staleTime: 60 * 1000,
  });

  const statusItems = data?.consultationStatusDistribution || [];
  const completedCount =
    statusItems.find((item) => item.status === "COMPLETED")?.count || 0;
  const pendingCount =
    statusItems.find((item) => item.status === "PENDING")?.count || 0;
  const completionRate = data?.consultationCount
    ? Math.round((completedCount / data.consultationCount) * 100)
    : 0;
  const averageRevenuePerConsultation = data?.consultationCount
    ? Math.round((data.totalRevenue || 0) / data.consultationCount)
    : 0;

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-360 space-y-6">
        <div className="h-48 animate-pulse rounded-2xl bg-muted/60" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`qa-${index}`}
              className="h-24 animate-pulse rounded-2xl bg-muted/60"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl bg-muted/60"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-muted/60 xl:col-span-2" />
          <div className="h-80 animate-pulse rounded-2xl bg-muted/60" />
        </div>
      </div>
          <MiniStatsRibbon stats={expertMiniStats(data, formatCurrency)} />
        </Card>
      </div>
    );
  }
      <QuickActions actions={expertQuickActions} />
                  Manage availability
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mini stats ribbon */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Sessions", value: data.consultationCount || 0 },
              { label: "Clients", value: data.clientCount || 0 },
              { label: "Reviews", value: data.reviewCount || 0 },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-wider text-white/70">
                  {s.label}
                </p>
                <p className="mt-1 text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            title: "My availability",
            desc: "Set open slots",
            href: "/expert/dashboard/my-availability",
            icon: CalendarRange,
            gradient: "from-blue-500 to-cyan-500",
          },
          {
            title: "Consultations",
            desc: "Upcoming sessions",
            href: "/expert/dashboard/my-consultations",
            icon: TrendingUp,
            gradient: "from-cyan-500 to-teal-500",
          },
          {
            title: "Messages",
            desc: "Talk to clients",
            href: "/dashboard/chat",
            icon: MessageSquare,
            gradient: "from-indigo-500 to-blue-500",
          },
          {
            title: "My reviews",
            desc: "Client feedback",
            href: "/expert/dashboard/my-reviews",
            icon: Star,
            gradient: "from-amber-500 to-orange-500",
          },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
            >
              <div
                className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-br ${action.gradient} text-white shadow-md`}
              >
                <Icon className="size-5" />
              </div>
              <p className="font-semibold text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
              <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Consultations"
          value={data.consultationCount || 0}
          iconName="CalendarDays"
          description="All sessions booked with you"
          className="bg-linear-to-br from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-900"
        />

        <StatsCard
          title="Unique Clients"
          value={data.clientCount || 0}
          iconName="Users"
          description="Clients you have worked with"
          className="bg-linear-to-br from-sky-50 to-white dark:from-sky-950/35 dark:to-slate-900"
        />

        <StatsCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue || 0)}
          iconName="DollarSign"
          description="Paid earnings from consultations"
          className="bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/35 dark:to-slate-900"
        />

        <StatsCard
          title="Reviews Received"
          value={data.reviewCount || 0}
          iconName="Star"
          description="Testimonials from your clients"
          className="bg-linear-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-900"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ConsultationsPieChart
            data={statusItems}
            title="Consultation Status Overview"
            description="A live breakdown of your pending, ongoing, completed, and cancelled sessions."
          />
        </div>

        <Card className="relative overflow-hidden border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-cyan-500" />
              Performance Snapshot
            </CardTitle>
            <CardDescription>
              Quick insights to help you stay on top of your consulting workflow.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border border-blue-200/60 bg-linear-to-br from-blue-50 to-cyan-50 p-4 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-cyan-500/10">
              <p className="text-sm text-muted-foreground">Completion rate</p>
              <div className="mt-1 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                {completionRate}%
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {completedCount} completed • {pendingCount} pending
              </p>
            </div>

            <div className="space-y-2">
              {statusItems.length > 0 ? (
                statusItems.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white/50 px-3 py-2 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-sm font-medium">
                      {formatStatusLabel(item.status)}
                    </span>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                ))
              return (
                <div className="mx-auto w-full max-w-360 space-y-8">
                  <OverviewDashboardContent role="RECRUITER" />
                  {/* Mini stats ribbon */}
                  <div className="grid grid-cols-3 gap-3">
                    {[{ label: "Total", value: data?.consultationCount || 0 }, { label: "Done", value: completedCount }, { label: "Revenue", value: formatCurrency(data?.totalRevenue || 0) }].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
                        <p className="text-xs uppercase tracking-wider text-white/70">{s.label}</p>
                        <p className="mt-1 text-xl font-bold lg:text-2xl">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[
                      { title: "My Jobs", desc: "Manage postings", href: "/recruiter/jobs", icon: TrendingUp, gradient: "from-blue-500 to-cyan-500" },
                      { title: "Applicants", desc: "View candidates", href: "/recruiter/applicants", icon: UserCircle2, gradient: "from-cyan-500 to-teal-500" },
                    ].map((action) => (
                      <Link key={action.title} href={action.href} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${action.gradient} text-white shadow-md hover:opacity-90`}>
                          <action.icon className="mr-2 size-4" />
                          {action.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            <Link href="/my-profile" className="inline-flex w-full">
              <Button className="w-full justify-between bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25 hover:from-blue-700 hover:to-cyan-600">
                Manage profile details
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentConsultationsTable
          data={statusItems}
          title="Recent Consultation Snapshot"
          description="A structured table of the latest consultation activity derived from your dashboard data."
        />

        <Card className="relative overflow-hidden border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="size-4 text-amber-500" />
              Client Reviews
            </CardTitle>
            <CardDescription>
              Feedback shared by clients after completed consultations.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-linear-to-br from-amber-50 via-white to-orange-50 p-4 dark:border-amber-500/20 dark:from-amber-500/10 dark:via-slate-900/40 dark:to-rose-500/10">
              <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/30">
                <MessageSquareQuote className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {testimonials.length > 0
                    ? `${testimonials.length} client ${testimonials.length === 1 ? "review" : "reviews"} received`
                    : "No reviews yet"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonials.length > 0
                    ? "View, reply, and manage client feedback in one place."
                    : "Reviews from completed consultations will appear here automatically."}
                </p>
              </div>
            </div>

            <Link href="/expert/dashboard/my-reviews" className="inline-flex w-full">
              <Button className="w-full justify-between rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25 hover:from-blue-700 hover:to-cyan-600">
                Open reviews page
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertDashboardContent;
