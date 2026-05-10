"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllRecruiters } from "@/src/services/recruiter.service";

export function usePendingApplicantsCount(enabled: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ["pending-applicants-count"],
    queryFn: () =>
      getAllRecruiters({
        page: 1,
        limit: 200,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    enabled,
    staleTime: 30 * 1000,
    refetchInterval: enabled ? 30 * 1000 : false,
  });

  const pendingCount = useMemo(() => {
    const recruiters = Array.isArray(data?.data) ? data.data : [];
    return recruiters.filter((recruiter) => !recruiter.verified).length;
  }, [data]);

  return {
    pendingCount,
    isLoading,
  };
}
