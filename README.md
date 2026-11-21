# Portfolio Nuxt — Atelier A. Moreau
Nuxt 3 / Vue 3 / TypeScript, images SVG mock locales.
## Démarrage
`npm install` puis `npm run dev`, ouvrir localhost:3000. Huit œuvres de démonstration sans compte; formulaire de démonstration local sans transmission.
## Sanity facultatif
Créer un compte gratuit sur sanity.io et un projet/dataset. Copier `.env.example` en `.env`, définir `NUXT_PUBLIC_SANITY_PROJECT_ID`. Le composable catalogue bascule alors sur GROQ. Le studio indépendant est dans `/studio`; lancer `cd studio && npm install && npm run dev`, renseigner `SANITY_STUDIO_PROJECT_ID` et `SANITY_STUDIO_DATASET` depuis `studio/.env.example`.
## Publication
Vercel ou Netlify: build `npm run build`, définir les variables d’environnement. `npm run generate` pour export statique; contrôler la génération de routes dynamiques.
