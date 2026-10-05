import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Search } from "lucide-react";
import { autumnCollection, formatBRL, type Product } from "@/lib/productsMock";
import { ProductSheet } from "@/components/ProductSheet";
import { CartDrawer } from "@/components/CartDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/colecao-outono")({
  head: () => ({
    meta: [
      { title: "Coleção Outono 2026 — Moda Premium" },
      {
        name: "description",
        content:
          "As peças selecionadas da Coleção Outono 2026. Escolha a sua e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Coleção Outono 2026 — Moda Premium" },
      {
        property: "og:description",
        content:
          "As peças selecionadas da Coleção Outono 2026. Escolha a sua e finalize pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColecaoOutono,
});

function ColecaoOutono() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const lenisRef = useRef<Lenis | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from(".page-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
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

  const filteredAndSortedProducts = autumnCollection
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    .sort((a, b) => {
      if (sortOption === "z-a") return b.name.localeCompare(a.name, "pt-BR");
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name, "pt-BR");
    })
    .slice(0, 16);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="mr-2 inline h-3.5 w-3.5" /> Voltar
          </Link>
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
          <div className="flex items-center">
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="px-4 py-16 md:px-12 md:py-24">
        <p className="page-anim mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Coleção Outono 2026
        </p>
        <h1 className="page-anim text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
          Outono.
          <br />
          Seleção essencial.
        </h1>
        <span className="page-anim mt-6 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "peça" : "peças"}
        </span>

        {/* Seção de Controles: Busca e Ordenação */}
        <div className="mb-10 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                <SelectItem value="price-asc" className="cursor-pointer text-xs font-light tracking-wide">
                  Preço: Menor para Maior
                </SelectItem>
                <SelectItem value="price-desc" className="cursor-pointer text-xs font-light tracking-wide">
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
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)} className="card group text-left">
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
      </main>

      <ProductSheet product={selected} onClose={close} />
    </div>
  );
}
