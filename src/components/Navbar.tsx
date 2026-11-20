import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

interface NavbarProps {
  showBackButton?: boolean;
}

export function Navbar({ showBackButton = false }: NavbarProps) {
  return (
    <>
      <ScrollProgressBar />
      {/* 
        Fundo com 98% de opacidade sólido e sem backdrop-blur pesado:
        Elimina completamente o gargalo de repaints e shaders de blur da GPU 
        ao rolar o banner Hero de alta resolução sob o cabeçalho.
      */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/98">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex w-24 items-center">
            {showBackButton ? (
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Voltar</span>
              </Link>
            ) : null}
          </div>

          <Link
            to="/"
            className="text-center font-light tracking-[0.25em] text-foreground transition hover:opacity-80 uppercase text-lg sm:text-xl"
          >
            MODA PREMIUM
          </Link>

          <div className="flex w-24 items-center justify-end">
            <CartDrawer />
          </div>
        </div>
      </header>
    </>
  );
}
