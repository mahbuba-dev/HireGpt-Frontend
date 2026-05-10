"use client";
import { useEffect, useState } from "react";

export default function ReviewModal() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Only show once per session
    if (!sessionStorage.getItem("reviewModalShown")) {
      setTimeout(() => setOpen(true), 1200); // slight delay for premium feel
      sessionStorage.setItem("reviewModalShown", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto rounded-3xl border border-white/30 bg-white/70 shadow-2xl backdrop-blur-2xl p-8 flex flex-col items-center animate-fade-in-up" style={{background: "linear-gradient(135deg, #f0f4ff 0%, #f9e6ff 100%)"}}>
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-xl font-bold">×</button>
        <h2 className="text-2xl font-extrabold text-pink-900 mb-2 text-center">We'd love your feedback!</h2>
        <p className="text-gray-700 text-center mb-6">How was your experience? Please leave a quick review.</p>
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl transition-transform ${rating >= star ? "text-yellow-400 scale-110" : "text-gray-300"}`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="w-full rounded-xl border border-pink-200 bg-white/60 p-3 text-gray-700 shadow-inner focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all mb-4"
          rows={3}
          placeholder="Leave a comment (optional)"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex gap-3 w-full">
          <button
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-gray-200 to-gray-100 text-gray-600 font-semibold shadow hover:from-gray-300 hover:to-gray-200 transition-all"
            onClick={() => setOpen(false)}
          >
            Not now
          </button>
          <button
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-400 text-white font-bold shadow hover:from-pink-600 hover:to-fuchsia-500 transition-all"
            onClick={() => {
              // Placeholder: send review to API or show thank you
              setOpen(false);
              // Optionally: toast("Thank you for your feedback!")
            }}
            disabled={rating === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
