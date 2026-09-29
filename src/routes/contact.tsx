import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Demander une démo de Pointage Sûr" },
      { name: "description", content: "Parlons de vos sites. Réponse sous 24 h ouvrées pour organiser une démonstration à Dakar." },
      { property: "og:title", content: "Contact — Pointage Sûr" },
      { property: "og:description", content: "Organisez une démonstration du pointage mobile sur vos sites." },
    ],
  }),
  component: Contact,
});

const info = [
  { i: MapPin, t: "Pointage Sûr — Immeuble Kébé, Avenue Léopold Sédar Senghor, Plateau, Dakar" },
  { i: Mail, t: "contact@pointage-sur.sn" },
  { i: Phone, t: "+221 33 800 00 00" },
  { i: Clock, t: "Lun–Ven · 8 h 00 – 17 h 30" },
];

function Contact() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-12 md:py-16">
      <section className="md:col-span-7">
        <h1 className="text-3xl font-bold text-strong md:text-4xl">Parlons de vos sites</h1>
        <p className="mt-3 max-w-lg text-muted-foreground">Nous revenons vers vous sous 24 h ouvrées pour organiser une démonstration.</p>
        <div className="card-surface mt-8 p-6 md:p-8"><ContactForm /></div>
      </section>
      <aside className="md:col-span-5 md:pt-[104px]">
        <div className="card-surface p-6 md:p-8">
          <p className="eyebrow text-primary">Nos coordonnées</p>
          <ul className="mt-6 space-y-5 text-sm">
            {info.map(({ i: Icon, t }) => (
              <li key={t} className="flex gap-3 text-foreground"><Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted-foreground" />{t}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
