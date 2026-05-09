import { PieChartData } from "./dashboard.types";

export interface ICandidateDashboardStats {
  consultationCount: number;
  consultationStatusDistribution: PieChartData[];
}
