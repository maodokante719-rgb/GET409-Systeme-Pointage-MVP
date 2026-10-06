# Atelier Claude Code — Systeme-Pointage

Rendus de l'atelier Claude Code (épisodes E00 à E14), appliqué au projet Systeme-Pointage sur la branche `atelier`.

| Épisode | Contenu | Fichier |
|---|---|---|
| E01 | Fiche projet vérifiée par Claude Code | [`../fiche-projet.html`](../fiche-projet.html) |
| E01 | Captures `/usage` et `/context` | [`captures/`](captures/) |
| E02 | Modes de permission : changement en *accept edits* puis retour arrière | diff dans [`e02/e02-diff.txt`](e02/e02-diff.txt) |
| E03 | Landing page sans skill / avec la skill frontend-design | [`e03/landing-sans-skill.html`](e03/landing-sans-skill.html), [`e03/landing-avec-skill.html`](e03/landing-avec-skill.html) |
| E04 | `CLAUDE.md` du projet | [`../../CLAUDE.md`](../../CLAUDE.md) |
| E05 | Skill de marque `sp-brand` + email, post LinkedIn, flyer A4 | [`config/sp-brand-SKILL.md`](config/sp-brand-SKILL.md), [`e05/`](e05/) |
| E06 | Plan marketing | [`e06/plan-marketing.html`](e06/plan-marketing.html) |
| E08 | Clé Dify retirée du code, `.env` ignoré, `.env.example`, règles de protection | [`../../src/lib/dify.server.ts`](../../src/lib/dify.server.ts), [`config/settings.json`](config/settings.json) |
| E14 | Sous-agent relecteur sécurité + audit avant mise en ligne | [`config/security-reviewer.md`](config/security-reviewer.md), [`e14/audit-securite.md`](e14/audit-securite.md) |

Épisodes non réalisés : E10 (boucle Ralph, optionnelle), E11 à E13 (optionnels, hors projet).

Toutes les données sont fictives. Aucune clé API n'est versionnée : la clé Dify est lue côté serveur dans la variable `DIFY_API_KEY`.
