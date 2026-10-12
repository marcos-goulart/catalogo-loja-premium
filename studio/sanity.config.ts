import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { ptBRLocale } from '@sanity/locale-pt-br'

export default defineConfig({
  name: 'default',
  title: 'Catalogo Moda Premium',

  projectId: '1m6eib8b',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), ptBRLocale()],

  schema: {
    types: schemaTypes,
  },
})
