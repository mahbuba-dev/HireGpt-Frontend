"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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
// Remove old DropdownMenu imports; we'll use custom hover/focus dropdowns
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
    .slice(0, 1)
    .toUpperCase() || "C";

const NavbarClient = ({
  navItems,
  isLoggedIn,
  dashboardHref,
  role,
  userLabel,
}: NavbarClientProps) => {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname?.startsWith(href);
  };

  const isDarkMode = resolvedTheme === "dark";
  const themeLabel = isDarkMode ? "Light mode" : "Dark mode";

  // Define dropdown menu items for each section
  const discoverItems = navItems.filter((item) =>
    ["Industries", "Insights", "Testimonials", "Process", "About", "FAQ"].includes(item.label),
  );
  const jobSeekerItems = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "My Applications", href: "/applications" },
    { label: "Resume Tips", href: "/resources/resume-tips" },
    { label: "Saved Jobs", href: "/saved-jobs" },
    // Add more as needed
  ];
  const companyItems = [
    { label: "Post a Job", href: "/recruiter/dashboard/post-job" },
    { label: "Company Dashboard", href: "/recruiter/my-jobs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Browse Talent", href: "/talent" },
    // Add more as needed
  ];

  const isAdmin = role === "ADMIN";
  const isExpert = role === "EXPERT";
  const bookingHref = isAdmin
    ? "/admin/dashboard/bookings-management"
    : isExpert
    ? "/expert/dashboard/my-sessions"
    : "/dashboard/consultations";
  const bookingLabel = isAdmin
    ? "Bookings"
    : isExpert
    ? "My Sessions"
    : "My Bookings";

  const handleThemeToggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const button = e?.currentTarget;
    if (button) {
      // remove any prior burst, then trigger a fresh one
      const prev = button.querySelector(".theme-burst");
      if (prev) prev.remove();
      const burst = document.createElement("span");
      burst.className = "theme-burst";
      button.appendChild(burst);
      window.setTimeout(() => burst.remove(), 950);
    }
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80/90 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80"
    >
      <div className="mx-auto w-full max-w-360 px-2 py-1 md:px-4">
        <div className="relative z-110 flex items-center justify-between gap-2 rounded-xl border border-white/50 bg-white/90 px-2 py-1.5 shadow-md backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/80 overflow-visible">
          <div className="navbar-gradient-motion" aria-hidden="true" />
          <Link href="/" className="group flex items-center gap-3">
         
            <Image
              src="/logo/hiregpt-logo.png"
              alt="HireGPT"
              width={80}
              height={80}
              className="h-full w-full object-contain rounded-full"
            />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {/* Discover Dropdown */}
            <div className="relative group">
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all backdrop-blur bg-white/60 border border-slate-200/70 shadow hover:bg-white/80 focus:bg-white/90 dark:bg-slate-950/60 dark:border-white/10 dark:hover:bg-slate-900/80 dark:focus:bg-slate-900/90"
                tabIndex={0}
                type="button"
              >
                Discover
              </button>
              <div className="absolute left-0 top-full z-120 mt-2 hidden min-w-45 rounded-2xl border border-slate-200/70 bg-white/80 p-2 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/95 group-hover:block group-focus-within:block">
                {discoverItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Job Seekers Dropdown */}
            <div className="relative group">
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all backdrop-blur bg-white/60 border border-slate-200/70 shadow hover:bg-white/80 focus:bg-white/90 dark:bg-slate-950/60 dark:border-white/10 dark:hover:bg-slate-900/80 dark:focus:bg-slate-900/90"
                tabIndex={0}
                type="button"
              >
                For job seekers
              </button>
              <div className="absolute left-0 top-full z-120 mt-2 hidden min-w-45 rounded-2xl border border-slate-200/70 bg-white/80 p-2 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/95 group-hover:block group-focus-within:block">
                {jobSeekerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Companies Dropdown */}
            <div className="relative group">
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all backdrop-blur bg-white/60 border border-slate-200/70 shadow hover:bg-white/80 focus:bg-white/90 dark:bg-slate-950/60 dark:border-white/10 dark:hover:bg-slate-900/80 dark:focus:bg-slate-900/90"
                tabIndex={0}
                type="button"
              >
                For companies
              </button>
              <div className="absolute left-0 top-full z-120 mt-2 hidden min-w-45 rounded-2xl border border-slate-200/70 bg-white/80 p-2 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/95 group-hover:block group-focus-within:block">
                {companyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <div className="hidden w-64 xl:block">
              <HomeSearchBar />
            </div>
            <TooltipProvider delayDuration={300}>
              {/* Theme toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleThemeToggle}
                    aria-label="Toggle theme"
                    className="relative size-8 rounded-full border border-slate-200/80 bg-white/90 text-slate-600 backdrop-blur transition-transform duration-200 hover:scale-110 hover:bg-orange-50 hover:text-orange-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-300"
                  >
                    {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {themeLabel}
                </TooltipContent>
              </Tooltip>

              {isLoggedIn ? (
                <div className="relative group">
                  <button
                    className="h-9 rounded-full border border-slate-200/80 bg-white/80 px-2.5 text-slate-700 backdrop-blur hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-200 flex items-center"
                    tabIndex={0}
                    type="button"
                  >
                    <span className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-cyan-500 text-[11px] leading-none font-bold text-white">
                      {getInitials(userLabel)}
                    </span>
                    <span className="max-w-22 truncate text-xs font-semibold">{userLabel ?? "Profile"}</span>
                  </button>
                  <div className="absolute right-0 top-full z-120 mt-2 hidden w-56 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 shadow-xl dark:border-white/10 dark:bg-slate-950/95 group-hover:block group-focus-within:block">
                    <Link href={dashboardHref} className="flex items-center rounded-xl px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-200">
                      <LayoutDashboard className="mr-2 size-4" />
                      Dashboard
                    </Link>
                    <Link href={bookingHref} className="flex items-center rounded-xl px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-200">
                      <BriefcaseBusiness className="mr-2 size-4" />
                      {bookingLabel}
                    </Link>
                    <Link href="/my-profile" className="flex items-center rounded-xl px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-200">
                      <Settings className="mr-2 size-4" />
                      Settings
                    </Link>
                    <div className="p-0 focus:bg-transparent">
                      <LogoutButton className="inline-flex h-9 w-full items-center rounded-xl px-3 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30">
                        <LogOut className="mr-2 size-4" />
                        Logout
                      </LogoutButton>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-slate-200 bg-white/90 px-4 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Link href="/login" className="text-inherit">
                    <LogIn className="mr-1.5 size-3.5" />
                    Login
                  </Link>
                </Button>
              )}
            </TooltipProvider>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-slate-300 bg-white dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()} className="flex w-[88vw] flex-col overflow-y-auto border-slate-200/70 bg-background/95 sm:max-w-sm dark:border-white/10 dark:bg-slate-950/95">
                <SheetHeader className="px-4 pb-2">
                  <div className="rounded-2xl border border-slate-200/70 bg-linear-to-br from-blue-50 via-white to-cyan-50 p-4 text-left dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                    <div className="mb-3 flex items-center gap-3.5">
                      <div className="flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-blue-200/60 bg-linear-to-br from-white via-blue-50 to-cyan-50 p-1 shadow-[0_14px_34px_-20px_rgba(59,130,246,0.65)] ring-1 ring-white/80 dark:border-cyan-400/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:ring-white/10">
                        <Image
                          src="/logo-hiregpt.png"
                          alt="HireGPT"
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <SheetTitle className="text-lg font-semibold tracking-tight">HireGPT</SheetTitle>
                        <SheetDescription className="text-xs md:text-sm">
                          AI-powered hiring and job matching platform.
                        </SheetDescription>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleThemeToggle}
                        className="relative size-9 shrink-0 rounded-full border-slate-200 bg-white/90 text-slate-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200"
                        aria-label={themeLabel}
                      >
                        {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                      </Button>
                    </div>

                    {isLoggedIn ? (
                      <div className="rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950/70">
                        <p className="font-medium text-foreground">{userLabel ?? "HireGPT user"}</p>
                        {role ? <p className="text-xs uppercase tracking-wide text-muted-foreground">{role}</p> : null}
                      </div>
                    ) : null}
                  </div>
                </SheetHeader>

                {isLoggedIn ? (
                  <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm" className="w-full min-w-0 justify-center rounded-full px-2 text-xs dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                        <Link href={dashboardHref}>
                          <LayoutDashboard className="mr-1.5 size-3.5 shrink-0" />
                          <span className="truncate">Dashboard</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm" className="w-full min-w-0 justify-center rounded-full px-2 text-xs dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                        <Link href={bookingHref}>
                          <BriefcaseBusiness className="mr-1.5 size-3.5 shrink-0" />
                          <span className="truncate">{bookingLabel}</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm" className="w-full min-w-0 justify-center rounded-full px-2 text-xs dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                        <Link href="/my-profile">
                          <Settings className="mr-1.5 size-3.5 shrink-0" />
                          <span className="truncate">Settings</span>
                        </Link>
                      </Button>
                    </SheetClose>
                    <LogoutButton className="inline-flex h-8 w-full min-w-0 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-2 text-xs font-medium text-white transition-colors hover:from-blue-700 hover:to-cyan-600 disabled:opacity-60">
                      <LogOut className="mr-1.5 size-3.5 shrink-0" />
                      <span className="truncate">Logout</span>
                    </LogoutButton>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm" className="w-full rounded-full text-xs dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                        <Link href="/login">
                          <LogIn className="mr-1.5 size-3.5" />
                          Login
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild size="sm" className="w-full rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-xs hover:from-blue-700 hover:to-cyan-600">
                        <Link href="/register">
                          Sign up
                          <ArrowRight className="ml-1.5 size-3.5" />
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" size="sm" className="col-span-2 w-full rounded-full text-xs dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100">
                        <Link href="/apply-job">Apply Job</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}

                <div className="px-4 pb-3">
                  <HomeSearchBar variant="mobile" />
                </div>

                <div className="flex flex-1 flex-col gap-2 px-4 pb-6">
                  {navItems.map((item) => {
                    const isActive = isActiveRoute(item.href);

                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200"
                              : "border-border/60 text-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-200"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;
