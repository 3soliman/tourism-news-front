import Link from "next/link";
import { categories } from "@/data/categories";

type CategoryNavProps = {
  activeSlug?: string;
};

export default function CategoryNav({ activeSlug }: CategoryNavProps) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
      <Link
        href="/travel-news"
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
          href={`/travel-news/category/${category.slug}`}
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
