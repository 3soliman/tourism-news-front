import type { Category } from "@/types";

export function getCountryFilterBasePath(
  pathname: string,
  categories: Category[],
): string {
  if (!pathname.startsWith("/travel-news")) {
    return "/travel-news";
  }

  if (pathname === "/travel-news") {
    return "/travel-news";
  }

  const slug = pathname.replace("/travel-news/", "").split("/")[0];
  const isCategory = categories.some((category) => category.slug === slug);

  return isCategory ? `/travel-news/${slug}` : "/travel-news";
}

export function buildCountryFilterHref(
  countrySlug: string,
  pathname: string,
  categories: Category[],
  searchParams: URLSearchParams,
): string {
  const basePath = getCountryFilterBasePath(pathname, categories);
  const params = new URLSearchParams(searchParams.toString());
  params.set("country", countrySlug);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function buildAllCountriesFilterHref(
  pathname: string,
  categories: Category[],
  searchParams: URLSearchParams,
): string {
  const basePath = getCountryFilterBasePath(pathname, categories);
  const params = new URLSearchParams(searchParams.toString());
  params.delete("country");
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
