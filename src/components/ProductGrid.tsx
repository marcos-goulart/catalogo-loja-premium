import { forwardRef } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(
  function ProductGrid(
    {
      products,
      isLoading,
      onProductClick,
      emptyMessage = "Nenhuma peça encontrada para esta seleção.",
    },
    ref
  ) {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4"
          data-testid="product-grid-skeleton"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              {/* Structured aspect-[3/4] Skeleton */}
              <div className="aspect-[3/4] w-full rounded-none bg-muted/60 animate-pulse" />
              <div className="space-y-1.5 pt-1">
                <div className="h-4 w-3/4 rounded-none bg-muted/60 animate-pulse" />
                <div className="h-3.5 w-1/3 rounded-none bg-muted/40 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div
          ref={ref}
          className="flex min-h-[320px] flex-col items-center justify-center text-center p-8 border border-dashed border-border"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {emptyMessage}
          </p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4"
        data-testid="product-grid"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            priority={index < 4}
          />
        ))}
      </div>
    );
  }
);
