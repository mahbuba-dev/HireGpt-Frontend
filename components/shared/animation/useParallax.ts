// Custom hook for scroll-based parallax transforms
import { useEffect, useState } from 'react';

export function useParallax(multiplier = 0.2) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * multiplier);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [multiplier]);
  return offset;
}
