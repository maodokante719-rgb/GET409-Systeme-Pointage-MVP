import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Systeme-Pointage — Des présences fiables, une paie sans litige" },
      {
        name: "description",
        content:
          "Pointage mobile avec vérification du lieu pour les PME multi-sites de Dakar. Récapitulatif mensuel en un clic, sans ressaisie.",
      },
      { property: "og:title", content: "Systeme-Pointage — Présences fiables, paie sans litige" },
      {
        property: "og:description",
        content:
          "Vos employés pointent depuis leur téléphone, au bureau comme en mission. Clôturez la paie en moins d'une journée.",
      },
    ],
  }),
  component: Accueil,
});

const stats = [
  { value: "3-4 jours → moins d'1 jour", label: "temps de clôture de la paie" },
  { value: "30 secondes", label: "pour pointer depuis son téléphone" },
  { value: "0 matériel", label: "fonctionne sur les smartphones existants" },
];

function Accueil() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <span className="inline-flex rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-primary">
            PME multi-sites · Dakar
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Des présences fiables, une paie sans litige
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Vos employés pointent depuis leur téléphone, au bureau comme en mission. Vous obtenez le
            récapitulatif du mois en un clic, sans ressaisie.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/pointages"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
            >
              Voir les pointages du jour
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent/15 px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/25"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Nos objectifs
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="text-2xl font-bold tracking-tight text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-3 text-xs font-medium text-accent-foreground">Objectif</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Position vérifiée uniquement au moment du pointage — aucun suivi GPS continu.
        </p>
      </section>

      <Footer />
    </div>
  );
}
