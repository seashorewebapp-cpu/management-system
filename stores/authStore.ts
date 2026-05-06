import Cookies from "js-cookie";
import { create } from "zustand";
import { SafeUser } from "@/types/types";

const SESSION_COOKIE = "seashore_session";
const SESSION_EXPIRY_DAYS = 7;

// ---------- helpers ----------

function persistUser(user: SafeUser) {
  Cookies.set(SESSION_COOKIE, JSON.stringify(user), {
    expires: SESSION_EXPIRY_DAYS,
    sameSite: "strict",
    // set secure: true in production
    secure: process.env.NODE_ENV === "production",
  });
}

function clearUser() {
  Cookies.remove(SESSION_COOKIE);
}

function readUserFromCookie(): SafeUser | null {
  const raw = Cookies.get(SESSION_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SafeUser;
  } catch {
    return null;
  }
}

// ---------- store ----------

interface AuthState {
  user: SafeUser | null;
  isAuthenticated: boolean;
  setUser: (user: SafeUser) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  /** Call once on app mount to rehydrate session from cookie */
  hydrate: () => {
    const user = readUserFromCookie();
    set({ user, isAuthenticated: !!user });
  },

  /** Called after a successful login */
  setUser: (user: SafeUser) => {
    persistUser(user);
    set({ user, isAuthenticated: true });
  },

  /** Clears cookie and resets state */
  logout: () => {
    clearUser();
    set({ user: null, isAuthenticated: false });
  },
}));
