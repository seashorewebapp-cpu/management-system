"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useProjects } from "@/hooks";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectsHeader } from "./components/ProjectsHeader";

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, isFetching } = useProjects(page, 10);

  const projects = data?.data ?? [];
  const pagination = data?.pagination;

  // Client-side search filter (works on current page)
  const filtered = search.trim()
    ? projects.filter(
        (p) =>
          p.projectName.toLowerCase().includes(search.toLowerCase()) ||
          p.clientName.toLowerCase().includes(search.toLowerCase()) ||
          (p.location ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : projects;

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <ProjectsHeader />

      {/* Search */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects by name, client, or location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full bg-white border border-outline-variant text-on-surface text-sm py-3.5 pl-12 pr-4 rounded focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy transition-all shadow-sm"
        />
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-outline-variant rounded p-5 h-48 animate-pulse"
            >
              <div className="h-5 bg-surface-container-high rounded w-3/4 mb-4" />
              <div className="h-3 bg-surface-container-high rounded w-1/2 mb-2" />
              <div className="h-3 bg-surface-container-high rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <p className="text-red-600 text-sm font-medium">
            Failed to load projects. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary-navy text-sm underline"
          >
            Reload
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="flex items-center justify-center py-24 text-on-surface-variant text-sm">
          {search ? `No projects match "${search}"` : "No projects yet. Create one!"}
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity ${isFetching ? "opacity-60" : "opacity-100"}`}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && !search && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                id="prev-page-btn"
                disabled={!pagination.hasPrevPage || isFetching}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pg = i + 1;
                  return (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      disabled={isFetching}
                      className={`w-8 h-8 text-xs font-semibold rounded transition-colors ${
                        pg === pagination.page
                          ? "bg-primary-navy text-white"
                          : "border border-outline-variant hover:bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      {pg}
                    </button>
                  );
                })}
              </div>

              <button
                id="next-page-btn"
                disabled={!pagination.hasNextPage || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page info */}
          {pagination && !search && (
            <p className="text-center text-xs text-on-surface-variant mt-3">
              Showing page {pagination.page} of {pagination.totalPages} &middot;{" "}
              {pagination.total} total projects
            </p>
          )}
        </>
      )}
    </div>
  );
}
