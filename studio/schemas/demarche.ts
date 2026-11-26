import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'demarche',
  title: 'Démarche — manifeste et biographie',
  type: 'document',
  fields: [
    defineField({
      name: 'manifesto',
      title: 'Manifeste',
      type: 'text',
      rows: 12,
      description: 'Séparez les paragraphes par une ligne vide.',
      initialValue: 'Je peins des lieux qui ne se laissent pas tout à fait nommer.\nL’eau, les murs et les horizons deviennent mémoire et matière.\n\nPar strates, je dépose, j’efface, laisse remonter la couche précédente.\nLa peinture observe les passages et ce qui persiste.',
    }),
    defineField({
      name: 'biography',
      title: 'Biographie',
      type: 'text',
      rows: 6,
      description: 'Séparez les paragraphes par une ligne vide.',
      initialValue: 'Artiste peintre, formé·e aux Beaux-Arts de Paris.\nL’atelier est situé à COISE.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Démarche — manifeste et biographie' }),
  },
})