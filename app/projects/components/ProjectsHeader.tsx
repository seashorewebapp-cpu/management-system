"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';

export function ProjectsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[32px] font-serif text-primary-navy m-0 leading-none">Projects</h2>
          <p className="text-sm text-on-surface-variant mt-2">Manage and monitor active MEP/HVAC site installations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-navy text-white px-5 py-2.5 text-[11px] font-semibold rounded uppercase tracking-wider hover:bg-[#141C52] transition-colors flex items-center gap-2"
        >
          <Plus className="w-[18px] h-[18px]" />
          New Project
        </button>
      </div>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
