import { ApiResponse } from "./api.types";

export interface IJobCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IJobCategoryCreatePayload {
  name: string;
  description?: string | null;
  file?: File | null; // MUST be "file" because backend uses multerUpload.single("file")
}

export interface IJobCategoryUpdatePayload {
  name?: string;
  description?: string | null;
  file?: File | null; // MUST be "file" because backend uses multerUpload.single("file")
}

export type IJobCategoryListResponse = ApiResponse<IJobCategory[]>;