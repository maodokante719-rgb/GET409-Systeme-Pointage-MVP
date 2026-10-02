import type { ReactNode } from "react";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-[280px] rounded-[2.2rem] border border-border bg-foreground p-2.5 ${className}`}>
      <div className="overflow-hidden rounded-[1.7rem] bg-background">
        <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-medium text-foreground">
          <span>07:58</span>
          <span className="h-4 w-16 rounded-full bg-foreground" />
          <span>4G</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PhoneMockup() {
  return (
    <PhoneFrame>
      <div className="px-5 pb-6 pt-5">
        <p className="text-xs text-muted-foreground">Mardi 16 septembre</p>
        <p className="mt-1 text-lg font-semibold text-foreground">Bonjour Moussa</p>
        <div className="mt-6 rounded-lg border border-border p-4 text-center">
          <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">07:58</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-status-present" />
            Agence de Pikine · position vérifiée
          </p>
        </div>
        <button className="mt-5 w-full rounded-lg bg-primary py-4 text-sm font-semibold text-primary-foreground">
          Pointer mon arrivée
        </button>
        <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
          <div className="flex justify-between text-muted-foreground"><span>Hier</span><span className="tabular-nums">08:12 — 17:01</span></div>
          <div className="flex justify-between text-muted-foreground"><span>Ven. 12/09</span><span className="tabular-nums">07:58 — 17:00</span></div>
        </div>
      </div>
    </PhoneFrame>
  );
}
