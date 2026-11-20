import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moda Premium — Catálogo" },
      {
        name: "description",
        content: "Catálogo de roupas premium. Escolha sua peça e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Moda Premium — Catálogo" },
      {
        property: "og:description",
        content: "Peças atemporais e exclusivas. Compre direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Moda Premium — Catálogo" },
      {
        name: "twitter:description",
        content: "Peças atemporais e exclusivas. Compre direto pelo WhatsApp.",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: HomePage,
});
