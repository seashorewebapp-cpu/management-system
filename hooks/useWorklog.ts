"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDailyLog, updateStatus, addPayments, updatePayment } from "@/lib/actions/worklog";
import { projectKeys } from "./useProjects";

// ---------- daily log ----------

export function useCreateDailyLog(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return createDailyLog(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.logs(projectId) });
    },
  });
}

// ---------- status update ----------

type ProjectStatus = "pending" | "in_progress" | "completed" | "on_hold";

export function useUpdateStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return updateStatus(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
      // Also refresh the list so status badge updates there too
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

// ---------- payments ----------

export function useAddPayment(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return addPayments(formData);
    },
    onSuccess: () => {
      // Refresh the project detail for updated financial figures
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.payments(projectId) });
    },
  });
}

export function useUpdatePayment(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return updatePayment(formData);
    },
    onSuccess: () => {
      // Refresh the project detail for updated financial figures
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.payments(projectId) });
    },
  });
}
