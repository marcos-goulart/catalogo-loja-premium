import { createFileRoute } from "@tanstack/react-router";
import { getCurrentSeason } from "@/lib/utils";
import { CurrentCollectionPage } from "@/pages/CurrentCollectionPage";

export const Route = createFileRoute("/colecao-atual")({
  head: () => {
    const season = getCurrentSeason();
    return {
      meta: [
        { title: `Coleção ${season} — Moda Premium` },
        {
          name: "description",
          content: `Peças selecionadas da Coleção ${season}. Escolha a sua e finalize pelo WhatsApp.`,
        },
        { property: "og:title", content: `Coleção ${season} — Moda Premium` },
        {
          property: "og:description",
          content: `Peças selecionadas da Coleção ${season}. Escolha a sua e finalize pelo WhatsApp.`,
        },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Coleção ${season} — Moda Premium` },
        {
          name: "twitter:description",
          content: `Peças selecionadas da Coleção ${season}. Compre direto pelo WhatsApp.`,
        },
        {
          name: "twitter:image",
          content:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
        },
      ],
    };
  },
  component: CurrentCollectionPage,
});
