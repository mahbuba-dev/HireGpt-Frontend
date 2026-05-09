import React from "react";
import { useRecruiter } from "@/src/hooks/useRecruiters";
import type { Recruiter } from "@/src/types/recruiter.types";

interface RecruiterProfileProps {
  recruiterId: string;
}

export const RecruiterProfile: React.FC<RecruiterProfileProps> = ({ recruiterId }) => {
  const { data: recruiter, isLoading, error } = useRecruiter(recruiterId);

  if (isLoading) return <div>Loading recruiter profile...</div>;
  if (error) return <div>Error loading recruiter profile.</div>;
  if (!recruiter) return <div>Recruiter not found.</div>;

  return (
    <div className="max-w-xl mx-auto border rounded p-6 bg-white shadow">
      <div className="flex items-center gap-6">
        <img
          src={recruiter.profilePhoto || "/default-avatar.png"}
          alt={recruiter.fullName}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <div className="font-bold text-2xl">{recruiter.fullName}</div>
          <div className="text-gray-500">{recruiter.email}</div>
          <div className="text-gray-400 text-sm">{recruiter.companyName || recruiter.designation || "—"}</div>
          <div className="text-xs mt-1">Experience: {recruiter.experience} yrs</div>
          <div className="text-xs">Active Jobs: {recruiter.activeJobs}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Bio:</div>
        <div className="text-gray-700 text-sm">{recruiter.bio || "No bio provided."}</div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
