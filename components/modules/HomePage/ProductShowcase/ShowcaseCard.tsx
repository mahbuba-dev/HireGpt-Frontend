import React from "react";
import { motion } from "framer-motion";

// Card types: ai-matching, resume-analysis, recruiter-activity, candidate-activity, analytics
const cardContent = {
  "ai-matching": {
    title: "AI Smart Matching",
    desc: "AI is actively matching candidates to open roles in real time.",
    status: "In Progress",
    accent: "emerald",
    icon: "🤖",
  },
  "resume-analysis": {
    title: "Resume Analysis",
    desc: "AI is analyzing uploaded resumes for skills and fit.",
    status: "Processing",
    accent: "fuchsia",
    icon: "📄",
  },
  "recruiter-activity": {
    title: "Recruiter Activity",
    desc: "Recruiters are reviewing and shortlisting candidates.",
    status: "Active",
    accent: "blue",
    icon: "🧑‍💼",
  },
  "candidate-activity": {
    title: "Candidate Activity",
    desc: "Candidates are applying and scheduling interviews.",
    status: "Live",
    accent: "amber",
    icon: "👤",
  },
  analytics: {
    title: "Live Analytics",
    desc: "Real-time hiring stats and workflow insights.",
    status: "Updating",
    accent: "cyan",
    icon: "📊",
  },
};

type ShowcaseCardProps = {
  type: keyof typeof cardContent;
};

const accentMap: Record<string, string> = {
  emerald: "from-emerald-400/30 to-emerald-600/10",
  fuchsia: "from-fuchsia-400/30 to-fuchsia-600/10",
  blue: "from-blue-400/30 to-blue-600/10",
  amber: "from-amber-400/30 to-amber-600/10",
  cyan: "from-cyan-400/30 to-cyan-600/10",
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ type }) => {
  const { title, desc, status, accent, icon } = cardContent[type];
  return (
    <motion.div
      className={`relative rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-xl p-5 flex flex-col gap-2 min-w-[220px] max-w-xs group transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl focus-within:scale-[1.03] focus-within:shadow-2xl outline-none cursor-pointer`}
      tabIndex={0}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={`absolute -z-1 left-0 top-0 w-full h-full rounded-2xl bg-gradient-to-br ${accentMap[accent]} opacity-40 pointer-events-none`} />
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>{icon}</span>
        <span className="text-base font-semibold text-white/90">{title}</span>
      </div>
      <div className="text-sm text-slate-200/80">{desc}</div>
      <div className={`mt-2 text-xs font-medium text-${accent}-400`}>{status}</div>
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent opacity-30" />
      </div>
    </motion.div>
  );
};

export default ShowcaseCard;
