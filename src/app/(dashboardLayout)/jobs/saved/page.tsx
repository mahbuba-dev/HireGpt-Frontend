import React from 'react';
import { JobSavedList } from '@/components/modules/Job/JobSavedList';
import { JobDetail } from '@/components/modules/Job/JobDetail';

export default function SavedJobsPage() {
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <h2 className="text-xl font-bold mb-2">Saved Jobs</h2>
        <JobSavedList onSelectJob={job => setSelectedJobId(job.id)} />
      </div>
      <div className="md:col-span-2">
        {selectedJobId ? (
          <JobDetail jobId={selectedJobId} />
        ) : (
          <div className="text-gray-400 text-center mt-20">Select a job to view details</div>
        )}
      </div>
    </div>
  );
}
