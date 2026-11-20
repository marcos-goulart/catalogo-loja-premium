import { getCliClient } from 'sanity/cli'

/**
 * Script de Seed para popular o catálogo de moda premium no Sanity Studio.
 *
 * Como executar via Sanity CLI com sua sessão autenticada:
 *   cd studio
 *   npx sanity exec seed.ts --with-user-token
 */

// Inicializa o cliente Sanity via CLI (pega credenciais e token do CLI)
const client = getCliClient({
  apiVersion: '2026-10-05',
  ...(process.env.SANITY_AUTH_TOKEN ? { token: process.env.SANITY_AUTH_TOKEN } : {}),
})

interface SeedProduct {
  name: string
  department: 'feminino' | 'masculino' | 'infantil' | 'unissexo'
  category: 'camisetas' | 'calcas' | 'vestidos' | 'casacos' | 'acessorios'
  collection: 'verao' | 'outono' | 'inverno' | 'primavera'
  price: number
  sizes: ('PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | 'Único')[]
  colors: string[]
  inStock: boolean
  imageUrls: string[]
}

const productsSeed: SeedProduct[] = [
  // --- VERÃO ---
  {
    name: 'Camisa em Linho Puro Riviera',
    department: 'masculino',
    category: 'camisetas',
    collection: 'verao',
    price: 489,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Off-White', 'Areia', 'Azul Sereno'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Camiseta Regular Algodão Pima Peruano',
    department: 'masculino',
    category: 'camisetas',
    collection: 'verao',
    price: 249,
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    colors: ['Branco Neve', 'Preto', 'Verde Militar'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Bermuda Alfaiataria em Linho & Algodão',
    department: 'masculino',
    category: 'calcas',
    collection: 'verao',
    price: 389,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Areia', 'Azul Marinho', 'Cru'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=80',
    ],
  },

  // --- OUTONO ---
  {
    name: 'Blazer Alfaiataria Estruturado em Lã Fria',
    department: 'feminino',
    category: 'casacos',
    collection: 'outono',
    price: 1290,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Grafite', 'Camelo'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Calça Pantalona Alfaiataria em Crepe Fluido',
    department: 'feminino',
    category: 'calcas',
    collection: 'outono',
    price: 590,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Preto', 'Off-White', 'Terracota'],
    inStock: false, // Simula peça esgotada para testes de UI
    imageUrls: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Sobretudo Longo Wool Blend Italiano',
    department: 'masculino',
    category: 'casacos',
    collection: 'outono',
    price: 2490,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Camelo', 'Azul Marinho', 'Preto'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    ],
  },

  // --- INVERNO ---
  {
    name: 'Trench Coat Clássico com Cinto Duplo',
    department: 'unissexo',
    category: 'casacos',
    collection: 'inverno',
    price: 1890,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Caramelo', 'Preto'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Tricô Cashmere Gola Alta Canelada',
    department: 'feminino',
    category: 'casacos',
    collection: 'inverno',
    price: 890,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Cru', 'Cinza Mescla', 'Preto'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Jaqueta Biker em Couro Legítimo Premium',
    department: 'masculino',
    category: 'casacos',
    collection: 'inverno',
    price: 2190,
    sizes: ['M', 'G', 'GG', 'XG'],
    colors: ['Preto Ônix', 'Marrom Café'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80',
    ],
  },

  // --- PRIMAVERA ---
  {
    name: 'Vestido Slip Dress Midi em Pura Seda',
    department: 'feminino',
    category: 'vestidos',
    collection: 'primavera',
    price: 1490,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Champagne', 'Preto', 'Bordô'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Vestido Transpassado Floral Esvoaçante',
    department: 'feminino',
    category: 'vestidos',
    collection: 'primavera',
    price: 790,
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Floral Lavanda', 'Verde Sálvia'],
    inStock: false, // Simula peça esgotada para testes de UI
    imageUrls: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    name: 'Bolsa Tote Artesanal em Couro Floter',
    department: 'unissexo',
    category: 'acessorios',
    collection: 'primavera',
    price: 1190,
    sizes: ['Único'],
    colors: ['Caramelo', 'Preto', 'Bordô'],
    inStock: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

/**
 * Faz download de uma imagem pública e realiza o upload real nos assets do Sanity.
 */
async function uploadImageFromUrl(url: string, filename: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Falha ao baixar imagem (${response.status} ${response.statusText}): ${url}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload no Sanity como asset do tipo 'image'
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: response.headers.get('content-type') || 'image/jpeg',
  })

  return asset
}

async function runSeed() {
  console.log('🚀 Iniciando processo de seed do catálogo no Sanity...\n')

  const config = client.config()
  console.log(`📌 Projeto: ${config.projectId}`)
  console.log(`📌 Dataset: ${config.dataset}`)
  console.log(`📌 Total de produtos a cadastrar: ${productsSeed.length}\n`)

  let successCount = 0

  for (let i = 0; i < productsSeed.length; i++) {
    const p = productsSeed[i]
    const indexLabel = `[${i + 1}/${productsSeed.length}]`

    console.log(
      `${indexLabel} Processando: "${p.name}" (${p.collection.toUpperCase()} | R$ ${p.price.toFixed(2)})...`
    )

    try {
      const galleryItems: Array<{
        _type: 'image'
        _key: string
        asset: { _type: 'reference'; _ref: string }
      }> = []

      // Download e upload real de cada imagem para os assets do Sanity
      for (let imgIdx = 0; imgIdx < p.imageUrls.length; imgIdx++) {
        const imgUrl = p.imageUrls[imgIdx]
        const cleanName = p.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
        const filename = `${cleanName}-${imgIdx + 1}.jpg`

        console.log(`   📸 Fazendo upload da imagem ${imgIdx + 1}/${p.imageUrls.length}...`)
        const asset = await uploadImageFromUrl(imgUrl, filename)

        galleryItems.push({
          _type: 'image',
          _key: `img_${imgIdx + 1}_${Date.now()}`,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        })
      }

      // Criação do documento Sanity conforme schema exato de productType.ts
      const doc = {
        _type: 'product',
        name: p.name,
        department: p.department,
        category: p.category,
        collection: p.collection,
        price: p.price,
        sizes: p.sizes,
        colors: p.colors,
        inStock: p.inStock,
        gallery: galleryItems,
      }

      const created = await client.create(doc)
      console.log(`   ✅ Criado com sucesso! ID: ${created._id}\n`)
      successCount++
    } catch (error: any) {
      console.error(`   ❌ Erro ao cadastrar "${p.name}":`, error?.message || error)
      console.error('')
    }
  }

  console.log('──────────────────────────────────────────────────────')
  console.log(`🎉 Processo concluído: ${successCount} de ${productsSeed.length} produtos cadastrados com sucesso!`)
}

runSeed().catch((err) => {
  console.error('💥 Erro fatal durante a execução do seed:', err)
  process.exit(1)
})
