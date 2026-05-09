"use client";

import { usePathname } from "next/navigation";

type RouteTransitionProps = {
  children: React.ReactNode;
};

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="hiregpt-route-enter">
      {children}
    </div>
  );
}
