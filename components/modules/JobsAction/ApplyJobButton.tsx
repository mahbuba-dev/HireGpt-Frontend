"use client";

import { useState } from "react";
import type { Job } from "@/src/types/job.types";
import ApplyJobForm from "../Jobs/ApplyJob";

type ApplyJobButtonProps = {
  job: Job;
  isLoggedIn?: boolean;
  userRole?: string | null;
};

export default function ApplyJobButton({ job }: ApplyJobButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2 flex justify-center">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-3 bg-green-600 text-white rounded-lg text-lg font-medium hover:bg-green-700 transition"
      >
        Apply for Job
      </button>
      {open && (
        <ApplyJobForm job={job} open={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
