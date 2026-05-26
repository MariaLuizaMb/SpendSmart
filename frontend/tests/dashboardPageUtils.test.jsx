import { describe, expect, it, vi } from "vitest";

import {
  aplicarMascaraData,
  converterTextoParaData,
  criarDataDashboard,
  criarDataSemHorario,
  formatarDataDashboard,
  validarData,
} from "../src/pages/Dashboard";

describe("Dashboard page helpers", () => {
  it("deve criar data do dashboard usando mês e ano válidos", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-31T12:00:00.000Z"));

    expect(criarDataDashboard("2", "2026")).toEqual(new Date(2026, 1, 28));
    expect(criarDataDashboard("abc", "2026")).toEqual(
      new Date("2026-05-31T12:00:00.000Z"),
    );
    expect(formatarDataDashboard(new Date(2026, 4, 6))).toBe("06/05/2026");
  });

  it("deve validar e converter datas digitadas", () => {
    expect(validarData(new Date(2026, 4, 6))).toBe(true);
    expect(validarData(new Date("invalida"))).toBe(false);
    expect(criarDataSemHorario(2026, 2, 29)).toBeUndefined();
    expect(criarDataSemHorario(2024, 2, 29)).toEqual(new Date(2024, 1, 29));
    expect(converterTextoParaData("06/05/2026")).toEqual(
      new Date(2026, 4, 6),
    );
    expect(converterTextoParaData("2026-05-06")).toEqual(
      new Date(2026, 4, 6),
    );
    expect(converterTextoParaData("")).toBeUndefined();
    expect(converterTextoParaData("data-invalida")).toBeUndefined();
  });

  it("deve aplicar máscara de data mantendo apenas oito dígitos", () => {
    expect(aplicarMascaraData("06052026")).toBe("06/05/2026");
    expect(aplicarMascaraData("06abc05xyz202699")).toBe("06/05/2026");
    expect(aplicarMascaraData("1")).toBe("1");
  });
});
