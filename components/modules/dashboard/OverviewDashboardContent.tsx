"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/src/services/dashboard.services";
import type { IAdminDashboardStats } from "@/src/types/admin.dashboard";
import type { ICandidateDashboardStats } from "@/src/types/client.dashboard";
import type { IRecruiterDashboardStats } from "@/src/types/expert.dashboard";
import { Card } from "@/components/ui/card";
import ConsultationsBarChart from "../shared/ConsultationsBarChart";
import ConsultationsPieChart from "../shared/ConsultationsPieCharts";

interface OverviewDashboardContentProps {
  role: "ADMIN" | "RECRUITER" | "CANDIDATE";
}

const OverviewDashboardContent = ({ role }: OverviewDashboardContentProps) => {
  // Pick correct stats type
  const queryKey =
    role === "ADMIN"
      ? ["admin-dashboard-data"]
      : role === "RECRUITER"
      ? ["recruiter-dashboard-data"]
      : ["candidate-dashboard-data"];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      getDashboardData<any>(), // Type will be inferred below
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Infer stats type
  let stats: IAdminDashboardStats | IRecruiterDashboardStats | ICandidateDashboardStats | undefined = data?.data;
  let barData = (stats as IAdminDashboardStats)?.revenueByMonth || [];
  let pieData = stats?.consultationStatusDistribution || [];

  if (isLoading) {
    return (
      <section className="content-container section-spacing grid gap-6">
        <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
        <div className="h-40 animate-pulse rounded-2xl bg-muted/60" />
      </section>
    );
  }

  if (isError || !stats) {
    return (
      <Card className="content-container section-spacing border-destructive/30 p-8 text-center text-destructive">
        Unable to load dashboard data.
      </Card>
    );
  }

  return (
    <section className="content-container section-spacing grid md:grid-cols-2 gap-6">
      <ConsultationsBarChart
        data={barData}
        title={role === "ADMIN" ? "Revenue by Month" : "Consultations by Month"}
        description={role === "ADMIN" ? "Monthly revenue trends" : "Monthly consultation trends"}
      />
      <ConsultationsPieChart
        data={pieData}
        title="Consultation Status"
        description="Distribution of consultation statuses"
      />
    </section>
  );
};

export default OverviewDashboardContent;
