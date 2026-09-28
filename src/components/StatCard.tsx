export function StatCard({
  value,
  label,
  tone = "default",
}: {
  value: string | number;
  label: string;
  tone?: "default" | "present" | "late" | "absent" | "mission";
}) {
  const tones: Record<string, string> = {
    default: "text-primary",
    present: "text-status-present",
    late: "text-status-late",
    absent: "text-status-absent",
    mission: "text-status-mission",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className={`text-2xl font-bold tracking-tight md:text-3xl ${tones[tone]}`}>{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
