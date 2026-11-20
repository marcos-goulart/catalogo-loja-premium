import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

export const sanity = createClient({
  projectId: "1m6eib8b",
  dataset: "production",
  useCdn: true, // Usa o cache global da borda para máxima velocidade e performance
  apiVersion: "2026-10-05", // Data para fixar a versão da API
});

const builder = createImageUrlBuilder(sanity);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Helper inteligente para geração de URL otimizada de imagens.
 * Suporta referências do Sanity, URLs de CDN do Sanity e URLs públicas do Unsplash,
 * adicionando formatação automática, qualidade e redimensionamento.
 */
export function urlForImage(source: unknown, width?: number): string {
  if (!source) return "";

  if (typeof source === "string") {
    // Se for URL externa do Unsplash, aplica otimização de largura e qualidade via query params
    if (source.includes("images.unsplash.com")) {
      try {
        const url = new URL(source);
        url.searchParams.set("auto", "format");
        url.searchParams.set("q", "80");
        if (width) url.searchParams.set("w", String(width));
        return url.toString();
      } catch {
        return source;
      }
    }

    // Se for URL direta do CDN do Sanity
    if (source.includes("cdn.sanity.io")) {
      try {
        const url = new URL(source);
        url.searchParams.set("auto", "format");
        url.searchParams.set("q", "80");
        if (width) url.searchParams.set("w", String(width));
        return url.toString();
      } catch {
        return source;
      }
    }

    return source;
  }

  try {
    let img = builder
      .image(source as SanityImageSource)
      .auto("format")
      .quality(80);
    if (width) {
      img = img.width(width);
    }
    return img.url();
  } catch {
    return "";
  }
}
