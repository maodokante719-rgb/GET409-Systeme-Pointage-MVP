export type Status = "present" | "late" | "absent" | "mission";

const config: Record<Status, { label: string; className: string }> = {
  present: { label: "Présent", className: "bg-status-present/12 text-status-present" },
  mission: { label: "Mission", className: "bg-status-mission/12 text-status-mission" },
  late: { label: "En retard", className: "bg-status-late/14 text-status-late" },
  absent: { label: "Absent", className: "bg-status-absent/12 text-status-absent" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      <span className="size-2 rounded-full bg-current" />
      {label}
    </span>
  );
}
