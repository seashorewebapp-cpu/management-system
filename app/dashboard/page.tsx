"use client";

import { StatsCard } from "./components/StatsCard";
import { OutstandingDues } from "./components/OutstandingDues";
import { StatusBadge } from "../projects/components/StatusBadge";
import { useDashboardStats, useActiveProjectsDashboard } from "@/hooks";
import Link from "next/link";

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-surface-container-high rounded h-24"
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activeProjects = [], isLoading: projectsLoading } =
    useActiveProjectsDashboard(5);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-[32px] font-serif text-primary-navy">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-6">

          {/* Stats cards */}
          {statsLoading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Revenue"
                amount={`₹${(stats?.totalRevenue ?? 0).toLocaleString()}`}
                color="bg-primary-navy"
              />
              <StatsCard
                title="Outstanding Dues"
                amount={`₹${(stats?.totalOutstanding ?? 0).toLocaleString()}`}
                color="bg-on-tertiary-container"
              />
              <StatsCard
                title="Recent Payments"
                amount={`₹${(stats?.recentPayments ?? 0).toLocaleString()}`}
                color="bg-secondary"
              />
            </div>
          )}

          {/* Active projects table */}
          <div className="bg-white border border-outline-variant flex-1 flex flex-col">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-[20px] font-serif text-primary-navy">
                Active Projects
              </h3>
              <Link
                href="/projects"
                className="text-[11px] font-semibold uppercase tracking-wider text-primary-navy hover:underline"
              >
                View All
              </Link>
            </div>

            {projectsLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse h-10 bg-surface-container-high rounded"
                  />
                ))}
              </div>
            ) : activeProjects.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-sm text-on-surface-variant">
                No active projects yet.{" "}
                <Link href="/projects" className="ml-1 text-primary-navy underline">
                  Create one
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-primary-navy text-white">
                    <tr>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-wider font-semibold">
                        Project
                      </th>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-wider font-semibold">
                        Client
                      </th>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-wider font-semibold">
                        Status
                      </th>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-right">
                        Budget
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-on-surface divide-y divide-outline-variant">
                    {activeProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-surface-container-low transition-colors"
                      >
                        <td className="py-3 px-4 font-semibold text-primary-navy">
                          <Link
                            href={`/projects/${project.id}`}
                            className="hover:underline"
                          >
                            {project.projectName}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{project.clientName}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={project.status ?? "pending"} />
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          ₹{parseFloat(project.totalBudget ?? "0").toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 flex flex-col h-full min-h-[400px]">
          <OutstandingDues />
        </div>
      </div>
    </div>
  );
}
