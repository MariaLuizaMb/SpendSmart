import { beforeEach, describe, expect, it, vi } from "vitest";

let originalEnv;

describe("redisConnection", () => {
  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.restoreAllMocks();
    delete process.env.CORS_ORIGIN;
  });

  function withEnv(env, fn) {
    Object.assign(process.env, env);
    return fn();
  }

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("queuesAreDisabled deve retornar true quando NODE_ENV=test", async () => {
    process.env.NODE_ENV = "test";
    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.queuesAreDisabled()).toBe(true);
  });

  it("queuesAreDisabled deve retornar true quando QUEUE_DISABLED=true", async () => {
    process.env.NODE_ENV = "development";
    process.env.QUEUE_DISABLED = "true";

    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.queuesAreDisabled()).toBe(true);
  });

  it("getRedisConnectionOptions deve retornar null quando REDIS_URL não definido", async () => {
    delete process.env.REDIS_URL;
    process.env.NODE_ENV = "development";

    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.getRedisConnectionOptions()).toBeNull();
  });

  it("getRedisConnectionOptions deve retornar null e desativar filas quando REDIS_URL inválida", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    process.env.NODE_ENV = "development";
    process.env.REDIS_URL = "not-a-url";

    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.getRedisConnectionOptions()).toBeNull();
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("getRedisConnectionOptions deve retornar conexão sem tls quando protocolo é redis:", async () => {
    process.env.NODE_ENV = "development";
    process.env.REDIS_URL = "redis://user:pass@localhost:6380/2";

    const mod = await import("../src/queues/redisConnection.js");
    const opts = mod.getRedisConnectionOptions();

    expect(opts).toMatchObject({
      host: "localhost",
      port: 6380,
      username: "user",
      password: "pass",
      db: 2,
      tls: undefined,
    });
  });

  it("getRedisConnectionOptions deve retornar conexão com tls quando protocolo é rediss:", async () => {
    process.env.NODE_ENV = "development";
    process.env.QUEUE_PREFIX = "spendsmart";
    process.env.REDIS_URL = "rediss://@localhost:6380/0";

    const mod = await import("../src/queues/redisConnection.js");
    const opts = mod.getRedisConnectionOptions();

    expect(opts).toMatchObject({
      host: "localhost",
      port: 6380,
      db: 0,
    });
    expect(opts.tls).toEqual({});
  });

  it("shouldUseQueues deve retornar true quando getRedisConnectionOptions retorna objeto", async () => {
    process.env.NODE_ENV = "development";
    process.env.REDIS_URL = "redis://localhost:6379/0";

    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.shouldUseQueues()).toBe(true);
  });

  it("shouldUseQueues deve retornar false quando filas desativadas", async () => {
    process.env.NODE_ENV = "test";
    process.env.REDIS_URL = "redis://localhost:6379/0";

    const mod = await import("../src/queues/redisConnection.js");
    expect(mod.shouldUseQueues()).toBe(false);
  });
});
