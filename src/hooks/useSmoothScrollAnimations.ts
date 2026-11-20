import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

interface UseSmoothScrollAnimationsOptions {
  isModalOpen?: boolean;
  animateDependencies?: unknown[];
}

export function useSmoothScrollAnimations(options: UseSmoothScrollAnimationsOptions = {}) {
  const { isModalOpen = false, animateDependencies = [] } = options;
  const gridRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Inicialização e sincronização perfeita do Lenis com o ticker do GSAP
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sincroniza o Lenis diretamente no ticker do GSAP para evitar loop RAF descompassado (zero micro-stutter)
    function onGsapTick(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Pausa / Retoma o scroll do Lenis quando o modal de detalhes do produto estiver aberto
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isModalOpen]);

  // Animação de entrada fluida dos cards de produto com GSAP
  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all",
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, animateDependencies);

  return {
    gridRef,
    lenisRef,
  };
}
