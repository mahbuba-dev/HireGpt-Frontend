// Sticky/floating nav with accessibility and reduced motion support
import { useEffect, useState } from 'react';
import { useReducedMotion } from '../shared/animation/useReducedMotion';

export default function StickyNav({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[#181b2e]/80 shadow-lg border-b border-white/10' : 'bg-transparent'} ${className}`}
      aria-label="Main navigation"
      style={reducedMotion ? { transition: 'none' } : {}}
    >
      {children}
    </nav>
  );
}
