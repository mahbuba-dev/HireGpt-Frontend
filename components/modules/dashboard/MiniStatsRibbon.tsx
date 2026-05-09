import React from "react";

interface Stat {
  label: string;
  value: string | number;
}

interface MiniStatsRibbonProps {
  stats: Stat[];
}

export const MiniStatsRibbon: React.FC<MiniStatsRibbonProps> = ({ stats }) => (
  <div className="section-grid md:grid-cols-3 gap-3">
    {stats.map((s) => (
      <div key={s.label} className="glass-card p-4">
        <p className="text-xs uppercase tracking-wider muted">{s.label}</p>
        <p className="mt-1 text-xl font-bold lg:text-2xl">{s.value}</p>
      </div>
    ))}
  </div>
);
