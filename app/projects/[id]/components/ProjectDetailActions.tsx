"use client";

import { useState } from "react";
import { Edit, DollarSign, ClipboardList } from "lucide-react";
import { EditStatusModal } from "./EditStatusModal";
import { AddPaymentModal } from "./AddPaymentModal";
import { AddLogModal } from "./AddLogModal";

interface ProjectDetailActionsProps {
  currentStatus: string;
  projectId: string;
}

export function ProjectDetailActions({
  currentStatus,
  projectId,
}: ProjectDetailActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setIsPaymentOpen(true)}
          className="bg-white border border-outline-variant text-primary-navy px-4 py-2 text-[11px] font-bold rounded uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-sm"
        >
          <DollarSign className="w-4 h-4" />
          Add Payment
        </button>
        <button
          onClick={() => setIsLogOpen(true)}
          className="bg-white border border-outline-variant text-primary-navy px-4 py-2 text-[11px] font-bold rounded uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-sm"
        >
          <ClipboardList className="w-4 h-4" />
          Add Log
        </button>
        <button
          onClick={() => setIsEditOpen(true)}
          className="bg-white border border-outline-variant text-primary-navy px-4 py-2 text-[11px] font-bold rounded uppercase tracking-wider hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-sm"
        >
          <Edit className="w-4 h-4" />
          Update Status
        </button>
      </div>

      <EditStatusModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentStatus={currentStatus}
        projectId={projectId}
      />
      <AddPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        projectId={projectId}
      />
      <AddLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        projectId={projectId}
      />
    </>
  );
}
