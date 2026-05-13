"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  CalendarRange,
  Gem,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const platformLinks = [
  { label: "Post a Job", href: "/recruiter/post-job" },
  { label: "Register", href: "/register" },
  { label: "Login", href: "/login" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Help Center", href: "/help" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "#",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "#",
  },
];

const trustSignals = [
  {
    label: "Verified recruiters",
    icon: ShieldCheck,
  },
  {
    label: "Secure applications",
    icon: CalendarRange,
  },
  {
    label: "Candidate-first platform",
    icon: Users,
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;

    if (!el) return;

    el.classList.add("opacity-0", "translate-y-8");

    const onScroll = () => {
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight - 80) {
        el.classList.add("footer-fade-up");

        el.classList.remove("opacity-0", "translate-y-8");

        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);

    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative">
      {/* PREMIUM BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(100,13,95,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,91,0,0.14),transparent_30%)]" />

        {/* Glow */}
        <div className="absolute left-1/2 top-0  -translate-x-1/2 rounded-full bg-[#640D5F]/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#EB5B00]/10 blur-[120px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.04]" />

        {/* Noise */}
        <div className="absolute inset-0 bg-[url('/ambient/noise.png')] opacity-[0.03]" />
      </div>

      <style>{`
        .footer-fade-up {
          transition:
            opacity 0.5s cubic-bezier(.4,0,.2,1),
            transform 0.5s cubic-bezier(.4,0,.2,1);

          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .footer-social-anim {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .footer-social-anim:hover {
          transform: translateY(-4px);

          border-color: rgba(255,204,0,0.25);

          background: rgba(255,255,255,0.08);

          box-shadow:
            0 10px 30px rgba(235,91,0,0.15),
            0 0 0 4px rgba(255,204,0,0.05);
        }

        .footer-ink-link {
          position: relative;
          width: fit-content;
          transition: color 0.3s ease;
        }

        .footer-ink-link::after {
          content: "";

          position: absolute;
          left: 0;
          bottom: -3px;

          height: 1.5px;
          width: 100%;

          transform: scaleX(0);
          transform-origin: left;

          transition: transform 0.3s ease;

          background: linear-gradient(
            90deg,
            #FFCC00,
            #EB5B00
          );
        }

        .footer-ink-link:hover::after {
          transform: scaleX(1);
        }

        .glass-footer-card {
          background: rgba(255,255,255,0.04);

          backdrop-filter: blur(24px);

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 10px 40px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
      `}</style>

      <div ref={footerRef} className="relative z-10">
        {/* CTA SECTION */}
        <div className="page-container pt-10">
          <div className="glass-footer-card relative overflow-hidden rounded-[32px] p-6 md:p-8 lg:p-10">
            {/* Glow */}
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#EB5B00]/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT */}
              <div className="space-y-5">
                <Badge className="border-white/10 bg-white/[0.06] text-white backdrop-blur-xl">
                  <Sparkles className="mr-1 size-3.5 text-[#FFCC00]" />
                  AI-Powered Recruitment Platform
                </Badge>

                <div>
                  <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  Find top talent or discover your next career opportunity with 
                    <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#B12C00] bg-clip-text text-transparent">
                      {" "}
                    HireGPT.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                    Discover AI-powered recruitment workflows, premium
                    candidate experiences, and modern hiring tools built for
                    recruiters and job seekers.
                  </p>
                </div>

                {/* TRUST */}
                <div className="flex flex-wrap gap-2">
                  {trustSignals.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70 backdrop-blur-xl"
                      >
                        <Icon className="size-3.5 text-[#FFCC00]" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-full bg-white px-6 text-black transition-all hover:scale-[1.02] hover:bg-white/90"
                >
                  <Link href="/jobs">
                    Browse Jobs
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  className="h-11 rounded-full border border-white/10 bg-white/[0.05] px-6 text-white backdrop-blur-xl transition-all hover:bg-white/[0.08]"
                >
                  <Link href="/recruiter/post-job">
                    Post a Job
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="page-container grid gap-5 pt-15 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_1fr]">
          {/* BRAND */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
                <Gem className="size-5 text-[#FFCC00]" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  HireGPT
                </h3>

                <p className="text-xs text-white/50">
                  AI Recruitment Platform
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              HireGPT helps recruiters and candidates connect faster through
              intelligent AI-powered hiring workflows and premium recruitment
              experiences.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;

                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="footer-social-anim flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-ink-link text-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Platform
            </h3>

            <div className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-ink-link text-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Legal
            </h3>

            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-ink-link text-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-[#FFCC00]" />
                support@hiregpt.ai
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[#FFCC00]" />
                +1 (555) 123-4567
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-[#FFCC00]" />
                Global AI-powered hiring support
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        
          <div className="page-container flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/40 md:flex-row">
            <p>
              © {new Date().getFullYear()} HireGPT. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about" className="hover:text-white">
                About
              </Link>

              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>

              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>

              <Link href="/help" className="hover:text-white">
                Help
              </Link>

              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        
      </div>
    </footer>
  );
}