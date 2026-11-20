import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // A barra de progresso horizontal superior é exclusiva para telas mobile (< 768px)
    if (window.innerWidth >= 768) return;

    let cleanup: (() => void) | undefined;

    // Dá um breve respiro para o Lenis inicializar no hook de animação
    const timer = setTimeout(() => {
      const lenis = window.__lenis;

      if (lenis && typeof lenis.on === "function") {
        // Modo Lenis: utiliza a propriedade progress já calculada em memória (zero leituras de DOM/reflow)
        const onLenisScroll = (e: { progress?: number }) => {
          if (barRef.current && typeof e.progress === "number") {
            barRef.current.style.transform = `scaleX(${e.progress})`;
          }
        };
        lenis.on("scroll", onLenisScroll);
        cleanup = () => lenis.off("scroll", onLenisScroll);
      } else {
        // Fallback nativo otimizado com requestAnimationFrame
        let rafId: number;
        const updateProgress = () => {
          const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
          const maxScroll = scrollHeight - clientHeight;
          const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progress})`;
          }
        };

        const onNativeScroll = () => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateProgress);
        };

        window.addEventListener("scroll", onNativeScroll, { passive: true });
        cleanup = () => {
          window.removeEventListener("scroll", onNativeScroll);
          cancelAnimationFrame(rafId);
        };
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-30 h-[2px] pointer-events-none md:hidden bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-foreground will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
