// Candidate service: all candidate-related logic, aligned to recruiter/candidate/jobCategory/application/interview domain.


import { httpClient } from "../lib/axious/httpClient";
import type { ApiResponse } from "../types/api.types";
import type { IUserManagementQueryParams } from "../types/user.types";

// User summary type for candidate.user
export interface UserSummary {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICandidate {
  id: string;
  fullName: string;
  email: string;
  profilePhoto?: string | null;
  phone?: string | null;
  address?: string | null;
  headline?: string | null;
  summary?: string | null;
  experience: number;
  skills: string[];
  aiScore?: number | null;
  aiTags: string[];
  isDeleted: boolean;
  deletedAt?: string | null;
  userId: string;
  resumeId?: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations (optional)
  user?: UserSummary;
  resume?: unknown;
  chatRooms?: unknown[];
  interviews?: unknown[];
  applications?: unknown[];
  aiChats?: unknown[];
  savedJobs?: unknown[];
}

export interface IUpdateCandidatePayload {
  fullName?: string;
  email?: string;
  profilePhoto?: string;
  phone?: string;
  address?: string;
  headline?: string;
  summary?: string;
  experience?: number;
  skills?: string[];
}

const normalizeCandidates = (payload: any[] | undefined): ICandidate[] => {
  if (!Array.isArray(payload)) {
    console.log("[normalizeCandidates] payload is not array:", payload);
    return [];
  }
  console.log("[normalizeCandidates] payload array:", payload);
  return payload.map((record) => {
    // Type guard: ensure record is an object
    const safe = typeof record === "object" && record !== null ? record : {};
    const user: UserSummary = typeof safe.user === "object" && safe.user !== null ? safe.user : {};
    return {
      ...safe,
      user,
      fullName: safe.fullName ?? safe.fullname ?? user.name ?? "",
      email: safe.email ?? user.email ?? "",
      phone: safe.phone ?? "",
      address: safe.address ?? "",
      profilePhoto: safe.profilePhoto ?? null,
      userId: safe.userId ?? user.id ?? safe.id ?? "",
      isDeleted: safe.isDeleted ?? false,
      createdAt: safe.createdAt ?? user.createdAt ?? "",
      updatedAt: safe.updatedAt ?? user.updatedAt ?? "",
      // ...other fields as needed
    };
  });
};



export const getAllCandidates = async (
  params: IUserManagementQueryParams = {},
): Promise<ApiResponse<ICandidate[]>> => {
  // Remove limit if it's 0 or undefined
  const cleanParams = { ...params };
  if (!cleanParams.limit || cleanParams.limit <= 0) {
    delete cleanParams.limit;
  }
  console.log('[getAllCandidates] params sent to API:', cleanParams);
  const response = await httpClient.get<any>("/candidates", {
    params: cleanParams as Record<string, unknown>,
    silent: true,
  });
  console.log("[getAllCandidates] raw API response:", response);
  // Extract candidates array and meta from nested or flat response
  // Handles both { data: [...] } and { ...array }
  const candidatesArray = Array.isArray(response.data?.data)
    ? response.data.data
    : Array.isArray(response.data)
      ? response.data
      : [];
  return {
    ...response,
    data: normalizeCandidates(candidatesArray),
    meta: response.data?.meta,
  };
};

export const getCandidateById = async (candidateId: string) => {
  try {
    const response = await httpClient.get<ICandidate>(`/candidates/${candidateId}`, {
      silent: true,
    });
    const [candidate] = normalizeCandidates(response.data ? [response.data] : []);
    return candidate;
  } catch (err: any) {
    // If error is 400 or 404, return undefined for user-friendly handling
    if (err?.response?.status === 400 || err?.response?.status === 404) {
      return undefined;
    }
    throw err;
  }
};

export const updateCandidateAction = async (candidateId: string, payload: IUpdateCandidatePayload) => {
  const response = await httpClient.put<ICandidate>(`/candidates/${candidateId}`, payload);
  return response.data;
};

export const deleteCandidateAction = async (candidateId: string) => {
  const response = await httpClient.delete(`/candidates/${candidateId}`);
  return response.data;
};
