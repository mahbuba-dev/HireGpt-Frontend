import type {
  IJobCategory,
  IJobCategoryCreatePayload,
  IJobCategoryUpdatePayload,
} from "@/src/types/industry.types";
import { httpClient } from "../lib/axious/httpClient";

type JobCategoryQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
};

// GET ALL
export const getAllJobCategories = async (
  params?: JobCategoryQueryParams | string,
) => {
  try {
    if (typeof params === "string") {
      const res = await httpClient.get<IJobCategory[]>(
        params ? `/job-categories?${params}` : "/job-categories",
      );

      return {
        ...res,
        data: Array.isArray(res.data) ? res.data : [],
      };
    }

    const res = await httpClient.get<IJobCategory[]>("/job-categories", {
      params: (params ?? {}) as Record<string, unknown>,
      silent: true,
    });

    return {
      ...res,
      data: Array.isArray(res.data) ? res.data : [],
    };
  } catch (error) {
    console.log("Error fetching industries:", error);
    throw error;
  }
};

export const getJobCategories = async (): Promise<IJobCategory[]> => {
  const res = await getAllJobCategories();
  console.log("job categories:", res.data);
  return Array.isArray(res.data) ? res.data : [];
};

// CREATE
export const createJobCategory = async (formData: FormData) => {
  try {
    const res = await httpClient.post<{
      success: boolean;
      message: string;
      data: any;
    }>("/job-categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      silent: true,
    });
    return res;
  } catch (error: any) {
    // Normalize error so UI can handle gracefully and terminal never crashes
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.message || "Failed to create job category";
    return {
      success: false,
      message,
      status,
      data: null,
      error,
    };
  }
};
// UPDATE
export const updateJobCategory = async (id: string, payload: IJobCategoryUpdatePayload) => {
  const trimmedName = payload.name?.trim();
  const trimmedDescription = payload.description?.trim();

  const hasFile = Boolean(payload.file);
  const jsonBody = {
    ...(trimmedName ? { name: trimmedName } : {}),
    ...(typeof trimmedDescription === "string" ? { description: trimmedDescription } : {}),
  };

  const formData = new FormData();
  if (trimmedName) formData.append("name", trimmedName);
  if (typeof trimmedDescription === "string") formData.append("description", trimmedDescription);
  if (payload.file) formData.append("file", payload.file);

  const jsonOptions = { silent: true };
  const multipartOptions = {
    headers: { "Content-Type": "multipart/form-data" },
    silent: true,
  };

  const attempts: Array<() => Promise<unknown>> = hasFile
    ? [
        () => httpClient.patch<IJobCategory>(`/job-categories/${id}`, formData, multipartOptions),
        () => httpClient.put<IJobCategory>(`/job-categories/${id}`, formData, multipartOptions),
        () => httpClient.patch<IJobCategory>(`/job-category/${id}`, formData, multipartOptions),
        () => httpClient.put<IJobCategory>(`/job-category/${id}`, formData, multipartOptions),
        () => httpClient.patch<IJobCategory>(`/job-categories/update/${id}`, formData, multipartOptions),
        () => httpClient.put<IJobCategory>(`/job-categories/update/${id}`, formData, multipartOptions),
      ]
    : [
        () => httpClient.patch<IJobCategory>(`/job-categories/${id}`, jsonBody, jsonOptions),
        () => httpClient.put<IJobCategory>(`/job-categories/${id}`, jsonBody, jsonOptions),
        () => httpClient.patch<IJobCategory>(`/job-category/${id}`, jsonBody, jsonOptions),
        () => httpClient.put<IJobCategory>(`/job-category/${id}`, jsonBody, jsonOptions),
        () => httpClient.patch<IJobCategory>(`/job-categories/update/${id}`, jsonBody, jsonOptions),
        () => httpClient.put<IJobCategory>(`/job-categories/update/${id}`, jsonBody, jsonOptions),
      ];

  for (let index = 0; index < attempts.length; index += 1) {
    try {
      const result = await attempts[index]();
      return result;
    } catch (error: any) {
      const status = error?.response?.status;
      const isLastAttempt = index === attempts.length - 1;

      if (status !== 404 || isLastAttempt) {
        console.log("Error updating job category:", error);
        throw error;
      }
    }
  }

  throw new Error("Failed to update job category");
};

// DELETE
export const deleteJobCategory = async (id: string) => {
  try {
    return await httpClient.delete<boolean>(`/job-categories/${id}`);
  } catch (error) {
    console.log("Error deleting job category:", error);
    throw error;
  }
};

// GET BY ID
export const getJobCategoryById = async (id: string) => {
  try {
    return await httpClient.get<IJobCategory>(`/job-categories/${id}`);
  } catch (error) {
    console.log("Error fetching job category by id:", error);
    throw error;
  }
};
