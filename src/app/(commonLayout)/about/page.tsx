import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarCheck,
  Globe2,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About Us | ConsultEdge",
  description:
    "Learn how ConsultEdge connects forward-thinking teams with verified expert consultants through an AI-powered, end-to-end consultation platform.",
};

const stats = [
  { label: "Verified experts", value: "500+" },
  { label: "Sessions completed", value: "12,000+" },
  { label: "Industries covered", value: "40+" },
  { label: "Countries served", value: "60+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust first",
    description:
      "Every expert is manually reviewed and verified before joining the platform. Credentials, track records, and client outcomes are all scrutinized.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Speed without sacrifice",
    description:
      "From discovering an expert to booking a confirmed session, we've removed every friction point. Most bookings complete in under 3 minutes.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent by default",
    description:
      "Our AI engine personalises every search, recommendation, and suggestion — so you always see the most relevant experts first.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Globe2,
    title: "Global reach, local insight",
    description:
      "ConsultEdge connects clients and experts across 60+ countries, with deep expertise in regional markets and global industries.",
    color: "from-emerald-500 to-teal-500",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Founded",
    description: "ConsultEdge was created to solve one problem: making expert advice accessible to every team.",
  },
  {
    year: "2023",
    title: "AI-powered search",
    description: "We launched personalised AI search, surfacing the right expert for each unique query.",
  },
  {
    year: "2024",
    title: "500 verified experts",
    description: "Our expert network reached 500 vetted specialists spanning 40+ industries globally.",
  },
  {
    year: "2025",
    title: "RAG intelligence",
    description: "Retrieval-augmented AI introduced, grounding every chat response in real platform data.",
  },
  {
    year: "2026",
    title: "Enterprise ready",
    description: "Team plans, multi-seat dashboards, and enterprise SLAs — serving organisations of every size.",
  },
];

const aiFeatures = [
  {
    icon: Bot,
    title: "AI chat assistant",
    description: "Ask anything about bookings, experts, payments, or process. Answers grounded in real platform data via RAG.",
  },
  {
    icon: Sparkles,
    title: "Personalised recommendations",
    description: "Your activity shapes a unique feed of experts and topics — the more you explore, the smarter it gets.",
  },
  {
    icon: Target,
    title: "Smart search",
    description: "Semantic search understands intent, not just keywords — finding experts you'd never have thought to search for.",
  },
  {
    icon: LineChart,
    title: "Trending analysis",
    description: "Platform-wide activity signals surface trending experts and emerging industries in real time.",
  },
 
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former McKinsey partner with 14 years in strategy consulting. Built ConsultEdge to give every team access to senior-level guidance.",
    initials: "SC",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    name: "Marcus Reid",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer and AI researcher. Designed the personalization engine and RAG architecture powering ConsultEdge's intelligence layer.",
    initials: "MR",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    name: "Priya Nair",
    role: "Head of Expert Success",
    bio: "Spent 8 years building expert networks at top advisory firms. Oversees every expert's onboarding, verification, and ongoing quality.",
    initials: "PN",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    name: "Daniel Torres",
    role: "VP Product",
    bio: "Product leader with a background in marketplace platforms. Drives ConsultEdge's end-to-end booking and discovery experience.",
    initials: "DT",
    accent: "from-orange-500 to-amber-500",
  },
];

