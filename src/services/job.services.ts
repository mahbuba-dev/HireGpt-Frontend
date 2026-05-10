// Get all jobs (public listing) - direct fetch for reliability
export async function getAllJobs(params: Record<string, any> = {}): Promise<Job[]> {
  const res = await fetch('http://localhost:5000/api/v1/jobs', { next: { revalidate: 0 } });
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}
// Post a new testimonial
export async function postTestimonial(payload: {
  content: string;
  rating: number;
  meta?: string;
}): Promise<Testimonial> {
  const res = await httpClient.post<{ data: Testimonial }>("/testimonials", payload);
  return res.data.data;
}
// --- Testimonial API (for carousel/feedback) ---
import type { AxiosResponse } from "axios";
export interface Testimonial {
  id: string;
  userId: string;
  userRole: "CANDIDATE" | "RECRUITER";
  content: string;
  rating: number;
  meta?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name?: string;
    profilePhoto?: string;
    email?: string;
    // ...other user fields
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await httpClient.get<{ data: Testimonial[] }>("/testimonials", { silent: true });
  return Array.isArray(res.data?.data) ? res.data.data : [];
}
// AI-powered recommended jobs for homepage
export async function getAIRecommendedJobs(params: { limit?: number } = {}): Promise<Job[]> {
  const response = await httpClient.get<{ data: Job[] }>("/jobs/ai-recommended", {
    params,
    silent: true,
  });
  return Array.isArray(response.data?.data) ? response.data.data : [];
}
import { httpClient } from "../lib/axious/httpClient";
import type { ApiResponse } from "../types/api.types";
import axios from "axios";
import type { Job } from "@/src/types/job.types";

// ...existing code...
// The rest of the logic is a 1:1 refactor of recruiter.services.ts, replacing recruiter/jobCategory/candidate/interview/application, etc.
// ...existing code...

// Helper functions adapted from expert.services.ts
const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) return "";
  const data = error.response?.data as
    | { message?: string; error?: string; field?: string }
    | string
    | undefined;
  if (typeof data === "string") return data;
  return String(data?.message ?? data?.error ?? "");
};
const isUnexpectedFieldError = (error: unknown) => {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("unexpected field") || message.includes("unknown field");
};
const isJobCategoryFieldError = (error: unknown) => {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("jobcategory is required") ||
    message.includes("jobcategoryid is required") ||
    message.includes("job category id is required") ||
    (message.includes("jobcategory") && message.includes("required"))
  );
};
const getAllFormDataValues = (payload: FormData, key: string): FormDataEntryValue[] => {
  const values: FormDataEntryValue[] = [];
  payload.forEach((value, currentKey) => {
    if (currentKey === key) values.push(value);
  });
  return values;
};
const cloneWithFileKeyAliases = (
  payload: FormData,
  aliases: { resume?: string },
) => {
  const next = new FormData();
  const resumeValues = getAllFormDataValues(payload, "resume");
  payload.forEach((value, key) => {
    if (key === "resume") return;
    next.append(key, value);
  });
  if (aliases.resume) {
    resumeValues.forEach((value) => next.append(aliases.resume!, value));
  }
  return next;
};
const JOB_CATEGORY_KEYS = ["jobCategoryId", "jobCategory", "job_category_id", "jobCategoryName"] as const;
const cloneWithJobCategoryKeysOnly = (payload: FormData, keepKeys: string[]) => {
  const next = new FormData();
  const idValue =
    (getAllFormDataValues(payload, "jobCategoryId")[0] as string | undefined) ??
    (getAllFormDataValues(payload, "jobCategory")[0] as string | undefined) ??
    (getAllFormDataValues(payload, "job_category_id")[0] as string | undefined) ??
    "";
  const nameValue =
    (getAllFormDataValues(payload, "jobCategoryName")[0] as string | undefined) ?? "";
  payload.forEach((value, key) => {
    if ((JOB_CATEGORY_KEYS as readonly string[]).includes(key)) return;
    next.append(key, value);
  });
  for (const key of keepKeys) {
    if (key === "jobCategoryName") {
      if (nameValue) next.append(key, nameValue);
    } else if (idValue) {
      next.append(key, idValue);
    }
  }
  return next;
};
const formDataToJson = (payload: FormData): Record<string, unknown> => {
  const next: Record<string, unknown> = {};
  payload.forEach((value, key) => {
    if (typeof File !== "undefined" && value instanceof File) return;
    if (typeof Blob !== "undefined" && value instanceof Blob) return;
    next[key] = value;
  });
  return next;
};
const getPayloadVariants = (payload: any | FormData) => {
  if (!(payload instanceof FormData)) return [payload];
  const hasFiles = (() => {
    let found = false;
    payload.forEach((value) => {
      if (typeof File !== "undefined" && value instanceof File) found = true;
    });
    return found;
  })();
  const jsonVariant = formDataToJson(payload);
  const variants: Array<FormData | Record<string, unknown>> = [
    jsonVariant,
    payload,
    cloneWithJobCategoryKeysOnly(payload, ["jobCategoryId"]),
    cloneWithJobCategoryKeysOnly(payload, ["jobCategory"]),
    cloneWithJobCategoryKeysOnly(payload, ["job_category_id"]),
    cloneWithJobCategoryKeysOnly(payload, ["jobCategoryId", "jobCategory"]),
  ];
  if (hasFiles) {
    variants.push(
      cloneWithFileKeyAliases(payload, { resume: "cv" }),
      cloneWithFileKeyAliases(payload, { resume: "resume" }),
      cloneWithFileKeyAliases(payload, { resume: undefined })
    );
  }
  return variants;
};

