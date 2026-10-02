import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { StepsStrip } from "@/components/StepsStrip";
import { ClockInTabs } from "@/components/ClockInTabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Systeme-Pointage — Pointage mobile pour PME multi-sites à Dakar" },
      { name: "description", content: "Vos employés pointent avec leur téléphone. Suivez les présences en temps réel et clôturez la paie en une journée." },
      { property: "og:title", content: "Systeme-Pointage — Fini les feuilles d'émargement" },
      { property: "og:description", content: "Pointage mobile avec vérification du lieu au moment du pointage, pour les PME de Dakar." },
    ],
  }),
  component: Home,
});

const dakar = [
  { t: "Fonctionne sur les smartphones existants", d: "Android ou iPhone, même d'entrée de gamme. Aucune pointeuse ni badge à acheter." },
  { t: "Pointage enregistré même sans réseau", d: "En cas de coupure, le pointage est horodaté sur le téléphone puis synchronisé dès le retour de la connexion." },
  { t: "Aucun suivi GPS en continu", d: "La position n'est lue qu'au moment du pointage, conformément à la loi n° 2008-12 et aux recommandations de la CDP." },
];

const goals = [
  { v: "< 1 jour", l: "pour clôturer la paie", s: "au lieu de 3 à 4 jours" },
  { v: "30 s", l: "pour pointer", s: "de l'ouverture à la confirmation" },
  { v: "0", l: "matériel à acheter", s: "les téléphones des employés suffisent" },
];

function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-14 md:grid-cols-12 md:items-center md:pt-20">
        <div className="md:col-span-7">
          <p className="text-sm font-medium text-primary">Pointage mobile pour PME multi-sites</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-foreground md:text-5xl">
            Fini les feuilles d'émargement. La paie se clôture en une journée.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vos employés pointent avec leur téléphone, au siège, au dépôt ou chez le client. Vous voyez qui est là en temps réel et exportez le récapitulatif du mois sans ressaisie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/pointages" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-dark">
              Voir les pointages du jour
            </Link>
            <Link to="/contact" className="rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">
              Demander une démo
            </Link>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <PhoneMockup />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold text-foreground">Ce qui change pour votre entreprise</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary p-8">
            <h3 className="text-lg font-semibold text-muted-foreground">Aujourd'hui, sans outil</h3>
            <ul className="mt-6 space-y-4">
              {[
                "Feuille d'émargement signée à l'entrée",
                "Retards signalés par WhatsApp",
                "Heures recopiées à la main dans Excel",
                "3 à 4 jours pour clôturer la paie",
                "Retards et absences découverts en fin de mois",
                "Litiges sur les retenues, sans preuve",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-primary bg-card p-8">
            <h3 className="text-lg font-semibold text-foreground">Avec Systeme-Pointage</h3>
            <ul className="mt-6 space-y-4">
              {[
                "Pointage sur le téléphone de l'employé",
                "Lieu vérifié au moment du pointage",
                "Présences visibles en direct pour chaque site",
                "Paie clôturée en moins d'une journée",
                "Rapport des anomalies chaque semaine",
                "Historique horodaté en cas de désaccord",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-3xl font-semibold text-foreground">Comment ça marche</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Du pointage du matin à l'export de fin de mois, sans ressaisie.</p>
          <div className="mt-12"><StepsStrip /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-semibold text-foreground">3 façons de pointer</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Choisissez la méthode adaptée à chaque site ou à chaque équipe.</p>
        <div className="mt-10"><ClockInTabs /></div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12">
          <h2 className="text-3xl font-semibold text-foreground md:col-span-3">Pensé pour Dakar</h2>
          <div className="grid gap-10 md:col-span-9 md:grid-cols-3">
            {dakar.map((d) => (
              <div key={d.t} className="border-t border-border pt-5">
                <p className="font-semibold text-foreground">{d.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-sm font-medium text-muted-foreground">Objectifs du pilote</p>
        <div className="mt-6 grid divide-y divide-border rounded-lg border border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {goals.map((g) => (
            <div key={g.l} className="p-8">
              <p className="text-3xl font-semibold tabular-nums text-foreground">{g.v}</p>
              <p className="mt-2 font-medium text-foreground">{g.l}</p>
              <p className="mt-1 text-sm text-muted-foreground">{g.s}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
