import type { IRecruiter } from "./recruiter.types";
import { ITestimonial } from "./testimonial.types";

export type InterviewStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "ONGOING";
 
export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export interface IScheduleSlot {
  id: string;
  startDateTime: string;
  endDateTime?: string | null;
  title?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPayment {
  id: string;
  consultationId: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  stripeEventId?: string | null;
  paymentGatewayData?: unknown;
  createdAt: string;
  updatedAt: string;
}

  id: string;
  fullName: string;
  email: string;
  profilePhoto?: string | null;
  phone?: string | null;
}

// export interface IConsultation {
//   id: string;
//   videoCallId: string;
//   status: ConsultationStatus;
//   paymentStatus: PaymentStatus;
//   date: string;
//   clientId: string;
//   expertId?: string | null;
//   expertScheduleId: string;
//   client?: IClientBasicInfo | null;
//   expert?: IExpert | null;
//   payment?: IPayment | null;
//   createdAt: string;
//   updatedAt: string;
// }
export interface IInterview {
  id: string;
  videoCallId: string;
  status: InterviewStatus;
  paymentStatus: PaymentStatus;
  date: string;
  candidateId: string;
  recruiterId?: string | null;
  recruiterScheduleId: string;
  candidate?: IClientBasicInfo | null;
  recruiter?: IRecruiter | null;
  recruiterSchedule?: IRecruiterSchedule | null;
  payment?: IPayment | null;
  testimonial?: ITestimonial | null;
  createdAt: string;
  updatedAt: string;
}

export interface IRecruiterSchedule {
  id: string;
  recruiterId: string;
  scheduleId: string;
  interviewId?: string | null;
  isBooked: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  schedule?: IScheduleSlot | null;
  recruiter?: IRecruiter | null;
  interview?: IInterview | null;
}

export interface IBookInterviewPayload {
  recruiterId: string;
  recruiterScheduleId: string;
  couponCode?: string;
}

export interface IBookInterviewResult {
  interview: IInterview;
  payment: IPayment;
  paymentUrl?: string | null;
}

export interface IInitiateConsultationPaymentResult {
  paymentUrl: string;
}

export interface IExpertScheduleAssignmentPayload {
  scheduleIds: string[];
}

export interface IExpertScheduleUpdatePayload {
  scheduleIds: {
    id: string;
    shouldDelete: boolean;
  }[];
}

export interface IExpertScheduleQueryParams {
  [key: string]: unknown;
  page?: number;
  limit?: number;
  searchTerm?: string;
  expertId?: string;
  scheduleId?: string;
  isBooked?: boolean;
  isDeleted?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IConsultationQueryParams {
  [key: string]: unknown;
  page?: number;
  limit?: number;
  status?: ConsultationStatus;
  paymentStatus?: PaymentStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
