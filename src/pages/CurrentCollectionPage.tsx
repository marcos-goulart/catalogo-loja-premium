import { useState, useMemo } from "react";
import { getCurrentSeason, getSeasonSanityValue } from "@/lib/utils";
import { useProducts } from "@/hooks/useProducts";
import { useProductDeepLink } from "@/hooks/useProductDeepLink";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { CatalogFilters } from "@/components/CatalogFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { ProductSheet } from "@/components/ProductSheet";
import { ContactFooter } from "@/components/ui/contact-footer";

const ITEMS_PER_PAGE = 12;

export function CurrentCollectionPage() {
  const currentSeason = getCurrentSeason();
  const seasonValue = getSeasonSanityValue();

  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, isLoading } = useProducts({ season: seasonValue });
  const { selectedProduct, openProduct, closeProduct } = useProductDeepLink(products);

  // Filtragem e Ordenação
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        case "menor-preco":
          return a.price - b.price;
        case "maior-preco":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedCategory, searchTerm, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const { gridRef } = useSmoothScrollAnimations({
    isModalOpen: Boolean(selectedProduct),
    animateDependencies: [isLoading, currentPage, filteredAndSortedProducts.length],
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar showBackButton={true} />

      <main id="catalogo" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header da Coleção */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Edição Especial
          </span>
          <h1 className="mt-2 text-3xl font-light uppercase tracking-[0.2em] sm:text-4xl md:text-5xl">
            Coleção {currentSeason}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light text-muted-foreground">
            A curadoria exclusiva para a estação atual. Peças confeccionadas com tecidos nobres e
            modelagem impecável.
          </p>
        </header>

        {/* Filtros */}
        <div className="mb-12">
          <CatalogFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>

        {/* Grade */}
        <ProductGrid
          ref={gridRef}
          products={paginatedProducts}
          isLoading={isLoading}
          onProductClick={openProduct}
          emptyMessage="Nenhuma peça encontrada para esta categoria na coleção atual."
        />

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          targetId="catalogo"
        />
      </main>

      <ContactFooter />

      <ProductSheet product={selectedProduct} onClose={closeProduct} />
    </div>
  );
}
