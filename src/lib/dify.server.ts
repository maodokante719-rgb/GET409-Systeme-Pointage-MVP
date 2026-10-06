const DIFY_URL = "https://api.dify.ai/v1/workflows/run";

export type AgentResult = { ok: true; text: string } | { ok: false; error: string };

export async function runDifyAgent(query: string): Promise<AgentResult> {
  // Clé lue à l'exécution, côté serveur uniquement : aucune valeur par défaut.
  const DIFY_KEY = process.env["DIFY_API_KEY"];
  if (!DIFY_KEY) return { ok: false, error: "Agent non configuré : variable DIFY_API_KEY manquante côté serveur." };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(DIFY_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${DIFY_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: { query }, response_mode: "blocking", user: "systeme-pointage-" + Date.now() }),
      signal: ctrl.signal,
    });
    if (res.status !== 200) return { ok: false, error: "Service temporairement indisponible" };
    const data = await res.json();
    const out = data?.data?.outputs ?? {};
    const text = out.text || out.message_erreur;
    if (!text) return { ok: false, error: "Service temporairement indisponible" };
    return { ok: true, text: String(text) };
  } catch (e) {
    if ((e as Error)?.name === "AbortError") return { ok: false, error: "La réponse prend trop de temps — réessayez" };
    return { ok: false, error: "Service temporairement indisponible" };
  } finally {
    clearTimeout(timer);
  }
}
