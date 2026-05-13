'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
  Users,
} from 'lucide-react';

import Container from '../../layout/Container';
import Section from '../../layout/Section';

export default function SocialProofSection() {
  return (
    <Section
      id="cta-banner"
      className="  relative overflow-hidden
  bg-[linear-gradient(to_bottom,#050505,#0b0712,#050505)]
  "
    >
      {/* BACKGROUND */}
    {/* BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {/* MAIN PURPLE GLOW */}
  <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#640D5F]/20 blur-3xl" />

  {/* ORANGE GLOW */}
  <div className="absolute right-[-80px] top-[-40px] h-[260px] w-[260px] rounded-full bg-[#EB5B00]/15 blur-3xl" />

  {/* GOLD GLOW */}
  <div className="absolute bottom-[-100px] left-[-60px] h-[240px] w-[240px] rounded-full bg-[#FFCC00]/10 blur-3xl" />

  {/* GRID */}
  <div
    className="
      absolute inset-0 opacity-[0.06]
      [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
      [background-size:70px_70px]
    "
  />

  {/* RADIAL LIGHT */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />

  {/* NOISE TEXTURE */}
  <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />

  {/* FLOATING ORBS */}
  <motion.div
    animate={{
      y: [0, -18, 0],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="
      absolute left-[12%] top-[24%]
      h-20 w-20 rounded-full
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-3xl
    "
  />

  <motion.div
    animate={{
      y: [0, 16, 0],
    }}
    transition={{
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="
      absolute bottom-[18%] right-[14%]
      h-28 w-28 rounded-full
      border border-white/10
      bg-gradient-to-br from-[#640D5F]/20 to-[#EB5B00]/10
      blur-xl
    "
  />

  {/* TOP SHINE */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
</div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative overflow-hidden rounded-[34px]
            border border-white/10
            bg-white/[0.04]
            p-5 md:p-7
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
          "
        >
          {/* INNER GLOW */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-transparent to-[#EB5B00]/10" />

          {/* TOP SHINE */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative z-10">
            {/* TOP TEXT */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-xl">
                <Sparkles className="size-3.5 text-[#FFCC00]" />
                AI-Powered Hiring Ecosystem
              </div>

              <h2 className="text-2xl font-black leading-tight tracking-tight text-white md:text-4xl">
                Built for both{' '}
                <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#FFCC00] bg-clip-text text-transparent">
                  recruiters
                </span>{' '}
                and{' '}
                <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#FFCC00] bg-clip-text text-transparent">
                  job seekers
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                Whether you are hiring top talent or searching for your next
                opportunity, HireGPT helps you move faster with AI-powered
                workflows and smart matching.
              </p>
            </div>

            {/* TWO PANELS */}
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {/* JOB SEEKERS */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-white/10
                  bg-black/30
                  p-6
                  backdrop-blur-2xl
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] to-[#B12C00] shadow-lg">
                    <Users className="size-5 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    For Job Seekers
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Discover AI-matched jobs, build standout profiles, track
                    applications, and connect with modern companies faster.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      'AI Job Matching',
                      'Smart Resume',
                      'Remote Jobs',
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          rounded-full border border-white/10
                          bg-white/[0.05]
                          px-3 py-1.5
                          text-[11px] font-medium
                          text-white/70
                        "
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className="
                      mt-6 group/button flex items-center gap-2
                      rounded-2xl bg-white text-black
                      px-5 py-3 text-sm font-semibold
                      transition-all duration-300
                      hover:scale-[1.02]
                    "
                  >
                    Find Jobs

                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>
              </motion.div>

              {/* RECRUITERS */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-2xl
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB5B00]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EB5B00] to-[#FFCC00] shadow-lg">
                    <BriefcaseBusiness className="size-5 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    For Recruiters
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Post jobs, discover qualified candidates instantly, and
                    streamline hiring with AI-powered automation and analytics.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      'Candidate Matching',
                      'AI Screening',
                      'Hiring Analytics',
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          rounded-full border border-white/10
                          bg-white/[0.05]
                          px-3 py-1.5
                          text-[11px] font-medium
                          text-white/70
                        "
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className="
                      mt-6 group/button flex items-center gap-2
                      rounded-2xl
                      bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00]
                      px-5 py-3 text-sm font-semibold text-white
                      shadow-[0_10px_30px_rgba(235,91,0,0.3)]
                      transition-all duration-300
                      hover:scale-[1.02]
                    "
                  >
                    Start Hiring

                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}