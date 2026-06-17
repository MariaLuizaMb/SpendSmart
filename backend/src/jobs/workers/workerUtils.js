import { pathToFileURL } from "url";

export function isMainModule(importMetaUrl) {
  return Boolean(
    process.argv[1] && importMetaUrl === pathToFileURL(process.argv[1]).href,
  );
}

export function getCurrentAnalyticsPeriod(date = new Date()) {
  return {
    mes: date.getMonth() + 1,
    ano: date.getFullYear(),
  };
}

export function getJobPayload(job) {
  return job?.data || job || {};
}
