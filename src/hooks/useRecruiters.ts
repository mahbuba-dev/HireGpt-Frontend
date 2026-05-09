import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllRecruiters,
  getRecruiterById,
  updateRecruiter,
  deleteRecruiter,
} from "../services/recruiter.service";
import type { Recruiter, UpdateRecruiterPayload } from "../types/recruiter.types";

export function useRecruiters(params: Record<string, unknown> = {}) {
  return useQuery<Recruiter[]>({
    queryKey: ["recruiters", params],
    queryFn: () => getAllRecruiters(params).then((res) => res.data),
  });
}

export function useRecruiter(recruiterId: string) {
  return useQuery<Recruiter | null>({
    queryKey: ["recruiter", recruiterId],
    queryFn: () => getRecruiterById(recruiterId),
    enabled: !!recruiterId,
  });
}

export function useUpdateRecruiter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recruiterId, payload }: { recruiterId: string; payload: UpdateRecruiterPayload }) =>
      updateRecruiter(recruiterId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
    },
  });
}

export function useDeleteRecruiter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recruiterId: string) => deleteRecruiter(recruiterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
    },
  });
}
