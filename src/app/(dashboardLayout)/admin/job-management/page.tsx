import React from "react";
import { getAllJobs } from "@/src/services/job.services";
import { Button } from "@/components/ui/button";

export default async function AdminJobManagementPage() {
  let jobs: any[] = [];
  let error = null;
  try {
    jobs = await getAllJobs();
  } catch (e) {
    error = "Error loading jobs.";
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Job Management</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Company</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="border px-3 py-2">{job.title}</td>
              <td className="border px-3 py-2">{job.companyName}</td>
              <td className="border px-3 py-2">{job.location}</td>
              <td className="border px-3 py-2">
                <Button variant="destructive" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
