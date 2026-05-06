"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getOutstandingProjects,
  getActiveProjectsForDashboard,
} from "@/lib/actions/dashboard";

export const dashboardKeys = {
  stats: ["dashboard", "stats"] as const,
  outstanding: ["dashboard", "outstanding"] as const,
  activeProjects: ["dashboard", "activeProjects"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: getDashboardStats,
    staleTime: 30 * 1000, // 30s — stats can be slightly stale
  });
}

export function useOutstandingProjects(limit = 5) {
  return useQuery({
    queryKey: [...dashboardKeys.outstanding, limit],
    queryFn: () => getOutstandingProjects(limit),
  });
}

export function useActiveProjectsDashboard(limit = 5) {
  return useQuery({
    queryKey: [...dashboardKeys.activeProjects, limit],
    queryFn: () => getActiveProjectsForDashboard(limit),
  });
}
