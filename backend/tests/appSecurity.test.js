import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/database/prisma.js", () => ({
  default: {
    usuario: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    conta: {},
    categoria: {},
    lancamento: {},
    orcamento: {},
  },
}));

describe("app security headers and CORS", () => {
  afterEach(() => {
    delete process.env.CORS_ORIGIN;
    vi.resetModules();
  });

  async function carregarApp() {
    const modulo = await import("../src/app.js");
    return modulo.default;
  }

  it("não deve expor o header X-Powered-By", async () => {
    const app = await carregarApp();

    const response = await request(app).get("/rota-inexistente");

    expect(response.headers["x-powered-by"]).toBeUndefined();
  });

  it("deve permitir a origem local padrão usada pelo frontend em desenvolvimento", async () => {
    const app = await carregarApp();

    const response = await request(app)
      .options("/auth/login")
      .set("Origin", "http://localhost:5173")
      .set("Access-Control-Request-Method", "POST");

    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:5173",
    );
  });

  it("deve permitir múltiplas origens configuradas em CORS_ORIGIN", async () => {
    process.env.CORS_ORIGIN =
      "https://app.spendsmart.test, https://admin.spendsmart.test";
    const app = await carregarApp();

    const response = await request(app)
      .options("/auth/login")
      .set("Origin", "https://admin.spendsmart.test")
      .set("Access-Control-Request-Method", "POST");

    expect(response.headers["access-control-allow-origin"]).toBe(
      "https://admin.spendsmart.test",
    );
  });

  it("não deve enviar Access-Control-Allow-Origin para origem não permitida", async () => {
    process.env.CORS_ORIGIN = "https://app.spendsmart.test";
    const app = await carregarApp();

    const response = await request(app)
      .options("/auth/login")
      .set("Origin", "https://malicioso.test")
      .set("Access-Control-Request-Method", "POST");

    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
