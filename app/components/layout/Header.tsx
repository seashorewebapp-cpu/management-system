"use client";

import { Menu, LogOut, User } from "lucide-react";
import { useSession, useLogout } from "@/hooks";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useSession();
  const logout = useLogout();

  return (
    <header className="bg-white border-b border-outline-variant flex justify-between items-center h-16 px-4 md:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden text-slate-500 hover:text-primary-navy"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-[14px] font-medium uppercase text-slate-500 tracking-wide hidden sm:block">
          Site Management
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant">
            <User className="w-4 h-4" />
            <span className="font-medium">{user.name}</span>
          </div>
        )}
        <button
          id="logout-btn"
          onClick={logout}
          title="Sign out"
          className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary-navy hover:bg-surface-container-low rounded transition-colors border border-outline-variant"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
