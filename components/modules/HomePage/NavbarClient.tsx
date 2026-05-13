"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import LogoutButton from "@/components/modules/auth/LogoutButton";
import HomeSearchBar from "@/components/modules/HomePage/search/HomeSearchBar";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarClientProps {
  navItems: NavItem[];
  isLoggedIn: boolean;
  dashboardHref: string;
  role?: string | null;
  userLabel?: string | null;
}

const getInitials = (value?: string | null) =>
  value
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "HG";

const NavbarClient = ({
  navItems,
  isLoggedIn,
  dashboardHref,
  role,
  userLabel,
}: NavbarClientProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname?.startsWith(href);
  };

  const discoverItems = navItems.filter((item) =>
    ["Industries", "Insights", "Testimonials", "Process", "About", "FAQ"].includes(
      item.label
    )
  );

  const jobSeekerItems = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Saved Jobs", href: "/saved-jobs" },
    { label: "Applications", href: "/applications" },
    { label: "Resume Tips", href: "/resources/resume-tips" },
  ];

  const companyItems = [
    { label: "Post a Job", href: "/recruiter/dashboard/post-job" },
    { label: "Browse Talent", href: "/talent" },
    { label: "Pricing", href: "/pricing" },
    { label: "Recruiter Dashboard", href: "/recruiter/my-jobs" },
  ];

  const navGroups = [
    { label: "Discover", items: discoverItems },
    { label: "Job Seekers", items: jobSeekerItems },
    { label: "Companies", items: companyItems },
  ];

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-3">
            <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-400 to-orange-500">
              HireGPT
            </h2>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            {navGroups.map((group) => (
              <div key={group.label} className="relative group">

                <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted transition">
                  {group.label}
                  <ChevronDown className="size-4 transition group-hover:rotate-180" />
                </button>

                {/* DROPDOWN */}
                <div className="
                  invisible absolute left-0 top-[120%] w-64
                  rounded-2xl border border-white/10
                  bg-gradient-to-br from-[#EB5B00]/80 via-[#640D5F]/70 to-[#181b2e]/90
                  p-2 opacity-0 shadow-2xl backdrop-blur-2xl
                  transition-all duration-300
                  group-hover:visible group-hover:opacity-100
                ">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center justify-between
                        rounded-xl px-3 py-2
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          isActiveRoute(item.href)
                            ? "bg-white/20 text-white shadow-lg"
                            : "text-white/80 hover:bg-gradient-to-r hover:from-[#EB5B00]/40 hover:to-[#640D5F]/40 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                      <ArrowRight className="size-4 opacity-80" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-3">

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" onClick={toggleTheme}>
                  {mounted ? (isDarkMode ? <Sun /> : <Moon />) : null}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDarkMode ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>

            {/* AUTH */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </Button>

                <LogoutButton>
                  <LogOut className="size-4" />
                </LogoutButton>
              </div>
            ) : (
              <Button asChild variant="ghost">
                <Link href="/login">
                  <LogIn className="mr-2 size-4" />
                  Login
                </Link>
              </Button>
            )}
          </TooltipProvider>
        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden items-center gap-2">
          <Button size="icon" variant="outline" onClick={toggleTheme}>
            {mounted ? (isDarkMode ? <Sun /> : <Moon />) : null}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>HireGPT</SheetTitle>
                <SheetDescription>
                  AI-powered recruitment platform
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <HomeSearchBar variant="mobile" />
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};

export default NavbarClient;