import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { products, formatBRL, type Product } from "@/lib/products";
import { ProductSheet } from "@/components/ProductSheet";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Todos os Produtos — Moda Premium" },
      { name: "description", content: "Todas as peças do catálogo Moda Premium. Escolha a sua e finalize pelo WhatsApp." },
      { property: "og:title", content: "Todos os Produtos — Moda Premium" },
      { property: "og:description", content: "Todas as peças do catálogo. Compre direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-12">
          <Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
        </div>
      </header>

      <main className="px-4 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h1 className="text-2xl font-light tracking-tight md:text-3xl">Todos os Produtos</h1>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{products.length} peças</span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <button key={p.id} onClick={() => setSelected(p)} className="group text-left">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={p.gallery[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                {!p.inStock && <span className="absolute left-3 top-3 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em]">Esgotado</span>}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h2 className="text-sm">{p.name}</h2>
                <p className="shrink-0 text-sm text-muted-foreground">{formatBRL(p.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-10 text-center text-xs tracking-[0.2em] text-muted-foreground">
        © 2026 MODA PREMIUM
      </footer>

      <ProductSheet product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
