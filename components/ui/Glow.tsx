// Cursor-aware glow/lighting effect for cards, buttons, or sections
import { ReactNode, useRef, useState } from 'react';

interface GlowProps {
  children?: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export default function Glow({
  children,
  className = '',
  size = 160,
  color = 'from-[#7f5af0]/40 via-[#00ffd0]/20 to-transparent',
}: GlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    show: false,
  });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  }

  function handleLeave() {
    setPos((g) => ({
      ...g,
      show: false,
    }));
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {pos.show && (
        <span
          className="pointer-events-none absolute transition-opacity duration-200"
          style={{
            left: pos.x - size / 2,
            top: pos.y - size / 2,
            width: size,
            height: size,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, #7f5af0 0%, #00ffd0 60%, transparent 100%)',
            opacity: 0.4,
            filter: 'blur(32px)',
            zIndex: 20,
          }}
        />
      )}

      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
}