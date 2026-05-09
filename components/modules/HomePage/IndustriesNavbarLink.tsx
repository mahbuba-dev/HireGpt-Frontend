"use client";

import Link from "next/link";
import {
  trackCategoryClick,
  trackIndustryExplore,
} from "@/src/lib/aiPersonalization";

export default function IndustriesNavbarLink() {
  return (
    <Link
      href="/industries"
      onClick={() => {
        trackCategoryClick("Industries");
        trackIndustryExplore("Industries");
      }}
      className="btn-link rounded-xl px-4 py-2 font-semibold transition-colors"
    >
      <span className="muted">Industries</span>
    </Link>
  );
}
