import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

interface AuthShellHighlight {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface AuthShellProps {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  highlights?: AuthShellHighlight[];
  children: React.ReactNode;
}

export default function AuthShell({
  eyebrow,
  titleLead,
  titleAccent,
  description,
  highlights,
  children,
  colorMode = "orange",
}: AuthShellProps & { colorMode?: "orange" | "blue" }) {
  // Orange/amber gradient for HireGPT
  const gradientBg =
    colorMode === "orange"
      ? "pointer-events-none absolute inset-x-0 top-0 -z-10 h-176 bg-[radial-gradient(circle_at_15%_15%,rgba(255,180,120,0.18),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(255,140,80,0.13),transparent_45%),radial-gradient(circle_at_50%_95%,rgba(255,200,120,0.10),transparent_50%)]"
      : "pointer-events-none absolute inset-x-0 top-0 -z-10 h-176 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.22),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_50%_95%,rgba(16,185,129,0.14),transparent_50%)]";
  const glassGlow =
    colorMode === "orange"
      ? "pointer-events-none absolute -inset-2 -z-10 rounded-[2.25rem] bg-gradient-to-br from-orange-200/30 via-orange-100/25 to-amber-100/15 opacity-80 blur-2xl"
      : "pointer-events-none absolute -inset-2 -z-10 rounded-[2.25rem] bg-linear-to-br from-blue-500/30 via-cyan-400/25 to-emerald-400/15 opacity-80 blur-2xl";
  const accentText =
    colorMode === "orange"
      ? "block bg-gradient-to-r from-orange-200 via-orange-300 to-amber-200 bg-clip-text text-transparent"
      : "block bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent";

  return (
    <div className="relative isolate min-h-[80vh] py-8 md:py-12">
      {/* Decorative gradient layers */}
      <div aria-hidden className={gradientBg} />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-24 -z-10 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl dark:bg-orange-300/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-72 -z-10 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-300/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_75%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Left: brand panel (desktop only) */}
        <div className="hidden flex-col gap-8 lg:flex">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-medium text-orange-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-orange-200">
              <Sparkles className="size-3.5" />
              {eyebrow}
            </div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              {titleLead}
              <span className={accentText}>{titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-md text-orange-100/80">{description}</p>
          </div>
        </div>

        {/* Right: glass form card */}
        <div className="relative">
          {/* Glow halo */}
          <div aria-hidden className={glassGlow} />
          {/* Subtle border ring behind card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 rounded-[1.65rem] bg-linear-to-br from-white/60 via-white/20 to-white/0 dark:from-white/15 dark:via-white/5 dark:to-transparent"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
