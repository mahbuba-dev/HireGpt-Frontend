"use client";

import React, { useEffect, useState } from "react";
import TestimonialForm from "./TestimonialForm";

// Utility to decode JWT (client-side, no secret needed)
function decodeJWT(token: string): any {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function TestimonialPopup() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Only show once per session
    if (window.sessionStorage.getItem("testimonialPopupShown")) return;
    const token = getAccessToken();
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.name && decoded.email) {
        setUser({
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
        setOpen(true);
        window.sessionStorage.setItem("testimonialPopupShown", "1");
      }
    }
  }, []);

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-xl text-muted-foreground hover:text-destructive"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">Share Your Experience</h2>
        <p className="mb-4 text-center text-muted-foreground">
          Hi <span className="font-semibold">{user.name}</span>! We'd love your feedback on HireGPT.
        </p>
        <TestimonialForm onSuccess={() => setOpen(false)} />
      </div>
    </div>
  );
}
