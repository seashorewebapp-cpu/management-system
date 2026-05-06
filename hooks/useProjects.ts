"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProjects,
  getProjectById,
  getProjectLogs,
  createProject,
  getProjectPayments,
} from "@/lib/actions/projects";

// ---------- query keys ----------

export const projectKeys = {
  all: ["projects"] as const,
  list: (page: number, pageSize: number) =>
    [...projectKeys.all, "list", { page, pageSize }] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
  logs: (id: string) => [...projectKeys.all, "logs", id] as const,
  payments: (id: string) => [...projectKeys.all, "payments", id] as const,
};

// ---------- list ----------

export function useProjects(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: projectKeys.list(page, pageSize),
    queryFn: () => getAllProjects(page, pageSize),
  });
}

// ---------- single ----------

export function useProject(projectId: string) {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
}

export function useProjectLogs(projectId: string) {
  return useQuery({
    queryKey: projectKeys.logs(projectId),
    queryFn: () => getProjectLogs(projectId),
    enabled: !!projectId,
  });
}

export function useProjectPayments(projectId: string) {
  return useQuery({
    queryKey: projectKeys.payments(projectId),
    queryFn: () => getProjectPayments(projectId),
    enabled: !!projectId,
  });
}

// ---------- create ----------

interface CreateProjectResult {
  success: boolean;
  projectId?: string;
  message?: string;
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<CreateProjectResult> => {
      return createProject(formData);
    },
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate the whole projects list so it refetches
        queryClient.invalidateQueries({ queryKey: projectKeys.all });
      }
    },
  });
}
