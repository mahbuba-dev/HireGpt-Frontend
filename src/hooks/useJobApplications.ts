import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as jobAppService from '@/src/services/jobApplication.service';
import type { JobApplication } from '@/src/types/jobApplication.types';

// Candidate: get applied jobs
export function useAppliedJobs() {
  return useQuery({
    queryKey: ['appliedJobs'],
    queryFn: () => jobAppService.getAppliedJobs().then(res => res.data),
  });
}

// Candidate: get saved jobs
export function useSavedJobs() {
  return useQuery({
    queryKey: ['savedJobs'],
    queryFn: () => jobAppService.getSavedJobs().then(res => res.data),
  });
}

// Recruiter: get applicants for a job
export function useApplicantsForJob(jobId: string) {
  return useQuery<JobApplication[], Error>({
    queryKey: ['applicants', jobId],
    queryFn: async () => {
      const res = await jobAppService.getApplicantsForJob(jobId);
      // If response is { data: JobApplication[] }, extract .data, else return as is
      if (res && Array.isArray(res.data)) return res.data;
      if (Array.isArray(res)) return res;
      return [];
    },
    enabled: !!jobId,
  });
}

// Apply to job (candidate)
export function useApplyToJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobAppService.applyToJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

// Update application status (recruiter)
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobAppService.updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
