import React from 'react';
import { useJob } from '@/src/hooks/useJobs';

interface JobDetailProps {
  jobId: string;
}

export function JobDetail({ jobId }: JobDetailProps) {
  const { data: job, isLoading, error } = useJob(jobId);

  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Error loading job details.</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <div className="text-gray-600">{job.location} • {job.type} • {job.experienceLevel}</div>
      <div className="text-gray-800">{job.description}</div>
      {job.responsibilities && <div><strong>Responsibilities:</strong> {job.responsibilities}</div>}
      <div><strong>Requirements:</strong> {job.requirements}</div>
      {job.salaryMin && <div><strong>Salary:</strong> {job.salaryMin} - {job.salaryMax} {job.currency}</div>}
      {job.aiSummary && <div className="bg-blue-50 p-2 rounded"><strong>AI Summary:</strong> {job.aiSummary}</div>}
    </div>
  );
}
