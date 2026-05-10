"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCog,
  Users,
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

import { getDashboardData } from "@/src/services/dashboard.services";

import type { IAdminDashboardStats } from "@/src/types/admin.dashboard";

import OverviewDashboardContent from "./OverviewDashboardContent";
import RecentConsultationsTable from "../shared/RecentConsultationsTable";
import StatsCard from "../shared/StatsCard";

import { MiniStatsRibbon } from "./MiniStatsRibbon";
import { QuickActions } from "./QuickActions";

import { adminMiniStats, adminQuickActions } from "@/src/lib/navItems";

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

const AdminDashboardContent = () => {
  const {
    data: adminDashboardResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: () => getDashboardData<IAdminDashboardStats>(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const data = adminDashboardResponse?.data;
  const statusItems = Array.isArray(data?.interviewStatusDistribution)
    ? data.interviewStatusDistribution.map((item: { status: string; count: number }) => ({
        status: item.status,
        count: item.count,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl bg-muted/60"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Unable to load admin dashboard</CardTitle>
          <CardDescription>
            The platform stats could not be fetched right now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/admin/dashboard">
              Retry
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-8">
      <OverviewDashboardContent role="ADMIN" />
      {/* Mini Stats */}
      <MiniStatsRibbon stats={adminMiniStats(data, formatCurrency)} />
      {/* Quick Actions */}
      <QuickActions actions={adminQuickActions as any} />
      {/* Top Overview Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
          <p className="text-xs uppercase tracking-wider text-white/70">Users</p>
          <p className="mt-1 text-xl font-bold lg:text-2xl">{data.userCount || 0}</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
          <p className="text-xs uppercase tracking-wider text-white/70">Interviews</p>
          <p className="mt-1 text-xl font-bold lg:text-2xl">{data.interviewCount || 0}</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
          <p className="text-xs uppercase tracking-wider text-white/70">Revenue</p>
          <p className="mt-1 text-xl font-bold lg:text-2xl">{formatCurrency(data.totalRevenue || 0)}</p>
        </div>
      </div>
      {/* Highlights */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RecentConsultationsTable
            data={statusItems}
            title="Platform Consultation Snapshot"
            description="A structured live summary of consultation activity across the platform."
          />
        </div>
        <Card className="relative overflow-hidden border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-500" />
              Platform Highlights
            </CardTitle>
            <CardDescription>
              Important operational indicators for admin decision-making.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-blue-200/60 bg-linear-to-br from-blue-50 to-cyan-50 p-4 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-cyan-500/10">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                <TrendingUp className="size-4" />
                Revenue efficiency
              </div>
              <p className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
                {formatCurrency(
                  data && data.interviewCount && data.interviewCount > 0
                    ? (data.totalRevenue || 0) / data.interviewCount
                    : 0
                )}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Average paid value per interview.
              </p>
            </div>
            <div className="rounded-xl border border-indigo-200/60 bg-linear-to-br from-indigo-50 to-sky-50 p-4 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-sky-500/10">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                <ShieldCheck className="size-4" />
                Operational summary
              </div>
              <p className="text-sm text-muted-foreground">
                {data.paymentCount || 0} payments processed
                across {data.jobCategoryCount || 0} job categories.
              </p>
            </div>
            <div className="space-y-2">
              {statusItems.length > 0 ? (
                statusItems.map((item: { status: string; count: number }) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white/50 px-3 py-2 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-sm font-medium">
                      {formatStatusLabel(item.status)}
                    </span>
                    <Badge variant="secondary">
                      {item.count}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No consultation status data available yet.
                </p>
              )}
            </div>
            <Link
              href="/admin/dashboard/client-management"
              className="inline-flex w-full"
            >
              <Button className="w-full justify-between bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow-md shadow-blue-500/25 hover:from-indigo-700 hover:to-blue-600">
                Open user management
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardContent;