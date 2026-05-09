import { getDefaultDashboardRoute, UserRole } from "@/src/lib/authUtilis";
import { getUserInfo } from "@/src/services/auth.services";

import NavbarClient from "./NavbarClient";

const baseNavItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Insights", href: "/insights" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Help", href: "/help" },
  { label: "Legal", href: "/terms" },
  { label: "Apply for Job", href: "/apply-job" },
];

const Navbar = async () => {
  const user = await getUserInfo();
  const isLoggedIn = Boolean(user);
  const dashboardHref = user?.role
    ? getDefaultDashboardRoute(user.role as UserRole)
    : "/dashboard";

  const navItems = baseNavItems;

  const userLabel = user?.name || user?.candidate?.fullName || user?.recruiter?.fullName;

  return (
    <NavbarClient
      navItems={navItems}
      isLoggedIn={isLoggedIn}
      dashboardHref={dashboardHref}
      role={user?.role ?? null}
      userLabel={userLabel ?? null}
    />
  );
};

export default Navbar;
