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
    <nav className="mb-6 flex flex-wrap gap-2 rounded-xl border border-border/60 bg-white p-2 shadow-sm">
      <Link
        href={countrySlug ? `/travel-news?country=${countrySlug}` : "/travel-news"}
        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
          !activeSlug
            ? "bg-primary text-white shadow-sm shadow-primary/15"
            : "text-text-dark hover:bg-primary-50 hover:text-primary"
        }`}
      >
        الكل
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={buildCategoryHref(category.slug, countrySlug)}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
            activeSlug === category.slug
              ? "bg-primary text-white shadow-sm shadow-primary/15"
              : "text-text-dark hover:bg-primary-50 hover:text-primary"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
