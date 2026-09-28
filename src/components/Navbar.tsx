import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/pointages", label: "Pointages du jour" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <span className="text-2xl">⏱️</span>
          <span className="tracking-tight">Systeme-Pointage</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-md px-2.5 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:px-3"
                activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
