import PageWithSidebar from "@/components/layout/PageWithSidebar";
import HeroNewsGrid from "@/components/news/HeroNewsGrid";
import NewsCard from "@/components/news/NewsCard";
import NewsSection from "@/components/news/NewsSection";
import SectionHeader from "@/components/news/SectionHeader";
import { categories } from "@/data/categories";
import { news, getNewsByCategory } from "@/data/news";
import { offers } from "@/data/offers";
import Link from "next/link";

export default function HomePage() {
  const heroNews = news.slice(0, 5);
  const latestNews = news.slice(0, 6);

  return (
    <PageWithSidebar>
      <HeroNewsGrid articles={heroNews} />

      <section className="mt-10">
        <SectionHeader title="أحدث الأخبار" moreHref="/travel-news" />
        <div className="grid gap-4 md:grid-cols-2">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </section>

      {categories.map((category) => (
        <NewsSection
          key={category.slug}
          title={category.label}
          articles={getNewsByCategory(category.slug)}
          moreHref={`/travel-news/category/${category.slug}`}
        />
      ))}

      <section className="mb-6">
        <SectionHeader title="عروض سياحية" moreHref="/offers" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded border border-border bg-surface"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-accent">
                  {offer.badge}
                </span>
                <h3 className="mt-2 font-bold text-text-dark">{offer.title}</h3>
                <p className="mt-1 text-sm font-black text-primary">
                  {offer.price}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 text-left">
          <Link
            href="/offers"
            className="text-sm font-bold text-primary hover:text-primary-dark"
          >
            عرض جميع العروض ←
          </Link>
        </div>
      </section>
    </PageWithSidebar>
  );
}
