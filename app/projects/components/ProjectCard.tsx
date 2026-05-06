import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

// Shape returned by getAllProjects server action
interface ProjectRow {
  projectId: string;
  projectName: string;
  clientName: string;
  location: string | null;
  totalBudget: string | null;
  totalPaid: number;
  remaining: number;
}

export function ProjectCard({ project }: { project: ProjectRow }) {
  const budget = parseFloat(project.totalBudget ?? "0");

  return (
    <Link href={`/projects/${project.projectId}`} className="block h-full">
      <div className="bg-white border border-outline-variant border-l-[3px] border-l-outline-variant rounded p-5 hover:border-primary-navy hover:border-l-primary-navy transition-all duration-200 flex flex-col gap-3 h-full shadow-sm hover:shadow-md">
        <div className="flex justify-between items-start mb-1 gap-4">
          <h3 className="text-[20px] font-serif text-primary-navy leading-tight">
            {project.projectName}
          </h3>
        </div>

        <div className="flex flex-col gap-2 mb-3 flex-1">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Building2 className="w-4 h-4 text-outline" />
            <span>Client: {project.clientName}</span>
          </div>
          {project.location && (
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <MapPin className="w-4 h-4 text-outline" />
              <span>{project.location}</span>
            </div>
          )}
        </div>

        <div className="border-t border-outline-variant pt-4 mt-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-outline uppercase tracking-widest mb-1">
              Total Budget
            </span>
            <span className="font-mono text-on-surface font-medium">
              ₹{budget.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-semibold text-outline uppercase tracking-widest mb-1">
              Remaining
            </span>
            <span className="font-mono text-primary-navy font-bold">
              ₹{Number(project.remaining).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
