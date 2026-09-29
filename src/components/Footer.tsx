import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">Pointage Sûr — Système de pointage pour PME multi-sites · Dakar</p>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:justify-between">
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <Link to="/pointages" className="hover:text-foreground">Pointages</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </nav>
          <p>© 2026 Systeme-Pointage — Master GET 409</p>
        </div>
      </div>
    </footer>
  );
}
