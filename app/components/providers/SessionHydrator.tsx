"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

/**
 * Drop this anywhere above your page tree (e.g. inside RootLayout).
 * It reads the session cookie and populates the Zustand auth store
 * on the client, so the rest of the app has access to `user` instantly.
 */
export function SessionHydrator() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
