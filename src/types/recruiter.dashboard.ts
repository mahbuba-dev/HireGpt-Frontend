import { PieChartData } from "./dashboard.types";

export interface IRecruiterDashboardStats {
  jobApplicationCount: number;
  candidateCount: number;
  totalRevenue: number;
  jobApplicationDistribution: PieChartData[];
  reviewCount: number;
}
