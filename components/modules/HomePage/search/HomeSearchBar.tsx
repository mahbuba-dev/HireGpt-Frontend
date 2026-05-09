"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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

  const suggestions = useMemo(() => filterNavigationSuggestions(query), [query]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-xl",
        variant === "navbar"
          ? "hidden md:block"
          : "block w-full px-2 py-2 md:hidden",
        className,
      )}
    >
      <div className="glass-card flex items-center gap-2 rounded-full px-4 py-2 transition focus-within:border-cyan-400 focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]">
        <Search className="size-5 text-slate-400 dark:text-slate-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search jobs, experts, or sections..."
          className="flex-1 bg-transparent py-1 text-base outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        {!!query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <HomeSearchDropdown
        open={open && suggestions.length > 0}
        suggestions={suggestions}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
        onSelect={handleSelect}
      />
    </div>
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((value) => Math.min(suggestions.length - 1, value + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((value) => Math.max(0, value - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const target = suggestions[activeIndex] ?? suggestions[0];
      if (target) {
        handleSelect(target);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      inputRef.current?.blur();
    }
  };

  const isMobile = variant === "mobile";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 backdrop-blur transition-all",
          "focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
          "dark:border-white/10 dark:bg-slate-900/70 dark:focus-within:bg-slate-900",
          isMobile ? "h-10" : "h-9",
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            // On mobile variant, only open dropdown when user actually types,
            // so opening the hamburger menu doesn't auto-open results.
            if (variant !== "mobile") setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Jump to pages, sections..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Home navigation search"
          aria-expanded={open}
          aria-controls="home-nav-search-listbox"
          role="combobox"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="rounded-full p-0.5 text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-white/10"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        ) : !isMobile ? (
          <kbd className="hidden rounded border border-slate-200/70 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:border-white/10 dark:bg-slate-800 md:inline-block">
            /
          </kbd>
        ) : null}
      </div>

      <HomeSearchDropdown
        open={open}
        suggestions={suggestions}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
        onSelect={handleSelect}
      />

      {open ? (
        <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-slate-200/70 bg-slate-50 px-1 dark:border-white/10 dark:bg-slate-800">
              ↑
            </kbd>
            <kbd className="rounded border border-slate-200/70 bg-slate-50 px-1 dark:border-white/10 dark:bg-slate-800">
              ↓
            </kbd>
            navigate
          </span>
          <span>Enter to open</span>
        </div>
      ) : null}
    </div>
  );
}
