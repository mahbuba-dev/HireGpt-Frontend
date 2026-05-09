import React, { useEffect, useState } from "react";

// Gradient pulse animation (CSS)
// Add this to your global CSS if not already present:
// @keyframes cta-gradient-pulse {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }

export default function CTABanner() {
  const [showHeadline, setShowHeadline] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowHeadline(true), 200);
    const t2 = setTimeout(() => setShowButton(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="page-container section-spacing">
      <div className="glass-card flex flex-col items-center justify-center overflow-hidden px-8 py-12 text-center">
        <h2
          className={`h2 mb-4 hero-gradient drop-shadow-lg transition-transform duration-700 ease-out ${
            showHeadline ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
          }`}
        >
          Ready to unlock expert guidance?
        </h2>
        <p className="mb-8 text-lg text-muted">
          Book a session with a top specialist and accelerate your next big move.
        </p>
        <button
          className={`rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-700 shadow-lg transition-opacity duration-700 ease-out hover:bg-blue-100 ${
            showButton ? "opacity-100" : "opacity-0"
          }`}
        >
          Book a Consultation
        </button>
      </div>
    </section>
  );
}