export default function AboutPage() {
  return (
 <main className="relative overflow-hidden pb-20 pt-4">
  {/* PREMIUM BACKGROUND */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    {/* glow orbs */}
    <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#640D5F]/25 blur-[150px]" />

    <div className="absolute right-[-10%] top-[10%] h-[480px] w-[480px] rounded-full bg-[#EB5B00]/20 blur-[140px]" />

    <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-[#FFCC00]/10 blur-[130px]" />

    {/* grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-[0.04]" />
  </div>

  <div className="mx-auto max-w-7xl space-y-24 px-4 md:px-6">

    {/* ───────────────── HERO ───────────────── */}
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] px-8 py-16 backdrop-blur-3xl md:px-14 md:py-20">

      {/* glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#640D5F]/30 blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#EB5B00]/20 blur-[100px]" />

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* top line */}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

      <div className="relative mx-auto max-w-4xl text-center">

        <Badge className="mb-5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[#FFCC00] backdrop-blur-xl hover:bg-white/[0.08]">
          <Sparkles className="mr-2 size-3.5" />
          About HireGPT
        </Badge>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
          Building the Future of
          <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
            {" "}
            AI Recruitment
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
          HireGPT helps modern companies discover, evaluate, and hire top talent faster using intelligent AI-powered recruitment workflows.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Button
            asChild
            className="h-11 rounded-2xl bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00] px-6 text-sm font-semibold text-white shadow-lg shadow-[#EB5B00]/20 transition-all duration-300 hover:scale-[1.03]"
          >
            <Link href="/jobs">
              Explore Jobs
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-6 text-sm text-white backdrop-blur-xl hover:bg-white/[0.08]"
          >
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>





    {/* ───────────────── STATS ───────────────── */}
    <section>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06]"
          >

            <div className="absolute inset-0">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#EB5B00]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />
            </div>

            <div className="relative z-10 text-center">

              <h3 className="text-3xl font-black text-white md:text-4xl">
                {stat.value}
              </h3>

              <p className="mt-2 text-sm text-white/50">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>





    {/* ───────────────── MISSION SECTION ───────────────── */}
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0B0B12]/70 p-8 backdrop-blur-3xl md:p-14">

      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-0 h-[320px] w-[320px] rounded-full bg-[#640D5F]/25 blur-[120px]" />

        <div className="absolute bottom-0 right-[-10%] h-[320px] w-[320px] rounded-full bg-[#EB5B00]/20 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      {/* top line */}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

        {/* LEFT */}
        <div>

          <Badge className="mb-5 rounded-full border border-[#EB5B00]/20 bg-[#EB5B00]/10 px-4 py-1.5 text-[#FFCC00] backdrop-blur-xl">
            <Target className="mr-2 size-3.5" />
            Our Mission
          </Badge>

          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Reinventing
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
              {" "}
              AI-powered hiring
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
            HireGPT combines semantic intelligence, automation, and premium UX
            to create a modern recruitment experience for both recruiters and candidates.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
            From resume intelligence to smart matching and recruiter analytics,
            every workflow is designed to reduce friction and accelerate hiring.
          </p>

          {/* FEATURE POINTS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] via-[#B12C00] to-[#EB5B00] shadow-lg shadow-[#EB5B00]/20">
                <BrainCircuit className="size-5 text-white" />
              </div>

              <h4 className="text-base font-bold text-white">
                Intelligent Matching
              </h4>

              <p className="mt-2 text-sm leading-7 text-white/55">
                AI-driven semantic matching between recruiters and top talent.
              </p>
            </div>

            <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EB5B00] to-[#FFCC00] shadow-lg shadow-[#FFCC00]/10">
                <Zap className="size-5 text-white" />
              </div>

              <h4 className="text-base font-bold text-white">
                Faster Hiring
              </h4>

              <p className="mt-2 text-sm leading-7 text-white/55">
                Automated workflows reduce delays and streamline recruitment.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl">

            {/* glow */}
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[#640D5F]/20 blur-3xl" />

              <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#EB5B00]/20 blur-3xl" />
            </div>

            <div className="relative z-10 space-y-5">

              {/* main stat */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      AI Match Accuracy
                    </p>

                    <h3 className="mt-2 text-4xl font-black text-white">
                      98%
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] via-[#B12C00] to-[#EB5B00] shadow-lg shadow-[#EB5B00]/20">
                    <LineChart className="size-6 text-white" />
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />
                </div>
              </div>

              {/* mini stats */}
              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <Users className="mb-3 size-5 text-[#FFCC00]" />

                  <h4 className="text-3xl font-black text-white">
                    12k+
                  </h4>

                  <p className="mt-1 text-xs text-white/50">
                    Active Candidates
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  <Layers className="mb-3 size-5 text-[#FFCC00]" />

                  <h4 className="text-3xl font-black text-white">
                    5k+
                  </h4>

                  <p className="mt-1 text-xs text-white/50">
                    Open Positions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>





    {/* ───────────────── AI FEATURES ───────────────── */}
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0B0B12]/70 p-8 backdrop-blur-3xl md:p-12">

      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#640D5F]/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#EB5B00]/15 blur-[120px]" />
      </div>

      <div className="relative z-10">

        {/* heading */}
        <div className="mb-14 text-center">

          <Badge className="mb-5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[#FFCC00] backdrop-blur-xl">
            <BrainCircuit className="mr-2 size-3.5" />
            AI Features
          </Badge>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Intelligence embedded into
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
              {" "}
              every workflow
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55">
            Advanced AI tools helping recruiters hire faster and candidates discover better opportunities.
          </p>
        </div>

        {/* 4 cards row */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {aiFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#EB5B00]/20 hover:bg-white/[0.06]"
              >

                {/* glow */}
                <div className="absolute inset-0">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#EB5B00]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />
                </div>

                <div className="relative z-10">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] via-[#B12C00] to-[#EB5B00] shadow-lg shadow-[#EB5B00]/20">
                    <Icon className="size-5 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  </div>
</main>
  );
}
