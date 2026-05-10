"use client";
import React, { useState } from 'react';
import { useApplyToJob } from '@/src/hooks/useJobApplications';

interface JobApplyFormProps {
  jobId: string;
  recruiterId: string;
  jobSeekerId: string;
  onSuccess?: () => void;
}

export function JobApplyForm({ jobId, recruiterId, jobSeekerId, onSuccess }: JobApplyFormProps) {
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const { mutate, status, error } = useApplyToJob();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ jobId, recruiterId, jobSeekerId, resumeUrl, coverLetter }, { onSuccess });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Resume URL</label>
        <input type="url" value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} required className="input input-bordered w-full" />
      </div>
      <div>
        <label className="block font-medium">Cover Letter (optional)</label>
        <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="textarea textarea-bordered w-full" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'pending'}>Apply</button>
      {status === 'success' && <div className="text-green-600">Application submitted!</div>}
      {error && <div className="text-red-600">{(error as any).message}</div>}
    </form>
  );
}
