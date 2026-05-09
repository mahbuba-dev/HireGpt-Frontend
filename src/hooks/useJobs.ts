import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as jobService from '@/src/services/job.service';
import type { Job, JobListResponse } from '@/src/types/job.types';

// Fetch all jobs with optional filters/search/pagination
export function useJobs(params?: Record<string, any>) {
  return useQuery<JobListResponse, Error>({
    queryKey: ['jobs', params],
    queryFn: () => jobService.getAllJobs(params).then(res => res.data),
  });
}

// Fetch a single job by ID
export function useJob(jobId: string) {
  return useQuery<Job, Error>({
    queryKey: ['job', jobId],
    queryFn: () => jobService.getJobById(jobId).then(res => res.data),
    enabled: !!jobId,
  });
}

// Create, update, delete job (recruiter/admin)
export function useJobMutations() {
  const queryClient = useQueryClient();

  const createJob = useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => queryClient.invalidateQueries(['jobs']),
  });

  const updateJob = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) => jobService.updateJob(id, data),
    onSuccess: () => queryClient.invalidateQueries(['jobs']),
  });

  const deleteJob = useMutation({
    mutationFn: jobService.deleteJob,
    onSuccess: () => queryClient.invalidateQueries(['jobs']),
  });

  return { createJob, updateJob, deleteJob };
}
