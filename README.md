# 🛍️ Catálogo de Moda Premium

> Catálogo digital de alta performance para moda e vestuário premium, desenvolvido sob a arquitetura **Jamstack** com gerenciamento de conteúdo headless via **Sanity.io** e conversão de vendas direta no **WhatsApp**.

---

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Sanity.io-v6-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity.io" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
</p>

---

## 📌 Visão Geral

O **Catálogo de Moda Premium** é uma solução completa para marcas e confecções que buscam uma vitrine digital sofisticada aliada a um canal de atendimento humanizado. Em vez de depender de checkout tradicional com fricção e taxas elevadas, a plataforma permite aos clientes explorar peças com experiência visual refinada, selecionar tamanhos e cores, gerenciar a sacola de compras e finalizar o pedido diretamente com a equipe de vendas via WhatsApp, com mensagem estruturada em markdown.

A aplicação adota o conceito de **Monorepo**, contendo a loja virtual na raiz do repositório e o estúdio de gestão de conteúdo headless na pasta `/studio`.

---

## ✨ Principais Funcionalidades

- ⚡ **Catálogo Dinâmico via Sanity CMS**: Produtos sincronizados em tempo real através da API do Sanity com cache global em borda (`useCdn: true`), permitindo atualizações instantâneas de fotos, preços, tamanhos, cores e controle de disponibilidade.
- 🍂 **Detecção Inteligente de Estações (Hemisfério Sul)**: Algoritmo automático que identifica o mês atual do calendário civil brasileiro para exibir dinamicamente banners, coleções temáticas (Primavera, Verão, Outono, Inverno) e SEO contextualizado sem necessidade de intervenção manual.
- 🛒 **Carrinho com Estado Global Persistente (Zustand)**: Sacola de compras reativa com suporte a seleção granular de variações (tamanho e cor), cálculo instantâneo de subtotal e persistência no `localStorage`.
- 💬 **Checkout Estruturado para WhatsApp**: Geração automática de link `wa.me` com mensagem pré-formatada contendo os itens, quantidades, especificações de grade (cor/tamanho), subtotal e chamada para pagamento e entrega.
- 📱 **Galeria Mobile-First com Suporte a Gestos (Swipe)**: Visualizador de fotos com suporte nativo a gestos de arrastar/deslizar (*touch swipe* no celular e *mouse drag* no desktop), navegação por teclado (setas e ESC) e miniaturas interativas.
- 🔍 **Busca em Tempo Real & Filtros Avançados**: Filtragem instantânea por texto, categorias de peças (Camisetas, Calças, Vestidos, Casacos, Acessórios) e ordenação dinâmica (ordem alfabética A-Z / Z-A e menor/maior preço).
- 🎨 **Experiência Visual de Luxo**: Rolagem suave com **Lenis**, micro-animações com **GSAP** e design minimalista contemporâneo construído com **Tailwind CSS v4** e primitivos **Radix UI**.

---

## 🛠️ Stack Tecnológico

