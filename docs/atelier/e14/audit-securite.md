# Rapport d'audit de sécurité : GET409-Systeme-Pointage-MVP (6 octobre 2026)

Le projet n'a pas de sous-agent `security-reviewer` (le dossier `.claude/agents/` n'existe pas). J'ai donc confié l'audit à un agent en lecture seule, avec des consignes de security-reviewer. Aucun fichier n'a été modifié. J'ai revérifié moi-même le constat critique.

## Verdict : pas prêt pour la mise en ligne

Un problème critique bloque la mise en ligne, et un problème élevé est à corriger avant. Le reste du code est globalement sain.

---

## 🔴 CRITIQUE

### C1. La clé API Dify est toujours en clair sur `origin/main`

C'est la branche que Netlify et Lovable déploient. J'ai vérifié :
- **Clé sur `origin/main` :** `git grep "app-***" origin/main` la trouve dans `src/lib/dify.server.ts`, comme valeur par défaut (`process.env["DIFY_API_KEY"] ?? "app-***…"`).
- **Correctif non publié :** le commit `f5bf9e6` (« clé Dify retirée ») n'existe que sur la branche locale `atelier`. Trois commits n'ont pas été poussés : `f5bf9e6`, `0b22855` et `a23b689`.
- **Historique :** la clé est entrée avec le commit Lovable `cdc008e` (2 octobre) et se trouve dans 11 commits.
- **Copies locales :** elle apparaît aussi en clair dans deux fichiers du dossier `atelier/`, qui n'est pas suivi par Git : `atelier/atelier-e01.log` et `atelier/e04-claude-md.log`.
- **Risque :** le dépôt semble privé, mais la clé reste lisible par les collaborateurs, par Lovable et par tout clone. Avec elle, on peut appeler Dify directement et vider le quota.
- **Effet secondaire :** la clé écrite dans le code masque l'absence éventuelle de la variable d'environnement sur Netlify. Le site marche même si Netlify est mal configuré.

**À faire :**
1. Révoquer la clé dans Dify et en générer une nouvelle.
2. Mettre la nouvelle clé dans la variable `DIFY_API_KEY` sur Netlify, sans préfixe `VITE_`.
3. Pousser le correctif sur `main` (sur votre demande explicite), puis redéployer.

Il ne faut pas réécrire l'historique : CLAUDE.md l'interdit, et révoquer la clé suffit.

## 🟠 ÉLEVÉE

### E1. La server function de l'agent est publique, sans authentification ni limite de débit

- **Où :** `src/lib/agent.functions.ts:5-7` et `src/lib/dify.server.ts:12-17`.
- **Coût d'un appel :** chaque appel lance le workflow Dify complet (Chercheur puis Rédacteur, plusieurs appels LLM).
- **Pas de rempart réel :** la protection CSRF (`src/start.ts:24-26`) ne bloque pas un script `curl`.
- **Aucun suivi possible :** `user: "systeme-pointage-" + Date.now()` crée un nouvel utilisateur Dify à chaque requête, ce qui empêche tout quota ou toute traçabilité côté Dify.
- **Scénario :** un script en boucle épuise les crédits, fait monter la facture et rend l'agent indisponible.

**À faire :**
- limiter le nombre d'appels par adresse IP (middleware ou règle Netlify) ;
- mettre en cache les 4 suggestions de `AnomalyAgent.tsx:7-12` ;
- fixer un plafond de dépenses dans Dify et chez le fournisseur LLM ;
- utiliser un identifiant `user` stable, par exemple l'IP hachée ;
- éventuellement, ajouter un captcha (Turnstile).

## 🟡 MOYENNE

### M1. En-têtes de sécurité HTTP manquants

`netlify.toml` ne définit aucun en-tête. Le site en ligne n'a que ceux ajoutés par défaut par Netlify : HSTS et `nosniff`.

- **Manquent :** CSP, `X-Frame-Options` (ou `frame-ancestors`), `Referrer-Policy` et `Permissions-Policy`.
- **Risque :** clickjacking sur `/agent`, et aucune protection de secours en cas de faille XSS future.
- **À faire :** ajouter ces en-têtes dans `netlify.toml`. La CSP est à tester d'abord en mode « Report-Only », car TanStack insère des scripts inline. Il faut aussi vérifier que l'aperçu Lovable fonctionne encore avec `X-Frame-Options: DENY`.

### M2. Injection de prompt dans l'agent

- Le texte libre (1 à 500 caractères) est envoyé tel quel à Dify (`dify.server.ts:15`).
- La réponse est affichée comme « rapport ».
- **Risque :** les données étant fictives, c'est surtout un risque d'image (réponses hors sujet ou injurieuses, prompt système révélé) et de coût.
- **Point conforme :** `/agent?q=` pré-remplit le champ mais ne lance pas l'analyse automatiquement.
- **À faire :** renforcer le prompt système dans Dify, et envisager une saisie structurée (site + semaine) à la place du texte libre.

