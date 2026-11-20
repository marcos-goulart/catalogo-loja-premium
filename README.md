# 🛍️ Moda Premium — Catálogo E-commerce Jamstack

> Vitrine editorial de alta costura e moda contemporânea com fechamento de pedidos integrado ao WhatsApp, experiência de navegação ultrafluida (Lenis + GSAP) e painel administrativo Headless CMS completo via Sanity.io.

[![Deploy no Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://catalogo-loja-premium.pages.dev)
[![Painel Sanity CMS](https://img.shields.io/badge/CMS-Sanity.io_v6-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://1m6eib8b.sanity.studio)
[![React 19](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Testes Automatizados](https://img.shields.io/badge/Vitest-19_Passed-4ADE80?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev)

🌐 **Acesse a aplicação em produção:** [catalogo-loja-premium.pages.dev](https://catalogo-loja-premium.pages.dev)

---

## 📌 Visão Geral

O **Moda Premium** é uma solução para marcas de vestuário de alto padrão que priorizam a estética visual, a performance técnica e a humanização no atendimento. Em vez de impor funis de checkout rígidos com altas taxas de abandono, a plataforma oferece uma experiência de compra moderna, intuitiva e sem atrito: o cliente explora o catálogo com fotos em alta definição, seleciona cores e tamanhos na grade, gerencia sua sacola de compras e finaliza o pedido diretamente com a equipe de consultoria via WhatsApp com uma mensagem estruturada e calculada automaticamente.

O repositório é organizado em formato **Monorepo**, contendo a vitrine virtual na raiz (`/`) e o estúdio de gerenciamento de conteúdo na pasta [`/studio`](./studio).

---

## ✨ Principais Funcionalidades

### ⚡ Catálogo Dinâmico & Sanity CMS Headless
* **Projeção GROQ Otimizada:** Consultas enxutas que trazem apenas os campos vitais (`id`, `name`, `price`, `gallery`, `sizes`, `colors`, `inStock`), minimizando o payload JSON transferido na rede.
* **Entrega Global via CDN:** Cache de borda ativo (`useCdn: true`) com renderização em formatos de última geração (`WebP`/`AVIF`).
* **Redimensionamento Contextual e Otimização:** As fotos dos cards são redimensionadas em tempo real para `600px` com `loading="lazy"` e `decoding="async"`, enquanto o modal de detalhes carrega versões de até `1200px` para zoom e nitidez em telas retina.

### 🍂 Coleções Inteligentes por Estação (Hemisfério Sul)
* **Cálculo Dinâmico:** Identificação algorítmica do mês vigente no calendário brasileiro, direcionando automaticamente a coleção sazonal atual na rota [`/colecao-atual`](https://catalogo-loja-premium.pages.dev/colecao-atual) (Verão, Outono, Inverno e Primavera).
* **Filtros Combinados:** Filtragem em tempo real por departamento, categoria (Camisetas, Calças, Vestidos, Casacos, Acessórios), barra de busca instantânea e ordenação dinâmica (ordem alfabética A-Z / Z-A e menor/maior preço).
* **Paginação com Subida Suave:** Paginação balanceada em 12 itens por página que desliza suavemente até a âncora da grade (`#catalogo`) via motor do Lenis, eliminando saltos secos.

### 🔗 Deep Linking & Preservação de Estado
* **Deep Linking por Query String:** Cada produto aberto gera uma URL compartilhável no formato `?produto=slug-da-peca` sincronizada via History API (`pushState` / `replaceState`) e listeners de histórico (`popstate`).
* **Preservação de Scroll:** Abrir ou fechar o modal não reseta a posição de rolagem da página atrás do drawer.
* **Validação Rigorosa de Estoque:** Peças com `inStock === false` exibem badge elegante de **"Esgotado"**, desabilitam seleção de compra no `ProductSheet` e são bloqueadas programaticamente na store do Zustand.
* **Sacola Reativa com Checkout WhatsApp:** Estado global persistido no `localStorage` (`zustand/middleware/persist`), cálculo instantâneo de subtotal e geração de link `wa.me` com resumo detalhado dos itens selecionados.

### 🏎️ Engenharia de Performance & Experiência de Rolagem
* **Sincronização Lenis + GSAP no Mesmo Ticker:** O loop de física do Lenis é acoplado diretamente ao `gsap.ticker.add(...)` com `lagSmoothing(0)`, garantindo rolagem suave a 60/120 FPS sem micro-engasgos (*zero micro-stutter*).
* **Scrollbar Responsiva e Otimizada:**
  * **Desktop ($\ge 768\text{px}$):** Barra de rolagem lateral refinada e minimalista (`8px`), com track transparente e thumb discreto em `rgba` de alto contraste universal.
  * **Mobile ($< 768\text{px}$):** Barra lateral oculta, substituída por um componente leve de barra de progresso horizontal fixo no topo (`ScrollProgressBar`) acelerado por GPU (`scaleX`) e sem *layout thrashing*.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Versão | Propósito |
|---|---|---|---|
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | `^5.8.3` | Tipagem estática rigorosa de ponta a ponta |
| **Frontend Framework** | [React](https://react.dev/) | `^19.2.0` | Biblioteca de interface reativa e concorrente |
| **Roteamento SPA / SSR** | [TanStack Router](https://tanstack.com/router) | `1.170.41` | Roteamento tipado baseado em arquivos (`src/routes`) |
| **Server Engine** | [Nitro](https://nitro.unjs.io/) / [TanStack Start](https://tanstack.com/start) | `3.0.x` | Engine universal para SSR e build Cloudflare Pages |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | `^4.2.1` | Motor de estilos ultra-rápido com design tokens OKLCH |
| **Gerenciamento de Estado** | [Zustand](https://zustand.docs.pmnd.rs/) | `^5.0.15` | Store leve da sacola com middleware `persist` |
| **Smooth Scrolling** | [@studio-freight/lenis](https://lenis.darkroom.engineering/) | `^1.0.42` | Física de rolagem inercial de alta fidelidade |
| **Animações** | [GSAP](https://gsap.com/) | `^3.15.0` | Animações de entrada em cascata e ScrollTrigger |
| **Headless CMS** | [Sanity Studio](https://www.sanity.io/) | `^6.18.0` | Gestão de conteúdo estruturado em tempo real |
| **Cliente do CMS** | [@sanity/client](https://www.sanity.io/docs/js-client) | `^8.9.0` | Cliente oficial com pipeline de imagens `@sanity/image-url` |
| **Hospedagem & CDN** | [Cloudflare Pages](https://pages.cloudflare.com/) | Edge | CDN global com rota de fallback SPA (`_redirects`) |
| **Testes Automatizados** | [Vitest](https://vitest.dev/) + [RTL](https://testing-library.com/) | `^4.1.11` / `^16.0.0` | Testes unitários e de integração de componentes |

---

## 📁 Estrutura de Diretórios (Separação de Responsabilidades - SRP)

O projeto adota uma arquitetura modular que desacopla a definição de rotas da composição visual e das regras de negócio:

```text
catalogo-loja-premium/
├── public/
│   ├── _redirects             # Fallback SPA 200 para Cloudflare Pages
│   ├── favicon.svg            # Favicon minimalista vetorial (Cabide & Monograma)
│   └── robots.txt             # Diretivas de rastreamento de motores de busca
├── src/
│   ├── routes/                # Definição estrita de rotas e SEO/Head Content (< 35 linhas cada)
│   │   ├── __root.tsx         # Casca raiz HTML, QueryClient e metadados globais
│   │   ├── index.tsx          # Rota da Home (aponta para HomePage)
│   │   ├── colecao-atual.tsx  # Rota da coleção sazonal
│   │   └── produtos.tsx       # Rota do catálogo geral
│   ├── pages/                 # Telas compostas completas da aplicação
│   │   ├── HomePage.tsx               # Banner Hero iluminado, grade e duplo CTA
│   │   ├── CurrentCollectionPage.tsx  # Coleção filtrada por estação do ano
│   │   └── AllProductsPage.tsx        # Catálogo geral com busca e ordenação
│   ├── components/            # Componentes visuais reutilizáveis
│   │   ├── Navbar.tsx                 # Header sticky com logo, botão voltar e sacola
│   │   ├── ProductCard.tsx            # Card de produto com badge de estoque e hover zoom
│   │   ├── ProductGrid.tsx            # Grade responsiva com Skeleton Screens em aspect-[3/4]
│   │   ├── Pagination.tsx             # Paginação com subida suave integrada ao Lenis
│   │   ├── CatalogFilters.tsx         # Abas no desktop, Select no mobile e busca
│   │   ├── CartDrawer.tsx             # Drawer lateral da sacola de compras
│   │   ├── ProductSheet.tsx           # Modal de detalhes, galeria com swipe e compra
│   │   ├── ScrollProgressBar.tsx      # Barra de progresso mobile acelerada por GPU
│   │   └── ui/                        # Primitivos estritamente mantidos
│   │       ├── select.tsx
│   │       ├── sheet.tsx
│   │       └── contact-footer.tsx
│   ├── hooks/                 # Lógica de negócio encapsulada
│   │   ├── useProducts.ts             # Fetch do Sanity, normalização e tratamento de erro
│   │   ├── useProductDeepLink.ts      # Gerenciamento de ?produto=slug e History API
│   │   └── useSmoothScrollAnimations.ts# Integração Lenis + GSAP ticker e pausamento
│   ├── store/                 # Gerenciamento de estado global
│   │   └── useCartStore.ts            # Store Zustand da sacola com bloqueio de estoque
│   ├── lib/                   # Utilitários e integrações
│   │   ├── sanity.ts                  # Cliente Sanity (useCdn: true) e builder de imagem
│   │   └── utils.ts                   # formatBRL, generateSlug, getCurrentSeason, checkout WhatsApp
│   ├── types/                 # Definições TypeScript compartilhadas
│   │   └── product.ts                 # Interface central do modelo de Produto
│   └── test/                  # Suíte de testes automatizados (19 testes aprovados)
│       ├── setup.ts
│       ├── generateSlug.test.ts
│       ├── seasons.test.ts
│       ├── cart.test.ts
│       ├── ProductCard.test.tsx
│       └── app-routing.test.tsx
└── studio/                    # Sanity Studio v6 (Headless CMS)
    ├── schemaTypes/
    │   ├── index.ts
    │   └── productType.ts     # Schema de validação do produto
    ├── seed.ts                # Script de povoamento automatizado de 12 produtos
    ├── sanity.config.ts       # Configuração do Studio com pt-BR locale
    └── sanity.cli.ts          # Configurações de API e Deployment do CMS
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js** `v20.x` ou superior instalado.
* **NPM**, **PNPM** ou **Yarn**.

### 1. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/seu-usuario/catalogo-loja-premium.git
cd catalogo-loja-premium

# Instalar dependências da aplicação principal
npm install

# Instalar dependências do Sanity Studio
cd studio
npm install
cd ..
```

### 2. Executar a Aplicação Web (Frontend)
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

### 3. Executar o Sanity Studio (Painel Administrativo)
```bash
cd studio
npm run dev
```
Acesse `http://localhost:3333` para gerenciar peças, fotos, categorias e disponibilidade em estoque.

### 4. Povoar o Catálogo Automaticamente (Seed)
Para preencher o banco de dados do Sanity com 12 produtos de moda premium fictícios contendo fotos reais do Unsplash enviadas diretamente aos assets do CMS:
```bash
cd studio
npm run seed
# ou via Sanity CLI:
npx sanity exec seed.ts --with-user-token
```

### 5. Executar os Testes Automatizados
```bash
# Executa todos os testes unitários via Vitest
npm test

# Modo assistido (watch mode)
npm run test:watch
```

### 6. Build de Produção
```bash
npm run build
```

---

## 🌐 Deploy e CI/CD

O projeto opera sob uma arquitetura Jamstack 100% desacoplada:

```
┌─────────────────────────────────────────┐      ┌─────────────────────────────────────────┐
│           CLOUDFLARE PAGES              │      │               SANITY.IO                 │
│                                         │      │                                         │
│   Frontend SPA/SSR de alta velocidade   │      │        Headless CMS em Nuvem            │
│   • Build automático a cada push        │      │   • API com CDN global em borda         │
│   • Roteamento SPA via _redirects       │      │   • Deploy independente do Studio       │
│   • Edge caching & compressão Brotli    │      │   • Asset Pipeline (WebP/AVIF)          │
└─────────────────────────────────────────┘      └─────────────────────────────────────────┘
```

1. **Frontend (Cloudflare Pages):**
   * Conectado ao repositório GitHub com deploy automático a cada push ou pull request na branch `main`.
   * **Build command:** `npm run build`
   * **Output directory:** `.output/public`
   * O arquivo `public/_redirects` (`/* /index.html 200`) garante que rotas diretas (ex: `/colecao-atual` ou `/produtos?produto=...`) recarreguem com sucesso sem erros `404`.

2. **Backend & Studio (Sanity Cloud):**
   * O painel administrativo é hospedado diretamente nos servidores do Sanity.
   * Para publicar novas alterações de schema ou configurações do Studio:
     ```bash
     cd studio
     npx sanity deploy
     ```

---

## 📄 Licença

Este projeto foi desenvolvido para fins de demonstração técnica, portfólio de engenharia de software e e-commerce de alto impacto. Código sob licença MIT.
