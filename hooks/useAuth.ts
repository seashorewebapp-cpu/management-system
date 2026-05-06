"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser, createUser } from "@/lib/actions/auth";
import { logoutAction } from "@/lib/actions/logout";
import { useAuthStore } from "@/stores/authStore";

// ---------- login ----------

/** Subset of the user returned by the loginUser server action */
interface LoginUser {
  id: string;
  name: string;
  email: string;
}

interface LoginResult {
  success?: boolean;
  user?: LoginUser;
  error?: string;
}

export function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<LoginResult> => {
      return loginUser(formData);
    },
    onSuccess: (data) => {
      if (data.success && data.user) {
        // Spread the minimal login payload; timestamps default to now
        // so the Zustand display cookie stays consistent with SafeUser shape
        setUser({
          ...data.user,
          created_at: new Date(),
          updated_at: new Date(),
        });
        router.push("/dashboard");
      }
    },
  });
}

// ---------- register ----------

interface RegisterResult {
  success?: boolean;
  error?: string;
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: FormData): Promise<RegisterResult> => {
      return createUser(formData);
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/auth/login");
      }
    },
  });
}

// ---------- logout ----------

export function useLogout() {
  const { logout } = useAuthStore();

  return async () => {
    // 1. Clear Zustand + js-cookie (client-side display cookie)
    logout();
    // 2. Call server action → deletes HttpOnly cookie + redirects to /auth/login
    await logoutAction();
  };
}
