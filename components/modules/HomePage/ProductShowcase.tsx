// Cinematic product UI showcase with realistic dashboard/app blocks, not placeholders
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated data for a real dashboard block
const pipeline = [
  {
    initials: 'JD',
    name: 'Jordan D.',
    role: 'Frontend Engineer',
    status: 'Interviewing',
    color: 'from-[#7f5af0]/40 to-[#00ffd0]/30',
    statusColor: 'bg-[#ff6bcb]/20 text-[#ff6bcb]',
  },
  {
    initials: 'AL',
    name: 'Alex L.',
    role: 'Product Designer',
    status: 'Shortlisted',
    color: 'from-[#00ffd0]/40 to-[#7f5af0]/30',
    statusColor: 'bg-[#7f5af0]/20 text-[#7f5af0]',
  },
  {
    initials: 'SR',
    name: 'Samira R.',
    role: 'AI Researcher',
    status: 'Offer Sent',
    color: 'from-[#ff6bcb]/40 to-[#00ffd0]/30',
    statusColor: 'bg-[#00ffd0]/20 text-[#00ffd0]',
  },
];

export default function ProductShowcase() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="product" className="relative z-10 px-6 md:px-16 py-12 md:py-24 flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between">
      {/* Left: Realistic dashboard UI block with skeleton loading and premium card hover */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-xl rounded-3xl bg-gradient-to-br from-[#23244a]/80 to-[#181b2e]/90 shadow-2xl border border-white/10 p-8 md:p-12 backdrop-blur-xl overflow-hidden"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-3 py-1 rounded-full bg-[#7f5af0]/20 text-[#7f5af0] font-bold tracking-wide animate-pulse">Live</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#00ffd0]/20 text-[#00ffd0] font-bold tracking-wide">AI Insights</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Your Talent Pipeline, Reimagined</h2>
          <p className="text-white/80 text-base md:text-lg mb-4">See every candidate’s journey at a glance. AI highlights, instant feedback, and real-time collaboration — all in one cinematic dashboard.</p>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 animate-pulse"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/10" />
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="h-4 w-24 rounded bg-white/10" />
                          <div className="h-3 w-16 rounded bg-white/10" />
                        </div>
                        <div className="h-6 w-20 rounded-full bg-white/10" />
                      </motion.div>
                    ))
                : pipeline.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 * i, duration: 0.5, ease: 'easeOut' }}
                      className={`flex items-center gap-4 group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                      style={{ zIndex: 10 - i }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>{c.initials}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-[#00ffd0] transition-colors">{c.name}</div>
                        <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{c.role}</div>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full font-bold ${c.statusColor} group-hover:scale-110 transition-transform`}>{c.status}</div>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Mouse-follow glow effect */}
        <GlowEffect />
        {/* Ambient glow and noise overlay */}
        <div className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-radial from-[#7f5af0]/30 via-[#00ffd0]/10 to-transparent blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-20 pointer-events-none" />
      </motion.div>
      {/* Right: Copy and feature highlights */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md flex flex-col gap-8"
      >
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Cinematic, Not Static</h3>
          <p className="text-white/80 text-base md:text-lg">Every pixel is designed for clarity and delight. No more boring tables — just actionable insights and a UI that feels alive.</p>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3 group">
            <span className="w-4 h-4 rounded-full bg-[#7f5af0] group-hover:scale-125 transition-transform" />
            <span className="text-white/90 font-medium">AI-powered candidate scoring</span>
          </li>
          <li className="flex items-center gap-3 group">
            <span className="w-4 h-4 rounded-full bg-[#00ffd0] group-hover:scale-125 transition-transform" />
            <span className="text-white/90 font-medium">Real-time team collaboration</span>
          </li>
          <li className="flex items-center gap-3 group">
            <span className="w-4 h-4 rounded-full bg-[#ff6bcb] group-hover:scale-125 transition-transform" />
            <span className="text-white/90 font-medium">Instant feedback & insights</span>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}

// Mouse-follow glow effect for dashboard block
function GlowEffect() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = document.getElementById('dashboard-glow');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const el = document.getElementById('dashboard-glow');
    if (el) el.addEventListener('mousemove', handler);
    return () => {
      if (el) el.removeEventListener('mousemove', handler);
    };
  }, []);
  return (
    <div id="dashboard-glow" className="absolute inset-0 z-10 pointer-events-auto">
      <div
        style={{
          left: pos.x - 80,
          top: pos.y - 80,
          opacity: pos.x === 0 && pos.y === 0 ? 0 : 0.5,
        }}
        className="absolute w-40 h-40 rounded-full bg-gradient-radial from-[#00ffd0]/40 via-[#7f5af0]/20 to-transparent blur-2xl pointer-events-none transition-all duration-200"
      />
    </div>
  );
}
