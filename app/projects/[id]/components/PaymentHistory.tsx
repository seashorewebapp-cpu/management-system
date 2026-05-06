"use client";

import { useState } from "react";
import { DollarSign, Pencil, Receipt } from "lucide-react";
import { useProjectPayments } from "@/hooks";
import { EditPaymentModal } from "./EditPaymentModal";

export function PaymentHistory({ projectId }: { projectId: string }) {
  const { data: payments = [], isLoading } = useProjectPayments(projectId);
  const [editingPayment, setEditingPayment] = useState<{ id: string; amount: string; notes: string | null } | null>(null);

  if (isLoading) {
    return (
      <div className="bg-white border border-outline-variant p-6 flex-1 min-h-[300px] flex items-center justify-center animate-pulse">
        <div className="h-8 bg-surface-container-high rounded w-48" />
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white border border-outline-variant p-6 flex-1 flex flex-col items-center justify-center text-on-surface-variant gap-3">
        <Receipt className="w-12 h-12 text-outline" />
        <p className="text-sm">No payments recorded for this project yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-outline-variant flex flex-col flex-1 min-h-0 min-h-[300px]">
      <div className="flex items-center gap-3 p-6 pb-4 shrink-0 border-b border-outline-variant">
        <div className="p-2 bg-primary-navy/10 rounded-full text-primary-navy">
          <DollarSign className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-serif text-primary-navy">Payment History</h3>
      </div>

      <div className="overflow-y-auto flex-1 p-6 space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="p-4 border border-outline-variant rounded flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
                {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A"}
              </div>
              <div className="font-mono text-green-600 font-semibold mb-1">
                ₹{parseFloat(payment.amount).toLocaleString()}
              </div>
              {payment.notes && (
                <p className="text-sm text-on-surface leading-relaxed">
                  {payment.notes}
                </p>
              )}
            </div>
            <button
              onClick={() => setEditingPayment(payment)}
              className="p-1.5 text-outline hover:text-primary-navy hover:bg-surface-container-low rounded transition-colors"
              title="Edit Payment"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <EditPaymentModal
        isOpen={!!editingPayment}
        onClose={() => setEditingPayment(null)}
        projectId={projectId}
        payment={editingPayment}
      />
    </div>
  );
}
