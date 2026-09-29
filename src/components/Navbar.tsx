import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/pointages", label: "Pointages" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Pointage Sûr, accueil">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-[0.12em] text-strong">POINTAGE SÛR</span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Système de pointage</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Logo />
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark md:inline-flex">
          Demander une démo
        </Link>
        <button className="rounded-md p-2 text-foreground md:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 pb-5 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm text-muted-foreground" activeProps={{ className: "text-foreground font-medium" }} activeOptions={{ exact: true }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 flex justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            Demander une démo
          </Link>
        </div>
      )}
    </header>
  );
}
