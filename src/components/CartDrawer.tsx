import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatBRL, WHATSAPP_NUMBER } from "@/lib/productsMock";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = "Olá! Gostaria de finalizar a seguinte encomenda:\n\n";

    items.forEach((item) => {
      const itemPriceFormatted = formatBRL(item.price * item.quantity);
      message += `- ${item.quantity}x ${item.name} (Tam: ${item.size} | Cor: ${item.color}) - ${itemPriceFormatted}\n`;
    });

    const subtotalFormatted = formatBRL(subtotal);
    message += `\n*Subtotal: ${subtotalFormatted}*`;
    message += "\n\nAguardo as informações para pagamento e envio!";

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir sacola de compras"
          className="relative inline-flex items-center justify-center p-2 text-foreground transition-opacity hover:opacity-75 focus-visible:outline-none"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-sm animate-in zoom-in-75">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
          <SheetTitle className="text-base font-light tracking-[0.2em] uppercase">
            Sua Sacola
          </SheetTitle>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item adicionado" : "itens adicionados"}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40 stroke-1" />
              <p className="mt-4 text-sm font-light uppercase tracking-wider text-muted-foreground">
                Sua sacola está vazia
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80">
                Adicione peças do catálogo para visualizá-las aqui.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 py-5">
                  <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.color} / {item.size}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                          }
                          aria-label="Diminuir quantidade"
                          className="grid h-7 w-7 place-items-center text-muted-foreground transition hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                          }
                          aria-label="Aumentar quantidade"
                          className="grid h-7 w-7 place-items-center text-muted-foreground transition hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium">
                        {formatBRL(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 bg-muted/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Subtotal
              </span>
              <span className="text-lg font-light tracking-tight">{formatBRL(subtotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="flex h-14 w-full items-center justify-center gap-2 bg-[#25D366] text-white font-medium text-sm uppercase tracking-[0.2em] transition hover:bg-[#20ba59] active:scale-[0.99] shadow-sm cursor-pointer"
            >
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
