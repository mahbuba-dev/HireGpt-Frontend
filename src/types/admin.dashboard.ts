import { BarChartData, PieChartData } from "./dashboard.types";

export interface IAdminDashboardStats {
  recruiterCount: number;
  candidateCount: number;
  interviewCount: number;
  jobCategoryCount: number;
  paymentCount: number;
  userCount: number;

  totalRevenue: number;

  interviewStatusDistribution: PieChartData[];

  revenueByMonth: BarChartData[];
}