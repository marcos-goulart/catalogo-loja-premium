import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";

const mockInStockProduct: Product = {
  id: "test-1",
  name: "Blazer Alfaiataria em Lã Fria",
  price: 1290,
  gallery: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"],
  sizes: ["P", "M", "G"],
  colors: ["Preto", "Grafite"],
  inStock: true,
};

const mockOutOfStockProduct: Product = {
  id: "test-2",
  name: "Calça Pantalona em Crepe",
  price: 590,
  gallery: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"],
  sizes: ["M", "G"],
  colors: ["Terracota"],
  inStock: false,
};

describe("ProductCard component", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("renderiza o nome do produto e o preço formatado em BRL", () => {
    const handleClick = vi.fn();
    render(<ProductCard product={mockInStockProduct} onClick={handleClick} />);

    expect(screen.getByText("Blazer Alfaiataria em Lã Fria")).toBeInTheDocument();
    // Verifica formatação do preço em BRL
    expect(screen.getByText(/1\.290,00/)).toBeInTheDocument();
    // Não deve conter badge de esgotado
    expect(screen.queryByTestId("out-of-stock-badge")).toBeNull();
  });

  it("exibe badge 'Esgotado' quando o produto estiver com inStock === false", () => {
    const handleClick = vi.fn();
    render(<ProductCard product={mockOutOfStockProduct} onClick={handleClick} />);

    const badge = screen.getByTestId("out-of-stock-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Esgotado");
  });

  it("dispara callback onClick quando o usuário clica no card", () => {
    const handleClick = vi.fn();
    render(<ProductCard product={mockInStockProduct} onClick={handleClick} />);

    const card = screen.getByTestId(`product-card-${mockInStockProduct.id}`);
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockInStockProduct);
  });

  it("garante que item fora de estoque não seja adicionado ao carrinho", () => {
    useCartStore.getState().addItem({
      id: mockOutOfStockProduct.id,
      name: mockOutOfStockProduct.name,
      price: mockOutOfStockProduct.price,
      size: "M",
      color: "Terracota",
      image: mockOutOfStockProduct.gallery[0] || "",
      inStock: mockOutOfStockProduct.inStock,
    });

    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useCartStore.getState().getTotalItems()).toBe(0);
  });
});
