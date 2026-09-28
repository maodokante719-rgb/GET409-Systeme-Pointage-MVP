import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 text-sm md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-muted-foreground">
            Pointage mobile pour les PME multi-sites de Dakar : siège, agences, dépôts et équipes terrain.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="font-medium text-foreground">Produit</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/pointages" className="hover:text-foreground">Pointages du jour</Link></li>
            <li>Export paie</li>
            <li>Pointage mission</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-medium text-foreground">Entreprise</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>À propos</li>
            <li><Link to="/contact" className="hover:text-foreground">Demander une démo</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-medium text-foreground">Mentions légales</p>
          <p className="mt-3 text-muted-foreground">
            Données traitées selon la loi n° 2008-12 sur la protection des données personnelles — CDP.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="font-medium text-foreground">Contact</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>+221 33 800 00 00</li>
            <li>contact@systeme-pointage.sn</li>
            <li>Plateau, Dakar</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground">
          © 2026 Systeme-Pointage · Données de démonstration fictives
        </p>
      </div>
    </footer>
  );
}
