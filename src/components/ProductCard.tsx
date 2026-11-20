import type { Product } from "@/types/product";
import { formatBRL } from "@/lib/utils";
import { urlForImage } from "@/lib/sanity";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onClick, priority = false }: ProductCardProps) {
  const imageUrl = urlForImage(product.gallery[0], 600);

  return (
    <article
      onClick={() => onClick(product)}
      className="product-card group cursor-pointer text-left"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            Sem Imagem
          </div>
        )}

        {!product.inStock && (
          <span
            className="absolute left-3 top-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white shadow-sm"
            data-testid="out-of-stock-badge"
          >
            Esgotado
          </span>
        )}
      </div>

      <div className="mt-3.5 space-y-1">
        <h3 className="text-sm font-light tracking-tight text-foreground line-clamp-1 group-hover:opacity-75 transition-opacity">
          {product.name}
        </h3>
        <p className="text-sm font-normal text-muted-foreground tracking-tight">
          {formatBRL(product.price)}
        </p>
      </div>
    </article>
  );
}
