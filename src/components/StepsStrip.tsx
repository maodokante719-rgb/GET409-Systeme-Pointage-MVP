const steps = [
  { t: "Pointer", d: "L'employé ouvre l'application et appuie sur « Pointer mon arrivée »." },
  { t: "Vérifier le lieu", d: "QR code du site ou position contrôlée à cet instant précis." },
  { t: "Valider", d: "Le RH ou le chef d'équipe confirme les missions et les retards." },
  { t: "Exporter la paie", d: "Récapitulatif mensuel par employé, prêt pour le logiciel de paie." },
];

export function StepsStrip() {
  return (
    <ol className="grid gap-8 md:grid-cols-4 md:gap-0">
      {steps.map((s, i) => (
        <li key={s.t} className="relative md:pr-8">
          <div className="flex items-center">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
              {i + 1}
            </span>
            {i < steps.length - 1 && <span className="ml-3 hidden h-px flex-1 bg-border md:block" />}
          </div>
          <p className="mt-4 font-semibold text-foreground">{s.t}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
