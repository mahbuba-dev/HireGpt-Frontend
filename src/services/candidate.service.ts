// DEPRECATED: Use candidate.service.ts for all candidate-related logic. This file is no longer maintained.

import { httpClient } from "../lib/axious/httpClient";
import type { ApiResponse } from "../types/api.types";
import type { UserManagementItem, IUserManagementQueryParams } from "../types/user.types";

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
  resumeid?: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations (optional)
  user?: unknown;
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
  if (!Array.isArray(payload)) return [];
  return payload.map((record) => {
    // Type guard: ensure record is an object
    const safe = typeof record === "object" && record !== null ? record : {};
    const user = typeof safe.user === "object" && safe.user !== null ? safe.user : {};
    return {
      ...safe,
      fullName: safe.fullName ?? user.name ?? "",
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
  const response = await httpClient.get<ICandidate[]>("/candidates", {
    params: params as Record<string, unknown>,
    silent: true,
  });
  return {
    ...response,
    data: normalizeCandidates(response.data),
  };
};

export const getCandidateById = async (candidateId: string) => {
  const response = await httpClient.get<ICandidate>(`/candidates/${candidateId}`, {
    silent: true,
  });
  const [candidate] = normalizeCandidates(response.data ? [response.data] : []);
  return candidate;
};

export const updateCandidateAction = async (candidateId: string, payload: IUpdateCandidatePayload) => {
  const response = await httpClient.put<ICandidate>(`/candidates/${candidateId}`, payload);
  return response.data;
};

export const deleteCandidateAction = async (candidateId: string) => {
  const response = await httpClient.delete(`/candidates/${candidateId}`);
  return response.data;
};
