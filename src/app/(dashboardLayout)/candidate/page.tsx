import React from 'react';
// TODO: Import candidate profile, applied jobs, saved jobs, notifications

export default function CandidateDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
      {/* Profile/About Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        {/* <CandidateProfile /> */}
      </section>
      {/* Applied Jobs */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Applied Jobs</h2>
        {/* <AppliedJobsList /> */}
      </section>
      {/* Saved Jobs */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Saved Jobs</h2>
        {/* <JobSavedList /> */}
      </section>
      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {/* <CandidateNotifications /> */}
      </section>
    </div>
  );
}
