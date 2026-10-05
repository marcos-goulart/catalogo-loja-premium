import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Produtos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Peça',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Departamento / Secção',
      type: 'string',
      options: {
        list: [
          { title: 'Feminino', value: 'feminino' },
          { title: 'Masculino', value: 'masculino' },
          { title: 'Infantil', value: 'infantil' },
          { title: 'Unissexo', value: 'unissexo' }
        ],
        layout: 'radio', // Exibe os botões lado a lado no painel
        direction: 'horizontal'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Categoria da Peça',
      type: 'string',
      options: {
        list: [
          { title: 'Camisetas & Blusas', value: 'camisetas' },
          { title: 'Calças', value: 'calcas' },
          { title: 'Vestidos', value: 'vestidos' },
          { title: 'Casacos & Jaquetas', value: 'casacos' },
          { title: 'Acessórios', value: 'acessorios' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'collection',
      title: 'Coleção / Estação',
      type: 'reference',
      to: [{ type: 'collection' }]
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'sizes',
      title: 'Tamanhos Disponíveis',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Tamanho Único', value: 'U'},
          {title: 'PP', value: 'PP'},
          {title: 'P', value: 'P'},
          {title: 'M', value: 'M'},
          {title: 'G', value: 'G'},
          {title: 'GG', value: 'GG'},
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'colors',
      title: 'Cores Disponíveis',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Prima Enter após escrever cada cor (ex: Azul Marinho, Preto).',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'inStock',
      title: 'Produto em Estoque?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})