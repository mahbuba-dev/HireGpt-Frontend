// Modern Animated Why HireGPT Section
"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Rocket,
  ShieldCheck,
  Workflow,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "AI Smart Matching",
    desc: "Advanced AI connects candidates with the most relevant opportunities instantly.",
    icon: Bot,
    glow: "from-[#640D5F]/30 via-[#B12C00]/10 to-transparent",
    iconBg: "from-[#640D5F] to-[#B12C00]",
  },
  {
    title: "Lightning Workflow",
    desc: "Automate recruitment pipelines and speed up hiring from days to hours.",
    icon: Rocket,
    glow: "from-[#EB5B00]/25 via-[#FFCC00]/10 to-transparent",
    iconBg: "from-[#B12C00] to-[#EB5B00]",
  },
  {
    title: "Secure & Trusted",
    desc: "Enterprise-grade security and reliable infrastructure built for modern teams.",
    icon: ShieldCheck,
    glow: "from-[#640D5F]/20 via-[#EB5B00]/10 to-transparent",
    iconBg: "from-[#640D5F] to-[#EB5B00]",
  },
  {
    title: "Smart Automation",
    desc: "Reduce manual work with AI-driven workflows and intelligent hiring tools.",
    icon: Workflow,
    glow: "from-[#FFCC00]/15 via-[#EB5B00]/10 to-transparent",
    iconBg: "from-[#EB5B00] to-[#FFCC00]",
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#050816] py-16 md:py-24"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#640D5F]/20 blur-[130px]"
        />

        {/* Orange Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#EB5B00]/15 blur-[100px]"
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Noise */}
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#FFCC00]" />
            Why Teams Choose HireGPT
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Built for the future of
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#B12C00] bg-clip-text text-transparent">
              {" "}
              AI recruitment
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Premium hiring experience powered by intelligent automation,
            faster workflows, and modern recruitment infrastructure.
          </p>
        </motion.div>

        {/* FEATURE GRID */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
              >
                {/* HOVER GLOW */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.glow} opacity-0 transition-all duration-500 group-hover:opacity-100`}
                />

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-[30px] border border-white/5 group-hover:border-[#EB5B00]/30 transition-all duration-500" />

                {/* Floating Light */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.04] blur-3xl"
                />

                <div className="relative z-10">
                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.05,
                    }}
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.iconBg} shadow-[0_12px_30px_rgba(235,91,0,0.22)]`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>

                  {/* DESC */}
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {feature.desc}
                  </p>

                  {/* BUTTON */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/70 transition-all duration-300 group-hover:text-white">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* BOTTOM GLOW LINE */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}