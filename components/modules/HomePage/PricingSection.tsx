'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Workflow,
  ArrowUpRight,
} from 'lucide-react';

const integrations = [
  {
    title: 'AI Resume Analysis',
    desc: 'Instantly understand candidate strengths, gaps, and potential using smart AI evaluation.',
    icon: BrainCircuit,
    glow: 'from-[#640D5F]/30 to-[#EB5B00]/10',
  },
  {
    title: 'Smart Hiring Workflow',
    desc: 'Automate screening, interview scheduling, and recruitment collaboration in one place.',
    icon: Workflow,
    glow: 'from-[#EB5B00]/20 to-[#FFCC00]/10',
  },
  {
    title: 'Global Remote Hiring',
    desc: 'Hire developers, designers, and remote talent from anywhere around the world.',
    icon: Globe,
    glow: 'from-[#1E3A8A]/20 to-[#640D5F]/10',
  },
  {
    title: 'Secure Recruitment',
    desc: 'Enterprise-grade security with protected candidate data and recruiter access control.',
    icon: ShieldCheck,
    glow: 'from-[#0F766E]/20 to-[#640D5F]/10',
  },
];

export default function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden bg-[#050816] py-14 md:py-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#640D5F]/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#EB5B00]/10 blur-[100px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px] opacity-[0.03]" />

        {/* Noise */}
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#FFCC00]" />
            Complete Recruitment Ecosystem
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Everything your hiring team
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#B12C00] bg-clip-text text-transparent">
              {' '}
              needs in one platform
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            From AI-powered matching to secure collaboration and global remote
            hiring — HireGPT brings modern recruitment into one intelligent
            workspace.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-5 lg:grid-cols-4">
          {integrations.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#EB5B00]/30"
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Floating blur */}
                <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/[0.05] blur-3xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#1F2937] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                    <Icon className="h-6 w-6 text-[#FFCC00]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {item.desc}
                  </p>

                  {/* Hover link */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/40 transition-all duration-300 group-hover:text-white">
                    Explore Feature
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}