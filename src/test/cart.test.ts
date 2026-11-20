import { describe, it, expect, beforeEach } from "vitest";
import { formatWhatsAppOrder, getWhatsAppCheckoutUrl, WHATSAPP_NUMBER } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

describe("Cart and WhatsApp Order Formatting", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("formata a mensagem do pedido no WhatsApp com quebras de linha e subtotal", () => {
    const items = [
      {
        name: "Blazer Alfaiataria",
        size: "M",
        color: "Preto",
        quantity: 1,
        price: 1290,
      },
      {
        name: "Camisa Linho",
        size: "G",
        color: "Off-White",
        quantity: 2,
        price: 489,
      },
    ];
    const subtotal = 1290 + 489 * 2;

    const message = formatWhatsAppOrder(items, subtotal);

    expect(message).toContain("Olá! Gostaria de finalizar a seguinte encomenda:");
    expect(message).toContain("- 1x Blazer Alfaiataria (Tam: M | Cor: Preto)");
    expect(message).toContain("- 2x Camisa Linho (Tam: G | Cor: Off-White)");
    expect(message).toContain("*Subtotal:");
    expect(message).toContain("Aguardo as informações para pagamento e envio!");
  });

  it("gera URL válida de checkout para WhatsApp com número e encodeURIComponent", () => {
    const items = [
      {
        name: "Vestido Seda",
        size: "P",
        color: "Champagne",
        quantity: 1,
        price: 1490,
      },
    ];
    const url = getWhatsAppCheckoutUrl(items, 1490);

    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    expect(url).toContain(encodeURIComponent("Vestido Seda"));
  });

  it("bloqueia estritamente a adição de produtos esgotados (inStock: false) na store do Zustand", () => {
    const { addItem, items } = useCartStore.getState();

    // Tentativa de adicionar item fora de estoque
    addItem({
      id: "prod-esgotado",
      name: "Calça Crepe Esgotada",
      price: 590,
      size: "M",
      color: "Preto",
      image: "https://example.com/calca.jpg",
      inStock: false,
    });

    expect(useCartStore.getState().items).toHaveLength(0);

    // Adiciona item válido em estoque
    addItem({
      id: "prod-disponivel",
      name: "Trench Coat",
      price: 1890,
      size: "G",
      color: "Caramelo",
      image: "https://example.com/trench.jpg",
      inStock: true,
    });

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]?.name).toBe("Trench Coat");
  });
});
