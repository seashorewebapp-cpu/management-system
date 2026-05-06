"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useOutstandingProjects } from "@/hooks";

export function OutstandingDues() {
  const { data: dues = [], isLoading } = useOutstandingProjects(6);

  return (
    <div className="bg-white border border-outline-variant flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <h3 className="text-xl text-primary-navy font-serif">Outstanding Clients</h3>
        <AlertTriangle className="text-outline w-5 h-5" />
      </div>

      {isLoading ? (
        <div className="flex-1 p-4 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse h-10 bg-surface-container-high rounded" />
          ))}
        </div>
      ) : dues.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-on-surface-variant p-6 text-center">
          No outstanding dues 🎉
        </div>
      ) : (
        <ul className="divide-y divide-outline-variant flex-1 overflow-y-auto">
          {dues.map((due) => (
            <li
              key={due.id}
              className="p-4 hover:bg-surface-container-low transition-colors flex justify-between items-center gap-4"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-primary-navy truncate">
                  {due.projectName}
                </div>
                <div className="text-[11px] font-semibold text-on-surface-variant mt-1 uppercase tracking-wider truncate">
                  {due.clientName}
                </div>
              </div>
              <div className="font-mono text-on-tertiary-container font-medium whitespace-nowrap">
                ₹{Number(due.remaining).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="p-3 border-t border-outline-variant bg-surface-container-low text-center mt-auto">
        <Link
          href="/projects"
          className="text-[11px] font-semibold text-primary-navy uppercase hover:underline transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}
