// Responsive max-width container with fluid padding and vertical rhythm
import { ReactNode } from 'react';

export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>
  );
}
