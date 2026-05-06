"use client";

import { useAuthStore } from "@/stores/authStore";

/**
 * Convenience hook for reading the current session anywhere in the app.
 *
 * @example
 * const { user, isAuthenticated } = useSession();
 */
export function useSession() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return { user, isAuthenticated };
}
