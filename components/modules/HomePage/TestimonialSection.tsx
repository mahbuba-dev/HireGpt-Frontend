// Premium Horizontal Scrolling Testimonials Section
"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Maya Chen",
    role: "Head of Talent · NovaAI",
    quote:
      "HireGPT transformed our hiring workflow. The platform feels modern, fast, and incredibly intuitive.",
    avatar: "/industry-icons/avatar1.png",
  },
  {
    name: "Liam Patel",
    role: "CTO · QuantumLeap",
    quote:
      "The AI matching system helped us discover candidates we would have completely missed before.",
    avatar: "/industry-icons/avatar2.png",
  },
  {
    name: "Sofia Garcia",
    role: "People Ops · StellarWorks",
    quote:
      "Everything feels premium — from the animations to the recruiter workflow and candidate experience.",
    avatar: "/industry-icons/avatar3.png",
  },
  {
    name: "Daniel Kim",
    role: "Founder · FutureStack",
    quote:
      "One of the cleanest recruitment platforms we've used. Beautiful UI with genuinely useful automation.",
    avatar: "/industry-icons/avatar1.png",
  },
];

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050816] py-16 md:py-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Purple Glow */}
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#640D5F]/20 blur-[120px]" />

        {/* Orange Glow */}
        <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-[#EB5B00]/10 blur-[100px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Noise */}
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl px-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-xl">
            <Star className="h-3.5 w-3.5 text-[#FFCC00]" />
            Trusted by Modern Teams
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Teams genuinely
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#B12C00] bg-clip-text text-transparent">
              {" "}
              love using HireGPT
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            From startups to scaling companies — teams use HireGPT to streamline
            hiring, improve candidate experience, and recruit smarter with AI.
          </p>
        </motion.div>

        {/* Horizontal Infinite Scroll */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#050816] to-transparent" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#050816] to-transparent" />

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-5 px-6"
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="group relative w-[300px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-500 hover:border-[#EB5B00]/30"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#640D5F]/10 via-transparent to-[#EB5B00]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Light Blur */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.04] blur-3xl" />

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] to-[#EB5B00] shadow-[0_10px_30px_rgba(235,91,0,0.25)]">
                    <Quote className="h-5 w-5 text-white" />
                  </div>

                  {/* Quote */}
                  <p className="text-sm leading-relaxed text-white/70">
                    “{item.quote}”
                  </p>

                  {/* User */}
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-12 w-12 rounded-full border border-white/10 object-cover"
                    />

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.name}
                      </h4>

                      <p className="text-xs text-white/45">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}