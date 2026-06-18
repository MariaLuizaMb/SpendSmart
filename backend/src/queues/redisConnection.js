const TRUE_VALUES = new Set(["1", "true", "yes", "sim"]);

function isTrue(value) {
  return TRUE_VALUES.has(String(value || "").trim().toLowerCase());
}

function isTestEnvironment() {
  return process.env.NODE_ENV === "test";
}

export function queuesAreDisabled() {
  return isTestEnvironment() || isTrue(process.env.QUEUE_DISABLED);
}

export function getQueuePrefix() {
  return process.env.QUEUE_PREFIX || "spendsmart";
}

export function getRedisConnectionOptions() {
  const redisUrl = process.env.REDIS_URL;

  if (queuesAreDisabled() || !redisUrl) {
    return null;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(redisUrl);
  } catch (error) {
    logQueueWarning("REDIS_URL inválida; filas desativadas", error);
    return null;
  }

  const useTls = parsedUrl.protocol === "rediss:";

  return {
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port || 6379),
    username: parsedUrl.username || undefined,
    password: parsedUrl.password || undefined,
    db: parsedUrl.pathname ? Number(parsedUrl.pathname.slice(1) || 0) : 0,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    tls: useTls ? {} : undefined,
  };
}

export function shouldUseQueues() {
  return Boolean(getRedisConnectionOptions());
}

export function logQueueWarning(message, error) {
  if (isTestEnvironment()) return;

  const details = error?.message ? ` ${error.message}` : "";
  console.warn(`[queues] ${message}.${details}`);
}
