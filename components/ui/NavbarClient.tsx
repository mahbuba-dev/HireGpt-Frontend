"use client";
import React from "react";

type NavItem = { label: string; href: string };

interface NavbarClientProps {
  navItems: NavItem[];
  isLoggedIn: boolean;
  dashboardHref: string;
  role: string | null;
  userLabel: string | null;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ navItems, isLoggedIn, dashboardHref, role, userLabel }) => {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-6">
        <a href="/" className="text-xl font-bold text-fuchsia-400 tracking-tight">HireGPT</a>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-white/80 hover:text-fuchsia-400 transition text-sm font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <a href={dashboardHref} className="text-white/90 font-semibold px-3 py-1 rounded bg-fuchsia-500/80 hover:bg-fuchsia-600 transition">Dashboard</a>
            <span className="text-white/80 text-sm">{userLabel || 'User'}</span>
          </>
        ) : (
          <>
            <a href="/login" className="text-white/80 hover:text-fuchsia-400 transition text-sm font-medium px-2 py-1 rounded">Login</a>
            <a href="/register" className="text-fuchsia-400 hover:text-white transition text-sm font-medium px-2 py-1 rounded">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarClient;
