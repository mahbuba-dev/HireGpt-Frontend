import React from "react";
import { motion } from "framer-motion";

// Interactive workflow timeline with horizontal movement and connections
const workflowSteps = [
  {
    label: "Resume Uploaded",
    icon: "📄",
    accent: "fuchsia",
  },
  {
    label: "AI Analysis",
    icon: "🤖",
    accent: "emerald",
  },
  {
    label: "Smart Matching",
    icon: "🔗",
    accent: "blue",
  },
  {
    label: "Recruiter Review",
    icon: "🧑‍💼",
    accent: "amber",
  },
  {
    label: "Interview Scheduled",
    icon: "📅",
    accent: "cyan",
  },
];

const accentMap: Record<string, string> = {
  emerald: "bg-emerald-400",
  fuchsia: "bg-fuchsia-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
  cyan: "bg-cyan-400",
};

const ShowcaseWorkflow = () => {
  return (
    <div className="relative w-full flex flex-col items-center mt-10">
      <motion.div
        className="flex flex-row gap-4 md:gap-8 items-center justify-center w-full overflow-x-auto px-2 md:px-0"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.15 } },
        }}
      >
        {workflowSteps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              className="flex flex-col items-center gap-2 min-w-30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 + i * 0.1, ease: "easeOut" }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg ${accentMap[step.accent]} text-white`}>{step.icon}</div>
              <div className="text-xs text-slate-200/80 font-medium text-center mt-1">{step.label}</div>
            </motion.div>
            {i < workflowSteps.length - 1 && (
              <motion.div
                className="w-8 h-1 rounded-full bg-linear-to-r from-white/30 to-slate-400/20 mx-1 md:mx-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * i, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default ShowcaseWorkflow;
