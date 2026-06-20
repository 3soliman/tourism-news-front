export function normalizeRedirectPath(path: string): string {
  const trimmed = path.trim();

  if (!trimmed) {
    return "/";
  }

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const parsed = new URL(trimmed);
      const normalized = parsed.pathname || "/";

      return parsed.search ? `${normalized}${parsed.search}` : normalized;
    }
  } catch {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }

  return withLeadingSlash;
}

export function articleRedirectPath(slug: string): string {
  return normalizeRedirectPath(`/travel-news/${slug}`);
}

export function isExternalRedirectPath(path: string): boolean {
  return /^https?:\/\//i.test(path.trim());
}
