"use client";
import { useEffect } from "react";

export default function GlassClientEffects() {
  useEffect(() => {
    const glow = typeof window !== 'undefined' ? document.getElementById("cursor-glow") : null;
    if (!glow) return;
    const move = (e) => {
      glow.style.transform = `translate(${e.clientX - 64}px, ${e.clientY - 64}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return null;
}
