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
    avatarUrl?: string | null; // Added for HireGPT: candidate profile image
    jobTitle?: string | null;  // Added for HireGPT: candidate's job title
  } | null;
  recruiter?: {
    id?: string;
    fullName?: string;
    title?: string;
    avatarUrl?: string | null; // Added for HireGPT: recruiter profile image
    company?: string | null;   // Added for HireGPT: recruiter's company
  } | null;
  interview?: {
    id?: string;
    date?: string;
    status?: string;
    jobTitle?: string | null; // Added for HireGPT: job title for the interview
  } | null;
  source?: string | null; // Added for HireGPT: where the testimonial originated (e.g., web, referral)
  aiGeneratedSummary?: string | null; // Added for HireGPT: AI-generated summary of testimonial
}
