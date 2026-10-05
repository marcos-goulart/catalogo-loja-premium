import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "1m6eib8b",
  dataset: "production",
  useCdn: true, // Usa o cache global da borda (mais rápido e barato)
  apiVersion: "2026-10-05", // Data de hoje para travar a versão da API
});
