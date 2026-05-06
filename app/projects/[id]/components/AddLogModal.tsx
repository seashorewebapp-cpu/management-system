"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateDailyLog } from "@/hooks";

export function AddLogModal({
  isOpen,
  onClose,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}) {
  const { mutate: createLog, isPending, reset } = useCreateDailyLog(projectId);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("projectId", projectId);
    // Server action expects DD/MM/YYYY format
    const [y, m, d] = date.split("-");
    formData.set("logDate", `${d}/${m}/${y}`);
    formData.set("description", description);
    createLog(formData, {
      onSuccess: () => {
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded border border-outline-variant w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-5 border-b border-outline-variant bg-surface-container-lowest">
          <h2 className="text-xl font-serif text-primary-navy m-0">
            Add Daily Log
          </h2>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
              Log Date
            </label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the work done today..."
              className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none resize-none"
            />
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
              disabled={isPending}
              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider bg-primary-navy text-white rounded hover:bg-[#141C52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving…" : "Add Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
