import { httpClient } from '@/src/lib/axious/httpClient';
import type { Job, JobListResponse } from '@/src/types/job.types';

// Create a new job (recruiter only)
export async function createJob(data: Partial<Job>) {
  return httpClient.post<Job>('/jobs', data);
}

// Get all jobs (with optional search, filter, pagination)
export async function getAllJobs(params?: Record<string, any>) {
  return httpClient.get<JobListResponse>('/jobs', { params });
}

// Get job by ID
export async function getJobById(id: string) {
  return httpClient.get<Job>(`/jobs/${id}`);
}

// Update job (recruiter only)
export async function updateJob(id: string, data: Partial<Job>) {
  return httpClient.put<Job>(`/jobs/${id}`, data);
}

// Delete job (soft delete)
export async function deleteJob(id: string) {
  return httpClient.delete(`/jobs/${id}`);
}
