"use client";

import { useState, useEffect } from "react";
import { useUpdatePayment } from "@/hooks";
import { X } from "lucide-react";

export function EditPaymentModal({
  isOpen,
  onClose,
  projectId,
  payment,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  payment: { id: string; amount: string; notes: string | null } | null;
}) {
  const { mutate: updatePayment, isPending, reset } = useUpdatePayment(projectId);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (payment) {
      setAmount(payment.amount);
      setNote(payment.notes || "");
    }
  }, [payment]);

  if (!isOpen || !payment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("paymentId", payment.id);
    formData.set("projectId", projectId);
    formData.set("amount", amount);
    formData.set("note", note);
    updatePayment(formData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded border border-outline-variant w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-5 border-b border-outline-variant bg-surface-container-lowest">
          <h2 className="text-xl font-serif text-primary-navy m-0">Edit Payment</h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
              Amount Paid (₹)
            </label>
            <input
              required
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full border border-outline-variant rounded px-3 py-2 text-sm focus:border-primary-navy focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
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
              {isPending ? "Updating…" : "Update Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
