import React from "react";
import { ConsultationsBarChart } from "../shared/ConsultationsBarChart";
import { ConsultationsPieCharts } from "../shared/ConsultationsPieCharts";

interface AnalyticsWidgetsProps {
  barData: any[];
  pieData: any[];
  barTitle?: string;
  pieTitle?: string;
}

export const AnalyticsWidgets: React.FC<AnalyticsWidgetsProps> = ({ barData, pieData, barTitle, pieTitle }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
    <div className="bg-white/10 rounded-2xl p-4">
      {barTitle && <h3 className="mb-2 text-lg font-semibold text-white/80">{barTitle}</h3>}
      <ConsultationsBarChart data={barData} />
    </div>
    <div className="bg-white/10 rounded-2xl p-4">
      {pieTitle && <h3 className="mb-2 text-lg font-semibold text-white/80">{pieTitle}</h3>}
      <ConsultationsPieCharts data={pieData} />
    </div>
  </div>
);
