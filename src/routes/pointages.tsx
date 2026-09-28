import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBar } from "@/components/FilterBar";
import { EmployeeCard, type Employee } from "@/components/EmployeeCard";
import { StatCard } from "@/components/StatCard";
import data from "@/data/employees.json";

export const Route = createFileRoute("/pointages")({
  head: () => ({
    meta: [
      { title: "Pointages du jour — Systeme-Pointage" },
      {
        name: "description",
        content:
          "Tableau de bord RH : présences, retards, absences et missions du jour par site (Plateau, Pikine, Diamniadio, Terrain).",
      },
      { property: "og:title", content: "Pointages du jour — Systeme-Pointage" },
      {
        property: "og:description",
        content: "Suivi en temps réel des présences par site pour vos équipes à Dakar.",
      },
    ],
  }),
  component: Pointages,
});

function Pointages() {
  const [filter, setFilter] = useState("all");
  const employees = data.employees as Employee[];

  const visible = useMemo(
    () => (filter === "all" ? employees : employees.filter((e) => e.siteKey === filter)),
    [filter, employees],
  );

  const count = (s: string) => employees.filter((e) => e.status === s).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Pointages du jour</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Semaine {data.week} · données fictives de démonstration
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{employees.length} employés suivis</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value={count("present")} label="Présents" tone="present" />
          <StatCard value={count("late")} label="En retard" tone="late" />
          <StatCard value={count("absent")} label="Absents" tone="absent" />
          <StatCard value={count("mission")} label="En mission" tone="mission" />
        </div>

        <div className="mt-8">
          <FilterBar active={filter} onChange={setFilter} />
        </div>

        <div className="mt-5 space-y-3">
          {visible.map((e) => (
            <EmployeeCard key={e.id} employee={e} />
          ))}
          {visible.length === 0 && (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Aucun pointage pour ce site aujourd'hui.
            </p>
          )}
        </div>

        <p className="mt-6 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
          Position vérifiée uniquement au moment du pointage — aucun suivi GPS continu.
        </p>
      </main>
      <Footer />
    </div>
  );
}
