import { createFileRoute } from "@tanstack/react-router";
import { AllProductsPage } from "@/pages/AllProductsPage";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Todos os Produtos — Moda Premium" },
      {
        name: "description",
        content: "Todas as peças do catálogo Moda Premium. Escolha a sua e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Todos os Produtos — Moda Premium" },
      {
        property: "og:description",
        content: "Todas as peças do catálogo Moda Premium. Compre direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Todos os Produtos — Moda Premium" },
      {
        name: "twitter:description",
        content: "Todas as peças do catálogo. Compre direto pelo WhatsApp.",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: AllProductsPage,
});
