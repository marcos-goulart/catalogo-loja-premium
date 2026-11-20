import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Product } from "@/types/product";
import { generateSlug } from "@/lib/utils";

type SearchParamsRecord = Record<string, unknown>;

type SearchNavigateFn = (options: {
  search: (prev: SearchParamsRecord) => SearchParamsRecord;
  resetScroll?: boolean;
  replace?: boolean;
}) => Promise<void> | void;

export function useProductDeepLink(products: Product[]) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate() as unknown as SearchNavigateFn;
  const hasSyncedInitialUrl = useRef(false);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    try {
      navigate({
        search: (prev) => {
          const next = { ...prev };
          delete next["produto"];
          return next;
        },
        resetScroll: false,
        replace: true,
      });
    } catch {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("produto");
        const cleanUrl =
          url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "");
        window.history.replaceState({}, "", cleanUrl);
      }
    }
  }, [navigate]);

  const openProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      const slug = generateSlug(product.name);
      try {
        navigate({
          search: (prev) => ({ ...prev, produto: slug }),
          resetScroll: false,
        });
      } catch {
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("produto", slug);
          window.history.pushState({ modalOpen: true }, "", url.toString());
        }
      }
    },
    [navigate],
  );

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

  // Sincronização de Deep Linking quando a lista de produtos é carregada inicialmente (apenas uma vez)
  useEffect(() => {
    if (typeof window === "undefined" || products.length === 0 || hasSyncedInitialUrl.current) {
      return;
    }

    hasSyncedInitialUrl.current = true;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("produto");

    if (slug) {
      const found = products.find((p) => generateSlug(p.name) === slug);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, [products]);

  return {
    selectedProduct,
    openProduct,
    closeProduct,
  };
}
