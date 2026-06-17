export function buildFinancialJobPayload({
  userId,
  eventType,
  entityType,
  entityId,
  occurredAt = new Date().toISOString(),
}) {
  return {
    userId,
    eventType,
    entityType,
    entityId,
    occurredAt,
  };
}

export function validateFinancialJobPayload(payload) {
  return Boolean(
    payload?.userId &&
      payload?.eventType &&
      payload?.entityType &&
      payload?.entityId &&
      payload?.occurredAt,
  );
}
