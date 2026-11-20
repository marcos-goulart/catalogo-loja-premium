export interface Product {
  id: string;
  name: string;
  price: number;
  gallery: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  department?: string;
  category?: string;
  collection?: string;
}
