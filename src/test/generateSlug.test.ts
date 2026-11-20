import { describe, it, expect } from "vitest";
import { generateSlug } from "@/lib/utils";

describe("generateSlug", () => {
  it("converte texto simples com espaços em slug separado por hifens", () => {
    expect(generateSlug("Camisa Linho")).toBe("camisa-linho");
  });

  it("remove acentos e caracteres diacríticos corretamente", () => {
    expect(generateSlug("Tricô de Lã com Gola Alta")).toBe("trico-de-la-com-gola-alta");
    expect(generateSlug("Bermuda de Algodão")).toBe("bermuda-de-algodao");
    expect(generateSlug("Peça Ímpar")).toBe("peca-impar");
  });

  it("remove caracteres especiais, símbolos e pontuações", () => {
    expect(generateSlug("Jaqueta Biker (Edição 100% Couro!)")).toBe("jaqueta-biker-edicao-100-couro");
    expect(generateSlug("Blazer & Calça: Linha Premium #1")).toBe("blazer-calca-linha-premium-1");
  });

  it("trata múltiplos espaços e hifens repetidos", () => {
    expect(generateSlug("   Vestido    Floral   --  Seda   ")).toBe("vestido-floral-seda");
  });

  it("retorna string vazia quando entrada for vazia", () => {
    expect(generateSlug("")).toBe("");
  });
});
