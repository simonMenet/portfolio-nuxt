import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'atelier',
  title: 'Atelier — contenu',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'q323tq8e',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: S => S.list().title('Contenus').items([
        S.documentTypeListItem('artwork').title('Œuvres'),
        S.documentTypeListItem('series').title('Séries'),
        S.documentTypeListItem('homepage').title('Page d’accueil'),
        S.listItem()
          .title('Démarche')
          .child(S.document().schemaType('demarche').documentId('demarche')),
      ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})