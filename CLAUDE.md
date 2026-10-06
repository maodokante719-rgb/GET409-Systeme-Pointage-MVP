# CLAUDE.md — Système de pointage (MVP GET409)

MVP web de pointage des employés : accueil, tableau des pointages du jour, historique, contact.
Un agent IA (workflow Dify) analyse les pointages et signale les anomalies (page `/agent`).

## Stack
- TanStack Start (React 19, TanStack Router, server functions) sur Vite 8, TypeScript
- Tailwind CSS 4 + composants shadcn/ui (Radix) dans `src/components/ui`
- Zod pour valider les entrées, lucide-react pour les icônes
- Projet synchronisé avec Lovable ; déploiement Netlify (`netlify.toml`)

## Commandes
- `npm run dev` — serveur de développement
- `npm run build` — build de production (doit passer avant de déclarer une tâche finie)
- `npm run lint` — ESLint

## Structure
- `src/routes/` — une route par fichier (`index`, `pointages`, `agent`, `contact`, `__root`)
- `src/components/` — composants métier ; `src/components/ui/` — primitives shadcn, ne pas réécrire
- `src/lib/` — utilitaires et code serveur (`*.functions.ts` = server functions, `*.server.ts` = serveur uniquement)
- `src/data/` — données fictives (`employees.json`)
- Alias d'import : `@/` → `src/`

## Conventions
- `src/routeTree.gen.ts` est généré par le plugin TanStack Router : ne jamais l'éditer à la main
- Nouvelle page = nouveau fichier dans `src/routes/` avec `createFileRoute`
- `vite.config.ts` passe par `@lovable.dev/vite-tanstack-config` : ne pas ajouter les plugins
  déjà inclus (tanstackStart, react, tailwind, tsconfig paths, nitro)
- Tailwind 4 : configuration dans `src/styles.css` (pas de `tailwind.config.js`)
- Tous les textes visibles sont en français
- Uniquement des données fictives : aucun nom, contact ou pointage réel
- Appels à Dify uniquement côté serveur, via une server function (`createServerFn`) validée par Zod

## Sécurité
- Aucune clé API, aucun secret dans le code ni dans Git (y compris en valeur par défaut)
- La clé Dify est lue uniquement via `process.env.DIFY_API_KEY`, côté serveur
  (fichiers `*.server.ts`), jamais exposée au client ni préfixée `VITE_`
- Si une clé apparaît dans le code ou l'historique : le signaler, la retirer et la faire révoquer
- Le dossier `atelier/` (scripts et logs locaux) est ignoré par Git : ne pas le committer

## Méthode
- Avancer par petites étapes vérifiables, un changement ciblé à la fois
- Lancer `npm run build` (et `npm run lint`) avant de dire que c'est fini
- Jamais de commit ni de push sans demande explicite
- Ne jamais réécrire l'historique publié (force push, rebase, amend) : la branche est synchronisée avec Lovable
