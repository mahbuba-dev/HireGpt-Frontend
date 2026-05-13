'use client';

import { motion } from 'framer-motion';

export default function SectionTransition() {
  return (
    <div className="relative z-10 -mt-2 h-12 w-full overflow-hidden md:h-16">
      {/* TOP FADE */}
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#0c0c14] via-[#09090f] to-transparent" />

      {/* PREMIUM LINE */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="
          absolute left-1/2 top-1/2
          h-px w-[58%]
          -translate-x-1/2 -translate-y-1/2
          bg-gradient-to-r
          from-transparent
          via-[#EB5B00]/50
          to-transparent
        "
      />

      {/* CENTER GLOW */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-10 w-[30%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#640D5F]/20
          blur-2xl
        "
      />

      {/* SMALL ORANGE LIGHT */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-5 w-[14%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#EB5B00]/20
          blur-xl
        "
      />
    </div>
  );
}