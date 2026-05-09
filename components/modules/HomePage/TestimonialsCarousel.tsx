
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getTestimonials } from "@/src/services/job.services";
import type { Testimonial } from "@/src/services/job.services";

const FADE_DURATION = 400; // ms
const INTERVAL = 4000; // ms

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [bounce, setBounce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load testimonials.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % testimonials.length);
        setFade(true);
        setBounce(true);
        setTimeout(() => setBounce(false), 200); // micro-bounce duration
      }, FADE_DURATION);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [testimonials]);


  if (loading) {
    return (
      <section className="content-container section-spacing text-center">
        <div className="muted">Loading testimonials...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="content-container section-spacing text-center">
        <div className="text-destructive">{error}</div>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="content-container section-spacing text-center">
        <div className="muted">No testimonials yet.</div>
      </section>
    );
  }

  const t = testimonials[index];

  return (
    <section className="content-container section-spacing">
      <div
        className={`relative flex flex-col items-center text-center transition-opacity duration-[${FADE_DURATION}ms] ${fade ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`mb-4 flex items-center justify-center transition-transform duration-200 ease-out ${
            bounce ? "scale-105" : "scale-100"
          }`}
        >
          <Avatar className="size-16 shadow-lg">
            {t.user?.profilePhoto ? (
              <AvatarImage src={t.user.profilePhoto} alt={t.user.name || "User"} />
            ) : (
              <AvatarFallback>{t.user?.name?.[0] || "U"}</AvatarFallback>
            )}
          </Avatar>
        </div>
        <blockquote className="h3 mb-2">“{t.content}”</blockquote>
        <div className="text-base font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
          {t.user?.name || "Anonymous"}
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs muted">
          <span className="font-medium">{t.userRole}</span>
          {t.meta && <span className="">· {t.meta}</span>}
          <span className="">· {"★".repeat(Math.round(t.rating))}</span>
        </div>
      </div>
    </section>
  );
}
