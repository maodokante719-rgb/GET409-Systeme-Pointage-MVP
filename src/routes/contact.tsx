import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Demander une démo de Systeme-Pointage" },
      {
        name: "description",
        content:
          "Contactez Systeme-Pointage à Dakar pour une démo du pointage mobile multi-sites destiné aux PME.",
      },
      { property: "og:title", content: "Contact — Systeme-Pointage" },
      {
        property: "og:description",
        content: "Demandez une démo du pointage mobile pour vos équipes multi-sites à Dakar.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("E-mail invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  company: z.string().trim().min(1, "Entreprise requise").max(120),
  headcount: z.string().trim().max(10),
  message: z.string().trim().min(1, "Message requis").max(1000),
});

const fields = [
  { name: "name", label: "Nom complet", type: "text" },
  { name: "email", label: "E-mail", type: "email" },
  { name: "phone", label: "Téléphone", type: "tel" },
  { name: "company", label: "Nom de l'entreprise", type: "text" },
  { name: "headcount", label: "Nombre d'employés", type: "number" },
] as const;

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setSent(false);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Demander une démo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dites-nous comment vos équipes sont réparties, nous vous montrons le pointage en
            conditions réelles.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name}>
                  <label
                    htmlFor={f.name}
                    className="block text-sm font-medium text-foreground"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  {errors[f.name] && (
                    <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              {errors["message"] && (
                <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark md:w-auto"
            >
              Demander une démo
            </button>

            {sent && (
              <p className="rounded-lg bg-status-present/12 p-3 text-sm font-medium text-status-present">
                Merci ! Votre demande de démo a bien été enregistrée (prototype de démonstration).
              </p>
            )}
          </form>
        </section>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-semibold text-foreground">Nos coordonnées</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Systeme-Pointage — Immeuble Fahd, Boulevard Djily Mbaye, Plateau, Dakar, Sénégal
          </p>
          <p className="mt-3 text-sm text-foreground">+221 33 800 00 00</p>
          <p className="text-sm text-foreground">contact@systeme-pointage.sn</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Coordonnées fictives de démonstration.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
