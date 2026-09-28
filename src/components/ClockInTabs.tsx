import { useState } from "react";

const tabs = [
  {
    key: "qr",
    label: "QR code du site",
    title: "Un QR code affiché à l'entrée de chaque site",
    text: "L'employé scanne le code imprimé à l'accueil du siège ou du dépôt. Idéal pour les sites fixes : le pointage prouve la présence physique sans GPS.",
  },
  {
    key: "geo",
    label: "Géolocalisation au pointage",
    title: "Position vérifiée uniquement au moment du pointage",
    text: "La position est lue une seule fois, puis comparée au périmètre du site (rayon de 150 m). Aucun suivi pendant la journée.",
  },
  {
    key: "mission",
    label: "Pointage mission",
    title: "Techniciens chez le client, validés par le chef d'équipe",
    text: "Le technicien déclare le client et l'adresse. Son chef d'équipe valide depuis son téléphone ; la mission apparaît comme telle dans la paie.",
  },
] as const;

function Screen({ k }: { k: string }) {
  if (k === "qr")
    return (
      <div className="p-5">
        <p className="text-xs text-muted-foreground">Scanner le code du site</p>
        <div className="mx-auto mt-4 grid h-36 w-36 grid-cols-6 gap-1 rounded-lg border border-border p-3">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} className={[0, 1, 5, 6, 7, 11, 13, 16, 20, 22, 24, 25, 29, 30, 31, 35, 9, 18, 27].includes(i) ? "bg-foreground" : "bg-transparent"} />
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-foreground">Siège · Plateau</p>
        <p className="text-center text-xs text-muted-foreground">Code SP-PLT-01</p>
      </div>
    );
  if (k === "geo")
    return (
      <div className="p-5">
        <p className="text-xs text-muted-foreground">Vérification de la position</p>
        <div className="relative mt-4 h-36 rounded-lg border border-border bg-secondary">
          <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary" />
          <span className="absolute left-[54%] top-[46%] h-3 w-3 rounded-full bg-primary" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">Dépôt de Diamniadio</p>
        <p className="text-xs text-muted-foreground">À 42 m du site · dans le périmètre</p>
      </div>
    );
  return (
    <div className="p-5">
      <p className="text-xs text-muted-foreground">Mission en cours</p>
      <div className="mt-4 space-y-2 rounded-lg border border-border p-3 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Client</span><span className="text-foreground">Mermoz, villa 14</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Arrivée</span><span className="tabular-nums text-foreground">08:05</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Chef d'équipe</span><span className="text-foreground">O. Diallo</span></div>
      </div>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-status-mission" /> Validée à 08:12
      </p>
    </div>
  );
}

export function ClockInTabs() {
  const [active, setActive] = useState<string>("qr");
  const tab = tabs.find((t) => t.key === active)!;
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${
              active === t.key ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-10 pt-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <h3 className="text-xl font-semibold text-foreground">{tab.title}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{tab.text}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <div className="mx-auto w-full max-w-[280px] rounded-xl border border-border bg-background">
            <Screen k={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
