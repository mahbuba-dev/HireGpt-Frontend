import React from 'react';
import { useJobs } from '@/src/hooks/useJobs';
import type { Job } from '@/src/types/job.types';

interface JobListProps {
  params?: Record<string, any>;
  onSelectJob?: (job: Job) => void;
}

export function JobList({ params, onSelectJob }: JobListProps) {
  const { data, isLoading, error } = useJobs(params);

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs.</div>;
  if (!data || data.jobs.length === 0) return <div>No jobs found.</div>;

  return (
    <ul className="divide-y divide-gray-200">
      {data.jobs.map((job) => (
        <li key={job.id} className="py-4 cursor-pointer hover:bg-gray-50" onClick={() => onSelectJob?.(job)}>
          <div className="font-semibold text-lg">{job.title}</div>
          <div className="text-sm text-gray-600">{job.location} • {job.type} • {job.experienceLevel}</div>
          <div className="text-xs text-gray-400">{job.description.slice(0, 100)}...</div>
        </li>
      ))}
    </ul>
  );
}
