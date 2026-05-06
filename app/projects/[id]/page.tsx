"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useProject, useProjectLogs } from "@/hooks";
import { StatusBadge } from "../components/StatusBadge";
import { FinancialSummary } from "./components/FinancialSummary";
import { LogTimeline } from "./components/LogTimeline";
import { PaymentHistory } from "./components/PaymentHistory";
import { ProjectDetailActions } from "./components/ProjectDetailActions";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: project, isLoading, isError } = useProject(id);
  const { data: logs = [], isLoading: isLogsLoading } = useProjectLogs(id);

  /* ── Loading ── */
  if (isLoading || isLogsLoading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-pulse">
        <div className="flex items-center gap-5">
          <div className="w-9 h-9 bg-surface-container-high rounded-full" />
          <div className="h-8 bg-surface-container-high rounded w-72" />
        </div>
        <div className="bg-white border border-outline-variant p-6 h-24 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-outline-variant rounded h-64" />
          <div className="bg-white border border-outline-variant rounded h-64" />
        </div>
      </div>
    );
  }

  /* ── Error / Not found ── */
  if (isError || !project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-serif text-primary-navy">
          {isError ? "Failed to load project" : "Project not found"}
        </h1>
        <Link
          href="/projects"
          className="text-primary-navy mt-4 inline-block hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full gap-6">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <Link
            href="/projects"
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant bg-white border border-outline-variant shadow-sm hover:shadow"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-[32px] font-serif text-primary-navy m-0 leading-none">
              {project.projectName}
            </h2>
            <StatusBadge status={project.status ?? "pending"} />
          </div>
        </div>
        <ProjectDetailActions
          currentStatus={project.status ?? "pending"}
          projectId={id}
        />
      </div>

      {/* Meta */}
      <div className="bg-white border border-outline-variant p-6 flex flex-wrap gap-x-16 gap-y-6">
        <div>
          <span className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1.5">
            Client
          </span>
          <span className="text-sm font-medium text-on-surface">
            {project.clientName}
          </span>
        </div>
        {project.location && (
          <div>
            <span className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1.5">
              Location
            </span>
            <span className="text-sm font-medium text-on-surface">
              {project.location}
            </span>
          </div>
        )}
        <div>
          <span className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1.5">
            Status
          </span>
          <StatusBadge status={project.status ?? "pending"} />
        </div>
      </div>

      {/* Log + Financials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[600px]">
        <LogTimeline
          logs={logs.map((l) => ({ ...l, description: l.description ?? "" }))}
        />
        </div>
        <div className="flex flex-col gap-6 h-[600px]">
          <FinancialSummary project={project} />
          <PaymentHistory projectId={id} />
        </div>
      </div>
    </div>
  );
}
