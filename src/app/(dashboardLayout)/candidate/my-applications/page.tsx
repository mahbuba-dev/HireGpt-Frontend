import React from "react";
import { getAppliedJobs } from "@/src/services/jobApplication.service";

export default async function CandidateMyApplicationsPage() {
  let applications: any[] = [];
  let error = null;
  try {
    applications = await getAppliedJobs();
  } catch (e) {
    error = "Error loading applications.";
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Job Applications</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Job Title</th>
            <th className="border px-3 py-2">Company</th>
            <th className="border px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="border px-3 py-2">{app.job?.title}</td>
              <td className="border px-3 py-2">{app.job?.companyName}</td>
              <td className="border px-3 py-2">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
