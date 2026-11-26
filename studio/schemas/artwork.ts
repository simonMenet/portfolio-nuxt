import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Œuvre',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'series', title: 'Série', type: 'reference', to: [{ type: 'series' }] }),
    defineField({ name: 'year', title: 'Année', type: 'number' }),
    defineField({ name: 'technique', title: 'Technique', type: 'string' }),
    defineField({ name: 'dimensions', title: 'Dimensions', type: 'string' }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      description: 'Facultatif — affiché uniquement si un prix est renseigné.',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Réservée', value: 'reserved' },
          { title: 'Collection privée', value: 'private_collection' },
          { title: 'Vendu', value: 'sold' },
        ],
      },
    }),
    defineField({ name: 'vue_principale', title: 'Vue principale', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'vue_situation', title: 'Vue en situation', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'vue_detail', title: 'Vue de détail 1', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'vue_detail_2', title: 'Vue de détail 2', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'vue_detail_3', title: 'Vue de détail 3', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Ordre', type: 'number' }),
  ],
})