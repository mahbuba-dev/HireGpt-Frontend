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
    queryFn: () => jobAppService.getApplicantsForJob(jobId).then(res => res.data),
    enabled: !!jobId,
  });
}

// Apply to job (candidate)
export function useApplyToJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobAppService.applyToJob,
    onSuccess: () => {
      queryClient.invalidateQueries(['appliedJobs']);
      queryClient.invalidateQueries(['jobs']);
    },
  });
}

// Update application status (recruiter)
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: jobAppService.updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['applicants']);
      queryClient.invalidateQueries(['jobs']);
    },
  });
}
