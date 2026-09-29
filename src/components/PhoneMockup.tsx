export function PhoneMockup() {
  return (
    <div className="mx-auto w-[240px] md:w-[280px]">
      <div className="relative aspect-[280/580] rounded-[44px] border-[10px] border-phone-frame bg-phone-screen shadow-[var(--shadow-phone)]">
        <span className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-phone-frame" aria-hidden />
        <div className="flex h-full flex-col items-center px-5 pb-6 pt-12 text-center">
          <p className="text-base font-semibold text-strong">Bonjour Moussa</p>
          <p className="mt-1 text-xs text-muted-foreground">Agence de Pikine</p>
          <p className="mt-10 text-5xl font-semibold tabular-nums tracking-tight text-strong">07:58</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-status-present">
            <span className="h-1.5 w-1.5 rounded-full bg-status-present" /> Position vérifiée
          </p>
          <button type="button" className="mt-auto flex aspect-square w-36 items-center justify-center rounded-full bg-primary px-4 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:scale-[1.03] md:w-40">
            Pointer l'arrivée
          </button>
          <p className="mt-auto pt-6 text-[11px] text-muted-foreground">Fonctionne aussi sans réseau</p>
        </div>
      </div>
    </div>
  );
}
