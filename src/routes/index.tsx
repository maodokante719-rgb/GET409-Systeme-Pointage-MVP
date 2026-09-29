import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X, Smartphone, MapPin, FileSpreadsheet, WifiOff, ShieldCheck } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { employees, statusStyle } from "@/data/pointages";
import depot from "@/assets/depot.jpg";
import rh from "@/assets/rh.jpg";
import agence from "@/assets/agence.jpg";
import terrain from "@/assets/terrain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pointage Sûr — Pointage mobile pour PME multi-sites à Dakar" },
      { name: "description", content: "Vos employés pointent avec leur téléphone. Lieu vérifié, anomalies de la semaine listées, paie préparée en moins d'une journée." },
      { property: "og:title", content: "Pointage Sûr — Qui est présent, sur chaque site" },
      { property: "og:description", content: "Pointage mobile avec lieu vérifié pour les PME de Dakar. Fonctionne sans réseau." },
    ],
  }),
  component: Home,
});

const before = ["Feuille d'émargement signée à l'entrée", "Retards signalés par message WhatsApp", "Heures recopiées à la main dans Excel", "3 à 4 jours pour préparer la paie", "Retards et absences découverts en fin de mois", "Litiges sur les retenues, sans preuve"];
const after = ["Pointage sur le smartphone de l'employé", "Lieu vérifié au moment du pointage", "Présences visibles en direct pour les 4 sites", "Moins d'1 jour pour préparer la paie", "Rapport des anomalies chaque semaine", "Historique horodaté en cas de désaccord"];
const circuit = ["Employé", "Pointage mobile", "Lieu vérifié", "Validation RH", "Export paie"];
const features = [
  { i: Smartphone, t: "Pointer", d: "L'employé pointe son arrivée et son départ en un geste, même sans réseau." },
  { i: MapPin, t: "Vérifier", d: "QR code du site, position au moment du pointage ou mission validée pour le terrain." },
  { i: FileSpreadsheet, t: "Préparer la paie", d: "Les heures, retards et heures supplémentaires sont calculés et exportés." },
];
const stats = [
  { v: "< 1 jour", l: "pour préparer la paie, contre 3 à 4 jours" },
  { v: "4 sites", l: "suivis sur un seul tableau de bord" },
  { v: "100 %", l: "des anomalies de la semaine listées automatiquement" },
];
const steps = [
  { n: "01", t: "Pointer", d: "L'employé pointe l'arrivée et le départ depuis son propre smartphone.", img: agence, alt: "Agent d'accueil à Pikine pointant son arrivée sur son téléphone au comptoir" },
  { n: "02", t: "Vérifier", d: "QR code du site, position au moment du pointage ou mission validée.", img: depot, alt: "Technicien en gilet orange scannant le QR code à l'entrée du dépôt de Diamniadio" },
  { n: "03", t: "Contrôler", d: "La RH voit les présents en direct et reçoit le rapport d'anomalies.", img: rh, alt: "Responsable RH consultant le tableau de présence sur son ordinateur, bureau du Plateau" },
  { n: "04", t: "Exporter", d: "Les heures validées partent vers la paie en un fichier.", img: terrain, alt: "Technicien terrain validant sa mission sur son téléphone chez un client à Mermoz" },
];
const pillars = [
  { i: Smartphone, t: "Smartphones existants", d: "Aucune badgeuse à acheter, l'application tourne sur les téléphones des employés." },
  { i: WifiOff, t: "Hors ligne d'abord", d: "Le pointage est enregistré sans réseau et synchronisé dès le retour de la connexion." },
  { i: ShieldCheck, t: "Vie privée respectée", d: "La position est vérifiée uniquement au moment du pointage, jamais suivie en continu ; données traitées dans le respect de la loi sénégalaise 2008-12." },
];
const sites = [
  { n: "Plateau", k: "plateau" }, { n: "Pikine", k: "pikine" }, { n: "Diamniadio", k: "diamniadio" }, { n: "Terrain", k: "terrain" },
] as const;

const btnPrimary = "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark";
const btnOutline = "inline-flex items-center rounded-full border border-strong px-6 py-3 text-sm font-semibold text-strong hover:bg-strong/10";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-strong md:text-4xl">{title}</h2>
    </div>
  );
}