export async function applyJobAction(payload: any | FormData) {
  const applyEndpoints = [
    "/job-verification/applications",
    "/jobs/apply",
    "/jobs/apply-job",
    "/job-verification/apply",
  ];
  const payloadVariants = getPayloadVariants(payload);
  let lastError: unknown;
  for (let endpointIndex = 0; endpointIndex < applyEndpoints.length; endpointIndex += 1) {
    const endpoint = applyEndpoints[endpointIndex];
    for (let payloadIndex = 0; payloadIndex < payloadVariants.length; payloadIndex += 1) {
      const variant = payloadVariants[payloadIndex];
      try {
        const res = await httpClient.post(endpoint, variant, {
          silent: true,
          expectedStatuses: [400, 404, 401, 403, 413, 422],
        });
        const responseData = res.data as unknown;
        if (responseData && typeof responseData === "object" && !Array.isArray(responseData)) {
          return {
            ...(responseData as Record<string, unknown>),
            __debugApplyEndpoint: endpoint,
            __debugPayloadVariant: payloadIndex,
          };
        }
        return {
          data: responseData,
          __debugApplyEndpoint: endpoint,
          __debugPayloadVariant: payloadIndex,
        };
      } catch (error) {
        lastError = error;
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;
        const hasNextPayloadVariant = payloadIndex < payloadVariants.length - 1;
        const hasNextEndpoint = endpointIndex < applyEndpoints.length - 1;
        if (status === 404 && hasNextEndpoint) {
          break;
        }
        if (isUnexpectedFieldError(error) && hasNextPayloadVariant) {
          continue;
        }
        if (isJobCategoryFieldError(error) && hasNextPayloadVariant) {
          continue;
        }
        if (isJobCategoryFieldError(error) && !hasNextPayloadVariant && hasNextEndpoint) {
          break;
        }
        if (status === 422 && hasNextPayloadVariant) {
          continue;
        }
        if (status === 404 && !hasNextEndpoint) {
          continue;
        }
        throw error;
      }
    }
  }
  if (lastError) throw lastError;
  throw new Error("Unable to submit job application.");
}

