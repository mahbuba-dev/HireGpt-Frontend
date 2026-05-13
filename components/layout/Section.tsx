// Section wrapper with vertical spacing, optional background, and id
import { ReactNode } from 'react';

export default function Section({
  children,
  className = '',
  id,
  bg,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-28 ${bg ? bg : ''} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
