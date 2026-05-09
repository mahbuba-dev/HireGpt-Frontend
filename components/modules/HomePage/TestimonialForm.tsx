"use client"
import React, { useState } from "react";
import { postTestimonial } from "@/src/services/job.services";

export default function TestimonialForm({ onSuccess }: { onSuccess?: () => void }) {
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
      <div>
        <label className="block mb-1 font-medium">Your Feedback</label>
        <textarea
          className="w-full border rounded p-2"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={3}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Rating</label>
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="w-20 border rounded p-1"
          required
        />
        <span className="ml-2">/ 5</span>
      </div>
      <div>
        <label className="block mb-1 font-medium">Meta (optional)</label>
        <input
          className="w-full border rounded p-2"
          value={meta}
          onChange={e => setMeta(e.target.value)}
          placeholder="e.g. Job Title, Company, etc."
        />
      </div>
      {error && <div className="text-destructive">{error}</div>}
      {success && <div className="text-green-600">Thank you for your feedback!</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}
