
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
