import { describe, expect, it, vi } from "vitest";

const PrismaClientMock = vi.fn(() => ({ __prisma: true }));
const PrismaNeonMock = vi.fn(() => ({ __adapter: true }));

vi.mock("@prisma/adapter-neon", () => ({
  PrismaNeon: function PrismaNeonFactory() {
    return PrismaNeonMock();
  },
}));

// caminho usado no módulo alvo: ../../generated/prisma/index.js a partir de backend/src/database/prisma.js
vi.mock("../generated/prisma/index.js", () => ({
  PrismaClient: function PrismaClientFactory() {
    return PrismaClientMock();
  },
}));

// também precisamos mockar no caminho relativo correto usando vitest resolve: fazemos mock genérico via dynamic import com isolate.

describe("prisma module", () => {
  it("deve instanciar PrismaNeon e PrismaClient", async () => {
    const envAnterior = { ...process.env };
    process.env.DATABASE_URL = "postgres://user:pass@host:5432/db";

    const mod = await import("../src/database/prisma.js");
    expect(PrismaNeonMock).toHaveBeenCalled();
    expect(PrismaClientMock).toHaveBeenCalled();
    expect(mod.default).toEqual({ __prisma: true });

    process.env = envAnterior;
  });
});
