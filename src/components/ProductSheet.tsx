import { useEffect, useState, useRef } from "react";
import { X, MessageCircle, ShoppingBag, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { type Product, formatBRL, WHATSAPP_NUMBER } from "@/lib/productsMock";
import { useCartStore } from "@/store/useCartStore";

const STANDARD_SIZES = ["PP", "P", "M", "G", "GG", "XG", "Único"];

export function ProductSheet({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [img, setImg] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  useEffect(() => {
    setImg(0);
    setSize(null);
    setColor(product?.colors[0] ?? null);
    setIsAdded(false);
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && product.gallery.length > 1) {
        setImg((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
      }
      if (e.key === "ArrowRight" && product.gallery.length > 1) {
        setImg((prev) => (prev + 1) % product.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const totalImages = product.gallery.length;

  const prevImg = () => {
    if (totalImages <= 1) return;
    setImg((curr) => (curr - 1 + totalImages) % totalImages);
  };

  const nextImg = () => {
    if (totalImages <= 1) return;
    setImg((curr) => (curr + 1) % totalImages);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchEndX.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    if (touch) {
      touchEndX.current = touch.clientX;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextImg();
    } else if (diff < -45) {
      prevImg();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (diff > 45) {
      nextImg();
    } else if (diff < -45) {
      prevImg();
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    mouseStartX.current = null;
  };

  const handleAddToCart = () => {
    if (!size || !product.inStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color: color || product.colors[0] || "",
      image: product.gallery[img] || product.gallery[0] || "",
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const buy = () => {
    if (!size) return;
    const text = `Olá! Tenho interesse no produto: ${product.name} - Tamanho: ${size} - R$ ${product.price.toFixed(2).replace(".", ",")}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Montar lista de tamanhos disponíveis a exibir
  const availableSizes = STANDARD_SIZES.filter((s) => product.sizes.includes(s));
  const displaySizes = availableSizes.length > 0 ? availableSizes : product.sizes;

  return (
    <div className="fixed inset-0 z-50" data-lenis-prevent>
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <aside className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto bg-background animate-in slide-in-from-bottom duration-300 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[520px] md:slide-in-from-right">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground transition hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Galeria de imagem com botões laterais e suporte a arrastar/swipe */}
        <div
          className="relative aspect-[4/5] bg-muted overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {totalImages > 0 && (
            <img
              src={product.gallery[img] || product.gallery[0]}
              alt={product.name}
              draggable={false}
              className="h-full w-full object-cover transition-opacity duration-300 pointer-events-none"
            />
          )}

          {/* Botões laterais < e > */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImg();
                }}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-md transition hover:bg-background active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImg();
                }}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-md transition hover:bg-background active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indicador de imagem atual */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 rounded-full bg-background/60 backdrop-blur-sm px-2.5 py-1">
                {product.gallery.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === img ? "w-4 bg-foreground" : "w-1.5 bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {totalImages > 1 && (
          <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
            {product.gallery.map((g, i) => (
              <button
                key={g + i}
                onClick={() => setImg(i)}
                className={`h-20 w-16 shrink-0 overflow-hidden border-2 transition ${
                  i === img
                    ? "border-foreground"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-6 p-6 pb-10">
          <div>
            <h2 className="text-2xl font-light tracking-tight">{product.name}</h2>
            <p className="mt-1 text-lg">{formatBRL(product.price)}</p>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cor: {color}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`border px-4 py-2 text-sm transition ${
                      c === color
                        ? "border-foreground font-medium"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {displaySizes.map((s) => {
                const isAvailable = product.sizes.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!isAvailable}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-[3rem] px-3 border text-sm transition disabled:opacity-30 disabled:line-through ${
                      s === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!size || !product.inStock}
              className="flex h-14 w-full items-center justify-center gap-2 border border-foreground bg-foreground text-background text-sm font-medium uppercase tracking-[0.2em] transition hover:bg-foreground/90 disabled:opacity-50"
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Adicionado à Sacola
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {!product.inStock
                    ? "Esgotado"
                    : size
                      ? "Adicionar à Sacola"
                      : "Selecione um tamanho"}
                </>
              )}
            </button>

            <button
              onClick={buy}
              disabled={!size || !product.inStock}
              className="flex h-12 w-full items-center justify-center gap-2 border border-border text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:border-foreground hover:text-foreground disabled:opacity-50"
            >
              <MessageCircle className="h-4 w-4" />
              Comprar direto no WhatsApp
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
