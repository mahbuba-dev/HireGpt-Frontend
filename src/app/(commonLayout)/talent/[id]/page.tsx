"use client";
import { useEffect, useState } from "react";
import { getCandidateById, ICandidate } from "@/src/services/candidate.service";
import { useParams } from "next/navigation";

export default function CandidateDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No candidate ID provided.");
      setLoading(false);
      return;
    }
    console.log("Fetching candidate with id:", id);
    getCandidateById(id)
      .then((data) => {
        setCandidate(data);
        setLoading(false);
        console.log("Fetched candidate:", data);
      })
      .catch((err) => {
        setError("Profile not found.");
        setLoading(false);
        console.error("Error fetching candidate:", err);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !candidate) return <div className="text-center py-10 text-red-500">{error || "Profile not found."}</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-pink-100 py-16 px-4">
      <section className="w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl p-10 border border-pink-100 flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src={candidate.profilePhoto || candidate.user?.image || "/industry-icons/engineer.svg"}
            alt={candidate.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow bg-white"
          />
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
        <h1 className="text-3xl font-extrabold text-pink-900 mb-1 text-center">{candidate.fullName}</h1>
        <p className="text-pink-700 text-base font-medium mb-2 text-center">{candidate.headline || candidate.user?.role || "Professional"}</p>
        <p className="text-gray-500 text-sm mb-4 text-center">{candidate.email}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {candidate.skills && candidate.skills.length > 0 ? (
            candidate.skills.map((skill) => (
              <span key={skill} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-300 text-xs italic">No skills listed</span>
          )}
        </div>
        <div className="w-full bg-pink-50 rounded-2xl p-6 mb-6 shadow-inner">
          <h2 className="text-lg font-bold text-pink-800 mb-2">About</h2>
          <p className="text-gray-700 text-sm min-h-[48px]">{candidate.summary || "No summary provided."}</p>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 bg-white rounded-xl border border-pink-100 p-4 shadow">
            <div className="text-xs text-gray-400 mb-1">Experience</div>
            <div className="text-pink-900 font-bold text-lg">{candidate.experience ?? 0} yrs</div>
          </div>
          <div className="flex-1 bg-white rounded-xl border border-pink-100 p-4 shadow">
            <div className="text-xs text-gray-400 mb-1">AI Score</div>
            <div className="text-pink-900 font-bold text-lg">{candidate.aiScore ?? "N/A"}</div>
          </div>
        </div>
        <a
          href="mailto:talent@yourdomain.com?subject=Contact%20Talent%20Profile"
          className="inline-block bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mt-4"
        >
          Contact This Talent
        </a>
      </section>
    </main>
  );
}
