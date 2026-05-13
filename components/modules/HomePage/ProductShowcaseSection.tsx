"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Zap,
} from "lucide-react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";

const stats = [
  {
    label: "AI Match Accuracy",
    value: "98%",
    icon: BrainCircuit,
  },
  {
    label: "Faster Hiring",
    value: "4x",
    icon: Sparkles,
  },
  {
    label: "Smart Automation",
    value: "24/7",
    icon: Zap,
  },
];

export default function ProductShowcaseSection() {
  return (
    <Section
      id="product-showcase"
      className="relative overflow-hidden bg-[#050816] py-14 md:py-20"
    >
      {/* PREMIUM BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple Glow */}
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#640D5F]/25 blur-[120px]" />

        {/* Orange Glow */}
        <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-[#EB5B00]/10 blur-[100px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Noise */}
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />
      </div>

      <Container className="relative z-10">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#FFCC00]" />
            AI Recruitment Platform
          </div>

          <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Built for
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#B12C00] bg-clip-text text-transparent">
              {" "}
              modern hiring
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Streamline recruitment workflows, automate candidate matching,
            and accelerate hiring with intelligent AI-powered tools.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-7"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-transparent to-[#EB5B00]/10" />

          {/* TOP */}
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="max-w-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] via-[#B12C00] to-[#EB5B00] shadow-[0_10px_40px_rgba(235,91,0,0.25)]">
                <BrainCircuit className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
                Intelligent AI hiring experience
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                Automate hiring workflows, discover better candidates,
                and make smarter recruitment decisions from one premium platform.
              </p>

              <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03]">
                Explore Platform
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* RIGHT STATS */}
            <div className="grid flex-1 gap-4 sm:grid-cols-3">
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    className="rounded-3xl border border-white/10 bg-[#0B1120]/70 p-5 backdrop-blur-xl"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] to-[#EB5B00]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <h4 className="text-3xl font-bold tracking-tight text-white">
                      {item.value}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-white/55">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM FEATURES */}
          <div className="relative z-10 mt-7 grid gap-3 border-t border-white/10 pt-6 md:grid-cols-2">
            {[
              "AI-powered candidate matching",
              "Automated hiring workflows",
              "Real-time recruitment insights",
              "Seamless interview management",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                </div>

                <p className="text-sm text-white/70">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}