import { httpClient } from "../lib/axious/httpClient";
import type { IJobCategoryListResponse } from "@/src/types/jobCategory.types";

export const getAllJobCategories = async (): Promise<IJobCategoryListResponse> => {
  const res = await httpClient.get<IJobCategoryListResponse>("/industries");
  return res.data;
};
