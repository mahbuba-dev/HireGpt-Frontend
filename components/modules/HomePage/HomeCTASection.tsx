"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MinimalCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0e8b8750] py-14 text-white">
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,120,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
              className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 px-8 py-10 backdrop-blur-2xl"
        >
          {/* Glow */}
          <div className="absolute right-0 top-0 h-40 w-40 bg-orange-200/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            
            {/* LEFT */}
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-orange-100/70">
                AI Powered Hiring
              </p>

              <h2 className="text-2xl font-black leading-tight md:text-3xl">
                Discover better opportunities
                <span className="bg-gradient-to-r from-orange-100 to-orange-300 bg-clip-text text-transparent">
                  {" "}
                  faster.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/50 md:text-base">
                Connect with startups, remote companies,
                and modern teams building the future.
              </p>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/jobs"
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-100 to-orange-300 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
              >
                Explore Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/post-job"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}