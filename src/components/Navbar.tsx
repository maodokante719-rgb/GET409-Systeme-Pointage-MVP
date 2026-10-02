import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/pointages", label: "Pointages du jour" },
  { to: "/agent", label: "Agent IA" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold tracking-tight text-primary-foreground">
        SP
      </span>
      <span className="font-semibold tracking-tight text-foreground">Systeme-Pointage</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-dark md:inline-flex"
        >
          Demander une démo
        </Link>
        <button
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 pb-5 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 text-sm text-muted-foreground"
                  activeProps={{ className: "text-foreground font-medium" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Demander une démo
          </Link>
        </div>
      )}
    </header>
  );
}
