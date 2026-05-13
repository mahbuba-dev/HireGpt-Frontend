"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simulated pipeline and activity data
const pipeline = [
  {
    initials: "JD",
    name: "Jordan D.",
    role: "Frontend Engineer",
    status: "Interviewing",
    color: "from-[#7f5af0]/40 to-[#00ffd0]/30",
    statusColor: "bg-[#ff6bcb]/20 text-[#ff6bcb]",
    avatar: "/industry-icons/avatar1.png",
  },
  {
    initials: "AL",
    name: "Alex L.",
    role: "Product Designer",
    status: "Shortlisted",
    color: "from-[#00ffd0]/40 to-[#7f5af0]/30",
    statusColor: "bg-[#7f5af0]/20 text-[#7f5af0]",
    avatar: "/industry-icons/avatar2.png",
  },
  {
    initials: "SR",
    name: "Samira R.",
    role: "AI Researcher",
    status: "Offer Sent",
    color: "from-[#ff6bcb]/40 to-[#00ffd0]/30",
    statusColor: "bg-[#00ffd0]/20 text-[#00ffd0]",
    avatar: "/industry-icons/avatar3.png",
  },
];

const activityFeed = [
  { type: "ai", text: "AI matched 2 new candidates", time: "Just now" },
  { type: "recruiter", text: "Recruiter scheduled interview with Alex L.", time: "2m ago" },
  { type: "candidate", text: "Samira R. accepted offer", time: "5m ago" },
  { type: "ai", text: "Resume analysis completed for Jordan D.", time: "8m ago" },
];

const ShowcaseDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      className="relative w-full md:w-130 h-100 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-visible flex flex-col justify-between p-0 md:p-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Soft edge lighting and blur separation */}
      <div className="pointer-events-none absolute -inset-2 z-10 rounded-3xl bg-linear-to-br from-white/10 via-fuchsia-400/10 to-blue-400/10 blur-2xl opacity-60" />
      {/* Top: Platform Header + Notification */}
      <div className="flex items-center gap-3 mb-4 px-8 pt-8 relative z-20">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/80 to-fuchsia-500/60 flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">HG</span>
        </div>
        <div>
          <div className="text-lg font-semibold text-white/90">HireGPT Dashboard</div>
          <div className="text-xs text-slate-200/70">AI-powered hiring workspace</div>
        </div>
        {/* Notification popover */}
        <div className="ml-auto relative">
          <button
            className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
            aria-label="Show notifications"
            onClick={() => setShowNotif((v) => !v)}
          >
            <span className="material-icons text-fuchsia-400 text-lg">notifications</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
          </button>
          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white/90 text-slate-900 rounded-xl shadow-2xl border border-fuchsia-400/30 z-50 p-4 text-sm"
              >
                <div className="font-semibold mb-2 text-fuchsia-600">Notifications</div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI matched 2 new candidates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    Recruiter scheduled interview
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                    Resume analysis completed
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Center: Live Analytics, Pipeline, and AI States */}
      <div className="flex-1 flex flex-col gap-4 justify-center px-8">
        {/* Pipeline progression with avatars and shimmer loading */}
        <div className="mb-2">
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[#7f5af0]/20 text-[#7f5af0] font-bold tracking-wide animate-pulse">Live</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#00ffd0]/20 text-[#00ffd0] font-bold tracking-wide">AI Insights</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-2 mb-1">Hiring Pipeline</h3>
          <div className="flex flex-row gap-4 mt-2">
            {pipeline.map((c, i) => (
              <motion.div
                key={c.name}
                className={`relative rounded-2xl bg-linear-to-br ${c.color} shadow-lg border border-white/10 p-3 flex flex-col items-center min-w-22.5 max-w-27.5 group transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 + i * 0.1, ease: "easeOut" }}
              >
                {loading ? (
                  <div className="w-10 h-10 rounded-full bg-slate-300/30 animate-pulse mb-2" />
                ) : (
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border-2 border-white/40 shadow-md mb-2 object-cover" />
                )}
                <div className="text-xs font-semibold text-white/90 mb-1">{c.initials}</div>
                <div className="text-[11px] text-slate-200/80 mb-1 text-center">{c.role}</div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full ${c.statusColor} font-bold`}>{c.status}</div>
                {/* AI processing shimmer */}
                {i === 0 && loading && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-2 rounded-full bg-linear-to-r from-fuchsia-400/30 via-white/40 to-blue-400/30 animate-pulse blur-sm" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Analytics Snippet with tiny chart animation */}
        <div className="mt-2 flex items-end gap-3">
          <div className="flex-1">
            <div className="h-16 w-full bg-linear-to-br from-blue-400/20 to-fuchsia-400/10 rounded-xl flex items-end overflow-hidden relative">
              {/* Tiny chart animation (realistic) */}
              <div className="absolute left-0 bottom-0 w-full h-full flex items-end gap-1 px-2">
                {[8, 12, 6, 14, 10, 18, 12].map((h, i) => (
                  <motion.div
                    key={i}
                    className="bg-blue-400/60 rounded-full"
                    style={{ width: 6, height: loading ? 12 : h * 2 }}
                    animate={loading ? { height: [12, 24, 12] } : { height: [h * 2, h * 2 + 8, h * 2] }}
                    transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-200/70 mt-1">Platform Activity</div>
          </div>
          {/* AI Processing State with animated dots */}
          <div className="flex flex-col items-end">
            <div className="text-fuchsia-400 font-semibold text-sm flex items-center gap-1">
              <span className="relative flex w-4 h-2">
                <span className="block w-1 h-1 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="block w-1 h-1 rounded-full bg-fuchsia-400 animate-bounce ml-1" style={{ animationDelay: "0.15s" }} />
                <span className="block w-1 h-1 rounded-full bg-fuchsia-400 animate-bounce ml-1" style={{ animationDelay: "0.3s" }} />
              </span>
              Resume Analysis
            </div>
            <div className="text-xs text-slate-200/60 mt-1">{loading ? "Analyzing…" : "Complete"}</div>
          </div>
        </div>
        {/* Live Activity Feed */}
        <div className="mt-4">
          <h4 className="text-xs font-bold text-slate-200/80 mb-1">Live Activity</h4>
          <div className="flex flex-col gap-1 max-h-16 overflow-y-auto pr-1">
            <AnimatePresence>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-4 w-5/6 bg-slate-300/20 rounded animate-pulse mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  ))
                : activityFeed.map((a, i) => (
                    <motion.div
                      key={a.text}
                      className="flex items-center gap-2 text-xs text-slate-100/90"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 + i * 0.1, ease: "easeOut" }}
                    >
                      <span className={`w-2 h-2 rounded-full ${a.type === "ai" ? "bg-fuchsia-400" : a.type === "recruiter" ? "bg-blue-400" : "bg-emerald-400"} animate-pulse`} />
                      {a.text}
                      <span className="ml-auto text-[10px] text-slate-200/60">{a.time}</span>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Bottom: Workflow Status */}
      <div className="flex items-center justify-between mt-6 px-8 pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs text-slate-200/80">Syncing with Recruiters</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs text-slate-200/80">2 New Interviews</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-200/80">Live Matching</span>
        </div>
      </div>
      {/* Glass reflection overlay and depth */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden z-20">
        <div className="absolute left-0 top-0 w-full h-1/2 bg-linear-to-b from-white/30 to-transparent opacity-40" />
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-linear-to-tr from-fuchsia-400/10 to-transparent opacity-30" />
        <div className="absolute left-0 bottom-0 w-full h-1/4 bg-linear-to-t from-blue-400/10 to-transparent opacity-20 blur-sm" />
      </div>
    </motion.div>
  );
};

export default ShowcaseDashboard;