### Frontend (Loja Virtual)
- **Framework & Core**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 8](https://vitejs.dev/) + [TanStack Start / Router](https://tanstack.com/router)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/vite`
- **Componentes & UI**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (iconografia) e [Sonner](https://sonner.emilkowal.ski/)
- **Gerenciamento de Estado**: [Zustand 5](https://zustand-demo.pmnd.rs/) (com middleware `persist`)
- **Animações & Motion**: [GSAP 3](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) (Smooth Scrolling)
- **Carrosséis & Touch**: [Embla Carousel](https://www.embla-carousel.com/) + gestos por eventos nativos
- **Testes & Qualidade**: [Vitest 4](https://vitest.dev/), Testing Library, ESLint 9 e Prettier

### Backend & CMS Headless
- **Plataforma CMS**: [Sanity.io Studio v6](https://www.sanity.io/)
- **Linguagem de Consulta**: [GROQ](https://www.sanity.io/docs/groq) (Graph-Relational Object Queries)
- **Cliente API**: `@sanity/client` com integração de CDN em borda
- **Internacionalização do Painel**: `@sanity/locale-pt-br` (painel administrativo totalmente em Português)
- **Ferramenta de Auditoria**: `@sanity/vision` integrada para testes de queries em tempo real

---

## 📁 Estrutura do Projeto

O repositório está configurado em estrutura **Monorepo**, mantendo o código do consumidor (cliente web) e o código de gestão de conteúdo organizados de forma independente:

```text
catalogo-loja-premium/
├── public/                     # Arquivos e assets estáticos públicos
├── src/                        # Aplicação Frontend (Loja Virtual)
│   ├── components/             # Componentes modulares reutilizáveis
│   │   ├── ui/                 # Primitivos de UI (Sheet, Select, Dialog, etc.)
│   │   ├── CartDrawer.tsx      # Gaveta lateral do carrinho e checkout WhatsApp
│   │   └── ProductSheet.tsx    # Painel detalhado do produto com galeria swipe
│   ├── hooks/                  # React Custom Hooks
│   ├── lib/                    # Utilitários, cliente Sanity e mock fallback
│   │   ├── sanity.ts           # Configuração do cliente @sanity/client
│   │   ├── utils.ts            # Helpers de data, estações e classes Tailwind
│   │   └── productsMock.ts     # Tipagens de produto e mock de segurança
│   ├── routes/                 # Rotas baseadas em TanStack Router
│   │   ├── index.tsx           # Página inicial com vitrine destaque
│   │   ├── produtos.tsx        # Catálogo geral com busca e ordenação
│   │   └── colecao-atual.tsx   # Coleção sazonal com filtro dinâmico
│   ├── store/                  # Estado global da aplicação
│   │   └── useCartStore.ts     # Store Zustand com persistência em localStorage
│   ├── styles.css              # Configurações globais e temas Tailwind v4
│   └── server.ts               # Entrypoint SSR / Nitro
├── studio/                     # Backend Headless (Sanity Content Studio)
│   ├── schemaTypes/            # Definição de Schemas do Sanity
│   │   ├── index.ts            # Registro de coleções
│   │   └── productType.ts      # Schema completo de Produtos e atributos
│   ├── sanity.cli.ts           # Configuração de linha de comando do Sanity
│   ├── sanity.config.ts        # Configuração do Studio, plugins e dataset
│   └── package.json            # Dependências isoladas do CMS
├── package.json                # Dependências e scripts da aplicação principal
├── vite.config.ts              # Configuração do bundler Vite e Nitro
└── tsconfig.json               # Configurações do compilador TypeScript
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão `18.x` ou superior (recomendado `20.x` LTS)
- Gerenciador de pacotes `npm` (ou `pnpm` / `yarn`)

---

### 1️⃣ Inicializar o Frontend (Loja Virtual)

Clone o repositório e instale as dependências da raiz:

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/catalogo-loja-premium.git

# Acesse o diretório do projeto
cd catalogo-loja-premium

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará acessível em: **`http://localhost:3000`** (ou porta indicada no terminal pelo Vite).

---

### 2️⃣ Inicializar o Backend (Sanity Studio)

Em uma nova aba do terminal, acesse o diretório `/studio` para rodar o painel administrativo:

```bash
# Acesse o diretório do Studio
cd studio

# Instale as dependências do Studio
npm install

# Inicie o servidor do Sanity Studio
npm run dev
```

O painel de gerenciamento estará disponível em: **`http://localhost:3333`**.  
Nele é possível cadastrar produtos, fazer upload de imagens de alta resolução, cadastrar variações de cores/tamanhos e definir coleções.

---

## 🌐 Deploy em Produção

A arquitetura do projeto foi desenhada para custos quase nulos de infraestrutura e carregamento ultrarrápido:

### 🛍️ Frontend: Cloudflare Pages
- O frontend está otimizado para build com **Nitro / TanStack Start**, compilando assets estáticos e edge handlers para distribuição global na rede de borda da **Cloudflare Pages**.
- Para gerar o pacote de produção:
  ```bash
  npm run build
  ```
- O comando gerará a pasta de distribuição `.output/` pronta para deploy contínuo integrado ao GitHub.

### 🗄️ CMS: Infraestrutura Global da Sanity
- O Sanity Content Studio pode ser publicado diretamente na nuvem gerenciada da Sanity:
  ```bash
  cd studio
  npm run deploy
  ```
- Após o deploy, o painel administrativo ficará hospedado em um domínio seguro `https://seu-projeto.sanity.studio`, com autenticação de usuários, versionamento de conteúdo e redundância global.

---

## 🧪 Testes e Padronização de Código

```bash
# Executar a suíte de testes unitários com Vitest
npm run test

# Executar verificação de linting (ESLint)
npm run lint

# Formatar o código de acordo com as regras do Prettier
npm run format
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins de exibição comercial e portfólio. Todos os direitos reservados.

<p align="center">
  Feito com excelência técnica para o segmento de <strong>Moda Premium</strong>.
</p>
