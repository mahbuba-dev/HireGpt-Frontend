import React, { useState } from "react";
import { useRecruiters } from "@/src/hooks/useRecruiters";
import type { Recruiter } from "@/src/types/recruiter.types";

export const RecruiterAdminTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<{ verified?: boolean | "" }>({ verified: "" });

  const params: Record<string, unknown> = {
    searchTerm: search,
    page,
    limit: pageSize,
    ...(filter.verified !== "" ? { verified: filter.verified } : {}),
  };

  const { data: recruiters = [], isLoading, error } = useRecruiters(params);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, verified: e.target.value === "" ? "" : e.target.value === "true" });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search recruiters..."
          value={search}
          onChange={handleSearch}
          className="input input-bordered"
        />
        <select value={filter.verified === "" ? "" : String(filter.verified)} onChange={handleFilter} className="select select-bordered">
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Verified</th>
              <th>Active Jobs</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={7}>Error loading recruiters.</td></tr>
            ) : recruiters.length === 0 ? (
              <tr><td colSpan={7}>No recruiters found.</td></tr>
            ) : (
              recruiters.map((recruiter: Recruiter) => (
                <tr key={recruiter.id}>
                  <td>{recruiter.fullName}</td>
                  <td>{recruiter.email}</td>
                  <td>{recruiter.companyName || recruiter.designation || "—"}</td>
                  <td>{recruiter.verified ? "Yes" : "No"}</td>
                  <td>{recruiter.activeJobs}</td>
                  <td>{recruiter.experience}</td>
                  <td>
                    {/* Actions: View/Edit/Delete buttons can be added here */}
                    <button className="btn btn-xs btn-primary">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={recruiters.length < pageSize}
        >
          Next
        </button>
        <select
          className="select select-bordered select-sm ml-2"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
        >
          {[10, 20, 50].map(size => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecruiterAdminTable;
