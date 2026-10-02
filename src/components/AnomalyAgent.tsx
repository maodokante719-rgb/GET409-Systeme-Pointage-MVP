import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, Check, Sparkles, SearchX } from "lucide-react";
import { askAgent } from "@/lib/agent.functions";
import { AgentReport } from "@/components/AgentReport";

export const SUGGESTIONS = [
  "Anomalies Pikine semaine 38",
  "Anomalies Plateau semaine 38",
  "Retards Diamniadio semaine 38",
  "Missions Terrain semaine 38",
];

export function AnomalyAgent({ initialQuery = "" }: { initialQuery?: string }) {
  const ask = useServerFn(askAgent);
  const [query, setQuery] = useState(initialQuery);
  const [asked, setAsked] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run(q: string) {
    const value = q.trim();
    if (!value || loading) return;
    setQuery(value); setAsked(value);
    setLoading(true); setError(null); setResult(null); setCopied(false);
    try {
      const r = await Promise.race([
        ask({ data: { query: value } }),
        new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 32000)),
      ]);
      if (r.ok) setResult(r.text); else setError(r.error);
    } catch (err) {
      setError((err as Error).message === "timeout" ? "La réponse prend trop de temps — réessayez." : "Service temporairement indisponible.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <aside className="min-w-0 lg:col-span-4">
        <form
          onSubmit={(e) => { e.preventDefault(); run(query); }}
          className="rounded-lg border border-border bg-background p-5"
        >
          <label htmlFor="agent-q" className="text-sm font-semibold text-foreground">Votre demande</label>
          <textarea
            id="agent-q"
            rows={3}
            maxLength={500}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); run(query); } }}
            placeholder="Ex. : Anomalies Pikine semaine 38"
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {loading ? "Analyse en cours…" : "Générer le rapport"}
          </button>

          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">Demandes fréquentes</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                disabled={loading}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
              >
                {s}
              </button>
            ))}
          </div>
        </form>
        <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
          L'agent répond uniquement à partir des pointages de la semaine 38 (données fictives). Il ne propose jamais de sanction : chaque anomalie est à vérifier par la RH.
        </p>
      </aside>

      <section className="min-w-0 lg:col-span-8" aria-live="polite">
        {asked && (
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="truncate text-sm text-muted-foreground">Demande : <span className="font-medium text-foreground">{asked}</span></p>
            {result && (
              <button onClick={copy} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary">
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                {copied ? "Copié" : "Copier le rapport"}
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="rounded-lg border border-border bg-background p-5" role="status">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              L'agent lit les pointages puis rédige le rapport (environ 10 secondes)…
            </p>
            <div className="mt-5 space-y-3">
              {[80, 60, 95, 70, 85].map((w, i) => (
                <div key={i} className="h-3 animate-pulse rounded bg-secondary" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700" role="alert">
            <p className="font-semibold">{error}</p>
            <button onClick={() => asked && run(asked)} className="mt-2 underline underline-offset-2">Réessayer</button>
          </div>
        )}

        {result && !loading && <AgentReport text={result} />}

        {!asked && !loading && (
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background p-10 text-center">
            <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-medium text-foreground">Aucun rapport pour l'instant</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Choisissez une demande fréquente ou indiquez un site et une période.</p>
          </div>
        )}
      </section>
    </div>
  );
}
