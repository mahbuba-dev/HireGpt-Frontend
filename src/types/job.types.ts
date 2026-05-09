// Job entity TypeScript interface (aligned with backend model)
export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  requirements: string;
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  type: string; // JobType enum (REMOTE, HYBRID, ONSITE)
  experienceLevel: string; // ExperienceLevel enum
  status: string; // JobStatus enum
  aiSummary?: string;
  aiTags: string[];
  aiScore?: number;
  recruiterId: string;
  jobCategoryId?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  // Relations (optional, for expanded queries)
  recruiter?: Recruiter;
  jobCategory?: JobCategory;
}

export interface JobCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Recruiter {
  id: string;
  fullName: string;
  email: string;
  // ...other recruiter fields
}

// For job search/filter results
export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
}
