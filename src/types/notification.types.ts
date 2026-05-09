export type NotificationType =
  | "applications"
  | "schedule"
  | "system"
  | "user"
  | "APPLICATION"
  | "APPLICATIONS"
  | "SCHEDULE"
  | "SYSTEM"
  | "USER"
  | "RECRUITER_APPLICATION"
  | "RECRUITER_APPROVED"
  | "RECRUITER_REJECTED"
  | "RECRUITER_VERIFIED"
  | "VERIFICATION_UPDATE";

export interface INotification {
  id: string;
  type: NotificationType | string;
  message: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  read?: boolean;
  isRead?: boolean;
}

export interface IUnreadNotificationCount {
  unreadCount: number;
}

export interface ICreateNotificationPayload {
  type: string;
  message: string;
  userId?: string;
  role?: "ADMIN" | "RECRUITER" | "CANDIDATE";
}
