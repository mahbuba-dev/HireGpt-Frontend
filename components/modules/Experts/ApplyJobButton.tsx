"use client";

import { useState } from "react";
import BookSessionPanel from "@/components/modules/Bokings/BookSessionPanel";
import type { Job } from "@/src/types/job.types";

type ApplyJobButtonProps = {
  job: Job;
  isLoggedIn?: boolean;
  userRole?: string | null;
};

export default function ApplyJobButton({
  job,
  isLoggedIn = false,
  userRole,
}: ApplyJobButtonProps) {
  const [openApplySignal, setOpenApplySignal] = useState(0);

  const handleOpenApply = () => {
    setOpenApplySignal((prev) => prev + 1);
  };

  return (
    <div className="py-10 flex justify-center">
      {/* Only the button */}
      <button
        onClick={handleOpenApply}
        className="px-5 py-3 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-700 transition"
      >
        Apply for Job
      </button>

      {/* Popup (replace with job application panel as needed) */}
      {/* <JobApplicationPanel
        jobId={job.id}
        jobTitle={job.title}
        recruiterName={job.recruiter?.fullName}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        openSignal={openApplySignal}
      /> */}
    </div>
  );
}
