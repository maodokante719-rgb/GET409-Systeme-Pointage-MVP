import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

type Anomaly = { who: string; date: string; type: string; detail: string };
type Parsed = {
  title?: string;
  meta: { label: string; value: string }[];
  summary: string[];
  anomalies: Anomaly[];
  totals: { label: string; value: string }[];
  actions: string[];
  notes: string[];
  other: string[];
};

const clean = (s: string) =>
  s.replace(/‑/g, "-").replace(/\*\*/g, "").replace(/\s+$/g, "").trim();

const isRule = (s: string) => /^[―—–\-_=\s]{3,}$/.test(s);

function sectionOf(line: string): keyof Parsed | null {
  const l = line.toUpperCase();
  if (l.startsWith("RÉSUMÉ") || l.startsWith("RESUME")) return "summary";
  if (l.startsWith("ANOMALIES")) return "anomalies";
  if (l.startsWith("TOTAUX")) return "totals";
  if (l.startsWith("ACTIONS")) return "actions";
  return null;
}

export function parseReport(raw: string): Parsed {
  const p: Parsed = { meta: [], summary: [], anomalies: [], totals: [], actions: [], notes: [], other: [] };
  let current: keyof Parsed | null = null;
  for (const rawLine of raw.split(/\r?\n/)) {
    const line = clean(rawLine);
    if (!line || isRule(line)) continue;
    const sec = sectionOf(line);
    if (sec && line.length < 40) { current = sec; continue; }
    if (/^RAPPORT D/i.test(line)) { p.title = line; continue; }
    if (/^Site\s*:/i.test(line)) {
      p.meta = line.split("·").map((part) => {
        const [label, ...rest] = part.split(":");
        return { label: (label ?? "").trim(), value: rest.join(":").trim() };
      });
      continue;
    }
    if (/^⚠/.test(line)) { p.notes.push(line.replace(/^⚠️?\s*/, "")); continue; }
    if (current === "anomalies" && /^[·•\-]/.test(line)) {
      const body = line.replace(/^[·•\-]\s*/, "");
      const parts = body.split(/\s+—\s+/);
      const who = parts[0] ?? "";
      const date = parts.length > 2 ? parts[1] : "";
      const rest = parts.length > 2 ? parts.slice(2).join(" — ") : parts.slice(1).join(" — ");
      const [type, ...d] = rest.split(":");
      p.anomalies.push({ who, date: date ?? "", type: (type ?? "").trim(), detail: d.join(":").trim() });
      continue;
    }
    if (current === "totals") {
      for (const part of line.split("·")) {
        const [label, ...rest] = part.split(":");
        if (rest.length) p.totals.push({ label: (label ?? "").trim(), value: rest.join(":").trim() });
      }
      continue;
    }
    if (current === "actions") { p.actions.push(line.replace(/^\d+[.)]\s*/, "")); continue; }
    if (current === "summary") { p.summary.push(line); continue; }
    p.other.push(line);
  }
  return p;
}

function badgeClass(type: string) {
  const t = type.toLowerCase();
  if (t.includes("absence")) return "bg-red-50 text-red-700 ring-red-200";
  if (t.includes("retard") || t.includes("oubli")) return "bg-amber-50 text-amber-800 ring-amber-200";
  if (t.includes("heure")) return "bg-blue-50 text-blue-700 ring-blue-200";
  if (t.includes("hors zone") || t.includes("mission")) return "bg-violet-50 text-violet-700 ring-violet-200";
  return "bg-secondary text-foreground ring-border";
}

export function AgentReport({ text }: { text: string }) {
  if (/^\s*INSUFFISANT/i.test(text)) {
    return (
      <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">L'agent ne peut pas répondre à cette demande</p>
          <p className="mt-1">{clean(text).replace(/^INSUFFISANT\s*:\s*/i, "")}.</p>
          <p className="mt-2 text-amber-800">Précisez un site (Plateau, Pikine, Diamniadio, Terrain) et une période, par exemple « Anomalies Pikine semaine 38 ».</p>
        </div>
      </div>
    );
  }

  const r = parseReport(text);
  const structured = r.anomalies.length > 0 || r.totals.length > 0;
  if (!structured) {
    return <div className="whitespace-pre-wrap rounded-lg border border-border bg-background p-5 text-sm leading-relaxed text-foreground">{clean(text)}</div>;
  }

  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-border bg-background">
      <header className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{r.title ?? "Rapport d'anomalies"}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {r.meta.map((m) => (
            <span key={m.label} className="rounded-md border border-border bg-secondary px-2.5 py-1 text-sm">
              <span className="text-muted-foreground">{m.label} :</span> <span className="font-medium text-foreground">{m.value}</span>
            </span>
          ))}
        </div>
        {r.summary.length > 0 && <p className="mt-3 text-sm leading-relaxed text-foreground">{r.summary.join(" ")}</p>}
      </header>

      {r.totals.length > 0 && (
        <div className="grid grid-cols-2 border-b border-border sm:grid-cols-3 lg:grid-cols-6">
          {r.totals.map((t) => (
            <div key={t.label} className="border-b border-r border-border px-4 py-3 last:border-r-0 lg:border-b-0">
              <p className="text-xs text-muted-foreground">{t.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{t.value}</p>
            </div>
          ))}
        </div>
      )}

      {r.anomalies.length > 0 && (
        <section className="px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground">Anomalies à vérifier ({r.anomalies.length})</h3>
          <ul className="mt-3 divide-y divide-border rounded-md border border-border">
            {r.anomalies.map((a, i) => (
              <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-sm sm:grid sm:grid-cols-[110px_110px_1fr] sm:gap-4">
                <span className="font-medium tabular-nums text-foreground">{a.who}</span>
                <span className="tabular-nums text-muted-foreground">{a.date}</span>
                <span className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeClass(a.type)}`}>{a.type}</span>
                  <span className="text-muted-foreground">{a.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {r.actions.length > 0 && (
        <section className="border-t border-border px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground">Actions recommandées</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {r.actions.map((a, i) => (
              <li key={i} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-foreground">{a}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(r.notes.length > 0 || r.other.length > 0) && (
        <footer className="flex gap-2 border-t border-border bg-secondary px-5 py-3 text-xs text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <p>{[...r.notes, ...r.other].join(" ")}</p>
        </footer>
      )}
    </article>
  );
}
