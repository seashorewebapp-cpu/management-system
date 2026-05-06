export function StatsCard({ title, amount, color }: { title: string; amount: string; color: string }) {
  return (
    <div className={`bg-white border border-outline-variant p-5 relative overflow-hidden group hover:border-primary-navy transition-colors`}>
      <div className={`absolute top-0 left-0 w-[3px] h-full ${color}`}></div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-2">{title}</h3>
      <div className="text-2xl font-mono text-primary-navy mt-1 font-medium">{amount}</div>
    </div>
  );
}
