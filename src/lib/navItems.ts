// --- DASHBOARD MINI STATS & QUICK ACTIONS (for widgets) ---
// (Exported for dashboard widgets, not nav)
export const adminMiniStats = (data: any, formatCurrency: (n: number) => string) => [
  { label: "Recruiters", value: data?.recruiterCount || 0 },
  { label: "Candidates", value: data?.candidateCount || 0 },
  { label: "Jobs", value: data?.jobCount || 0 },
  { label: "Revenue", value: formatCurrency(data?.totalRevenue || 0) },
];
export const adminQuickActions = [
  { title: "Recruiters", desc: "Manage recruiters", href: "/admin/dashboard/recruiter-management", icon: "UserCog", gradient: "from-blue-500 to-cyan-500" },
  { title: "Candidates", desc: "Manage candidates", href: "/admin/dashboard/candidate-management", icon: "Users", gradient: "from-cyan-500 to-teal-500" },
  { title: "Jobs", desc: "All job posts", href: "/admin/dashboard/job-management", icon: "Layers", gradient: "from-indigo-500 to-blue-500" },
    { title: "Payments", desc: "Revenue & payouts", href: "/admin/dashboard/payment-management", icon: "DollarSign", gradient: "from-emerald-500 to-teal-500" },
];
export const recruiterMiniStats = (data: any, formatCurrency: (n: number) => string) => [
  { label: "Jobs Posted", value: data?.jobCount || 0 },
  { label: "Applications", value: data?.applicationCount || 0 },
  { label: "Messages", value: data?.messageCount || 0 },
  { label: "Hires", value: data?.hireCount || 0 },
];
export const recruiterQuickActions = [
  { title: "Post Job", desc: "Create new job", href: "/recruiter/dashboard/post-job", icon: "PlusCircle", gradient: "from-blue-500 to-cyan-500" },
  { title: "My Jobs", desc: "Manage jobs", href: "/recruiter/dashboard/my-jobs", icon: "Layers", gradient: "from-cyan-500 to-teal-500" },
  { title: "Messages", desc: "Message candidates", href: "/recruiter/dashboard/messages", icon: "MessageSquare", gradient: "from-indigo-500 to-blue-500" },
    { title: "Applications", desc: "View applications", href: "/recruiter/dashboard/applications", icon: "Users", gradient: "from-amber-500 to-orange-500" },
];
export const candidateMiniStats = (data: any) => [
  { label: "Jobs Applied", value: data?.appliedCount || 0 },
  { label: "Saved Jobs", value: data?.savedCount || 0 },
  { label: "Interviews", value: data?.interviewCount || 0 },
];
export const candidateQuickActions = [
  { title: "Browse Jobs", desc: "Find jobs", href: "/jobs", icon: "Search", gradient: "from-blue-500 to-cyan-500" },
  { title: "Saved Jobs", desc: "Your saved jobs", href: "/candidate/saved-jobs", icon: "Bookmark", gradient: "from-cyan-500 to-teal-500" },
  { title: "Messages", desc: "Chat with recruiters", href: "/candidate/messages", icon: "MessageSquare", gradient: "from-indigo-500 to-blue-500" },
  { title: "Profile", desc: "Update details", href: "/my-profile", icon: "UserCircle2", gradient: "from-fuchsia-500 to-pink-500" },
];

import { NavSection } from "../types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtilis";

// --- NAVIGATION STRUCTURE ---

// COMMON NAV ITEMS
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        { title: "Home", href: "/", icon: "Home" },
        { title: "Dashboard", href: defaultDashboard, icon: "LayoutDashboard" },
        { title: "My Profile", href: "/my-profile", icon: "User" },
        { title: "Change Password", href: "/change-password", icon: "Settings" },
      ],
    },
  ];
};

// RECRUITER NAV ITEMS
export const recruiterNavItems: NavSection[] = [
  {
    title: "Recruiter Panel",
    items: [
      { title: "Post Job", href: "/recruiter/dashboard/post-job", icon: "PlusCircle" },
      { title: "My Jobs", href: "/recruiter/dashboard/my-jobs", icon: "Layers" },
      { title: "Applications", href: "/recruiter/dashboard/applications", icon: "Users" },
      { title: "Messages", href: "/recruiter/dashboard/messages", icon: "MessageSquare" },
    ],
  },
];

// ADMIN NAV ITEMS
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      { title: "Recruiters", href: "/admin/dashboard/recruiter-management", icon: "UserCog" },
      { title: "Candidates", href: "/admin/dashboard/candidate-management", icon: "Users" },
    ],
  },
  {
    title: "Platform Management",
    items: [
      { title: "Jobs", href: "/admin/dashboard/job-management", icon: "Layers" },
      { title: "Payments", href: "/admin/dashboard/payment-management", icon: "DollarSign" },
      { title: "Messages", href: "/admin/dashboard/messages", icon: "MessageCircleMore" },
    ],
  },
];

// CANDIDATE NAV ITEMS
export const candidateNavItems: NavSection[] = [
  {
    title: "Jobs",
    items: [
      { title: "Browse Jobs", href: "/jobs", icon: "Search" },
      { title: "Saved Jobs", href: "/candidate/saved-jobs", icon: "Bookmark" },
      { title: "Applications", href: "/candidate/applications", icon: "FileText" },
      { title: "Messages", href: "/candidate/messages", icon: "MessageSquare" },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { title: "AI Assistant", href: "/candidate/ai-chat", icon: "Sparkles" },
    ],
  },
];

// FINAL ROLE-BASED NAV
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const common = getCommonNavItems(role);
  switch (role) {
    case "ADMIN":
      return [...common, ...adminNavItems];
    case "RECRUITER":
      return [...common, ...recruiterNavItems];
    case "CANDIDATE":
      return [...common, ...candidateNavItems];
    default:
      return common;
  }
};