import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  targetId?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  targetId = "catalogo",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page === currentPage) return;
    onPageChange(page);

    // Rolagem suave e elegante com o Lenis até a grade de produtos (sem corte seco)
    if (typeof window !== "undefined") {
      const lenis = window.__lenis;
      const targetElement = document.getElementById(targetId);

      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(targetElement || 0, {
          offset: -80,
          duration: 1.0,
        });
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      aria-label="Paginação do catálogo"
      className="mt-16 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className="inline-flex h-10 items-center gap-1 border border-border px-3 text-xs uppercase tracking-[0.15em] text-foreground transition hover:border-foreground disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`grid h-10 w-10 place-items-center text-xs transition cursor-pointer ${
              currentPage === page
                ? "border border-foreground bg-foreground font-medium text-background"
                : "border border-border text-foreground hover:border-foreground"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className="inline-flex h-10 items-center gap-1 border border-border px-3 text-xs uppercase tracking-[0.15em] text-foreground transition hover:border-foreground disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
        aria-label="Próxima página"
      >
        <span className="hidden sm:inline">Seguinte</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
