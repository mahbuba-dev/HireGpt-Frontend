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
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

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
  { label: "Register as Candidate", href: "/register" },
  { label: "Login", href: "/login" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Help & Support", href: "/help" },
];

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/company/consultedge-global-/" },
  { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/ConsultEdgeGlb/" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/cegglobal/" },
  { name: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/@ConsultEdge.Global" },
];


const trustSignals = [
  { label: "Verified recruiters", icon: ShieldCheck },
  { label: "Secure job applications", icon: CalendarRange },
  { label: "Candidate-first experience", icon: Users },
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
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200 section-spacing">
      <style>{`
        .footer-fade-up {
          transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .footer-social-anim {
          transition: transform 0.2s ease-out, box-shadow 0.2s, border-color 0.2s;
        }
        .footer-social-anim:hover {
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 0 0 4px rgba(34,211,238,0.25);
          border-color: #06b6d4;
        }
        .footer-ink-link {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }
        .footer-ink-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0.5px;
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%);
          opacity: 0.8;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease-out;
        }
        .footer-ink-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <div ref={footerRef} className="page-container">
        {/* CTA SECTION */}
        <div className="glass-card relative overflow-hidden section-spacing p-6 md:p-8 lg:p-10">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">

              <Badge className="border-white/15 bg-white/10 text-white premium-card">
                <Gem className="mr-1 size-3.5" />
                Ready to get hired or hire?
              </Badge>

              <div>
                <h2 className="h2 text-white">
                  Find your next job or top talent with HireGPT.
                </h2>
                <p className="max-w-2xl text-base muted">
                  Discover AI-matched jobs and recruiters, apply with confidence, and let HireGPT power your career journey.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {trustSignals.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-100"
                    >
                      <Icon className="size-3.5 text-cyan-200" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">

              <Button asChild className="h-11 w-full rounded-full bg-white px-5 text-slate-900 hover:bg-white/90 sm:w-44">
                <Link href="/jobs">
                  Browse jobs <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>

              <Button asChild className="h-11 w-full rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400 px-5 text-white shadow-lg shadow-cyan-500/30 transition-all hover:from-blue-700 hover:via-cyan-600 hover:to-teal-500 hover:shadow-xl hover:shadow-cyan-500/40 sm:w-44">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="page-container mt-2 grid w-full items-start gap-10 section-padding md:grid-cols-[1.1fr_0.65fr_0.65fr_0.65fr_1fr]">

        {/* BRAND */}
        <div className="space-y-5 pl-0">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-cyan-600 to-sky-500 text-white">
              <Gem className="size-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">HireGPT</p>
              <p className="text-xs text-slate-400">AI-powered hiring & job search</p>
            </div>
          </Link>


          <p className="text-base muted">
            The modern AI platform connecting candidates and recruiters for smarter hiring and career growth.
          </p>

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
                  className="footer-social-anim flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* QUICK LINKS (FIXED ALIGNMENT) */}
        <div>
          <h3 className="mb-4 h4 uppercase tracking-[0.2em] muted">
            Quick links
          </h3>

          <div className="flex flex-col gap-3 text-base">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-ink-link text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* PLATFORM (FIXED ALIGNMENT) */}
        <div>
          <h3 className="mb-4 h4 uppercase tracking-[0.2em] muted">
            Platform
          </h3>

          <div className="flex flex-col gap-3 text-base">
            {platformLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-ink-link text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="mb-4 h4 uppercase tracking-[0.2em] muted">
            Legal
          </h3>

          <div className="flex flex-col gap-3 text-base">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-ink-link text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-4 h4 uppercase tracking-[0.2em] muted">
            Contact
          </h3>
          <div className="space-y-4 text-base muted">
          <div className="flex items-center gap-2">
            <Mail className="size-4 shrink-0" />
            support@hiregpt.ai
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0" />
            +1 (555) 123-4567
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            Global AI-powered hiring support
          </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="page-container flex flex-col items-center justify-between gap-2 py-4 text-base muted md:flex-row">
          <p>© {new Date().getFullYear()} HireGPT</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/help" className="hover:text-white">Help</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}