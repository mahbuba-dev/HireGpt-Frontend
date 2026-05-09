import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { JobApplication } from '@/src/types/jobApplication.types';

interface JobApplicationContextValue {
  selectedApplication: JobApplication | null;
  setSelectedApplication: (app: JobApplication | null) => void;
}

const JobApplicationContext = createContext<JobApplicationContextValue | undefined>(undefined);

export function JobApplicationProvider({ children }: { children: ReactNode }) {
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  return (
    <JobApplicationContext.Provider value={{ selectedApplication, setSelectedApplication }}>
      {children}
    </JobApplicationContext.Provider>
  );
}

export function useJobApplicationContext() {
  const ctx = useContext(JobApplicationContext);
  if (!ctx) throw new Error('useJobApplicationContext must be used within a JobApplicationProvider');
  return ctx;
}
