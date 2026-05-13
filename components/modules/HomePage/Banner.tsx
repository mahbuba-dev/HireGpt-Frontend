"use client";

import { motion } from "framer-motion";

const floatingWords = [
  {
    text: "AI Hiring",
    className:
      "top-[8%] left-[8%] md:left-[12%]",
  },
  {
    text: "Remote Jobs",
    className:
      "top-[12%] right-[10%] md:right-[14%]",
  },
  {
    text: "Top Startups",
    className:
      "top-[34%] left-[2%] md:left-[10%]",
  },
  {
    text: "Next.js",
    className:
      "top-[30%] right-[2%] md:right-[10%]",
  },
  {
    text: "Developers",
    className:
      "bottom-[18%] left-[14%]",
  },
  {
    text: "Innovation",
    className:
      "bottom-[10%] right-[18%]",
  },
  {
    text: "React",
    className:
      "top-[52%] left-[32%]",
  },
  {
    text: "TypeScript",
    className:
      "top-[18%] left-[40%]",
  },
  {
    text: "Product Design",
    className:
      "bottom-[16%] right-[34%]",
  },
  {
    text: "Engineering",
    className:
      "bottom-[34%] left-[42%]",
  },
];

export default function VideoHero() {
  return (
    <section className="relative bg-[#050505] text-white">
      {/* Hero Container */}
      <div className="relative h-[44vh] min-h-[340px] w-full overflow-hidden rounded-b-[2.5rem]">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/video/OIG2 (1).mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay (reduced opacity) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,90,0.18),transparent_38%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(100,13,95,0.18),transparent_35%)]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          {/* Floating Tags */}
          <div className="relative h-full w-full max-w-7xl">
            {floatingWords.map((word, index) => (
              <motion.div
                key={word.text}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.08,
                }}
                className={`absolute hidden rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-medium tracking-wide text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:flex ${word.className}`}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.05] via-transparent to-[#EB5B00]/[0.08]" />

                <span className="relative z-10 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFB547] shadow-[0_0_10px_rgba(255,181,71,0.9)]" />

                  {word.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}