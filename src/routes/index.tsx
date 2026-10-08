import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search } from "lucide-react";
import { collection, products, formatBRL, type Product, generateSlug } from "@/lib/productsMock";
import { ProductSheet } from "@/components/ProductSheet";
import { CartDrawer } from "@/components/CartDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactFooter } from "@/components/ui/contact-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moda Premium — Catálogo" },
      {
        name: "description",
        content: "Catálogo de roupas premium. Escolha sua peça e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Moda Premium — Catálogo" },
      { property: "og:description", content: "Peças atemporais. Compre direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80";

const ITEMS_PER_PAGE = 32;

function Index() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [currentPage, setCurrentPage] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const close = useCallback(() => {
    setSelected(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("produto");
      const cleanUrl =
        url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "");
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  const openProduct = useCallback((product: Product) => {
    setSelected(product);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      // Aqui está a mágica: em vez de product.id, passamos o nome formatado
      url.searchParams.set("produto", generateSlug(product.name));
      window.history.pushState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Procura em todas as listas disponíveis neste arquivo (products e collection)
    const allProducts = [...products, ...collection];

    const params = new URLSearchParams(window.location.search);
    const prodSlug = params.get("produto");

    if (prodSlug) {
      const found = allProducts.find((p) => generateSlug(p.name) === prodSlug);
      if (found) {
        setSelected(found);
      }
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentProdSlug = currentParams.get("produto");
      if (currentProdSlug) {
        const found = allProducts.find((p) => generateSlug(p.name) === currentProdSlug);
        setSelected(found || null);
      } else {
        setSelected(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.utils.toArray<HTMLElement>(".card").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    });
    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (selected) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [selected]);

  const filteredAndSortedProducts = collection
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortOption === "z-a") return b.name.localeCompare(a.name, "pt-BR");
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name, "pt-BR");
    });

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <div className="w-9" />
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
          <div className="flex items-center">
            <CartDrawer />
          </div>
        </div>
      </header>

      <section ref={heroRef} className="relative -mt-16 flex h-[80vh] items-end overflow-hidden">
        <img
          src={HERO}
          alt="Coleção de moda"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="relative w-full px-6 pb-16 text-background md:px-12 md:pb-24">
          <p className="hero-anim mb-4 text-xs uppercase tracking-[0.3em]">Coleção Outono 2026</p>
          <h1 className="hero-anim max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            Essencial.
            <br />
            Atemporal.
          </h1>
          <div className="hero-anim mt-8">
            <Link
              to="/colecao-atual"
              className="inline-flex items-center gap-3 bg-background px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition hover:bg-secondary"
            >
              Ver Coleção
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <main id="colecao" className="px-4 py-16 md:px-12 md:py-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">A Coleção</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {filteredAndSortedProducts.length}{" "}
              {filteredAndSortedProducts.length === 1 ? "peça" : "peças"}
            </p>
          </div>
        </div>

        {/* Seção de Controles: Busca e Ordenação */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar peça por nome..."
              className="w-full border border-border bg-background py-2.5 pl-10 pr-4 text-xs font-light tracking-wide text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Ordenar:
            </span>
            <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger className="w-[220px] rounded-none border-foreground/20 bg-transparent text-sm font-light tracking-wide text-foreground hover:border-foreground focus:ring-0">
                <SelectValue placeholder="Ordenar..." />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border bg-background text-foreground">
                <SelectItem value="a-z" className="cursor-pointer text-xs font-light tracking-wide">
                  A - Z
                </SelectItem>
                <SelectItem value="z-a" className="cursor-pointer text-xs font-light tracking-wide">
                  Z - A
                </SelectItem>
                <SelectItem
                  value="price-asc"
                  className="cursor-pointer text-xs font-light tracking-wide"
                >
                  Preço: Menor para Maior
                </SelectItem>
                <SelectItem
                  value="price-desc"
                  className="cursor-pointer text-xs font-light tracking-wide"
                >
                  Preço: Maior para Menor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">
              Nenhuma peça encontrada para "{searchTerm}".
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {paginatedProducts.map((p) => (
              <button key={p.id} onClick={() => openProduct(p)} className="card group text-left">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={p.gallery[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {!p.inStock && (
                    <span className="absolute left-3 top-3 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                      Esgotado
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="text-sm">{p.name}</h3>
                  <p className="shrink-0 text-sm text-muted-foreground">{formatBRL(p.price)}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Controles de Paginação Numérica */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border border-border bg-background px-4 py-2 text-xs font-light uppercase tracking-[0.2em] transition hover:border-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`grid h-8 w-8 place-items-center text-xs font-light transition ${
                    currentPage === page
                      ? "border border-foreground bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border border-border bg-background px-4 py-2 text-xs font-light uppercase tracking-[0.2em] transition hover:border-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              Seguinte
            </button>
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            to="/produtos"
            className="group flex items-center gap-3 border border-border px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition hover:border-foreground"
          >
            Ver todos os produtos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>

      <ContactFooter />

      <ProductSheet product={selected} onClose={close} />
    </div>
  );
}
