import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { products, formatBRL, type Product } from "@/lib/productsMock";
import { ProductSheet } from "@/components/ProductSheet";
import { CartDrawer } from "@/components/CartDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Todos os Produtos — Moda Premium" },
      {
        name: "description",
        content: "Todas as peças do catálogo Moda Premium. Escolha a sua e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Todos os Produtos — Moda Premium" },
      {
        property: "og:description",
        content: "Todas as peças do catálogo. Compre direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filteredAndSortedProducts = products
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
        <div className="flex h-16 items-center justify-between px-4 md:px-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
          <div className="flex items-center">
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="px-4 py-16 md:px-12 md:py-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-tight md:text-3xl">Todos os Produtos</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "peça" : "peças"}
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
              <button key={p.id} onClick={() => setSelected(p)} className="group text-left">
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
                  <h2 className="text-sm">{p.name}</h2>
                  <p className="shrink-0 text-sm text-muted-foreground">{formatBRL(p.price)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border px-6 py-10 text-center text-xs tracking-[0.2em] text-muted-foreground">
        © 2026 MODA PREMIUM
      </footer>

      <ProductSheet product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
