import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import data from "@/data/employees.json";
import { AttendanceTable, type Employee } from "@/components/AttendanceTable";
import { HistoryDrawer } from "@/components/HistoryDrawer";

export const Route = createFileRoute("/pointages")({
  head: () => ({
    meta: [
      { title: "Pointages du jour — Systeme-Pointage" },
      { name: "description", content: "Tableau de bord RH : présents, retards, missions et absences par site, en temps réel." },
      { property: "og:title", content: "Pointages du jour — Systeme-Pointage" },
      { property: "og:description", content: "Qui est présent aujourd'hui sur vos sites de Dakar." },
    ],
  }),
  component: Pointages,
});

const employees = data.employees as Employee[];
const filters = [
  { k: "all", l: "Tous" }, { k: "plateau", l: "Plateau" }, { k: "pikine", l: "Pikine" },
  { k: "diamniadio", l: "Diamniadio" }, { k: "terrain", l: "Terrain" },
];

function Counter({ label, value, dot }: { label: string; value: number; dot: string }) {
  return (
    <div className="p-5">
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><span className={`h-2 w-2 rounded-full ${dot}`} />{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}

function Pointages() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Employee | null>(null);
  const rows = filter === "all" ? employees : employees.filter((e) => e.siteKey === filter);
  const count = (s: string) => employees.filter((e) => e.status === s).length;

  return (
    <div className="bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Pointages du jour</p>
            <h1 className="mt-1 text-3xl font-semibold text-foreground">{data.date}</h1>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Site
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
              <option value="all">Tous les sites</option>
              <option value="plateau">Plateau (siège)</option>
              <option value="pikine">Pikine (agence)</option>
              <option value="diamniadio">Diamniadio (dépôt)</option>
              <option value="terrain">Terrain</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid grid-cols-2 divide-border rounded-lg border border-border bg-background md:grid-cols-4 md:divide-x [&>*]:border-border max-md:[&>*:nth-child(odd)]:border-r max-md:[&>*:nth-child(-n+2)]:border-b">
          <Counter label="Présents" value={count("present")} dot="bg-status-present" />
          <Counter label="En retard" value={count("late")} dot="bg-status-late" />
          <Counter label="En mission" value={count("mission")} dot="bg-status-mission" />
          <Counter label="Absents" value={count("absent")} dot="bg-status-absent" />
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-background">
          <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border px-2">
            {filters.map((f) => (
              <button key={f.k} role="tab" aria-selected={filter === f.k} onClick={() => setFilter(f.k)}
                className={`-mb-px whitespace-nowrap border-b-2 px-3 py-3 text-sm ${filter === f.k ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {f.l}
              </button>
            ))}
          </div>
          <AttendanceTable rows={rows} onHistory={setSelected} />
        </div>

        <p className="mt-6 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          La position n'est vérifiée qu'au moment du pointage. Aucun suivi GPS continu.
        </p>
      </div>
      <HistoryDrawer employee={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
