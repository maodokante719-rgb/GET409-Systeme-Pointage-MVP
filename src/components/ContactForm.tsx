import { useState, type FormEvent } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("E-mail invalide").max(255),
  phone: z.string().trim().min(6, "Téléphone invalide").max(30),
  company: z.string().trim().min(1, "Entreprise requise").max(120),
  headcount: z.enum(["1-20", "21-50", "51-200"], { message: "Choisissez une tranche" }),
  message: z.string().trim().max(1000),
});

const input = "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/20";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const next: Record<string, string> = {};
      for (const i of r.error.issues) next[String(i.path[0])] = i.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  if (sent)
    return (
      <div className="p-2">
        <p className="flex items-center gap-2 font-semibold text-foreground">
          <span className="h-2 w-2 rounded-full bg-status-present" /> Demande envoyée
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Merci. Nous vous rappelons sous 24 h ouvrées pour fixer la démo.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-sm text-primary hover:underline">Envoyer une autre demande</button>
      </div>
    );

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div><label htmlFor="name" className="text-sm font-medium text-foreground">Nom</label><input id="name" name="name" className={input} />{err("name")}</div>
        <div><label htmlFor="email" className="text-sm font-medium text-foreground">E-mail</label><input id="email" name="email" type="email" className={input} />{err("email")}</div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Téléphone</label>
          <input id="phone" name="phone" type="tel" placeholder="+221 77 000 00 00" className={input} />
          {err("phone")}
        </div>
        <div><label htmlFor="company" className="text-sm font-medium text-foreground">Nom de l'entreprise</label><input id="company" name="company" className={input} />{err("company")}</div>
        <div className="md:col-span-2">
          <label htmlFor="headcount" className="text-sm font-medium text-foreground">Nombre d'employés</label>
          <select id="headcount" name="headcount" defaultValue="" className={input}>
            <option value="" disabled>Sélectionner</option>
            <option value="1-20">1 – 20</option>
            <option value="21-50">21 – 50</option>
            <option value="51-200">51 – 200</option>
          </select>
          {err("headcount")}
        </div>
      </div>
      <div><label htmlFor="message" className="text-sm font-medium text-foreground">Message</label><textarea id="message" name="message" rows={5} className={input} placeholder="Nombre de sites, horaires, outil de paie actuel…" /></div>
      <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark">Envoyer la demande</button>
    </form>
  );
}
