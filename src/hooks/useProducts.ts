import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";
import { sanity } from "@/lib/sanity";

interface UseProductsOptions {
  season?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { season } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Query enxuta projetando apenas os campos necessários
      const query = season
        ? `*[_type == "product" && (collection == $season || collection->seasonIndicator == $season)]{
            "id": _id,
            name,
            price,
            "gallery": gallery[].asset->url,
            inStock,
            department,
            category,
            collection,
            sizes,
            colors
          }`
        : `*[_type == "product"]{
            "id": _id,
            name,
            price,
            "gallery": gallery[].asset->url,
            inStock,
            department,
            category,
            collection,
            sizes,
            colors
          }`;

      const data = await sanity.fetch<Product[]>(query, season ? { season } : {});

      const normalized: Product[] = (data || []).map((p) => ({
        ...p,
        gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [],
        sizes: Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ["Único"],
        colors: Array.isArray(p.colors) && p.colors.length > 0 ? p.colors : ["Padrão"],
        inStock: p.inStock ?? true,
      }));

      setProducts(normalized);
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error(String(err));
      console.error("Erro ao carregar produtos do Sanity:", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [season]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}
