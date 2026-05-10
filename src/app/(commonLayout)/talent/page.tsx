

"use client";
import { getAllCandidates, ICandidate, UserSummary } from "@/src/services/candidate.service";
import { useEffect, useState } from "react";

export default function TalentPage() {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const LIMIT = 12;

  // Initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllCandidates();
        console.log("[TalentPage] API response (initial):", res);
        console.log("[TalentPage] meta:", res.meta);
        console.log("[TalentPage] candidates:", res.data);
        setCandidates(res.data);
        setHasMore(false); // No pagination, so no more data
        setPage(1);
      } catch (err: any) {
        setError("Failed to load talent profiles.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load more handler
  const handleLoadMore = async () => {
    setLoadingMore(true);
    setError(null);
    try {
      const res = await getAllCandidates();
      console.log("[TalentPage] API response (load more):", res);
      console.log("[TalentPage] meta (load more):", res.meta);
      console.log("[TalentPage] candidates (load more):", res.data);
      setCandidates((prev) => [...prev, ...res.data]);
      setHasMore(false); // No pagination, so no more data
    } catch (err: any) {
      setError("Failed to load more talent profiles.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-white via-pink-50 to-pink-100 flex flex-col items-center justify-start py-16 px-4">
      <section className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-pink-100">
        <h1 className="text-4xl font-extrabold text-pink-900 mb-4 text-center tracking-tight">Browse Top Talent</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Discover and connect with industry-leading professionals ready to make an impact. Our curated talent pool features SaaS experts, engineers, designers, and more—each profile is handpicked for quality and experience.
        </p>
        {loading ? (
          <div className="text-center text-pink-700 py-10">Loading talent profiles...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : Array.isArray(candidates) && candidates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white/95 border border-pink-100 rounded-3xl shadow-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-200 group"
                >
                  <div className="relative mb-4">
                    <img
                      src={candidate.profilePhoto || (candidate.user && candidate.user.image) || "/industry-icons/engineer.svg"}
                      alt={candidate.fullName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-pink-200 shadow group-hover:scale-105 transition-transform duration-200 bg-white"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                  <h2 className="text-lg font-bold text-pink-900 text-center mb-1 truncate w-full" title={candidate.fullName}>{candidate.fullName}</h2>
                  <p className="text-pink-700 text-xs font-medium mb-1 text-center">{candidate.headline || (candidate.user && candidate.user.role) || "Professional"}</p>
                  <p className="text-gray-500 text-xs mb-2 text-center w-full truncate" title={candidate.email}>{candidate.email}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[28px]">
                    {candidate.skills && candidate.skills.length > 0 ? (
                      candidate.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-300 text-xs italic">No skills listed</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full mt-auto">
                    <a
                      href={"/talent/" + candidate.id}
                      className="inline-block w-full text-center bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500 text-white font-bold py-2 rounded-2xl shadow-md transition-all duration-200"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-8 rounded-full shadow-lg transition-all duration-200 disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">No talent profiles found.</div>
        )}
        <div className="mt-10 text-center">
          <a
            href="mailto:talent@yourdomain.com?subject=Hire%20Top%20Talent%20Inquiry"
            className="inline-block bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200"
          >
            Hire Top Talent
          </a>
        </div>
      </section>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        Premium talent discovery. Inspired by Wellfound.
      </footer>
    </main>
  );
}
