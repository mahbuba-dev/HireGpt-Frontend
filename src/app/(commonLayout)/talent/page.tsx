"use client";

import {
  getAllCandidates,
  ICandidate,
} from "@/src/services/candidate.service";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Sparkles,
  Users,
  BrainCircuit,
} from "lucide-react";

export default function TalentPage() {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getAllCandidates();

        setCandidates(res.data || []);
      } catch (err: any) {
        setError("Failed to load talent profiles.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="relative overflow-hidden pb-20 pt-6">
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* glow orbs */}
        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#640D5F]/25 blur-[140px]" />

        <div className="absolute right-[-10%] top-[10%] h-[460px] w-[460px] rounded-full bg-[#EB5B00]/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-[#FFCC00]/10 blur-[120px]" />

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#0B0B12]/85 p-6 backdrop-blur-3xl md:p-10">
          {/* glow */}
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#640D5F]/25 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#EB5B00]/20 blur-[120px]" />

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_40%)]" />
          </div>

          {/* top line */}
          <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#640D5F] via-[#EB5B00] to-[#FFCC00]" />

          <div className="relative z-10">
            {/* TOP */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold text-[#FFCC00] backdrop-blur-xl">
                  <Sparkles className="size-3.5" />
                  Premium Talent Network
                </div>

                <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  Discover world-class
                  <span className="bg-gradient-to-r from-[#FFCC00] via-[#EB5B00] to-[#640D5F] bg-clip-text text-transparent">
                    {" "}
                    AI-ready talent
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                  Explore premium candidate profiles, verified technical
                  expertise, and modern professionals ready to join innovative
                  companies.
                </p>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 gap-4 lg:w-[320px]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
                  <Users className="mb-3 size-5 text-[#FFCC00]" />

                  <h3 className="text-2xl font-black text-white">
                    {candidates.length}+
                  </h3>

                  <p className="text-xs text-white/50">
                    Active Candidates
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
                  <BrainCircuit className="mb-3 size-5 text-[#FFCC00]" />

                  <h3 className="text-2xl font-black text-white">
                    AI Matched
                  </h3>

                  <p className="text-xs text-white/50">
                    Smart Recommendations
                  </p>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading ? (
              <div className="mt-14 flex items-center justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#EB5B00] border-t-transparent" />
              </div>
            ) : candidates.length > 0 ? (
              <>
                {/* GRID */}
                <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111118]/90 p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#EB5B00]/30 hover:bg-[#151520]"
                    >
                      {/* glow */}
                      <div className="absolute inset-0">
                        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#EB5B00]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />

                        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#640D5F]/10 blur-3xl transition-all duration-500 group-hover:scale-125" />
                      </div>

                      <div className="relative z-10 flex h-full flex-col">
                        {/* PROFILE */}
                        <div className="mb-5 flex items-start justify-between">
                          <div className="relative">
                            <img
                              src={
                                candidate.profilePhoto ||
                                candidate.user?.image ||
                                "/industry-icons/engineer.svg"
                              }
                              alt={candidate.fullName}
                              className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                            />

                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#111118] bg-green-400" />
                          </div>

                          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/60">
                            <MapPin className="size-3" />
                            Remote
                          </div>
                        </div>

                        {/* INFO */}
                        <div>
                          <h2
                            className="line-clamp-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FFCC00]"
                            title={candidate.fullName}
                          >
                            {candidate.fullName}
                          </h2>

                          <p className="mt-1 line-clamp-1 text-sm font-medium text-[#FFCC00]">
                            {candidate.headline ||
                              candidate.user?.role ||
                              "Professional"}
                          </p>

                          <p
                            className="mt-2 line-clamp-1 text-xs text-white/45"
                            title={candidate.email}
                          >
                            {candidate.email}
                          </p>
                        </div>

                        {/* SKILLS */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {candidate.skills &&
                          candidate.skills.length > 0 ? (
                            candidate.skills
                              .slice(0, 4)
                              .map((skill) => (
                                <div
                                  key={skill}
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/70"
                                >
                                  {skill}
                                </div>
                              ))
                          ) : (
                            <span className="text-xs italic text-white/30">
                              No skills listed
                            </span>
                          )}
                        </div>

                        {/* footer */}
                        <div className="mt-auto pt-7">
                          <Link
                            href={`/talent/${candidate.id}`}
                            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#640D5F] via-[#B12C00] to-[#EB5B00] px-5 text-sm font-semibold text-white shadow-lg shadow-[#EB5B00]/20 transition-all duration-300 hover:scale-[1.02]"
                          >
                            View Profile

                            <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-12 flex justify-center">
                  <Link
                    href="mailto:talent@yourdomain.com?subject=Hire%20Top%20Talent%20Inquiry"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#EB5B00]/30 hover:bg-white/[0.08]"
                  >
                    <BriefcaseBusiness className="mr-2 size-4 text-[#FFCC00]" />
                    Hire Top Talent
                  </Link>
                </div>
              </>
            ) : (
              <div className="py-24 text-center">
                <h3 className="text-xl font-semibold text-white">
                  No talent profiles found
                </h3>

                <p className="mt-2 text-white/50">
                  New profiles will appear here soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* footer */}
        <div className="mt-10 text-center text-sm text-white/30">
          Premium talent discovery powered by HireGPT AI.
        </div>
      </div>
    </main>
  );
}