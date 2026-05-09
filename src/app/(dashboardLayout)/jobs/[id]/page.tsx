import React from 'react';
import { JobDetail } from '@/components/modules/Job/JobDetail';
import { JobApplyForm } from '@/components/modules/Job/JobApplyForm';

// This page expects jobId from the route param
export default function JobDetailPage({ params }: { params: { id: string } }) {
  // TODO: Get recruiterId and jobSeekerId from auth/user context
  const recruiterId = '';
  const jobSeekerId = '';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <JobDetail jobId={params.id} />
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Apply to this job</h3>
        <JobApplyForm jobId={params.id} recruiterId={recruiterId} jobSeekerId={jobSeekerId} />
      </div>
    </div>
  );
}
