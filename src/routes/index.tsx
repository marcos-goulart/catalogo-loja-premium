import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle, Mail, AtSign, MapPin } from "lucide-react";
import { collection, formatBRL, CONTACT, type Product } from "@/lib/products";
import { ProductSheet } from "@/components/ProductSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moda Premium — Catálogo" },
      { name: "description", content: "Catálogo de roupas premium. Escolha sua peça e finalize pelo WhatsApp." },
      { property: "og:title", content: "Moda Premium — Catálogo" },
      { property: "og:description", content: "Peças atemporais. Compre direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80";

function Index() {
  const [selected, setSelected] = useState<Product | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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
      gsap.from(".hero-anim", { y: 40, opacity: 0, duration: 1.1, stagger: 0.15, ease: "power3.out", delay: 0.2 });
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
        <div className="flex h-16 items-center justify-center">
          <span className="text-sm font-medium tracking-[0.4em]">MODA PREMIUM</span>
        </div>
      </header>

      <section ref={heroRef} className="relative -mt-16 flex h-[80vh] items-end overflow-hidden">
        <img src={HERO} alt="Coleção de moda" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="relative w-full px-6 pb-16 text-background md:px-12 md:pb-24">
          <p className="hero-anim mb-4 text-xs uppercase tracking-[0.3em]">Coleção Outono 2026</p>
          <h1 className="hero-anim max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">Essencial.<br />Atemporal.</h1>
          <button onClick={() => lenisRef.current?.scrollTo("#colecao", { offset: -64 })} className="hero-anim mt-8 bg-background px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition hover:bg-secondary">
            Ver Coleção
          </button>
        </div>
      </section>

      <main id="colecao" className="px-4 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-light tracking-tight md:text-3xl">A Coleção</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{collection.length} peças</span>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collection.map((p) => (
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

      <footer id="contato" className="border-t border-border bg-muted/40 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground">Fale conosco</p>
          <h2 className="mt-4 text-center text-2xl font-light tracking-tight md:text-3xl">Atendimento personalizado</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="group">
              <MessageCircle className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">WhatsApp</p>
              <p className="mt-1 text-sm">+55 11 99999-9999</p>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="group">
              <Mail className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">E-mail</p>
              <p className="mt-1 text-sm">{CONTACT.email}</p>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group">
              <AtSign className="mx-auto h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Instagram</p>
              <p className="mt-1 text-sm">{CONTACT.instagram}</p>
            </a>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Ateliê</p>
              <p className="mt-1 text-sm">{CONTACT.city}</p>
            </div>
          </div>
          <p className="mt-12 text-center text-[10px] tracking-[0.3em] text-muted-foreground">© 2026 MODA PREMIUM</p>
        </div>
      </footer>

      <ProductSheet product={selected} onClose={close} />
    </div>
  );
}
