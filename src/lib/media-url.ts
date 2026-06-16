const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api"
).replace(/\/api\/?$/, "");

export function resolveMediaUrl(url?: string | null): string {
  if (!url) {
    return "";
  }

  if (url.startsWith("/storage/")) {
    return `${API_ORIGIN}${url}`;
  }

  if (/^https?:\/\/localhost(?::\d+)?\//i.test(url)) {
    return url.replace(/^https?:\/\/localhost(?::\d+)?/i, API_ORIGIN);
  }

  return url;
}
