"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateProject } from "@/hooks";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { mutate: createProject, isPending, data, reset } = useCreateProject();

  const [totBudget, setTotBudget] = useState("");
  const [advPayment, setAdvPayment] = useState("");

  const remaining = Math.max(
    0,
    (parseFloat(totBudget) || 0) - (parseFloat(advPayment) || 0)
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createProject(formData, {
      onSuccess: (result) => {
        if (result.success) {
          reset();
          onClose();
        }
      },
    });
  };

  const serverError = data && !data.success ? data.message : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded border border-outline-variant w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-outline-variant bg-surface-container-lowest">
          <h2 className="text-2xl font-serif text-primary-navy m-0">Create New Project</h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {serverError && (
          <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {serverError}
          </div>
        )}

        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Project Name
                </label>
                <input
                  required
                  name="projectName"
                  type="text"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <input
                  required
                  name="companyName"
                  type="text"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Client Name
                </label>
                <input
                  required
                  name="clientName"
                  type="text"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  required
                  name="phoneNumber"
                  type="tel"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                  Site Location
                </label>
                <input
                  required
                  name="location"
                  type="text"
                  className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-outline-variant pt-5 mt-2">
              <h3 className="text-sm font-semibold text-primary-navy mb-4 uppercase tracking-wider">
                Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                    Total Discussed Budget
                  </label>
                  <input
                    required
                    name="totalBudget"
                    type="number"
                    min="0"
                    value={totBudget}
                    onChange={(e) => setTotBudget(e.target.value)}
                    className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                    Advance Payment Paid
                  </label>
                  <input
                    required
                    name="advancePayment"
                    type="number"
                    min="0"
                    value={advPayment}
                    onChange={(e) => setAdvPayment(e.target.value)}
                    className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5 p-4 bg-surface-container-low rounded border border-outline-variant flex justify-between items-center">
                <span className="text-sm font-semibold text-on-surface-variant">
                  Remaining Payment:
                </span>
                <span className="text-xl font-mono font-bold text-primary-navy">
                  ₹{remaining.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-low rounded border border-outline-variant transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-primary-navy text-white rounded hover:bg-[#141C52] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Creating…" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
