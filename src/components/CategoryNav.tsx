import Link from "next/link";
import type { Category } from "@/types";

type CategoryNavProps = {
  categories: Category[];
  activeSlug?: string;
  countrySlug?: string;
};

function buildCategoryHref(categorySlug: string, countrySlug?: string) {
  if (countrySlug) {
    return `/travel-news/${categorySlug}?country=${countrySlug}`;
  }
  return `/travel-news/${categorySlug}`;
}

export default function CategoryNav({
  categories,
  activeSlug,
  countrySlug,
}: CategoryNavProps) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
      <Link
        href={countrySlug ? `/travel-news?country=${countrySlug}` : "/travel-news"}
        className={`rounded px-4 py-2 text-sm font-bold transition ${
          !activeSlug
            ? "bg-primary text-white"
            : "bg-surface text-text-dark ring-1 ring-border hover:text-primary"
        }`}
      >
        الكل
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={buildCategoryHref(category.slug, countrySlug)}
          className={`rounded px-4 py-2 text-sm font-bold transition ${
            activeSlug === category.slug
              ? "bg-primary text-white"
              : "bg-surface text-text-dark ring-1 ring-border hover:text-primary"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
