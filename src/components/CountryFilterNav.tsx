import Link from "next/link";
import { countries } from "@/data/countries";

type CountryFilterNavProps = {
  activeSlug?: string;
};

export default function CountryFilterNav({ activeSlug }: CountryFilterNavProps) {
  return (
    <section className="mb-6 rounded-sm border border-border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-border pb-3">
        <h2 className="text-lg font-black text-text-dark">تصفية الأخبار حسب الدولة</h2>
        <Link
          href="/travel-news"
          className={`rounded-sm px-3 py-2 text-sm font-black transition ${
            !activeSlug
              ? "bg-primary text-white"
              : "bg-surface-alt text-text-dark hover:text-primary"
          }`}
        >
          كل الدول
        </Link>
      </div>
      <nav className="flex flex-wrap gap-2">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/travel-news?country=${country.slug}`}
            className={`inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-bold ring-1 ring-border transition ${
              activeSlug === country.slug
                ? "bg-primary text-white"
                : "bg-surface text-text-dark hover:text-primary"
            }`}
          >
            <span>{country.flag}</span>
            {country.name}
          </Link>
        ))}
      </nav>
    </section>
  );
}