function Home() {
  const count = (s: string) => employees.filter((e) => e.status === s).length;
  return (
    <>
      <section className="bg-grid border-b border-border">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-7">
            <span className="eyebrow inline-flex rounded-full border border-border bg-card px-3 py-1.5 text-primary">Application de pointage pour PME</span>
            <h1 className="mt-6 text-[34px] font-bold leading-[1.1] text-strong md:text-[52px]">
              Vos employés pointent <span className="text-primary">avec leur téléphone</span>. Vous savez <span className="text-primary">qui est présent</span>, sur chaque site.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Pointage Sûr remplace la feuille d'émargement. Chaque employé enregistre son arrivée et son départ depuis son smartphone, le lieu est vérifié, et la RH reçoit automatiquement les retards, absences et heures supplémentaires, prêts pour la paie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pointages" className={btnPrimary}>Voir les pointages du jour <ArrowRight size={16} strokeWidth={1.5} /></Link>
              <Link to="/contact" className={btnOutline}>Demander une démo</Link>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9"><PhoneMockup /></div>
        </div>
      </section>

      <section className="border-b border-border">
        <ol className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-3 px-5 py-8 text-sm">
          {circuit.map((c, i) => (
            <li key={c} className="flex items-center gap-3">
              <span className="rounded-full border border-border bg-card px-4 py-2 font-medium text-foreground">{c}</span>
              {i < circuit.length - 1 && <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground" aria-hidden />}
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <SectionTitle eyebrow="Avant / Après" title="Ce qui change pour votre entreprise" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted p-8">
            <p className="eyebrow text-muted-foreground">Avant</p>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground"><X size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-status-absent/80" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary bg-card p-8">
            <p className="eyebrow text-primary">Avec Pointage Sûr</p>
            <ul className="mt-6 space-y-4">
              {after.map((b) => (
                <li key={b} className="flex gap-3 text-foreground"><Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-16 md:pb-24">
        <SectionTitle eyebrow="L'application" title="Ce que fait l'application" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map(({ i: Icon, t, d }) => (
            <div key={t} className="card-surface p-7">
              <Icon size={22} strokeWidth={1.5} className="text-primary" />
              <p className="mt-5 text-lg font-semibold text-strong">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1200px] divide-y divide-border px-5 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s) => (
            <div key={s.v} className="py-10 md:px-8">
              <p className="text-4xl font-bold tabular-nums text-primary">{s.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <SectionTitle eyebrow="Comment ça marche" title="Du pointage du matin à la paie" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article key={s.n} className="card-surface overflow-hidden">
              <img src={s.img} alt={s.alt} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
              <div className="p-6">
                <p className="font-mono text-sm text-primary">{s.n}</p>
                <p className="mt-2 text-lg font-semibold text-strong">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-3 md:py-24">
          {pillars.map(({ i: Icon, t, d }) => (
            <div key={t}>
              <Icon size={22} strokeWidth={1.5} className="text-primary" />
              <p className="eyebrow mt-5 text-strong">{t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <div className="card-surface p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-muted-foreground">Tableau de bord RH</p>
              <h2 className="mt-2 text-2xl font-bold text-strong">Qui est là ?</h2>
            </div>
            <div className="flex gap-6 text-sm">
              {(["present", "late", "absent"] as const).map((k) => (
                <span key={k} className="flex items-center gap-2 text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full ${statusStyle[k].dot}`} />{statusStyle[k].label}
                  <span className="font-semibold tabular-nums text-strong">{count(k) + (k === "present" ? count("mission") : 0)}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sites.map((s) => {
              const list = employees.filter((e) => e.siteKey === s.k);
              return (
                <div key={s.k} className="rounded-xl border border-border bg-background p-5">
                  <p className="font-semibold text-strong">{s.n}</p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {list.map((e) => (
                      <li key={e.id} className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-foreground"><span className={`h-2 w-2 rounded-full ${statusStyle[e.status].dot}`} />{e.name}</span>
                        <span className="tabular-nums text-muted-foreground">{e.arrival}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <Link to="/pointages" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Ouvrir les pointages du jour <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-16 md:pb-24">
        <div className="bg-grid relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <h2 className="relative text-3xl font-bold text-strong md:text-4xl">Préparez votre prochaine paie en moins d'une journée</h2>
          <p className="relative mt-4 text-muted-foreground">Testez Pointage Sûr sur un site pilote pendant un mois.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={btnPrimary}>Demander une démo</Link>
            <Link to="/pointages" className={btnOutline}>Voir les pointages du jour</Link>
          </div>
        </div>
      </section>
    </>
  );
}
