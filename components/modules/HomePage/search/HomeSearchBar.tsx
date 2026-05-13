"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import HomeSearchDropdown from "@/components/modules/HomePage/search/HomeSearchDropdown";
import {
  filterNavigationSuggestions,
  type NavigationSuggestion,
} from "@/components/modules/HomePage/search/NavigationSuggestionList";
import { navigateToSuggestion } from "@/components/modules/HomePage/search/NavigationRouter";
import { cn } from "@/src/lib/utils";

interface HomeSearchBarProps {
  variant?: "navbar" | "mobile";
  className?: string;
  onNavigate?: () => void;
}

export default function HomeSearchBar({
  variant = "navbar",
  className,
  onNavigate,
}: HomeSearchBarProps) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = variant === "mobile";

  const suggestions = useMemo(
    () => filterNavigationSuggestions(query),
    [query],
  );

  const handleSelect = useCallback(
    (suggestion: NavigationSuggestion) => {
      navigateToSuggestion(router, suggestion, onNavigate);

      setQuery("");
      setOpen(false);
      setActiveIndex(0);
    },
    [router, onNavigate],
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!suggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setOpen(true);

      setActiveIndex((prev) =>
        Math.min(prev + 1, suggestions.length - 1),
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((prev) => Math.max(prev - 1, 0));

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const target =
        suggestions[activeIndex] ?? suggestions[0];

      if (target) {
        handleSelect(target);
      }

      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative w-full",
          variant === "navbar"
            ? "hidden max-w-xs md:block"
            : "block w-full md:hidden",
          className,
        )}
      >
        <div
          className={cn(
            "group relative flex appearance-none items-center overflow-hidden rounded-2xl border transition-all duration-300",
            "border-slate-200/80 bg-transparent shadow-sm backdrop-blur-xl",
            "dark:border-white/10 dark:bg-slate-900/70",

            // FOCUS
            "focus-within:border-[#EB5B00]/40",
            "focus-within:bg-white",
            "focus-within:shadow-[0_0_0_4px_rgba(235,91,0,0.12)]",

            "dark:focus-within:border-[#FFCC00]/30",
            "dark:focus-within:bg-slate-900",
            "dark:focus-within:shadow-[0_0_0_4px_rgba(255,204,0,0.08)]",

            isMobile ? "h-12 px-4" : "h-10 px-4",
          )}
        >
          {/* SEARCH ICON */}
          <Search className="mr-2 size-4 shrink-0 text-slate-400 transition-colors duration-300 group-focus-within:text-[#EB5B00] dark:text-slate-500 dark:group-focus-within:text-[#FFCC00]" />

          {/* INPUT */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onFocus={() => {
              if (!isMobile || query.length > 0) {
                setOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Jump to section..."
            className={cn(
              "flex-1 appearance-none border-0 bg-transparent text-xs outline-none ring-0 focus:outline-none focus:ring-0",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "text-slate-700 dark:text-slate-100",
            )}
            aria-label="Home navigation search"
            aria-expanded={open}
            aria-controls="home-nav-search-listbox"
            role="combobox"
          />

        

          {/* GLOW */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#640D5F]/0 via-[#EB5B00]/0 to-[#FFCC00]/0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
        </div>

        {/* DROPDOWN */}
        <HomeSearchDropdown
          open={open && suggestions.length > 0}
          suggestions={suggestions}
          activeIndex={activeIndex}
          onHover={setActiveIndex}
          onSelect={handleSelect}
        />

        {/* KEYBOARD HELP */}
        {open && suggestions.length > 0 ? (
          <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 dark:border-white/10 dark:bg-slate-800">
                ↑
              </kbd>

              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 dark:border-white/10 dark:bg-slate-800">
                ↓
              </kbd>

              navigate
            </span>

            <span>Enter to open</span>
          </div>
        ) : null}
      </div>

      {/* REMOVE DEFAULT SEARCH UI */}
      <style jsx>{`
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button,
        input::-webkit-search-results-button,
        input::-webkit-search-results-decoration {
          display: none;
          -webkit-appearance: none;
        }
      `}</style>
    </>
  );
}