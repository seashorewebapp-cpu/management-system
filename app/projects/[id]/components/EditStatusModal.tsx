"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useUpdateStatus } from "@/hooks";

// These are the exact values the backend DB accepts
type DBStatus = "pending" | "in_progress" | "completed" | "on_hold";

const STATUS_OPTIONS: { value: DBStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
];

interface EditStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  projectId: string;
}

export function EditStatusModal({
  isOpen,
  onClose,
  currentStatus,
  projectId,
}: EditStatusModalProps) {
  const [selected, setSelected] = useState<DBStatus>(
    (currentStatus as DBStatus) ?? "pending"
  );

  const { mutate: updateStatus, isPending } = useUpdateStatus(projectId);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("projectId", projectId);
    formData.set("status", selected);
    updateStatus(formData, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded border border-outline-variant w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center p-5 border-b border-outline-variant bg-surface-container-lowest">
          <h2 className="text-xl font-serif text-primary-navy">
            Update Project Status
          </h2>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-3">
              New Status
            </label>
            <div className="flex flex-col gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                    selected === opt.value
                      ? "border-primary-navy bg-primary-navy/5"
                      : "border-outline-variant hover:bg-surface-container-low"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={selected === opt.value}
                    onChange={() => setSelected(opt.value)}
                    className="accent-primary-navy"
                  />
                  <span className="text-sm font-medium text-on-surface">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-low rounded border border-outline-variant transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || selected === currentStatus}
              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider bg-primary-navy text-white rounded hover:bg-[#141C52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Updating…" : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
