# Portfolio Nuxt — Simon MENET

Application Nuxt 3 / Vue 3 / TypeScript. Les huit œuvres de démonstration utilisent des images SVG locales; le formulaire de contact est une démonstration locale et n’envoie pas de message.

## Démarrage

1. Installer Node.js compatible avec Nuxt 3.
2. À la racine du projet : `npm install`, puis `npm run dev`.
3. Ouvrir `http://localhost:3000`.

Sans identifiant Sanity configuré, le catalogue de démonstration est utilisé.

## Catalogue Sanity (facultatif)

Créer un projet Sanity, puis copier `.env.example` vers `.env` et renseigner `NUXT_PUBLIC_SANITY_PROJECT_ID` (et, si nécessaire, dataset/version). Le détail d’œuvre affiche les images renseignées et le prix facultatif. Les schémas du catalogue sont dans `studio/schemas/`.

**Limite de ce dépôt :** le dossier `studio/` contient des fichiers de configuration et des schémas, mais pas de manifeste/package d’installation autonome pour le Studio. Il ne peut donc pas être lancé via `cd studio && npm install` tel quel; provisionner/configurer un projet Sanity Studio séparément avant de le déployer.

## Vérification / publication

`npm run build` lance le build Nuxt; `npm run generate` lance la génération statique. Les routes dynamiques doivent être vérifiées selon la plateforme d’hébergement.