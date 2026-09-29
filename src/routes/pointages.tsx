import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, MapPin, Clock, ScanLine } from "lucide-react";
import { date, employees, statusStyle, type Employee } from "@/data/pointages";

export const Route = createFileRoute("/pointages")({
  head: () => ({
    meta: [
      { title: "Pointages du jour — Pointage Sûr" },
      { name: "description", content: "Présents, retards, missions et absences par site, en temps réel, pour les PME multi-sites de Dakar." },
      { property: "og:title", content: "Pointages du jour — Pointage Sûr" },
      { property: "og:description", content: "Qui est présent aujourd'hui sur vos 4 sites de Dakar." },
    ],
  }),
  component: Pointages,
});

const filters = [
  { k: "all", l: "Tous" }, { k: "plateau", l: "Plateau" }, { k: "pikine", l: "Pikine" },
  { k: "diamniadio", l: "Diamniadio" }, { k: "terrain", l: "Terrain" },
];

function exportCsv() {
  const rows = [["Matricule", "Nom", "Site", "Arrivée", "Méthode", "Statut"], ...employees.map((e) => [e.id, e.name, e.site, e.arrival, e.method, statusStyle[e.status].label])];
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(";")).join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url; a.download = "pointages-22-09-2026.csv"; a.click();
  URL.revokeObjectURL(url);
}

function EmployeeCard({ e }: { e: Employee }) {
  const s = statusStyle[e.status];
  return (
    <article className="card-surface reveal p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-strong">{e.initials}</span>
          <div>
            <p className="font-semibold text-strong">{e.name}</p>
            <p className="text-xs tabular-nums text-muted-foreground">{e.id}</p>
          </div>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium ${s.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />{s.label}{e.note ? ` ${e.note}` : ""}
        </span>
      </div>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex gap-3"><MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted-foreground" /><dt className="sr-only">Site</dt><dd className="text-foreground">{e.site}</dd></div>
        <div className="flex gap-3"><Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted-foreground" /><dt className="sr-only">Arrivée</dt><dd className="tabular-nums text-foreground">{e.arrival === "—" ? "Pas de pointage" : `Arrivée ${e.arrival}`}</dd></div>
        <div className="flex gap-3"><ScanLine size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted-foreground" /><dt className="sr-only">Méthode</dt><dd className="text-muted-foreground">{e.method}</dd></div>
      </dl>
    </article>
  );
}

function Pointages() {
  const [filter, setFilter] = useState("all");
  const rows = filter === "all" ? employees : employees.filter((e) => e.siteKey === filter);
  const counters = [
    { l: "Présents", v: employees.filter((e) => e.status === "present" || e.status === "mission").length, d: "bg-status-present" },
    { l: "En retard", v: employees.filter((e) => e.status === "late").length, d: "bg-status-late" },
    { l: "Absents", v: employees.filter((e) => e.status === "absent").length, d: "bg-status-absent" },
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-strong md:text-4xl">Pointages du jour</h1>
          <p className="mt-2 text-muted-foreground">{date} · {employees.length} employés suivis</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-foreground">
          <Download size={16} strokeWidth={1.5} /> Exporter pour la paie (CSV)
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {counters.map((c) => (
          <div key={c.l} className="card-surface p-5">
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><span className={`h-2 w-2 rounded-full ${c.d}`} />{c.l}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-strong">{c.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par site">
        {filters.map((f) => (
          <button key={f.k} aria-pressed={filter === f.k} onClick={() => setFilter(f.k)}
            className={`rounded-full border px-4 py-2 text-sm ${filter === f.k ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {f.l}
          </button>
        ))}
      </div>

      <div key={filter} className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((e) => <EmployeeCard key={e.id} e={e} />)}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">Retard compté après 08 h 10 · Heures supplémentaires comptées après 17 h 30</p>
    </div>
  );
}
