"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RefreshCw, CheckCircle2, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { applyJobAction } from "@/src/services/job.services";
import { getAllJobCategories } from "@/src/services/jobCategory.services";
import { aiChatOpenAIFallback } from "@/src/services/ai.service";
import { getMe } from "@/src/services/auth.services";
import { createNotification } from "@/src/services/notification.service";
import { getUsers } from "@/src/services/user.services";
import type { IJobCategory, IJobCategoryListResponse } from "@/src/types/jobCategory.types";


const SALARY_HINTS: Record<string, { min: number; max: number; mid: number }> = {
  default: { min: 30000, max: 120000, mid: 60000 },
  tech: { min: 50000, max: 150000, mid: 90000 },
  marketing: { min: 35000, max: 100000, mid: 60000 },
  finance: { min: 40000, max: 120000, mid: 70000 },
  hr: { min: 30000, max: 90000, mid: 50000 },
  healthcare: { min: 40000, max: 110000, mid: 70000 },
};

function salaryHintForCategory(name: string): { min: number; max: number; mid: number } {
  const lower = name.toLowerCase();
  for (const [key, range] of Object.entries(SALARY_HINTS)) {
    if (key !== "default" && lower.includes(key)) return range;
  }
  return SALARY_HINTS.default;
}

export default function ApplyJobForm({ job, open = true, onClose }: { job: any, open?: boolean, onClose?: () => void }) {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState("");
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());
  const [showResuggest, setShowResuggest] = useState(false);
  const [resuggestFeedback, setResuggestFeedback] = useState("");
  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);
  const lastAiCategoryId = useRef<string>("");
  const resuggestInputRef = useRef<HTMLInputElement | null>(null);

  // ── submit mutation ──────────────────────────────────────────────
  const mutation = useMutation({
    mutationFn: applyJobAction,
    onSuccess: async () => {
      try {
        const recruiters = await getUsers({ role: "RECRUITER", limit: 100 });
        await Promise.all(
          recruiters
            .map((rec) => rec.userId || rec.id)
            .filter(Boolean)
            .map((recruiterUserId) =>
              createNotification({
                type: "JOB_APPLICATION",
                userId: recruiterUserId,
                message: `New job application submitted by ${form.state.values.fullName || "a candidate"}.`,
              })
            )
        );
      } catch {}
      setSubmitSuccessOpen(true);
    },
    onError: (err: any) => {
      const backendMessage = err?.response?.data?.message;
      const normalizedMessage = Array.isArray(backendMessage)
        ? backendMessage.join(", ")
        : typeof backendMessage === "string"
        ? backendMessage
        : err?.message;
      toast.error(normalizedMessage || "Failed to apply");
    },
  });

  // ── fetch current user profile to pre-fill name + email ──────────
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // ── job categories list ─────────────────────────────────────────
  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery<IJobCategoryListResponse>({
    queryKey: ["jobCategories", "options"],
    queryFn: getAllJobCategories,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnMount: true,
  });
  const categories: IJobCategory[] = Array.isArray(categoriesResponse?.data)
    ? categoriesResponse.data
    : [];

  // ── form ────────────────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      jobCategoryId: job?.jobCategoryId || "",
    },
    onSubmit: ({ value }) => {
      const fullName = value.fullName.trim();
      const email = value.email.trim();
      const phone = value.phone.trim();
      const coverLetter = value.coverLetter.trim();
      const jobCategoryId = value.jobCategoryId;
      if (!fullName) {
        toast.error("Full name is required.");
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!jobCategoryId) {
        toast.error("Please select a job category.");
        return;
      }
      const selectedCategory = categories.find((cat) => cat.id === jobCategoryId);
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("coverLetter", coverLetter);
      formData.append("jobCategoryId", jobCategoryId);
      formData.append("jobCategory", jobCategoryId);
      formData.append("job_category_id", jobCategoryId);
      if (selectedCategory?.name) {
        formData.append("jobCategoryName", selectedCategory.name);
      }
      if (resume) {
        formData.append("resume", resume);
      }
      // Attach jobId and recruiterId if provided
      if (job?.id) formData.append("jobId", job.id);
      if (job?.recruiterId || job?.recruiter?.id) formData.append("recruiterId", job.recruiterId || job.recruiter?.id);
      mutation.mutate(formData);
    },
  });

  const analyzeResumeWithAI = async (file: File) => {
    setIsAnalyzingResume(true);
    setResumeAnalysis("");
    try {
      const reply = await aiChatOpenAIFallback({
        context: "job-apply-resume-review",
        message: [
          "You are a recruiter reviewing job applications.",
          `Evaluate this resume metadata and rate it as Strong or Weak with 2 concise reasons.`,
          `File name: ${file.name}`,
          `File type: ${file.type || "unknown"}`,
          `File size KB: ${Math.max(1, Math.round(file.size / 1024))}`,
          `Job category id: ${form.state.values.jobCategoryId || "not provided"}`,
          "Return format: Rating: Strong/Weak. Reasons: ...",
        ].join("\n"),
      });
      setResumeAnalysis(reply.reply || "Rating unavailable.");
    } catch {
      setResumeAnalysis("Rating: Weak. Reasons: AI review is unavailable right now, but your resume is attached successfully.");
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  // ── pre-fill name + email once user data arrives ────────────────
  useEffect(() => {
    if (!meData) return;
    const userName = meData.candidate?.fullName || meData.name || "";
    const userEmail = meData.email || "";
    if (userName && !form.state.values.fullName) {
      form.setFieldValue("fullName", userName);
      setAiFilledFields((prev) => new Set([...prev, "fullName"]));
    }
    if (userEmail && !form.state.values.email) {
      form.setFieldValue("email", userEmail);
      setAiFilledFields((prev) => new Set([...prev, "email"]));
    }
  }, [meData]);

  // ── core AI helper (direct OpenAI) ──────────────────────────────
  const runAISuggest = async (category: IJobCategory, feedback?: string) => {
    const salaryRange = salaryHintForCategory(category.name);
    const prompt = feedback?.trim()
      ? [
          `You are a job application assistant for a recruitment platform.`,
          `Write a professional cover letter for a job in "${category.name}". The user gave this feedback: "${feedback.trim()}".`,
          `Return ONLY this exact format with no extra text:`,
          `COVER_LETTER: <2-3 sentence professional cover letter in first person>`
        ].join("\n")
      : [
          `You are a job application assistant for a recruitment platform.`,
          `Write a professional cover letter for a job in "${category.name}".`,
          `Return ONLY this exact format with no extra text:`,
          `COVER_LETTER: <2-3 sentence professional cover letter in first person>`
        ].join("\n");
    const response = await aiChatOpenAIFallback({
      context: "job-apply-cover-letter-suggestion",
      message: prompt,
    });
    return { response, salaryRange };
  };

  // ── apply structured AI response to form ────────────────────────
  const applyOpenAIResult = (
    response: Awaited<ReturnType<typeof aiChatOpenAIFallback>>,
    category: IJobCategory,
    salaryRange: { min: number; max: number; mid: number },
    forceOverwrite = false,
  ) => {
    const text = response.reply ?? "";
    const values = form.state.values;
    const filled = new Set(aiFilledFields);
    const coverLetterMatch = text.match(/COVER_LETTER:\s*([\s\S]+)/i);
    const generatedCoverLetter =
      coverLetterMatch?.[1]?.trim() ||
      `I am excited to apply for a position in ${category.name}. My background and skills make me a strong fit for this field.`;
    if (forceOverwrite || !values.coverLetter.trim()) {
      form.setFieldValue("coverLetter", generatedCoverLetter);
      filled.add("coverLetter");
    }
    setAiFilledFields(filled);
    setShowResuggest(false);
    setResuggestFeedback("");
  };

  // ── mutation: triggered on job category change ──────────────────
  const aiCategoryMutation = useMutation({
    mutationFn: async (category: IJobCategory) => {
      const { response, salaryRange } = await runAISuggest(category);
      return { response, salaryRange, category };
    },
    onSuccess: ({ response, salaryRange, category }) => {
      applyOpenAIResult(response, category, salaryRange, false);
      toast.success(`AI suggestions generated for ${category.name}.`);
    },
    onError: () => {
      toast.error("AI could not generate suggestions right now.");
    },
  });

  // ── mutation: re-suggest with user feedback ────────────────────
  const aiResuggestMutation = useMutation({
    mutationFn: async () => {
      const values = form.state.values;
      const category = categories.find((cat) => cat.id === values.jobCategoryId);
      if (!category) throw new Error("Please select a job category first.");
      const { response, salaryRange } = await runAISuggest(category, resuggestFeedback);
      return { response, salaryRange, category };
    },
    onSuccess: ({ response, salaryRange, category }) => {
      applyOpenAIResult(response, category, salaryRange, true);
      toast.success("AI has generated new suggestions based on your feedback.");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Could not re-generate AI suggestions.");
    },
  });

  const isAILoading = aiCategoryMutation.isPending || aiResuggestMutation.isPending;
  const hasAISuggestions = aiFilledFields.has("coverLetter");
  const resumeRating: "STRONG" | "WEAK" | null = /rating\s*:\s*strong/i.test(resumeAnalysis)
    ? "STRONG"
    : /rating\s*:\s*weak/i.test(resumeAnalysis)
    ? "WEAK"
    : null;
  const resumeReasonsText = resumeAnalysis.match(/reasons?\s*:\s*([\s\S]+)/i)?.[1] ?? "";
  const resumeReasons = resumeReasonsText
    .split(/\n|;|\.|•|-/)
    .map((item) => item.replace(/^\d+[.)]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 4);
  const handleResuggestToggle = () => {
    if (aiResuggestMutation.isPending) return;
    if (!showResuggest) {
      setShowResuggest(true);
      setTimeout(() => {
        resuggestInputRef.current?.focus();
      }, 0);
      return;
    }
    if (!resuggestFeedback.trim()) {
      aiResuggestMutation.mutate();
      return;
    }
    setShowResuggest(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Apply for a Job
            <Badge className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              <Sparkles className="size-3" />
              {hasAISuggestions ? "AI assisted" : "AI ready"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-sm text-muted-foreground ml-4">
          Pick your job category — AI will guide you with smart suggestions for your cover letter.
        </CardDescription>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Name (pre-filled from account) */}
            <form.Field name="fullName">
              {(field) => (
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium">
                    Full Name
                    {aiFilledFields.has("fullName") && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" /> From your account
                      </span>
                    )}
                  </label>
                  <Input
                    placeholder="Full Name"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setAiFilledFields((prev) => { const s = new Set(prev); s.delete("fullName"); return s; });
                    }}
                  />
                </div>
              )}
            </form.Field>
            {/* Email (pre-filled from account) */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium">
                    Email
                    {aiFilledFields.has("email") && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" /> From your account
                      </span>
                    )}
                  </label>
                  <Input
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setAiFilledFields((prev) => { const s = new Set(prev); s.delete("email"); return s; });
                    }}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="phone">
              {(field) => (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    placeholder="Phone"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
            {/* Job Category — selecting this triggers AI */}
            <form.Field
              name="jobCategoryId"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Please select a job category." : undefined,
                onSubmit: ({ value }) =>
                  !value ? "Please select a job category." : undefined,
              }}
            >
              {(field) => {
                const categoryError = field.state.meta.errors?.[0];
                return (
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Job Category</label>
                    <div className="relative">
                      <select
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const id = e.target.value;
                          field.handleChange(id);
                          if (id && id !== lastAiCategoryId.current) {
                            lastAiCategoryId.current = id;
                            const category = categories.find((cat) => cat.id === id);
                            if (category) aiCategoryMutation.mutate(category);
                          }
                        }}
                        className="w-full appearance-none rounded-md border bg-background px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isCategoriesLoading || isCategoriesError || categories.length === 0}
                      >
                        <option value="">
                          {isCategoriesLoading
                            ? "Loading job categories..."
                            : isCategoriesError
                            ? "Failed to load job categories"
                            : categories.length === 0
                            ? "No job categories available"
                            : "Select Job Category — AI will suggest your cover letter"}
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    {categoryError && !isCategoriesError && (
                      <p className="text-sm text-red-500">{String(categoryError)}</p>
                    )}
                    {isCategoriesError && (
                      <p className="text-sm text-red-500">
                        Could not load job categories right now. Please refresh.
                      </p>
                    )}
                    {isAILoading && (
                      <p className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                        <Sparkles className="size-3 animate-pulse" />
                        AI is generating suggestions for this job category…
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
            {/* Cover Letter (AI suggested) */}
            <form.Field name="coverLetter">
              {(field) => (
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-medium">
                    Cover Letter
                    {aiFilledFields.has("coverLetter") && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-normal text-blue-600 dark:text-blue-400">
                        <Sparkles className="size-3" /> AI suggested
                      </span>
                    )}
                  </label>
                  <Textarea
                    placeholder="Short professional cover letter"
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setAiFilledFields((prev) => { const s = new Set(prev); s.delete("coverLetter"); return s; });
                    }}
                  />
                </div>
              )}
            </form.Field>
            {/* Re-suggest panel */}
            <AnimatePresence>
              {hasAISuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-blue-200/80 bg-blue-50/60 p-3 dark:border-blue-500/20 dark:bg-blue-500/8"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Not happy with the AI suggestion?
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResuggestToggle}
                    disabled={aiResuggestMutation.isPending}
                    className="mb-1 text-xs text-blue-700 underline underline-offset-2 hover:text-blue-900 dark:text-blue-300"
                  >
                    {showResuggest
                      ? aiResuggestMutation.isPending
                        ? "Re-generating..."
                        : "Re-generate now"
                      : "Give feedback and re-suggest"}
                  </button>
                  <AnimatePresence>
                    {showResuggest && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                          <Input
                            ref={resuggestInputRef}
                            value={resuggestFeedback}
                            onChange={(e) => setResuggestFeedback(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (!aiResuggestMutation.isPending) {
                                  aiResuggestMutation.mutate();
                                }
                              }
                            }}
                            placeholder='e.g. "Make the letter shorter" or "Focus on teamwork"'
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            disabled={aiResuggestMutation.isPending}
                            onClick={() => aiResuggestMutation.mutate()}
                            className="shrink-0 gap-1.5"
                          >
                            <RefreshCw className={`size-3.5 ${aiResuggestMutation.isPending ? "animate-spin" : ""}`} />
                            {aiResuggestMutation.isPending ? "Re-generating…" : "Re-suggest"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Resume / CV <span className="ml-1 text-xs font-normal text-muted-foreground">(PDF, DOC, DOCX — optional)</span></label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setResume(file);
                  if (file) {
                    void analyzeResumeWithAI(file);
                  } else {
                    setResumeAnalysis("");
                  }
                }}
                className="h-auto py-2"
              />
              {resume && (
                <p className="text-xs text-muted-foreground">Selected: {resume.name}</p>
              )}
              {isAnalyzingResume && (
                <p className="text-xs text-blue-600 dark:text-blue-400">AI is analyzing your resume strength...</p>
              )}
              {!isAnalyzingResume && resumeAnalysis && (
                <div className="rounded-md border border-blue-200/70 bg-blue-50/60 px-2.5 py-2 text-xs text-blue-800 dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-200">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="font-semibold">AI Resume Review</span>
                    {resumeRating && (
                      <span
                        className={
                          resumeRating === "STRONG"
                            ? "rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : "rounded-full border border-red-300 bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-300"
                        }
                      >
                        {resumeRating === "STRONG" ? "Strong" : "Weak"}
                      </span>
                    )}
                  </div>
                  {resumeReasons.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-4 text-xs">
                      {resumeReasons.map((reason, index) => (
                        <li key={`${reason}-${index}`}>{reason}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs">{resumeAnalysis}</p>
                  )}
                </div>
              )}
            </div>
            <form.Subscribe selector={(state) => state.values.jobCategoryId}>
              {(jobCategoryId) => (
                <Button
                  type="submit"
                  disabled={mutation.isPending || isCategoriesLoading || !jobCategoryId}
                  className="w-full"
                >
                  {mutation.isPending ? "Submitting…" : "Submit Application"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <Dialog
        open={submitSuccessOpen}
        onOpenChange={(open) => {
          setSubmitSuccessOpen(open);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
              Job application submitted
            </DialogTitle>
            <DialogDescription className="pt-1 text-sm leading-relaxed">
              You have successfully submitted your application for this job. Our recruiter team will review your
              form shortly. Once approved, we will notify you by email and you will be able to access your
              candidate dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSubmitSuccessOpen(false);
                window.location.href = "/contact";
              }}
            >
              Contact us
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSubmitSuccessOpen(false);
                window.location.href = "/terms";
              }}
            >
              Terms
            </Button>
            <Button
              type="button"
              onClick={() => {
                setSubmitSuccessOpen(false);
                window.location.href = "/";
              }}
            >
              Go to homepage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
