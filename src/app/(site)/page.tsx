import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import HeroNewsGrid from "@/components/news/HeroNewsGrid";
import NewsCard from "@/components/news/NewsCard";
import NewsSection from "@/components/news/NewsSection";
import SectionHeader from "@/components/news/SectionHeader";
import { fetchCategories } from "@/lib/api/categories";
import { isApiOnline } from "@/lib/api/connection";
import { fetchNews } from "@/lib/api/news";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, allNews] = await Promise.all([
    fetchCategories(),
    fetchNews({ per_page: 50 }),
  ]);

  if (!isApiOnline()) {
    return (
      <PageWithSidebar>
        <ApiOfflineMessage />
      </PageWithSidebar>
    );
  }

  const heroNews = allNews.slice(0, 5);
  const latestNews = allNews.slice(0, 6);
  const sidebarLatest = allNews.slice(0, 20);

  const categorySections = categories.map((category) => ({
    category,
    articles: allNews
      .filter((article) => article.categorySlug === category.slug)
      .slice(0, 4),
  }));

  return (
    <PageWithSidebar latestSeed={sidebarLatest}>
      <div className="animate-fade-in-up stagger-1">
        <HeroNewsGrid articles={heroNews} />
      </div>

      <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/50 sm:p-6 animate-fade-in-up stagger-2">
        <SectionHeader title="أحدث الأخبار" moreHref="/travel-news" />
        <div className="grid gap-4 md:grid-cols-2">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </section>

      {categorySections.map(({ category, articles }, i) => (
        <div key={category.slug} className={`animate-fade-in-up stagger-${Math.min(i + 3, 5)}`}>
          <NewsSection
            title={category.label}
            description={category.description}
            articles={articles}
          />
        </div>
      ))}
    </PageWithSidebar>
  );
}
