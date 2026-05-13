// Responsive utility for breakpoint-based rendering
import { ReactNode } from 'react';

export function ShowOn({ children, min = 0, max = 9999 }: { children: ReactNode; min?: number; max?: number }) {
  // Use CSS media queries in real app; here, just always render
  return <>{children}</>;
}

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
