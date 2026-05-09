import React from "react";
import { useRecruiters } from "@/src/hooks/useRecruiters";
import type { Recruiter } from "@/src/types/recruiter.types";

export const RecruiterList: React.FC = () => {
  const { data: recruiters, isLoading, error } = useRecruiters();

  if (isLoading) return <div>Loading recruiters...</div>;
  if (error) return <div>Error loading recruiters.</div>;
  if (!recruiters || recruiters.length === 0) return <div>No recruiters found.</div>;

  return (
    <div className="space-y-4">
      {recruiters.map((recruiter: Recruiter) => (
        <div key={recruiter.id} className="border rounded p-4 flex flex-col md:flex-row gap-4 items-center">
          <img
            src={recruiter.profilePhoto || "/default-avatar.png"}
            alt={recruiter.fullName}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div className="flex-1">
            <div className="font-bold text-lg">{recruiter.fullName}</div>
            <div className="text-gray-500">{recruiter.email}</div>
            <div className="text-gray-400 text-sm">{recruiter.companyName || recruiter.designation || "—"}</div>
            <div className="text-xs mt-1">Experience: {recruiter.experience} yrs</div>
            <div className="text-xs">Active Jobs: {recruiter.activeJobs}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruiterList;
