import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retorna o nome da estação do ano atual formatado para exibição (Hemisfério Sul).
 * Verão: Dezembro, Janeiro, Fevereiro
 * Outono: Março, Abril, Maio
 * Inverno: Junho, Julho, Agosto
 * Primavera: Setembro, Outubro, Novembro
 */
export function getCurrentSeason(date: Date = new Date()): string {
  const month = date.getMonth();
  if (month === 11 || month === 0 || month === 1) return "Verão";
  if (month >= 2 && month <= 4) return "Outono";
  if (month >= 5 && month <= 7) return "Inverno";
  return "Primavera";
}

/**
 * Retorna o valor exato utilizado no schema do Sanity para as estações.
 */
export function getSeasonSanityValue(date: Date = new Date()): string {
  const month = date.getMonth();
  if (month === 11 || month === 0 || month === 1) return "verao";
  if (month >= 2 && month <= 4) return "outono";
  if (month >= 5 && month <= 7) return "inverno";
  return "primavera";
}

/**
 * Utilitário de formatação de slugs para Deep Linking.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
