import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted-foreground md:grid-cols-3">
        <div>
          <p className="font-semibold text-foreground">⏱️ Systeme-Pointage</p>
          <p className="mt-2">
            Données traitées conformément à la loi sénégalaise n° 2008-12 relative à la protection
            des données à caractère personnel (CDP).
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Contact</p>
          <p className="mt-2">Immeuble Fahd, Boulevard Djily Mbaye, Plateau, Dakar, Sénégal</p>
          <p>+221 33 800 00 00 · contact@systeme-pointage.sn</p>
          <p className="mt-1 text-xs">(coordonnées fictives de démonstration)</p>
        </div>
        <div className="md:text-right">
          <Link to="/contact" className="font-medium text-primary hover:underline">
            Demander une démo
          </Link>
          <p className="mt-2">© 2026 Systeme-Pointage</p>
        </div>
      </div>
    </footer>
  );
}
