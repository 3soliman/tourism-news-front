import PageWithSidebar from "@/components/layout/PageWithSidebar";
import HeroNewsGrid from "@/components/news/HeroNewsGrid";
import NewsCard from "@/components/news/NewsCard";
import NewsSection from "@/components/news/NewsSection";
import SectionHeader from "@/components/news/SectionHeader";
import { categories } from "@/data/categories";
import { news, getNewsByCategory } from "@/data/news";
import { offers } from "@/data/offers";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

export default function HomePage() {
  const heroNews = news.slice(0, 5);
  const latestNews = news.slice(0, 6);

  return (
    <PageWithSidebar>
      <HeroNewsGrid articles={heroNews} />

      <section className="mt-9 rounded-sm bg-white p-4 shadow-sm ring-1 ring-border/80 sm:p-5">
        <SectionHeader title="أحدث الأخبار" moreHref="/travel-news" />
        <div className="grid gap-x-6 gap-y-1 md:grid-cols-2">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </section>

      {categories.map((category) => (
        <NewsSection
          key={category.slug}
          title={category.label}
          description={category.description}
          articles={getNewsByCategory(category.slug)}
        />
      ))}

      <section className="mb-6 rounded-sm bg-[#eaf6fb] p-4 text-[#244958] shadow-sm ring-1 ring-[#cfe8f4] sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#cfe8f4] pb-3">
          <h2 className="relative pr-4 text-2xl font-black text-[#244958] before:absolute before:right-0 before:top-1 before:h-7 before:w-1.5 before:rounded-sm before:bg-breaking">
            عروض سياحية
          </h2>
          <Link
            href="/offers"
            className="shrink-0 rounded-sm border border-primary/25 bg-white px-3 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            عرض المزيد ←
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group overflow-hidden rounded-sm bg-white text-text-dark shadow-xl shadow-primary-dark/10"
            >
              <div className="image-shine relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-sm bg-breaking px-3 py-1 text-xs font-black text-white">
                  {offer.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-black leading-7 text-text-dark">{offer.title}</h3>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} />
                    {offer.destination}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {offer.duration}
                  </span>
                </div>
                <p className="mt-4 text-lg font-black text-primary">
                  {offer.price}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 text-left">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-black text-white transition hover:bg-primary-hover"
          >
            عرض جميع العروض
            <ArrowLeft size={16} />
          </Link>
        </div>
      </section>
    </PageWithSidebar>
  );
}
