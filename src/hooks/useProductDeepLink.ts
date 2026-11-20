import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";
import { generateSlug } from "@/lib/utils";

export function useProductDeepLink(products: Product[]) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("produto");
      const cleanUrl =
        url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "");
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    if (typeof window !== "undefined") {
      const slug = generateSlug(product.name);
      const url = new URL(window.location.href);
      url.searchParams.set("produto", slug);
      window.history.pushState({ modalOpen: true }, "", url.toString());
    }
  }, []);

  // Listener para o botão 'Voltar' do navegador fechar ou sincronizar o modal
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("produto");

      if (!slug) {
        setSelectedProduct(null);
      } else if (products.length > 0) {
        const found = products.find((p) => generateSlug(p.name) === slug);
        if (found) {
          setSelectedProduct(found);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [products]);

  // Sincronização de Deep Linking quando a lista de produtos é carregada inicialmente
  useEffect(() => {
    if (typeof window === "undefined" || products.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("produto");

    if (slug && !selectedProduct) {
      const found = products.find((p) => generateSlug(p.name) === slug);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [products, selectedProduct]);

  return {
    selectedProduct,
    openProduct,
    closeProduct,
  };
}
