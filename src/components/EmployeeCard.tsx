import { StatusBadge, type Status } from "./StatusBadge";

export type Employee = {
  id: number;
  name: string;
  site: string;
  siteKey: string;
  arrival: string;
  status: string;
  note: string;
};

export function EmployeeCard({ employee }: { employee: Employee }) {
  const initials = employee.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-elevated md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </span>
        <div>
          <p className="font-semibold text-foreground">{employee.name}</p>
          <p className="text-sm text-muted-foreground">{employee.site}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 md:justify-end">
        <div className="md:text-right">
          <p className="font-mono text-lg font-semibold text-foreground">{employee.arrival}</p>
          {employee.note ? (
            <p className="text-xs text-muted-foreground">{employee.note}</p>
          ) : (
            <p className="text-xs text-muted-foreground">heure d'arrivée</p>
          )}
        </div>
        <StatusBadge status={employee.status as Status} />
      </div>
    </article>
  );
}
