import { createFileRoute } from "@tanstack/react-router";
import { Database, FileSearch, PenLine, ShieldCheck } from "lucide-react";
import { AnomalyAgent } from "@/components/AnomalyAgent";

export const Route = createFileRoute("/agent")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] } : {}),
  head: () => ({
    meta: [
      { title: "Agent IA — Rapport d'anomalies — Systeme-Pointage" },
      { name: "description", content: "Un agent IA lit les pointages de la semaine et liste les retards, absences, oublis de départ et heures supplémentaires à vérifier." },
      { property: "og:title", content: "Agent IA — Systeme-Pointage" },
      { property: "og:description", content: "Le rapport d'anomalies de la semaine en quelques secondes, à valider par la RH." },
    ],
  }),
  component: AgentPage,
});

const steps = [
  { icon: Database, t: "Base de pointages", d: "Les pointages de la semaine (S38-2026, 4 sites, données fictives) sont indexés dans une base de connaissances." },
  { icon: FileSearch, t: "Agent Chercheur", d: "Il retrouve les pointages du site et de la période demandés et repère chaque anomalie, sans rien inventer." },
  { icon: PenLine, t: "Agent Rédacteur", d: "Il met le résultat en forme : résumé, anomalies, totaux et actions de vérification." },
  { icon: ShieldCheck, t: "Validation RH", d: "Aucune sanction automatique : la RH vérifie chaque ligne avant toute décision de paie." },
];

function AgentPage() {
  const { q } = Route.useSearch();
  return (
    <div className="bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <p className="text-sm font-medium text-primary">Agent IA</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Rapport d'anomalies de la semaine</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Demandez un site et une période : l'agent liste les retards, absences, oublis de départ et heures supplémentaires à vérifier avant la paie.
        </p>

        <div className="mt-8"><AnomalyAgent initialQuery={q ?? ""} /></div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground">Comment l'agent travaille</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-lg border border-border bg-background p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs font-semibold text-foreground">{i + 1}</span>
                  <s.icon className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <p className="mt-3 font-semibold text-foreground">{s.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
