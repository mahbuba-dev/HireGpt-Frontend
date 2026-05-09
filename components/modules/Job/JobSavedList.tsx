import React from 'react';
import { useSavedJobs } from '@/src/hooks/useJobApplications';
import type { Job } from '@/src/types/job.types';

interface JobSavedListProps {
  onSelectJob?: (job: Job) => void;
}

export function JobSavedList({ onSelectJob }: JobSavedListProps) {
  const { data, isLoading, error } = useSavedJobs();

  if (isLoading) return <div>Loading saved jobs...</div>;
  if (error) return <div>Error loading saved jobs.</div>;
  if (!data || data.length === 0) return <div>No saved jobs.</div>;

  return (
    <ul className="divide-y divide-gray-200">
      {data.map((job: Job) => (
        <li key={job.id} className="py-4 cursor-pointer hover:bg-gray-50" onClick={() => onSelectJob?.(job)}>
          <div className="font-semibold text-lg">{job.title}</div>
          <div className="text-sm text-gray-600">{job.location} • {job.type} • {job.experienceLevel}</div>
        </li>
      ))}
    </ul>
  );
}
