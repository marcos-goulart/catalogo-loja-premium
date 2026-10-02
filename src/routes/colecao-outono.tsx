import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import { autumnCollection, formatBRL, type Product } from "@/lib/products";
import { ProductSheet } from "@/components/ProductSheet";

export const Route = createFileRoute("/colecao-outono")({
  head: () => ({
    meta: [
      { title: "Coleção Outono 2026 — Moda Premium" },
      { name: "description", content: "As peças selecionadas da Coleção Outono 2026. Escolha a sua e finalize pelo WhatsApp." },
      { property: "og:title", content: "Coleção Outono 2026 — Moda Premium" },
      { property: "og:description", content: "As peças selecionadas da Coleção Outono 2026. Escolha a sua e finalize pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ColecaoOutono,
});

function ColecaoOutono() {
  const [selected, setSelected] = useState<Product | null>(null);
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
      gsap.from(".page-anim", { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".card").forEach((el, i) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (selected) lenisRef.current?.stop(); else lenisRef.current?.start();
  }, [selected]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 md:px-12">
          <Link to="/" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="mr-2 inline h-3.5 w-3.5" /> Voltar
          </Link>
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
          <span className="w-20" />
        </div>
      </header>

      <main className="px-4 py-16 md:px-12 md:py-24">
        <p className="page-anim mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Coleção Outono 2026</p>
        <h1 className="page-anim text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">Outono.<br />Seleção essencial.</h1>
        <span className="page-anim mt-6 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{autumnCollection.length} peças</span>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {autumnCollection.map((p) => (
            <button key={p.id} onClick={() => setSelected(p)} className="card group text-left">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={p.gallery[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                {!p.inStock && <span className="absolute left-3 top-3 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em]">Esgotado</span>}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="text-sm">{p.name}</h3>
                <p className="shrink-0 text-sm text-muted-foreground">{formatBRL(p.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <ProductSheet product={selected} onClose={close} />
    </div>
  );
}
