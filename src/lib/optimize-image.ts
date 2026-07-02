type OptimizeImageOptions = {
  width: number;
  quality?: number;
};

const NEXT_IMAGE_HOSTS = new Set(["ik.imagekit.io"]);

function getApiStorageHost(): string | null {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

  try {
    return new URL(apiUrl.replace(/\/api\/?$/, "")).hostname;
  } catch {
    return null;
  }
}

export function isNextImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    if (NEXT_IMAGE_HOSTS.has(parsed.hostname)) {
      return true;
    }

    const apiHost = getApiStorageHost();

    return (
      apiHost !== null &&
      parsed.hostname === apiHost &&
      parsed.pathname.startsWith("/storage/")
    );
  } catch {
    return false;
  }
}

export function optimizeImageUrl(
  url: string,
  { width, quality = 75 }: OptimizeImageOptions,
): string {
  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\/ik\.imagekit\.io\//i.test(trimmed)) {
    const transform = `tr:w-${width},q-${quality},f-auto`;

    if (/\/tr:[^/]+\//i.test(trimmed)) {
      return trimmed.replace(/\/tr:[^/]+\//i, `/${transform}/`);
    }

    const match = trimmed.match(/^(https?:\/\/ik\.imagekit\.io\/[^/]+)(\/.*)$/i);

    if (match) {
      return `${match[1]}/${transform}${match[2]}`;
    }

    return trimmed;
  }

  if (/images\.unsplash\.com/i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      parsed.searchParams.set("w", String(width));
      parsed.searchParams.set("q", String(quality));
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      return parsed.toString();
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

export const IMAGE_WIDTHS = {
  header: 720,
  headerDesktop: 1080,
  hero: 720,
  card: 480,
  thumb: 240,
  avatar: 96,
  sidebar: 200,
} as const;
