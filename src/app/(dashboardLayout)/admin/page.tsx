import React from 'react';
// TODO: Import admin tables/components for candidates, recruiters, jobs, categories

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Candidates Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Candidates</h2>
        {/* <CandidatesTable /> */}
      </section>
      {/* Recruiters Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Recruiters</h2>
        {/* <RecruitersTable /> */}
      </section>
      {/* Jobs Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Jobs</h2>
        {/* <JobsTable /> */}
      </section>
      {/* Categories Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">All Categories</h2>
        {/* <CategoriesTable /> */}
      </section>
    </div>
  );
}
