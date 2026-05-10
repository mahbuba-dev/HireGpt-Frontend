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
    <main className="relative overflow-hidden px-4 pb-16 pt-6 md:px-6">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,190,130,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,150,100,0.08),transparent_30%)]"
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#050505]/90 p-5 shadow-[0_30px_100px_-50px_rgba(255,180,120,0.20)] backdrop-blur-2xl md:p-7 lg:p-8">
        
        {/* Glow */}
        <div className="absolute right-0 top-0 h-72 w-72 bg-orange-200/10 blur-3xl" />

        {/* TOP */}
        <div className="relative z-10 mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          
          <div className="max-w-3xl">
            <Badge className="mb-4 border-white/10 bg-white/5 px-3 py-1 text-white hover:bg-white/5">
              <Sparkles className="mr-1 size-3 text-orange-200" />
              HireGPT Insights
            </Badge>

            <h1 className="max-w-2xl text-xl font-black leading-tight tracking-tight text-white md:text-2xl lg:text-2xl">
              Modern hiring insights
              <span className="bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 bg-clip-text text-transparent">
                {" "}
                for ambitious teams
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-[15px]">
              Explore AI hiring strategies, portfolio tips,
              recruiting trends, and modern career insights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-300 px-5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Jobs
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/companies"
              className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Companies
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {insightCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={`/insights/${toInsightSlug(item.title)}?type=${encodeURIComponent(item.type)}&read=${encodeURIComponent(item.readTime)}`}
                className="group block"
              >
                <Card className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-orange-100/20 hover:bg-white/[0.05]">
                  
                  {/* Glow */}
                  <div className="absolute right-0 top-0 h-24 w-24 bg-orange-100/5 blur-3xl transition-all duration-500 group-hover:scale-125" />

                  <CardContent className="text-sm relative z-10 flex h-full flex-col justify-between p-4">
                    
                    {/* TOP */}
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <Icon className="size-4 text-orange-100" />
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] text-white/40">
                          <Clock3 className="size-3" />
                          {item.readTime}
                        </span>
                      </div>

                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-orange-100">
                        {item.type}
                      </span>

                      <h2 className="mt-3 line-clamp-3 text-base font-bold leading-snug text-white">
                        {item.title}
                      </h2>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 transition-all duration-300 group-hover:text-orange-100">
                      Read article
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM */}
        <div className="relative z-10 mt-6 flex flex-col gap-2 rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/50 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-orange-100" />
            New AI hiring insights and recruiting trends are added weekly.
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 font-semibold text-orange-100 transition hover:text-orange-200"
          >
            Join HireGPT
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}