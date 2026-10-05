import {defineField, defineType} from 'sanity'

export const collectionType = defineType({
  name: 'collection',
  title: 'Coleções / Campanhas',
  type: 'document',
  fields: [
    defineField({
      name: 'seasonIndicator',
      title: 'Estação do Ano',
      type: 'string',
      options: {
        list: [
          { title: 'Verão', value: 'verao' },
          { title: 'Outono', value: 'outono' },
          { title: 'Inverno', value: 'inverno' },
          { title: 'Primavera', value: 'primavera' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Nome da Coleção',
      type: 'string', // Ex: "COLEÇÃO OUTONO 2026"
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Chamada',
      type: 'string', // Ex: "Essencial. Atemporal."
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Destaque (Capa)',
      type: 'image',
      options: { hotspot: true }
    })
  ]
})