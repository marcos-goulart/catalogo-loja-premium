import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CATEGORIES = [
  { label: "Todos", value: "todos" },
  { label: "Camisetas & Blusas", value: "camisetas" },
  { label: "Calças", value: "calcas" },
  { label: "Vestidos", value: "vestidos" },
  { label: "Casacos & Jaquetas", value: "casacos" },
  { label: "Acessórios", value: "acessorios" },
];

export const SORT_OPTIONS = [
  { label: "Ordem alfabética (A-Z)", value: "a-z" },
  { label: "Ordem alfabética (Z-A)", value: "z-a" },
  { label: "Menor preço", value: "menor-preco" },
  { label: "Maior preço", value: "maior-preco" },
];

interface CatalogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  sortOption?: string;
  onSortChange?: (sort: string) => void;
  showSearchAndSort?: boolean;
}

export function CatalogFilters({
  selectedCategory,
  onCategoryChange,
  searchTerm = "",
  onSearchChange,
  sortOption = "a-z",
  onSortChange,
  showSearchAndSort = true,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Categoria: Select no Mobile e Tabs horizontais no Desktop */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Mobile Dropdown */}
        <div className="w-full sm:hidden">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full h-11 border-border bg-background uppercase tracking-[0.15em] text-xs">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem
                  key={cat.value}
                  value={cat.value}
                  className="text-xs uppercase tracking-[0.15em]"
                >
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex sm:flex-wrap sm:gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-foreground text-background font-medium"
                  : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ordenação rápida */}
        {showSearchAndSort && onSortChange && (
          <div className="w-full sm:w-56">
            <Select value={sortOption} onValueChange={onSortChange}>
              <SelectTrigger className="w-full h-10 border-border bg-background uppercase tracking-[0.15em] text-xs">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs uppercase tracking-[0.15em]"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Barra de Busca */}
      {showSearchAndSort && onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar peça por nome..."
            className="h-11 w-full border border-border bg-background pl-10 pr-10 text-sm tracking-wide text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
