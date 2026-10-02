export type Product = {
  id: string;
  name: string;
  price: number;
  gallery: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  { id: "1", name: "Blazer Alfaiataria Lã", price: 1290, gallery: [u("photo-1591047139829-d91aecb6caea"), u("photo-1594938298603-c8148c4dae35")], sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Grafite"], inStock: true },
  { id: "2", name: "Camisa Linho Off-White", price: 489, gallery: [u("photo-1596755094514-f87e34085b2c"), u("photo-1602810318383-e386cc2a3ccf")], sizes: ["P", "M", "G", "GG"], colors: ["Off-white", "Areia"], inStock: true },
  { id: "3", name: "Trench Coat Clássico", price: 1890, gallery: [u("photo-1539533018447-63fcce2678e3"), u("photo-1520975954732-35dd22299614")], sizes: ["P", "M", "G"], colors: ["Caramelo", "Preto"], inStock: true },
  { id: "4", name: "Tricô Merino Gola Alta", price: 690, gallery: [u("photo-1576566588028-4147f3842f27"), u("photo-1434389677669-e08b4cac3105")], sizes: ["P", "M", "G", "GG"], colors: ["Cinza", "Preto", "Cru"], inStock: true },
  { id: "5", name: "Vestido Seda Minimal", price: 1490, gallery: [u("photo-1595777457583-95e059d581b8"), u("photo-1515372039744-b8f02a3ae446")], sizes: ["P", "M", "G"], colors: ["Preto", "Champagne"], inStock: true },
  { id: "6", name: "Calça Pantalona Crepe", price: 590, gallery: [u("photo-1594633312681-425c7b97ccd1"), u("photo-1509631179647-0177331693ae")], sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Off-white"], inStock: false },
  { id: "7", name: "Jaqueta Couro Essential", price: 2190, gallery: [u("photo-1551028719-00167b16eac5"), u("photo-1521223890158-f9f7c3d5d504")], sizes: ["M", "G", "GG"], colors: ["Preto"], inStock: true },
  { id: "8", name: "Camiseta Pima Premium", price: 249, gallery: [u("photo-1521572163474-6864f9cf17ab"), u("photo-1503341504253-dff4815485f1")], sizes: ["P", "M", "G", "GG"], colors: ["Branco", "Preto", "Cinza"], inStock: true },
];

export const collection: Product[] = products.slice(0, 6);

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const WHATSAPP_NUMBER = "5511999999999";

export const CONTACT = {
  whatsapp: WHATSAPP_NUMBER,
  email: "contato@modapremium.com.br",
  instagram: "@modapremium",
  city: "São Paulo — SP",
};
