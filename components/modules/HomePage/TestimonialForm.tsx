"use client"
import React, { useState } from "react";
import { postTestimonial } from "@/src/services/job.services";

export default function TestimonialForm({ onSuccess, user, setOpen }: { onSuccess?: () => void; user?: any; setOpen?: (open: boolean) => void }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [meta, setMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await postTestimonial({ content, rating, meta });
      setSuccess(true);
      setContent("");
      setMeta("");
      setRating(5);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card section-spacing section-padding space-y-5 w-full max-w-md mx-auto">
      <div>
        <label className="block mb-1 h2">Your Feedback</label>
        <textarea
          className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-base text-white placeholder:text-slate-300/70 outline-none transition focus:border-cyan-400"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={3}
        />
      </div>
      <div>
        <label className="block mb-1 h2">Rating</label>
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="w-20 rounded-xl border border-white/15 bg-slate-950/30 p-2 text-base text-white outline-none transition focus:border-cyan-400"
          required
        />
        <span className="ml-2 text-base">/ 5</span>
      </div>
      <div>
        <label className="block mb-1 h2">Meta <span className="muted">(optional)</span></label>
        <input
          className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-base text-white placeholder:text-slate-300/70 outline-none transition focus:border-cyan-400"
          value={meta}
          onChange={e => setMeta(e.target.value)}
          placeholder="e.g. Job Title, Company, etc."
        />
      </div>
      {error && <div className="text-destructive">{error}</div>}
      {success && <div className="text-green-600">Thank you for your feedback!</div>}
      <button
        type="submit"
        className="btn-primary w-full py-2 rounded-xl text-lg font-semibold disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}
