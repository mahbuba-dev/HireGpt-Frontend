export interface JobApplication {
  id: string;
  jobId: string;
  jobSeekerId: string;
  recruiterId: string;
  resumeUrl: string;
  coverLetter?: string;
  status: string; // ApplicationStatus enum
  createdAt: string;
  updatedAt: string;
  // Relations (optional)
  job?: Job;
  jobSeeker?: Candidate;
  recruiter?: Recruiter;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  // ...other candidate fields
}
