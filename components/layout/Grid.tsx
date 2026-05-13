// Responsive grid layout for bento/feature sections
import { ReactNode } from 'react';

export default function Grid({
  children,
  cols = 3,
  gap = 'gap-8',
  className = '',
}: {
  children: ReactNode;
  cols?: number;
  gap?: string;
  className?: string;
}) {
  const colClass =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className={`grid ${colClass} ${gap} ${className}`}>{children}</div>
  );
}
