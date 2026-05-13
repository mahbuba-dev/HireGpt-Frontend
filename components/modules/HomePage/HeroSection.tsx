// Cinematic, premium Hero section with advanced motion, parallax, and layered depth
'use client';
import { motion } from 'framer-motion';
import Container from '../../layout/Container';
import Section from '../../layout/Section';

import gradients from '../../shared/design-tokens/gradients';
import typography from '../../shared/design-tokens/typography';
import shadows from '../../shared/design-tokens/shadows';
import radiuses from '../../shared/design-tokens/radiuses';
import { Button } from '@/components/ui/button';
import ParallaxLayer from '@/components/layout/ParallaxLayer';
import Glow from '@/components/ui/Glow';

export default function HeroSection() {
  // Simulated live data for dashboard preview
  const candidates = [
    { name: 'Jordan D.', role: 'Frontend Engineer', status: 'Interviewing', avatar: '/industry-icons/avatar1.png', pulse: true },
    { name: 'Alex L.', role: 'Product Designer', status: 'Shortlisted', avatar: '/industry-icons/avatar2.png', pulse: false },
    { name: 'Samira R.', role: 'AI Researcher', status: 'Offer Sent', avatar: '/industry-icons/avatar3.png', pulse: false },
  ];
  return (
    <Section id="hero" className="overflow-hidden min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#0f1123] via-[#1a1c2c] to-[#181b2e]">
      {/* Cinematic background composition */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-gradient-to-br from-[#7f5af0]/30 to-transparent blur-3xl opacity-60" />
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#00ffd0]/20 to-transparent blur-2xl opacity-40" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-radial from-[#7f5af0]/10 via-[#00ffd0]/5 to-transparent blur-[120px] opacity-70" />
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-10" />
      </div>
      <Container className="relative flex flex-col md:flex-row items-center justify-between gap-20 md:gap-0 pt-24 md:pt-0">
        {/* Left: Headline, subhead, CTA, scroll hint */}
        <div className="relative z-20 max-w-xl flex flex-col gap-10 md:gap-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-br from-[#7f5af0] via-[#00ffd0] to-[#ff6bcb] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(127,90,240,0.25)]"
            style={{ fontFamily: typography.fontFamily.display, lineHeight: typography.lineHeight.tight }}
          >
            <span className="block">AI Hiring,</span>
            <span className="block">Reimagined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-2xl text-white/80 font-medium"
            style={{ fontFamily: typography.fontFamily.body, lineHeight: typography.lineHeight.relaxed }}
          >
            Meet <span className="font-bold text-white">HireGPT</span> — the only hiring platform that feels like magic. Effortless, bias-free, and built for teams who care about people, not just resumes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex gap-4 mt-2"
          >
            <Glow>
              <Button className="relative group" aria-label="Get Started">
                <span className="relative z-10">Get Started</span>
                {/* Floating indicator */}
                <span className="absolute -right-4 -top-4 w-7 h-7 bg-[#ff6bcb] rounded-full blur-md opacity-60 animate-pulse group-hover:scale-110 transition-transform" />
              </Button>
            </Glow>
            <Button className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:text-black transition-all duration-200" aria-label="See Live Demo">
              See Live Demo
            </Button>
          </motion.div>
          {/* Scroll continuation hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="hidden md:flex flex-col items-center mt-8 select-none"
            aria-hidden="true"
          >
            <span className="text-white/60 text-xs mb-1">Scroll to explore</span>
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-[#7f5af0] via-[#00ffd0] to-[#ff6bcb] animate-bounce" />
          </motion.div>
        </div>
        {/* Right: Layered Product UI + Parallax + Glow + live data */}
        <div className="relative flex-1 flex items-center justify-center min-w-[320px] max-w-lg">
          {/* Parallax background glow */}
          <ParallaxLayer speed={0.12} className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full" style={{ background: gradients.glow, filter: 'blur(48px)', opacity: 0.7 }}>
            {/* Empty child for required prop */}
          </ParallaxLayer>
          {/* Glassmorphic dashboard UI block with live-data feel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-20 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#181b2e] via-[#23244a] to-[#1a1c2c] p-6 md:p-8"
            style={{ boxShadow: shadows.xl, borderRadius: radiuses.xl, backdropFilter: 'blur(24px)' }}
            tabIndex={0}
            aria-label="Product dashboard preview"
          >
            {/* Floating UI indicators */}
            <div className="absolute right-6 top-6 flex gap-2 z-30">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#00ffd0]/20 text-[#00ffd0] animate-pulse">Live</span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#7f5af0]/20 text-[#7f5af0]">AI Insights</span>
            </div>
            {/* Simulated dashboard UI with live-data feel */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#7f5af0]" />
                <span className="w-3 h-3 rounded-full bg-[#00ffd0]" />
                <span className="w-3 h-3 rounded-full bg-[#ff6bcb]" />
              </div>
              <div className="h-8 w-2/3 rounded-lg bg-white/10 mb-2 flex items-center px-3 text-white/80 text-sm font-semibold tracking-wide" style={{ letterSpacing: '0.02em' }}>
                <span className="animate-pulse">New applicant: Sofia G.</span>
                <span className="ml-auto text-[#00ffd0] text-xs font-bold">+1</span>
              </div>
              <div className="h-4 w-1/2 rounded bg-white/10 flex items-center px-2 text-xs text-white/60">
                <span>Pipeline updated 2m ago</span>
              </div>
              <div className="h-32 rounded-xl bg-gradient-to-br from-[#7f5af0]/30 to-[#00ffd0]/20 border border-white/10 shadow-inner flex flex-col justify-between p-4">
                {candidates.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full border-2 border-white/10 shadow" />
                    <span className="text-white/90 text-sm font-semibold">{c.name}</span>
                    <span className="text-xs text-white/60">{c.role}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${c.pulse ? 'bg-[#ff6bcb]/20 text-[#ff6bcb] animate-pulse' : 'bg-[#00ffd0]/10 text-[#00ffd0]'}`}>{c.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <div className="h-8 w-1/3 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/60">Scheduled</div>
                <div className="h-8 w-1/3 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/60">In Review</div>
                <div className="h-8 w-1/3 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/60">Hired</div>
              </div>
            </div>
            {/* Soft reflection/glass effect */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-white/20 to-transparent rounded-b-2xl blur-md opacity-30 pointer-events-none" />
          </motion.div>
          {/* Foreground parallax glass highlight */}
          <ParallaxLayer speed={-0.08} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[120px] rounded-3xl pointer-events-none" style={{ background: gradients.glass, filter: 'blur(16px)', opacity: 0.5, zIndex: 30 }}>
            {/* Empty child for required prop */}
          </ParallaxLayer>
        </div>
      </Container>
    </Section>
  );
}
