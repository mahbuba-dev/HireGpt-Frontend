import { httpClient } from '@/src/lib/axious/httpClient';

// Apply to a job
export async function applyToJob(data: {
  jobId: string;
  jobSeekerId: string;
  recruiterId: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  return httpClient.post('/jobs/applications/apply', data);
}

// Update application status (recruiter only)
export async function updateApplicationStatus(data: {
  applicationId: string;
  status: string;
}) {
  return httpClient.put('/jobs/applications/status', data);
}

// Candidate: get applied jobs
export async function getAppliedJobs() {
  return httpClient.get('/jobs/applications/applied');
}

// Candidate: get saved jobs
export async function getSavedJobs() {
  return httpClient.get('/jobs/applications/saved');
}

// Recruiter: get applicants for a job
export async function getApplicantsForJob(jobId: string) {
  return httpClient.get(`/jobs/applications/applicants/${jobId}`);
}
