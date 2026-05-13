// Parallax layer for scroll-based depth and motion
import { ReactNode } from 'react';
import { useParallax } from '../shared/animation/useParallax';

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({
  children,
  speed = 0.2,
  className = '',
  style = {},
}: ParallaxLayerProps) {
  const offset = useParallax(speed);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}