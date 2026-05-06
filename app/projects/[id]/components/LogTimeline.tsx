import { ClipboardList } from "lucide-react";

// Shape returned by getProjectLogs server action
interface LogEntry {
  id: string;
  logDate: string;
  description: string;
  createdBy: string;
}

export function LogTimeline({ logs }: { logs: LogEntry[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white border border-outline-variant p-6 h-full flex flex-col items-center justify-center text-on-surface-variant gap-3">
        <ClipboardList className="w-12 h-12 text-outline" />
        <p className="text-sm">No logs recorded for this project yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-outline-variant flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 pb-4 shrink-0 border-b border-outline-variant">
        <div className="p-2 bg-primary-navy/10 rounded-full text-primary-navy">
          <ClipboardList className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-serif text-primary-navy">Daily Work Log</h3>
      </div>

      <div className="overflow-y-auto flex-1 p-6">
        <div className="relative border-l-2 border-surface-container ml-3 space-y-8">
        {logs.map((log) => (
          <div key={log.id} className="relative pl-6">
            <div className="absolute w-3 h-3 bg-primary-navy rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
            <div className="text-[11px] font-semibold text-outline uppercase tracking-wider mb-1">
              {log.logDate}
            </div>
            <p className="text-sm text-on-surface leading-relaxed">
              {log.description}
            </p>
            <p className="text-[10px] text-on-surface-variant mt-1">
              by {log.createdBy}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
