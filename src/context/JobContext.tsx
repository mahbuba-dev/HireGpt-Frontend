import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Job } from '@/src/types/job.types';

interface JobContextValue {
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobContext must be used within a JobProvider');
  return ctx;
}
