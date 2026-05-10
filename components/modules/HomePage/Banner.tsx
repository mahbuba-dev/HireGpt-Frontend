"use client";

import { motion } from "framer-motion";

const floatingWords = [
  "AI Hiring",
  "Remote Jobs",
  "Top Startups",
  "Next.js",
  "Developers",
  "Innovation",
  "React",
  "TypeScript",
  "Product Design",
  "Engineering",
];

export default function VideoHero() {
  return (
    <section className="relative  bg-[#050505] text-white">
      {/* Hero Container */}
      <div className="relative h-[44vh] min-h-80 w-full overflow-hidden rounded-b-4xl">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* C:\PortFolioProjects\HireGpt-Frontend\public\video\OIG2 (1).mp4 */}
          <source src="\video\OIG2 (1).mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Soft Orange Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,120,0.18),transparent_40%)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-8 text-center">
          
          {/* Title Top */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 max-w-2xl text-2xl font-black leading-tight md:text-xl"
          >
            Build Your Future With
            <span className="bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 bg-clip-text text-transparent">
              {" "}
              Modern Careers
            </span>
          </motion.h1> */}

          {/* Subtitle */}
          <motion.h4
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.10, duration: 0.7 }}
            className="mt-2 max-w-sm text-base text-green-300 md:text-lg font-bold"
          >
            Explore AI-powered hiring, remote opportunities,
            and the fastest growing startups.
          </motion.h4>

          {/* Floating Words Area */}
          <div className="relative mt-5 h-40 w-full max-w-8xl">
            {floatingWords.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute rounded-2xl border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-xl md:text-base"
                style={{
                  top: `${(index % 5) * 22}%`,
                  left: `${4 + (index % 6) * 22}%`,
                }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}