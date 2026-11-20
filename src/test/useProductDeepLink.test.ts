import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProductDeepLink } from "@/hooks/useProductDeepLink";
import type { Product } from "@/types/product";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Vestido Seda",
    price: 1200,
    gallery: ["https://example.com/vestido.jpg"],
    department: "Feminino",
    category: "vestidos",
    collection: "Primavera",
    sizes: ["P", "M"],
    colors: ["Preto"],
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Camisa Linho",
    price: 650,
    gallery: ["https://example.com/camisa.jpg"],
    department: "Masculino",
    category: "camisas",
    collection: "Verão",
    sizes: ["M", "G"],
    colors: ["Branco"],
    inStock: true,
  },
];

describe("useProductDeepLink hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("inicia com selectedProduct nulo se a URL não tiver parâmetro ?produto=", () => {
    const { result } = renderHook(() => useProductDeepLink(mockProducts));
    expect(result.current.selectedProduct).toBeNull();
  });

  it("sincroniza o produto inicial a partir do query param ?produto= apenas uma vez", () => {
    window.history.replaceState({}, "", "/?produto=vestido-seda");

    const { result, rerender } = renderHook(({ prods }) => useProductDeepLink(prods), {
      initialProps: { prods: mockProducts },
    });

    expect(result.current.selectedProduct).toEqual(mockProducts[0]);

    // Rerender não deve tentar re-sincronizar mesmo se prods for re-passado
    rerender({ prods: [...mockProducts] });
    expect(result.current.selectedProduct).toEqual(mockProducts[0]);
  });

  it("ao abrir e fechar o produto, mantém selectedProduct === null sem race condition", () => {
    const { result } = renderHook(() => useProductDeepLink(mockProducts));

    // Abrir o produto
    act(() => {
      result.current.openProduct(mockProducts[0]!);
    });

    expect(result.current.selectedProduct).toEqual(mockProducts[0]);
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        resetScroll: false,
      }),
    );

    // Simula que a URL ainda tem o query param por conta do delay assíncrono do router
    window.history.replaceState({}, "", "/?produto=vestido-seda");

    // Fechar o produto
    act(() => {
      result.current.closeProduct();
    });

    // Deve permanecer nulo e não reabrir sozinho
    expect(result.current.selectedProduct).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        resetScroll: false,
        replace: true,
      }),
    );
  });

  it("sincroniza corretamente via popstate (botão voltar/avançar do navegador)", () => {
    const { result } = renderHook(() => useProductDeepLink(mockProducts));

    expect(result.current.selectedProduct).toBeNull();

    // Simula o botão 'Avançar' para a URL do produto
    window.history.replaceState({}, "", "/?produto=camisa-linho");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.selectedProduct).toEqual(mockProducts[1]);

    // Simula o botão 'Voltar' para a URL sem o query param
    window.history.replaceState({}, "", "/");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.selectedProduct).toBeNull();
  });
});
