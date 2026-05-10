import { httpClient } from "../lib/axious/httpClient";
import type { ApiResponse } from "../types/api.types";
import type { Recruiter, UpdateRecruiterPayload } from "../types/recruiter.types";

const normalizeRecruiter = (record: any): Recruiter => ({
  id: String(record?.id ?? ""),
  userId: String(record?.userId ?? record?.user?.id ?? ""),
  fullName: record?.fullName ?? record?.user?.name ?? "",
  email: record?.email ?? record?.user?.email ?? "",
  profilePhoto: record?.profilePhoto ?? null,
  phone: record?.phone ?? "",
  bio: record?.bio ?? "",
  companyName: record?.companyName ?? "",
  designation: record?.designation ?? "",
  experience: record?.experience ?? 0,
  hiringBudget: record?.hiringBudget ?? null,
  verified: Boolean(record?.verified),
  totalJobsPosted: record?.totalJobsPosted ?? 0,
  activeJobs: record?.activeJobs ?? 0,
  isSeeded: Boolean(record?.isSeeded),
  isDeleted: Boolean(record?.isDeleted),
  deletedAt: record?.deletedAt ?? null,
  createdAt: record?.createdAt ?? "",
  updatedAt: record?.updatedAt ?? "",
  user: record?.user,
  analytics: record?.analytics,
  chatRooms: record?.chatRooms,
  interviews: record?.interviews,
  jobApplications: record?.jobApplications,
  jobs: record?.jobs,
  chats: record?.chats,
  industries: record?.industries,
});

export const getAllRecruiters = async (params: Record<string, unknown> = {}): Promise<ApiResponse<Recruiter[]>> => {
  const response = await httpClient.get<Recruiter[]>("/reqruiters", { params, silent: true });
  return {
    ...response,
    data: Array.isArray(response.data) ? response.data.map(normalizeRecruiter) : [],
  };
};

export const getRecruiterById = async (recruiterId: string): Promise<Recruiter | null> => {
  const response = await httpClient.get<Recruiter>(`/reqruiters/${recruiterId}`, { silent: true });
  return response.data ? normalizeRecruiter(response.data) : null;
};

export const updateRecruiter = async (recruiterId: string, payload: UpdateRecruiterPayload): Promise<Recruiter> => {
  const response = await httpClient.put<Recruiter>(`/reqruiters/${recruiterId}`, payload);
  return normalizeRecruiter(response.data);
};

export const deleteRecruiter = async (recruiterId: string): Promise<Recruiter> => {
  const response = await httpClient.delete<Recruiter>(`/reqruiters/${recruiterId}`);
  return normalizeRecruiter(response.data);
};
