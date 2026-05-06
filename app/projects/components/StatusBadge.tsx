// DB status values: pending | in_progress | completed | on_hold
export type DBProjectStatus = "pending" | "in_progress" | "completed" | "on_hold";

const BADGE_LABEL: Record<DBProjectStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

const BADGE_STYLES: Record<DBProjectStatus, string> = {
  pending: "bg-gray-100 text-gray-700 border-gray-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  on_hold: "bg-orange-100 text-orange-700 border-orange-200",
};

export function StatusBadge({ status }: { status: string }) {
  const key = (status ?? "pending") as DBProjectStatus;
  const styles = BADGE_STYLES[key] ?? "bg-gray-100 text-gray-700 border-gray-200";
  const label = BADGE_LABEL[key] ?? status;

  return (
    <span
      className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${styles} whitespace-nowrap`}
    >
      {label}
    </span>
  );
}
