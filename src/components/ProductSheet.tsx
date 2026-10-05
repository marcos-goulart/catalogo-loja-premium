import { useEffect, useState } from "react";
import { X, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { type Product, formatBRL, WHATSAPP_NUMBER } from "@/lib/productsMock";
import { useCartStore } from "@/store/useCartStore";

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

  useEffect(() => {
    setImg(0);
    setSize(null);
    setColor(product?.colors[0] ?? null);
    setIsAdded(false);
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

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
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/90"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-[4/5] bg-muted">
          <img
            src={product.gallery[img]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex gap-2 px-6 pt-4">
          {product.gallery.map((g, i) => (
            <button
              key={g}
              onClick={() => setImg(i)}
              className={`h-20 w-16 overflow-hidden border-2 ${i === img ? "border-foreground" : "border-transparent"}`}
            >
              <img src={g} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="space-y-6 p-6 pb-10">
          <div>
            <h2 className="text-2xl font-light tracking-tight">{product.name}</h2>
            <p className="mt-1 text-lg">{formatBRL(product.price)}</p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Cor: {color}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-4 py-2 text-sm transition ${c === color ? "border-foreground" : "border-border text-muted-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Tamanho</p>
            <div className="grid grid-cols-4 gap-2">
              {["P", "M", "G", "GG"].map((s) => {
                const ok = product.sizes.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!ok}
                    onClick={() => setSize(s)}
                    className={`h-12 border text-sm transition disabled:opacity-30 disabled:line-through ${s === size ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
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
                  {!product.inStock ? "Esgotado" : size ? "Adicionar à Sacola" : "Selecione um tamanho"}
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
