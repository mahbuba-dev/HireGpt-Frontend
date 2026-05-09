import React from 'react';
// TODO: Import recruiter job management, applicants, notifications

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
      {/* My Jobs Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">My Jobs</h2>
        {/* <MyJobsTable /> */}
      </section>
      {/* Applicants Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Applicants</h2>
        {/* <ApplicantsTable /> */}
      </section>
      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {/* <RecruiterNotifications /> */}
      </section>
    </div>
  );
}
