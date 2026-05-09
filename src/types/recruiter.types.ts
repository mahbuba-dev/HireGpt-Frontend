// Recruiter model types
export interface Recruiter {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  profilePhoto?: string | null;
  phone?: string | null;
  bio?: string | null;
  companyName?: string | null;
  designation?: string | null;
  experience: number;
  hiringBudget?: number | null;
  verified: boolean;
  totalJobsPosted: number;
  activeJobs: number;
  isSeeded: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations (optional)
  user?: unknown;
  analytics?: unknown;
  chatRooms?: unknown[];
  interviews?: unknown[];
  jobApplications?: unknown[];
  jobs?: unknown[];
  chats?: unknown[];
  industries?: unknown[];
}

export interface UpdateRecruiterPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  companyName?: string;
  designation?: string;
  experience?: number;
  hiringBudget?: number;
  profilePhoto?: string;
}

export interface IRecruiterAvailability {
  id: string;
  recruiterId: string;
  scheduleId: string;
  consultationId?: string | null;
  isBooked: boolean;
  isPublished?: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  schedule?: IAvailabilitySlot | null;
  recruiter?: IRecruiter | null;
  consultation?: {
    id: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    paymentStatus: "UNPAID" | "PAID" | "FAILED" | "REFUNDED";
    date: string;
  } | null;
}

export interface ICreateRecruiterAvailabilitySlotPayload {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface IAssignRecruiterAvailabilityPayload {
  scheduleIds: string[];
}

export interface IUpdateRecruiterAvailabilityPayload {
  scheduleIds: {
    id: string;
    shouldDelete: boolean;
  }[];
}

export interface IRecruiterAvailabilityQueryParams {
  [key: string]: unknown;
  page?: number;
  limit?: number;
  searchTerm?: string;
  recruiterId?: string;
  scheduleId?: string;
  isBooked?: boolean;
  isDeleted?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IAvailabilitySlot {
  id: string;
  startDateTime: string;
  endDateTime?: string | null;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface IRecruiter {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  experience: number;
  price?: number;
  consultationFee?: number;
  isVerified?: boolean;
  isSeeded?: boolean;
  profilePhoto: string | null;
  resumeUrl?: string | null;
  jobCategoryId: string;
  jobCategory?: {
    id: string;
    name: string;
    description: string;
    icon: string | null;
  } | null;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface IApplyRecruiterPayload {
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
  title?: string;
  experience?: number;
  consultationFee: number;
  jobCategoryId: string;
  profilePhoto?: File | null;
  resume?: File | null;
}

export type RecruiterVerificationStatus = "APPROVED" | "REJECTED" | "PENDING";

export type RecruiterApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IRecruiterApplication {
  id: string;
  userId: string;
  jobCategoryId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  bio?: string | null;
  title?: string | null;
  experience: number;
  consultationFee: number;
  profilePhoto?: string | null;
  resumeUrl?: string | null;
  resumeFileName?: string | null;
  resumeFileType?: string | null;
  resumeFileSize?: number | null;
  status: RecruiterApplicationStatus;
  reviewNotes?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    status?: string;
    image?: string | null;
  } | null;
}
