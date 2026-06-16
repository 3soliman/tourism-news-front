const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api"
).replace(/\/api\/?$/, "");

function extractStoragePath(url: string): string | null {
  const trimmed = url.trim();

  if (trimmed.startsWith("/storage/")) {
    return trimmed;
  }

  if (trimmed.startsWith("storage/")) {
    return `/${trimmed}`;
  }

  const match = trimmed.match(/\/storage\/[^\s"'?#]+/i);

  return match?.[0] ?? null;
}

export function toStoredMediaPath(url?: string | null): string {
  if (!url) {
    return "";
  }

  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  const storagePath = extractStoragePath(trimmed);

  if (storagePath) {
    return storagePath;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return trimmed;
}

export function resolveMediaUrl(url?: string | null): string {
  if (!url) {
    return "";
  }

  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  const storagePath = extractStoragePath(trimmed);

  if (storagePath) {
    return `${API_ORIGIN}${storagePath}`;
  }

  return trimmed;
}

export function resolveMediaUrlsInHtml(html: string): string {
  if (!html) {
    return "";
  }

  return html.replace(
    /(<(?:img|source)[^>]+src=["'])([^"']+)(["'])/gi,
    (_match, prefix: string, src: string, suffix: string) =>
      `${prefix}${resolveMediaUrl(src)}${suffix}`,
  );
}

export function normalizeMediaUrlsInHtml(html: string): string {
  if (!html) {
    return "";
  }

  return html.replace(
    /(<(?:img|source)[^>]+src=["'])([^"']+)(["'])/gi,
    (_match, prefix: string, src: string, suffix: string) =>
      `${prefix}${toStoredMediaPath(src)}${suffix}`,
  );
}
