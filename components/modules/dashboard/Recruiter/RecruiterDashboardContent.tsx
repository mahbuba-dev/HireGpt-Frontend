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
  TrendingUp,
  UserCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const RecruiterDashboardContent = () => {
  const { data: recruiterDashboardResponse, isLoading, isError } = useQuery({
    queryKey: ["recruiter-dashboard-data"],
    queryFn: () => getDashboardData<IRecruiterDashboardStats>(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // ...existing code...

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-360 space-y-6">
        <div className="h-48 animate-pulse rounded-2xl bg-muted/60" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`qa-${index}`} className="h-24 animate-pulse rounded-2xl bg-muted/60" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-xl bg-muted/60" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-muted/60 xl:col-span-2" />
          <div className="h-80 animate-pulse rounded-2xl bg-muted/60" />
        </div>
      </div>
    );
  }

  // ...rest of recruiter dashboard content...

  return (
    <div className="space-y-8">
      {/* Recruiter dashboard content goes here */}
    </div>
  );
};

export default RecruiterDashboardContent;
