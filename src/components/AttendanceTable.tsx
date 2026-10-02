import { StatusDot, type Status } from "./StatusDot";

export type Employee = {
  id: string; name: string; initials: string; site: string; siteKey: string;
  arrival: string; departure: string; status: Status; note: string; history: string[][];
};

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
      {initials}
    </span>
  );
}

export function AttendanceTable({ rows, onHistory }: { rows: Employee[]; onHistory: (e: Employee) => void }) {
  if (!rows.length) return <p className="p-8 text-center text-sm text-muted-foreground">Aucun pointage pour ce site aujourd'hui.</p>;
  return (
    <>
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-secondary text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Employé</th>
            <th className="px-4 py-3 font-medium">Site</th>
            <th className="px-4 py-3 font-medium">Arrivée</th>
            <th className="px-4 py-3 font-medium">Départ</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-b border-border last:border-0 hover:bg-secondary">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar initials={e.initials} />
                  <div>
                    <p className="font-medium text-foreground">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{e.site}</td>
              <td className="px-4 py-3 tabular-nums text-foreground">{e.arrival}</td>
              <td className="px-4 py-3 tabular-nums text-muted-foreground">{e.departure}</td>
              <td className="px-4 py-3"><StatusDot status={e.status} note={e.note} /></td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onHistory(e)} className="text-primary hover:underline">Voir l'historique</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="divide-y divide-border md:hidden">
        {rows.map((e) => (
          <li key={e.id} className="flex items-start gap-3 p-4">
            <Avatar initials={e.initials} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-medium text-foreground">{e.name}</p>
                <span className="text-xs tabular-nums text-foreground">{e.arrival}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{e.id} · {e.site}</p>
              <div className="mt-2 flex items-center justify-between">
                <StatusDot status={e.status} note={e.note} />
                <button onClick={() => onHistory(e)} className="text-xs text-primary">Historique</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
