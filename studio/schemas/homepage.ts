import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Page d’accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Image principale de la page d’accueil',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})