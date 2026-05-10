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
import type { ApiResponse } from "@/src/types/api.types";
import OverviewDashboardContent from "../OverviewDashboardContent";
import RecentConsultationsTable from "../shared/RecentConsultationsTable";
import StatsCard from "../shared/StatsCard";

import { MiniStatsRibbon } from "../MiniStatsRibbon";
import { QuickActions } from "../QuickActions";
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
  const { data: adminDashboardResponse, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: () => getDashboardData<IAdminDashboardStats>(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // ...existing code...

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
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
          <CardTitle>Unable to load admin dashboard</CardTitle>
          <CardDescription>
            The platform stats could not be fetched right now.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <OverviewDashboardContent role="ADMIN" />
      {/* Mini stats ribbon */}
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Users", value: data?.userCount || 0 }, { label: "Sessions", value: data?.consultationCount || 0 }, { label: "Revenue", value: formatCurrency(data?.totalRevenue || 0) }].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-wider text-white/70">{s.label}</p>
            <p className="mt-1 text-xl font-bold lg:text-2xl">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { title: "Experts", desc: "Verify & manage", href: "/admin/dashboard/expert-management", icon: UserCog, gradient: "from-blue-500 to-cyan-500" },
          { title: "Clients", desc: "User accounts", href: "/admin/dashboard/client-management", icon: Users, gradient: "from-cyan-500 to-teal-500" },
        ].map((action) => (
          <Link key={action.title} href={action.href} className="w-full">
            <Button className={`w-full bg-gradient-to-r ${action.gradient} text-white shadow-md hover:opacity-90`}>
              <action.icon className="mr-2 size-4" />
              {action.title}
            </Button>
          </Link>
        ))}
      </div>
      <MiniStatsRibbon stats={adminMiniStats(data, formatCurrency)} />
      <QuickActions actions={adminQuickActions} />
    </div>
  );
};

export default AdminDashboardContent;
