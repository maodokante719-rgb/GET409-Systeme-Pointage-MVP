import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Demander une démo de Systeme-Pointage" },
      { name: "description", content: "Demandez une démo de 30 min du pointage mobile multi-sites, en présentiel à Dakar ou en visio." },
      { property: "og:title", content: "Contact — Systeme-Pointage" },
      { property: "og:description", content: "Démo de 30 min, en présentiel à Dakar ou en visio." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto grid max-w-7xl gap-14 px-5 py-14 md:grid-cols-12 md:py-20">
      <section className="md:col-span-7">
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Demander une démo</h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Indiquez-nous comment vos équipes sont réparties. Nous vous montrons le pointage sur vos propres sites.
        </p>
        <div className="mt-10"><ContactForm /></div>
      </section>
      <aside className="space-y-8 text-sm md:col-span-4 md:col-start-9">
        <div>
          <p className="font-medium text-foreground">Adresse</p>
          <p className="mt-1.5 text-muted-foreground">Immeuble Fahd, Boulevard Djily Mbaye<br />Plateau, Dakar</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Téléphone et e-mail</p>
          <p className="mt-1.5 text-muted-foreground">+221 33 800 00 00<br />contact@systeme-pointage.sn</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Horaires</p>
          <p className="mt-1.5 text-muted-foreground">Lundi – vendredi, 8h – 18h</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary p-5">
          <p className="font-semibold text-foreground">Démo de 30 min</p>
          <p className="mt-1.5 text-muted-foreground">En présentiel à Dakar ou en visio, avec vos sites et vos horaires.</p>
        </div>
        <p className="text-xs text-muted-foreground">Coordonnées fictives de démonstration.</p>
      </aside>
    </div>
  );
}
