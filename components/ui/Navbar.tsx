import { getDefaultDashboardRoute, UserRole } from "@/src/lib/authUtilis";
import { getUserInfo } from "@/src/services/auth.services";

import NavbarClient from "./NavbarClient";
import { NAV_ITEMS } from "./navConfig";

const Navbar = async () => {
  const user = await getUserInfo();
  const isLoggedIn = Boolean(user);
  const dashboardHref = user?.role
    ? getDefaultDashboardRoute(user.role as UserRole)
    : "/dashboard";

  let navItems = NAV_ITEMS.landing;
  if (isLoggedIn && user?.role === "CANDIDATE") navItems = NAV_ITEMS.candidate;
  if (isLoggedIn && user?.role === "RECRUITER") navItems = NAV_ITEMS.recruiter;
  if (isLoggedIn && user?.role === "ADMIN") navItems = NAV_ITEMS.admin;

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
