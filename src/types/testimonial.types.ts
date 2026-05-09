export interface ITestimonial {
  id: string;
  rating: number;
  comment?: string | null;
  candidateId: string;
  recruiterId: string;
  reviewerName?: string | null;
  reviewerImage?: string | null;
  interviewId: string;
  createdAt: string;
  updatedAt?: string;
  isHidden?: boolean;
  status?: "APPROVED" | "HIDDEN" | "PENDING";
  recruiterReply?: string | null;
  repliedAt?: string;
  moderationStatus?: string;
  candidate?: {
    id?: string;
    fullName?: string;
    email?: string;
    user?: {
      name?: string;
      email?: string;
    } | null;
  } | null;
  recruiter?: {
    id?: string;
    fullName?: string;
    title?: string;
  } | null;
  interview?: {
    id?: string;
    date?: string;
    status?: string;
  } | null;
}
