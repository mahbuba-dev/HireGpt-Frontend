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
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        variant === "navbar"
          ? "hidden max-w-xl md:block"
          : "block w-full px-2 py-2 md:hidden",
        className,
      )}
    >
      <div
        className={cn(
          "group flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 backdrop-blur transition-all",
          "focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
          "dark:border-white/10 dark:bg-slate-900/70 dark:focus-within:bg-slate-900",
          isMobile ? "h-11" : "h-10",
        )}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />

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
          placeholder="Search jobs, recruiters, candidates..."
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
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="rounded-full p-1 text-muted-foreground transition hover:bg-slate-100 hover:text-foreground dark:hover:bg-white/10"
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
        open={open && suggestions.length > 0}
        suggestions={suggestions}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
        onSelect={handleSelect}
      />

      {open && suggestions.length > 0 ? (
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