## 🟢 FAIBLE

- **F1. Identifiant `user` Dify unique à chaque requête :** voir E1.
- **F2. Le formulaire de contact simule l'envoi** (`ContactForm.tsx:22-33`). Il affiche « Demande envoyée, rappel sous 24 h », mais rien n'est envoyé ni enregistré. C'est trompeur pour un visiteur. Il faut l'indiquer clairement, ou brancher une vraie server function avec Zod, un piège anti-spam (honeypot), une limite de débit et une mention sur les données personnelles.
- **F3. Erreurs Zod renvoyées au client (probable, non testé en exécution) :** `.parse()` dans `agent.functions.ts:6` peut renvoyer le détail de la validation. Il vaut mieux utiliser `safeParse` et un message générique.
- **F4. Copies locales de la clé dans `atelier/` :** à supprimer une fois la clé révoquée.

## ℹ️ INFO

- **I1. Google Fonts chargées depuis un service tiers :** cela pose une question RGPD. On peut héberger la police Inter soi-même.
- **I2. `dangerouslySetInnerHTML` dans `ui/chart.tsx:73` :** composant shadcn standard qui n'est pas utilisé. Aucun risque.
- **I3. Export CSV (`pointages.tsx:14-25`) :** pas de protection contre l'injection de formules (`=`, `+`, `-`, `@`). Pas exploitable aujourd'hui avec des données statiques.
- **I4. Délais d'attente :** 30 s côté serveur et 32 s côté client. Les Netlify Functions ont probablement une limite d'environ 10 s, d'où un risque d'erreurs 502. C'est un problème de disponibilité, pas de sécurité.
- **I5. Build local :** le dossier `.output/` local a été compilé pour Cloudflare, alors que la production cible Netlify. Il ne reflète donc pas la production.
- **I6. Fichiers de verrouillage :** seul `bun.lock` est versionné, alors que Netlify lance `npm run build`. Les builds ne sont donc pas reproductibles.

---

## Points vérifiés et conformes

- **Branche `atelier` :** aucun secret dans le code. La clé est lue seulement via `process.env.DIFY_API_KEY`, sans valeur par défaut, avec une erreur générique si elle manque.
- **Fichiers d'environnement :** seul `.env.example` est suivi, avec une valeur vide. `.gitignore` couvre bien `.env` et `.env.*`.
- **Dossier `atelier/` :** bien ignoré par Git.
- **Côté client :** pas de `process.env`, d'`import.meta.env` ni de variable `VITE_`. `dify.server.ts` n'est importé que par `agent.functions.ts`. La clé est absente du bundle local et des bundles JS du site en ligne.
- **Appels serveur :** pas de SSRF possible (l'URL Dify est fixe), délai d'attente avec `AbortController` à 30 s, messages d'erreur génériques.
- **Validation et protections :** validation Zod côté serveur (`trim`, `min(1)`, `max(500)`) et protection CSRF active.
- **Affichage :** pas de XSS, la réponse Dify est rendue en texte échappé.
- **Production :** pas de sourcemaps publiés, HSTS actif.
- **Dépendances :** `npm audit` ne trouve aucune vulnérabilité sur 483 dépendances.
- **Données :** `employees.json` contient 6 employés fictifs, sans coordonnées. Les coordonnées de la page contact sont marquées « fictives ».

---

## Checklist avant mise en ligne

1. [ ] Révoquer la clé Dify `app-***…` et en générer une nouvelle.
2. [ ] Mettre la nouvelle clé dans `DIFY_API_KEY` sur Netlify, sans `VITE_`.
3. [ ] Pousser le correctif `f5bf9e6` sur `main` (sur votre demande), vérifier que `git grep "app-***" origin/main` ne trouve plus rien, puis redéployer.
4. [ ] Tester `/agent` avec la nouvelle clé.
5. [ ] Supprimer les deux logs de `atelier/` qui contiennent la clé.
6. [ ] Ajouter une limite de débit, un cache des suggestions, un plafond de dépenses et un identifiant `user` stable.
7. [ ] Ajouter les en-têtes de sécurité dans `netlify.toml`.
8. [ ] Renforcer le prompt système Dify contre l'injection.
9. [ ] Corriger le message du formulaire de contact, ou le brancher réellement.
10. [ ] Remplacer `parse` par `safeParse` dans `askAgent`, avec une erreur générique.
11. [ ] Vérifier le délai d'attente des Netlify Functions par rapport à la durée réelle du workflow.

**Le plus urgent :** révoquer la clé (point 1), même avant de pousser quoi que ce soit, car elle est déjà exposée sur `main`.

Je peux vous aider sur les points 3 à 10. Dites-moi par lequel commencer.

Plusieurs connecteurs MCP ne sont pas autorisés : Google Drive, Atlassian, Intercom, Linear, Notion et Slack. On les autorise depuis les paramètres des connecteurs claude.ai, ou avec `/mcp` dans une session interactive. Ils n'ont pas servi pour cet audit.
