



"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllJobCategories } from "@/src/services/jobCategory.services";
import { getAllRecruiters } from "@/src/services/recruiter.service";
import { aiChatOpenAIFallback } from "@/src/services/ai.service";
import { trackCategoryClick } from "@/src/lib/aiPersonalization";
import { IRecruiter } from "@/src/types/recruiter.types";
import { IJobCategory, IJobCategoryListResponse } from "@/src/types/jobCategory.types";
import { cn } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, Users } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RecruiterCard from "./RecruiterCard";
import DataTableSearch, {
  type SearchSuggestion,
} from "../shared/Table/DataTableSearch";


// --- Helpers and constants ---
type RangeField = "experience" | "price";
type RangePreset = { label: string; gte?: string; lte?: string };

function parseOptionalNumber(val: string | null): number | undefined {
  if (val == null) return undefined;
  const n = Number(val);
  return isNaN(n) ? undefined : n;
}

function getSortableTimestamp(r: IRecruiter): number {
  return r.createdAt ? new Date(r.createdAt).getTime() : 0;
}

const sortOptions = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "experience:desc", label: "Most experience" },
  { value: "experience:asc", label: "Least experience" },
  { value: "price:asc", label: "Lowest price" },
  { value: "price:desc", label: "Highest price" },
  { value: "fullName:asc", label: "Name (A-Z)" },
  { value: "fullName:desc", label: "Name (Z-A)" },
];

const experiencePresets: RangePreset[] = [
  { label: "Any" },
  { label: "0-2 yrs", gte: "0", lte: "2" },
  { label: "3-5 yrs", gte: "3", lte: "5" },
  { label: "6-10 yrs", gte: "6", lte: "10" },
  { label: "10+ yrs", gte: "10" },
];

const pricePresets: RangePreset[] = [
  { label: "Any" },
  { label: "$0-50", gte: "0", lte: "50" },
  { label: "$51-100", gte: "51", lte: "100" },
  { label: "$101-200", gte: "101", lte: "200" },
  { label: "$200+", gte: "200" },
];

