import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { getCurrentSeason } from "@/lib/utils";
import { urlForImage } from "@/lib/sanity";
import { useProducts } from "@/hooks/useProducts";
import { useProductDeepLink } from "@/hooks/useProductDeepLink";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { ProductSheet } from "@/components/ProductSheet";
import { ContactFooter } from "@/components/ui/contact-footer";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80";

const ITEMS_PER_PAGE = 12;

export function HomePage() {
  const currentSeason = getCurrentSeason();
  const [currentPage, setCurrentPage] = useState(1);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const { products, isLoading } = useProducts();
  const { selectedProduct, openProduct, closeProduct } = useProductDeepLink(products);

  const { gridRef } = useSmoothScrollAnimations({
    isModalOpen: Boolean(selectedProduct),
    animateDependencies: [isLoading, currentPage, products.length],
  });

  // Animação GSAP de entrada em cascata suave nos elementos do Hero com limpeza total de props
  useEffect(() => {
    if (!heroContentRef.current) return;
    const elements = heroContentRef.current.children;

    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all", // Limpa transform e opacity inline após finalizar para não criar contextos de empilhamento desnecessários
      },
    );
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const heroOptimizedUrl = urlForImage(HERO_IMAGE, 1920);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar showBackButton={false} />

      {/* Hero Section com imagem nítida, iluminada e renderização estável sem gargalos de GPU */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black text-white">
        <img
          src={heroOptimizedUrl}
          alt="Campanha de Moda Premium"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        {/* Overlay escuro balanceado para manter a fotografia clara e o texto perfeitamente legível */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/40" />

        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        >
          <div>
            <span className="inline-block border border-white/30 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
              Coleção {currentSeason}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extralight tracking-[0.2em] uppercase sm:text-6xl md:text-7xl">
            Essencial. Atemporal.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm font-light tracking-widest text-white/80 uppercase sm:text-base">
            Elegância contemporânea e peças atemporais para todas as ocasiões.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/colecao-atual"
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-8 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-white/90 sm:w-auto cursor-pointer"
            >
              Coleção da Estação
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/produtos"
              className="inline-flex h-12 w-full items-center justify-center border border-white/60 bg-black/40 px-8 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10 sm:w-auto cursor-pointer"
            >
              Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section com âncora 'catalogo' para scroll suave na paginação */}
      <main id="catalogo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 flex flex-col items-baseline justify-between gap-4 border-b border-border/40 pb-6 sm:flex-row">
          <div>
            <h2 className="text-2xl font-light uppercase tracking-[0.2em] sm:text-3xl">
              Catálogo Selecionado
            </h2>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              Toque em qualquer peça para ver detalhes, tamanhos e cores
            </p>
          </div>

          <Link
            to="/produtos"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground cursor-pointer"
          >
            Ver todos ({products.length})
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid
          ref={gridRef}
          products={paginatedProducts}
          isLoading={isLoading}
          onProductClick={openProduct}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          targetId="catalogo"
        />

        {/* Duplo CTA: botão centralizado no final da seção */}
        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 border border-border px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition hover:border-foreground cursor-pointer"
          >
            Ver todos os produtos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <ContactFooter />

      <ProductSheet product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}
