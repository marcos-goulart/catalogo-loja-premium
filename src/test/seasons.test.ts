import { describe, it, expect } from "vitest";
import { getCurrentSeason, getSeasonSanityValue } from "@/lib/utils";

describe("Seasons utils (Hemisfério Sul)", () => {
  it("retorna Verão / verao para Janeiro (mês 0), Fevereiro (mês 1) e Dezembro (mês 11)", () => {
    const jan = new Date(2026, 0, 15);
    const feb = new Date(2026, 1, 20);
    const dec = new Date(2026, 11, 25);

    expect(getCurrentSeason(jan)).toBe("Verão");
    expect(getSeasonSanityValue(jan)).toBe("verao");

    expect(getCurrentSeason(feb)).toBe("Verão");
    expect(getSeasonSanityValue(feb)).toBe("verao");

    expect(getCurrentSeason(dec)).toBe("Verão");
    expect(getSeasonSanityValue(dec)).toBe("verao");
  });

  it("retorna Outono / outono para Março (mês 2), Abril (mês 3) e Maio (mês 4)", () => {
    const mar = new Date(2026, 2, 10);
    const apr = new Date(2026, 3, 15);
    const may = new Date(2026, 4, 30);

    expect(getCurrentSeason(mar)).toBe("Outono");
    expect(getSeasonSanityValue(mar)).toBe("outono");

    expect(getCurrentSeason(apr)).toBe("Outono");
    expect(getSeasonSanityValue(apr)).toBe("outono");

    expect(getCurrentSeason(may)).toBe("Outono");
    expect(getSeasonSanityValue(may)).toBe("outono");
  });

  it("retorna Inverno / inverno para Junho (mês 5), Julho (mês 6) e Agosto (mês 7)", () => {
    const jun = new Date(2026, 5, 21);
    const jul = new Date(2026, 6, 15);
    const aug = new Date(2026, 7, 31);

    expect(getCurrentSeason(jun)).toBe("Inverno");
    expect(getSeasonSanityValue(jun)).toBe("inverno");

    expect(getCurrentSeason(jul)).toBe("Inverno");
    expect(getSeasonSanityValue(jul)).toBe("inverno");

    expect(getCurrentSeason(aug)).toBe("Inverno");
    expect(getSeasonSanityValue(aug)).toBe("inverno");
  });

  it("retorna Primavera / primavera para Setembro (mês 8), Outubro (mês 9) e Novembro (mês 10)", () => {
    const sep = new Date(2026, 8, 22);
    const oct = new Date(2026, 9, 10);
    const nov = new Date(2026, 10, 20);

    expect(getCurrentSeason(sep)).toBe("Primavera");
    expect(getSeasonSanityValue(sep)).toBe("primavera");

    expect(getCurrentSeason(oct)).toBe("Primavera");
    expect(getSeasonSanityValue(oct)).toBe("primavera");

    expect(getCurrentSeason(nov)).toBe("Primavera");
    expect(getSeasonSanityValue(nov)).toBe("primavera");
  });
});