function getQuickFilterButtonClass(active: boolean) {
  return (
    "rounded-xl px-3 py-1 text-xs font-medium transition-all " +
    (active
      ? "bg-blue-600 text-white shadow-md dark:bg-blue-400 dark:text-slate-900"
      : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/30")
  );
}

function buildAISuggestions(
  liveSearchValue: string,
  recruiters: IRecruiter[],
  jobCategories: IJobCategory[],
): SearchSuggestion[] {
  const trimmed = liveSearchValue.trim().toLowerCase();
  if (!trimmed) return [];

  const byName = recruiters
    .filter((r) => r.fullName && r.fullName.toLowerCase().includes(trimmed))
    .slice(0, 2)
    .map((r) => ({
      id: `ai-name-${r.id}`,
      label: r.fullName,
      value: r.fullName,
      kind: "name" as const,
      helperText: "AI suggestion based on recruiter name",
    }));

  const byTitle = recruiters
    .filter((r) => r.title && r.title.toLowerCase().includes(trimmed))
    .slice(0, 2)
    .map((r) => ({
      id: `ai-title-${r.id}`,
      label: r.title!,
      value: r.title!,
      kind: "title" as const,
      helperText: "AI suggestion based on recruiter title",
    }));

  const byJobCategory = jobCategories
    .filter((jobCategory) =>
      trimmed ? jobCategory.name.toLowerCase().includes(trimmed) : true,
    )
    .slice(0, 2)
    .map((jobCategory) => ({
      id: `ai-jobCategory-${jobCategory.id}`,
      label: jobCategory.name,
      value: jobCategory.name,
      kind: "title" as const, // fallback to allowed kind
      helperText: "AI suggestion to explore this job category",
    }));


  return [...byName, ...byTitle, ...byJobCategory].slice(0, 6);
}

export default function ExpertsPageClient() {


  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [queryString, setQueryString] = useState(() => searchParams.toString());
  const effectiveQueryString = useMemo(() => {
    const params = new URLSearchParams(queryString);
    if (!params.get("limit")) {
      params.set("limit", "500");
    }
    return params.toString();
  }, [queryString]);
  const currentSearchParams = useMemo(
    () => new URLSearchParams(effectiveQueryString),
    [effectiveQueryString],
  );
  const [aiSearchSuggestions, setAiSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const aiSearchAbortRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const PAGE_SIZE = 12;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewportMode = () => setIsMobileViewport(mediaQuery.matches);
    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);

    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  useEffect(() => {
    const nextQueryString = searchParams.toString();

    setQueryString((currentValue) =>
      currentValue === nextQueryString ? currentValue : nextQueryString,
    );
  }, [searchParams]);

  useEffect(() => {
    const handlePopState = () => {
      setQueryString(window.location.search.replace(/^\?/, ""));
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const searchTerm = currentSearchParams.get("searchTerm") ?? "";
  const [liveSearchValue, setLiveSearchValue] = useState(searchTerm);
  const activeSortValue = `${currentSearchParams.get("sortBy") ?? "createdAt"}:${currentSearchParams.get("sortOrder") ?? "desc"}`;
  const hasExperienceRange = Boolean(
    currentSearchParams.get("experience[gte]") ||
      currentSearchParams.get("experience[lte]"),
  );
  const hasPriceRange = Boolean(
    currentSearchParams.get("price[gte]") || currentSearchParams.get("price[lte]"),
  );

  const { data: recruiterData, isLoading, isError } = useQuery({
    queryKey: ["recruiters", effectiveQueryString],
    queryFn: () => getAllRecruiters({ ...Object.fromEntries(new URLSearchParams(effectiveQueryString)) }),
    staleTime: 60 * 1000,
  });

  const { data: jobCategories = [] } = useQuery<IJobCategoryListResponse, Error, IJobCategory[]>({
    queryKey: ["jobCategories", "recruiters-filter-options"],
    queryFn: () => getAllJobCategories(),
    select: (response) => Array.isArray(response?.data) ? response.data : [],
    staleTime: 5 * 60 * 1000,
  });

  // Accept both Recruiter and IRecruiter for now
  // Normalize recruiter data to IRecruiter shape for UI compatibility

  const recruiters: IRecruiter[] = useMemo(() => {
    if (!Array.isArray(recruiterData?.data)) return [];
    return recruiterData.data.map((r: any) => ({
      id: r.id,
      fullName: r.fullName,
      email: r.email,
      phone: r.phone ?? "",
      title: r.title ?? r.designation ?? "",
      bio: r.bio ?? "",
      experience: r.experience ?? 0,
      price: r.price ?? r.hiringBudget ?? undefined,
      consultationFee: r.consultationFee ?? undefined,
      isVerified: r.isVerified ?? r.verified ?? false,
      isSeeded: r.isSeeded ?? false,
      profilePhoto: r.profilePhoto ?? null,
      resumeUrl: r.resumeUrl ?? null,
      jobCategoryId: r.jobCategoryId ?? (r.jobCategory?.id ?? ""),
      jobCategory: r.jobCategory ?? null,
      userId: r.userId ?? "",
      user: r.user ?? null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }, [recruiterData]);
  const meta = recruiterData?.meta;
  const selectedJobCategoryId = currentSearchParams.get("jobCategoryId") ?? "all";
  const selectedVerification = currentSearchParams.get("isVerified") ?? "all";

  // Recruiter filtering and sorting logic (must come after all dependencies)


  useEffect(() => {
    setLiveSearchValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (aiSearchAbortRef.current) {
      clearTimeout(aiSearchAbortRef.current);
    }

    const trimmed = liveSearchValue.trim();

    if (trimmed.length < 2) {
      setAiSearchSuggestions([]);
      return;
    }

    aiSearchAbortRef.current = setTimeout(async () => {
      try {
        const resp = await aiChatOpenAIFallback({
          context: "expert-search",
          message: [
            `A user on a consulting platform typed this search query: "${trimmed}".`,
            "Suggest 4 relevant expert titles or specializations they might be looking for.",
            "Return ONLY a comma-separated list, e.g.: Financial Advisor, Investment Strategist, CFO Consultant, Capital Markets Expert",
          ].join("\n"),
        });

        const raw = resp.reply ?? "";
        const parsed: SearchSuggestion[] = raw
          .split(/,|\n/)
          .map((s) => s.replace(/^\s*[-•*\d.]+\s*/, "").trim())
          .filter((s) => s.length > 2 && s.length < 60)
          .slice(0, 4)
          .map((label, i) => ({
            id: `openai-${i}-${label}`,
            label,
            value: label,
            kind: "title" as const,
            helperText: "OpenAI suggestion based on your query",
          }));

        setAiSearchSuggestions(parsed);
      } catch {
        setAiSearchSuggestions([]);
      }
    }, 600);

    return () => {
      if (aiSearchAbortRef.current) {
        clearTimeout(aiSearchAbortRef.current);
      }
    };
  }, [liveSearchValue]);
  // --- Use displayedRecruiters for all recruiter filtering and rendering ---
  const displayedRecruiters = useMemo(() => {
    let filtered = recruiters;

    // Filter by job category
    if (selectedJobCategoryId !== "all") {
      filtered = filtered.filter(r => r.jobCategoryId === selectedJobCategoryId);
    }

    // Filter by verification
    if (selectedVerification !== "all") {
      filtered = filtered.filter(r => String(r.isVerified) === selectedVerification);
    }

    // Filter by search term
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(r =>
        r.fullName.toLowerCase().includes(term) ||
        (r.title && r.title.toLowerCase().includes(term)) ||
        (r.bio && r.bio.toLowerCase().includes(term))
      );
    }

    // Sorting
    switch (activeSortValue) {
      case "experience:desc":
        filtered = [...filtered].sort((a, b) => (b.experience ?? 0) - (a.experience ?? 0));
        break;
      case "experience:asc":
        filtered = [...filtered].sort((a, b) => (a.experience ?? 0) - (b.experience ?? 0));
        break;
      case "price:asc":
        filtered = [...filtered].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price:desc":
        filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "fullName:asc":
        filtered = [...filtered].sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case "fullName:desc":
        filtered = [...filtered].sort((a, b) => b.fullName.localeCompare(a.fullName));
        break;
      case "createdAt:asc":
        filtered = [...filtered].sort((a, b) => getSortableTimestamp(a) - getSortableTimestamp(b));
        break;
      case "createdAt:desc":
      default:
        filtered = [...filtered].sort((a, b) => getSortableTimestamp(b) - getSortableTimestamp(a));
        break;
    }

    return filtered;
  }, [
    recruiters,
    selectedJobCategoryId,
    selectedVerification,
    searchTerm,
    activeSortValue,
  ]);
  const totalRecruiters = displayedRecruiters.length;
  const updateUrlParams = useCallback(
    (
      updater: (params: URLSearchParams) => void,
      options?: { resetPage?: boolean },
    ) => {
      const params = new URLSearchParams(queryString);
      updater(params);

      if (options?.resetPage ?? true) {
        params.delete("page");
      }

      const nextQuery = params.toString();
      const currentQuery = queryString;

      if (nextQuery === currentQuery) {
        return;
      }

      setQueryString(nextQuery);
      window.history.replaceState(
        null,
        "",
        nextQuery ? `${pathname}?${nextQuery}` : pathname,
      );
    },
    [pathname, queryString],
  );

  const handleSearch = useCallback(
    (value: string) => {
      updateUrlParams((params) => {
        const trimmedValue = value.trim();

        if (trimmedValue) {
          params.set("searchTerm", trimmedValue);
          return;
        }

        params.delete("searchTerm");
      });
    },
    [updateUrlParams],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      updateUrlParams((params) => {
        const [sortBy, sortOrder] = value.split(":");

        if (sortBy === "createdAt" && sortOrder === "desc") {
          params.delete("sortBy");
          params.delete("sortOrder");
          return;
        }

        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
      });
    },
    [updateUrlParams],
  );

  const handleSelectFilterChange = useCallback(
    (filterId: "jobCategoryId" | "isVerified", value: string) => {
      if (filterId === "jobCategoryId") {
        if (value === "all") {
          trackCategoryClick("All job categories");
        } else {
          const selectedJobCategory = jobCategories.find((cat) => cat.id === value);
          if (selectedJobCategory?.name) {
            trackCategoryClick(selectedJobCategory.name);
          }
        }
      }

      if (filterId === "isVerified") {
        if (value === "true") trackCategoryClick("Verified experts");
        if (value === "false") trackCategoryClick("Unverified experts");
      }

      updateUrlParams((params) => {
        if (value === "all") {
          params.delete(filterId);
          return;
        }

        params.set(filterId, value);
      });
    },
    [jobCategories, updateUrlParams],
  );

  const handleQuickRange = useCallback(
    (field: RangeField, preset?: RangePreset) => {
      if (!preset) {
        trackCategoryClick(field === "experience" ? "Experience (reset)" : "Price (reset)");
      } else {
        trackCategoryClick(
          field === "experience"
            ? `Experience ${preset.label}`
            : `Price ${preset.label}`,
        );
      }

      updateUrlParams((params) => {
        params.delete(`${field}[gte]`);
        params.delete(`${field}[lte]`);

        if (preset?.gte) {
          params.set(`${field}[gte]`, preset.gte);
        }

        if (preset?.lte) {
          params.set(`${field}[lte]`, preset.lte);
        }
      });
    },
    [updateUrlParams],
  );

  const clearAllFilters = useCallback(() => {
    if (!queryString) {
      return;
    }

    setQueryString("");
    window.history.replaceState(null, "", pathname);
  }, [pathname, queryString]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(currentSearchParams.get("industryId")) ||
    Boolean(currentSearchParams.get("isVerified")) ||
    hasExperienceRange ||
    hasPriceRange ||
    Boolean(currentSearchParams.get("sortBy")) ||
    Boolean(currentSearchParams.get("sortOrder"));

  const isActivePreset = (field: RangeField, preset: RangePreset) => {
    return (
      (currentSearchParams.get(`${field}[gte]`) ?? "") === (preset.gte ?? "") &&
      (currentSearchParams.get(`${field}[lte]`) ?? "") === (preset.lte ?? "")
    );
  };

  const aiSuggestions = useMemo(() => {
    const local = buildAISuggestions(liveSearchValue, recruiters, jobCategories);
    const openaiIds = new Set(aiSearchSuggestions.map((s) => s.label.toLowerCase()));
    const dedupedLocal = local.filter((s) => !openaiIds.has(s.label.toLowerCase()));
    return [...aiSearchSuggestions, ...dedupedLocal].slice(0, 8);
  }, [liveSearchValue, recruiters, jobCategories, aiSearchSuggestions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [displayedRecruiters.length, queryString]);

  const totalPages = Math.max(1, Math.ceil(displayedRecruiters.length / PAGE_SIZE));

  const visibleRecruiters = useMemo(
    () => displayedRecruiters.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [displayedRecruiters, currentPage, PAGE_SIZE],
  );

  const mobileVisibleRecruiters = useMemo(
    () => displayedRecruiters.slice(0, currentPage * PAGE_SIZE),
    [displayedRecruiters, currentPage, PAGE_SIZE],
  );

  const renderedRecruiters = isMobileViewport ? mobileVisibleRecruiters : visibleRecruiters;
  const canLoadMoreOnMobile = mobileVisibleRecruiters.length < displayedRecruiters.length;

  useEffect(() => {
    // Prefetch next page card images so transitions feel instant.
    const nextPageRecruiters = displayedRecruiters.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE,
    );

    nextPageRecruiters.forEach((recruiter) => {
      const imageSrc = (recruiter.profilePhoto ?? "").trim();
      if (!imageSrc) return;

      const img = new Image();
      img.src = imageSrc;
    });
  }, [displayedRecruiters, currentPage, PAGE_SIZE]);

  return (
    <div className="page-container section-spacing">
      <div className="premium-card section-padding animate-in slide-in-from-top-2 fade-in-0 duration-500">
        <div className="space-y-3 text-container">
            <Badge
              variant="secondary"
              className="w-fit gap-1 bg-blue-100 text-blue-700 dark:border-white/10 dark:bg-blue-500/15 dark:text-blue-200"
            >
              <Users className="h-3.5 w-3.5" />
              Expert network
            </Badge>

            <div className="space-y-2">
              <h1 className="h1 hero-gradient">Discover experts with a premium consulting profile</h1>
              <p className="text-base muted">Explore vetted experts by industry, experience, and pricing, then book the right consultant with a polished end-to-end flow.</p>
            </div>
        </div>

        <div className="mt-6 section-grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <DataTableSearch
              initialValue={searchTerm}
              placeholder="Search by name, title, or industry"
              suggestionTitle="AI-powered suggestions"
              suggestions={aiSuggestions}
              onValueChange={setLiveSearchValue}
              onSuggestionSelect={(suggestion) => {
                if (suggestion.kind === "industry") {
                  trackCategoryClick(suggestion.value);
                }
                handleSearch(suggestion.value);
              }}
              onDebouncedChange={handleSearch}
              isLoading={isLoading}
            />
          </div>

          <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <Select
              value={selectedJobCategoryId}
              onValueChange={(value) =>
                handleSelectFilterChange("jobCategoryId", value)
              }
            >
              <SelectTrigger className="h-11 w-full min-w-0 rounded-2xl border-blue-200 bg-white/90 text-left text-blue-950 shadow-sm transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500/20 dark:border-white/15 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-blue-400/40 dark:focus:ring-blue-400/30">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-48">
                <SelectItem value="all">All job categories</SelectItem>
                {jobCategories.map((jobCategory: IJobCategory) => (
                  <SelectItem key={jobCategory.id} value={jobCategory.id}>
                    {jobCategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedVerification}
              onValueChange={(value) =>
                handleSelectFilterChange("isVerified", value)
              }
            >
              <SelectTrigger className="h-11 w-full min-w-0 rounded-2xl border-blue-200 bg-white/90 text-left text-blue-950 shadow-sm transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500/20 dark:border-white/15 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-blue-400/40 dark:focus:ring-blue-400/30">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All experts</SelectItem>
                <SelectItem value="true">Verified only</SelectItem>
                <SelectItem value="false">Unverified</SelectItem>
              </SelectContent>
            </Select>

            <Select value={activeSortValue} onValueChange={handleSortChange}>
              <SelectTrigger className="h-11 w-full min-w-0 rounded-2xl border-blue-200 bg-white/90 text-left text-blue-950 shadow-sm transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-500/20 dark:border-white/15 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-blue-400/40 dark:focus:ring-blue-400/30">
                <div className="flex min-w-0 items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
                  <SelectValue placeholder="Sort experts" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-11 justify-center rounded-2xl px-4 text-blue-700 hover:bg-blue-50 hover:text-blue-800 sm:justify-self-start xl:self-stretch dark:text-blue-300 dark:hover:bg-blue-500/15 dark:hover:text-blue-200"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 section-grid lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-3 shadow-sm shadow-blue-500/5 dark:border-white/10 dark:bg-slate-950/40">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Experience
              </span>
              {hasExperienceRange ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-auto px-2 py-1 text-xs text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-300 dark:hover:bg-blue-500/15 dark:hover:text-blue-200"
                  onClick={() => handleQuickRange("experience")}
                >
                  Reset
                </Button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {experiencePresets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className={getQuickFilterButtonClass(
                    isActivePreset("experience", preset),
                  )}
                  onClick={() => handleQuickRange("experience", preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100/80 bg-white/70 p-3 shadow-sm shadow-blue-500/5 dark:border-white/10 dark:bg-slate-950/40">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Price
              </span>
              {hasPriceRange ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-auto px-2 py-1 text-xs text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:text-blue-300 dark:hover:bg-blue-500/15 dark:hover:text-blue-200"
                  onClick={() => handleQuickRange("price")}
                >
                  Reset
                </Button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {pricePresets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className={getQuickFilterButtonClass(
                    isActivePreset("price", preset),
                  )}
                  onClick={() => handleQuickRange("price", preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="section-grid md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-border/70">
              <CardContent className="space-y-4 p-5">
                <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 animate-pulse rounded-2xl bg-muted" />
                  <div className="h-20 animate-pulse rounded-2xl bg-muted" />
                </div>
                <div className="h-10 animate-pulse rounded-xl bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="border-destructive/30">
          <CardContent className="py-10 text-center text-sm text-red-500">
            Failed to load experts.
          </CardContent>
        </Card>
      ) : displayedRecruiters.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base muted">
              {totalRecruiters} result{totalRecruiters === 1 ? "" : "s"}
              {searchTerm ? (
                <>
                  {" "}for <span className="font-medium text-foreground">“{searchTerm}”</span>
                </>
              ) : null}
            </p>
            <p className="text-base muted">
              {isMobileViewport
                ? `Showing ${mobileVisibleRecruiters.length} of ${totalRecruiters}`
                : `Showing ${Math.min((currentPage - 1) * PAGE_SIZE + 1, totalRecruiters)}–${Math.min(
                    currentPage * PAGE_SIZE,
                    totalRecruiters,
                  )} of ${totalRecruiters}`}
            </p>
          </div>
          <div className="section-grid md:grid-cols-2 xl:grid-cols-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
            {renderedRecruiters.map((recruiter: IRecruiter) => (
              <RecruiterCard key={recruiter.id} recruiter={recruiter} />
            ))}
          </div>
          {!isMobileViewport && totalPages > 1 && (
            <div className="hidden flex-wrap items-center justify-center gap-1 pt-2 md:flex">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .reduce<(number | "...")[]>((acc, page, idx, arr) => {
                  if (idx > 0 && (page as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-sm text-muted-foreground">…</span>
                  ) : (
                    <Button
                      key={item}
                      variant={currentPage === item ? "default" : "outline"}
                      size="sm"
                      className="h-9 w-9 rounded-xl p-0"
                      onClick={() => setCurrentPage(item as number)}
                    >
                      {item}
                    </Button>
                  ),
                )}
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
          {isMobileViewport && canLoadMoreOnMobile && (
            <div className="pt-2 md:hidden">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              >
                Load more recruiters
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="h3 text-foreground">No recruiters found</p>
            <p className="text-base muted max-w-md">
              Try adjusting your search, changing the sort, or clearing a few
              filters to see more recruiters.
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              Reset search and filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
