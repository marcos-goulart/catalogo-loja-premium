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
 * Utilitário de formatação de slugs para Deep Linking e URLs amigáveis.
 */
export function generateSlug(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * Formatação de valores monetários em Real brasileiro (BRL).
 */
export function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const WHATSAPP_NUMBER = "5521999999999";

export const CONTACT = {
  whatsapp: WHATSAPP_NUMBER,
  email: "contato@modapremium.com.br",
  instagram: "@modapremium",
  city: "Magé — RJ",
};

export interface OrderItem {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

/**
 * Formata mensagem de pedido pronta para envio via WhatsApp.
 */
export function formatWhatsAppOrder(items: OrderItem[], subtotal: number): string {
  if (items.length === 0) return "";

  let message = "Olá! Gostaria de finalizar a seguinte encomenda:\n\n";

  items.forEach((item) => {
    const itemTotal = formatBRL(item.price * item.quantity);
    message += `- ${item.quantity}x ${item.name} (Tam: ${item.size} | Cor: ${item.color}) - ${itemTotal}\n`;
  });

  const subtotalFormatted = formatBRL(subtotal);
  message += `\n*Subtotal: ${subtotalFormatted}*`;
  message += "\n\nAguardo as informações para pagamento e envio!";

  return message;
}

/**
 * Gera URL direta da API do WhatsApp com o texto codificado.
 */
export function getWhatsAppCheckoutUrl(
  items: OrderItem[],
  subtotal: number,
  phoneNumber: string = WHATSAPP_NUMBER,
): string {
  const message = formatWhatsAppOrder(items, subtotal);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
