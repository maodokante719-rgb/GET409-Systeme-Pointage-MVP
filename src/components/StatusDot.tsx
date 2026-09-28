export type Status = "present" | "late" | "mission" | "absent";

const map: Record<Status, { label: string; dot: string; text: string }> = {
  present: { label: "Présent", dot: "bg-status-present", text: "text-foreground" },
  late: { label: "En retard", dot: "bg-status-late", text: "text-foreground" },
  mission: { label: "Mission", dot: "bg-status-mission", text: "text-foreground" },
  absent: { label: "Absent", dot: "bg-status-absent", text: "text-foreground" },
};

export function StatusDot({ status, note }: { status: Status; note?: string }) {
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
      {note ? <span className="text-muted-foreground">({note})</span> : null}
    </span>
  );
}
