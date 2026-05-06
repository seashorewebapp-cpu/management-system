"use client";

import { useState, useEffect } from "react";
import { Search, Users, Building2, Phone, Mail, MapPin } from "lucide-react";
import { getClientsWithProjects } from "@/lib/actions/clients";
import Link from "next/link";
import { StatusBadge } from "@/app/projects/components/StatusBadge";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch data
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getClientsWithProjects(debouncedSearch);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[32px] font-serif text-primary-navy">Clients Directory</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-outline-variant p-2 flex items-center justify-between flex-wrap gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[280px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients by name, company, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none focus:ring-0 text-sm placeholder:text-outline"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-outline-variant rounded p-5 h-64 animate-pulse" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant text-sm gap-3">
            <Users className="w-12 h-12 text-outline" />
            <p>{search ? `No clients found matching "${search}"` : "No clients recorded yet."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((client) => (
              <div key={client.id} className="bg-white border border-outline-variant p-6 shadow-sm flex flex-col hover:border-primary-navy/30 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-primary-navy mb-1 group-hover:text-primary-navy/80 transition-colors">
                      {client.name}
                    </h3>
                    {client.companyName && (
                      <p className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {client.companyName}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary-navy font-serif text-lg">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm text-on-surface">
                      <Phone className="w-4 h-4 text-outline" />
                      {client.phone}
                    </div>
                  )}
                  {client.email && (
                    <div className="flex items-center gap-2 text-sm text-on-surface">
                      <Mail className="w-4 h-4 text-outline" />
                      {client.email}
                    </div>
                  )}
                  {client.location && (
                    <div className="flex items-center gap-2 text-sm text-on-surface">
                      <MapPin className="w-4 h-4 text-outline" />
                      {client.location}
                    </div>
                  )}
                </div>

                {/* Projects Section */}
                <div className="border-t border-outline-variant pt-4 mt-auto">
                  <h4 className="text-[11px] font-semibold text-outline uppercase tracking-wider mb-3">
                    Projects ({client.projects.length})
                  </h4>
                  {client.projects.length > 0 ? (
                    <ul className="space-y-2">
                      {client.projects.slice(0, 3).map((p: any) => (
                        <li key={p.id} className="flex items-center justify-between group/item">
                          <Link href={`/projects/${p.id}`} className="text-sm text-primary-navy hover:underline truncate mr-2">
                            {p.projectName}
                          </Link>
                          <div className="scale-75 origin-right flex-shrink-0">
                            <StatusBadge status={p.status ?? "pending"} />
                          </div>
                        </li>
                      ))}
                      {client.projects.length > 3 && (
                        <li className="text-xs text-on-surface-variant italic mt-1">
                          + {client.projects.length - 3} more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-on-surface-variant italic">No projects</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
