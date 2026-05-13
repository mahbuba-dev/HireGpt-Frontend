import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  BriefcaseBusiness,
  BookOpen,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const toInsightSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const metadata = {
  title: "Insights | HireGPT",
  description:
    "Explore AI hiring trends, remote work insights, recruiting strategies, and modern career growth content from HireGPT.",
};

const insightCards = [
  {
    id: "insight-1",
    type: "AI Hiring",
    title: "How AI is changing recruiting workflows for modern startups",
    readTime: "6 min",
    icon: BrainCircuit,
  },
  {
    id: "insight-2",
    type: "Career",
    title: "Portfolio improvements that increase interview chances",
    readTime: "5 min",
    icon: TrendingUp,
  },
  {
    id: "insight-3",
    type: "Remote Work",
    title: "Why async remote teams are scaling faster in 2026",
    readTime: "7 min",
    icon: BriefcaseBusiness,
  },
  {
    id: "insight-4",
    type: "Playbook",
    title: "How startups hire developers without wasting weeks",
    readTime: "4 min",
    icon: Sparkles,
  },
  {
    id: "insight-5",
    type: "Resume Tips",
    title: "Small resume changes that improve recruiter attention",
    readTime: "5 min",
    icon: BookOpen,
  },
  {
    id: "insight-6",
    type: "Industry",
    title: "AI-powered job matching vs traditional hiring systems",
    readTime: "6 min",
    icon: BrainCircuit,
  },
  {
    id: "insight-7",
    type: "Frontend",
    title: "What recruiters expect from React developer portfolios",
    readTime: "5 min",
    icon: TrendingUp,
  },
  {
    id: "insight-8",
    type: "Hiring",
    title: "Why modern teams prioritize skills over degrees",
    readTime: "4 min",
    icon: BriefcaseBusiness,
  },
];

export default function InsightsPage() {
  return (
    <main className="relative overflow-hidden pb-20 pt-6">
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* orbs */}
        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#640D5F]/25 blur-[140px]" />

        <div className="absolute right-[-10%] top-[5%] h-[450px] w-[450px] rounded-full bg-[#EB5B00]/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-[#FFCC00]/10 blur-[120px]" />

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#0B0B12]/80 p-6 backdrop-blur-3xl md:p-10">
          {/* glow */}
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#640D5F]/25 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#EB5B00]/20 blur-[120px]" />

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_40%)]" />
          </div>

          {/* top border */}
          <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

          <div className="relative z-10">
            {/* top section */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Badge className="mb-5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[#FFCC00] backdrop-blur-xl hover:bg-white/[0.08]">
                  <Sparkles className="mr-2 size-3.5" />
                  HireGPT Insights
                </Badge>

                <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  Modern hiring insights for
                  <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
                    {" "}
                    ambitious teams
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                  Explore AI hiring strategies, portfolio improvements,
                  recruiting trends, remote work insights, and modern career
                  growth content built for developers and recruiters.
                </p>
              </div>

              {/* buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00] px-6 text-sm font-semibold text-white shadow-lg shadow-[#EB5B00]/20 transition-all duration-300 hover:scale-[1.03]"
                >
                  Explore Jobs
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="/companies"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08]"
                >
                  Companies
                </Link>
              </div>
            </div>

            {/* cards */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {insightCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    href={`/insights/${toInsightSlug(
                      item.title
                    )}?type=${encodeURIComponent(
                      item.type
                    )}&read=${encodeURIComponent(item.readTime)}`}
                    className="group block"
                  >
                    <div className="relative h-full overflow-hidden rounded-[30px] border border-white/10 bg-[#111118]/90 p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#EB5B00]/30 hover:bg-[#151520]">
                      {/* glow */}
                      <div className="absolute inset-0">
                        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#EB5B00]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />

                        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#640D5F]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />
                      </div>

                      <div className="relative z-10 flex h-full flex-col">
                        {/* top */}
                        <div className="mb-5 flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] via-[#B12C00] to-[#EB5B00] shadow-lg shadow-[#EB5B00]/20">
                            <Icon className="size-5 text-white" />
                          </div>

                          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/60">
                            <Clock3 className="size-3" />
                            {item.readTime}
                          </div>
                        </div>

                        {/* type */}
                        <div className="inline-flex w-fit rounded-full border border-[#EB5B00]/20 bg-[#EB5B00]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFCC00]">
                          {item.type}
                        </div>

                        {/* title */}
                        <h3 className="mt-4 line-clamp-3 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#FFCC00]">
                          {item.title}
                        </h3>

                        {/* bottom */}
                        <div className="mt-auto pt-8">
                          <div className="inline-flex items-center text-sm font-semibold text-white/60 transition-all duration-300 group-hover:text-[#FFCC00]">
                            Read article

                            <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* bottom note */}
            <div className="mt-8 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Sparkles className="size-4 text-[#FFCC00]" />
                New AI hiring insights and recruiting trends are added weekly.
              </div>

              <Link
                href="/register"
                className="inline-flex items-center text-sm font-semibold text-[#FFCC00] transition-all duration-300 hover:text-white"
              >
                Join HireGPT

                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}