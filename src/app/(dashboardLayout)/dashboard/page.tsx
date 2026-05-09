import ClientDashboardContent from "@/components/modules/dashboard/ClientDashboardContent";
import { getUserInfo } from "@/src/services/auth.services";
import { getDashboardData } from "@/src/services/dashboard.services";
import { ICandidateDashboardStats } from "@/src/types/candidate.dashboard";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  const currentUser = await getUserInfo();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: ["candidate-dashboard-data"],
      queryFn: () => getDashboardData<ICandidateDashboardStats>(),
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientDashboardContent />
    </HydrationBoundary>
  );
};

export default DashboardPage;