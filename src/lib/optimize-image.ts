type OptimizeImageOptions = {
  width: number;
  quality?: number;
};

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
  header: 1280,
  hero: 900,
  card: 640,
  thumb: 320,
  avatar: 96,
  sidebar: 240,
} as const;
