import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askAgent } from "@/lib/agent.functions";

export function AnomalyAgent() {
  const ask = useServerFn(askAgent);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const r = await Promise.race([
        ask({ data: { query } }),
        new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 32000)),
      ]);
      if (r.ok) setResult(r.text); else setError(r.error);
    } catch (err) {
      setError((err as Error).message === "timeout" ? "La réponse prend trop de temps — réessayez" : "Service temporairement indisponible");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="rounded-lg border border-border bg-background p-5">
        <h2 className="text-lg font-semibold text-foreground">Rapport d'anomalies (agent IA)</h2>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex. : Anomalies Pikine semaine 38"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            Demander à l'agent
          </button>
        </form>
        {loading && (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground" role="status">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            L'agent analyse les pointages…
          </p>
        )}
        {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
        {result && (
          <div className="mt-4 whitespace-pre-wrap rounded-lg bg-secondary p-4 text-sm text-foreground">{result}</div>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Réponse générée par un agent IA à partir des pointages de la semaine 38 (données fictives). À vérifier par la RH avant toute décision.
      </p>
    </div>
  );
}
