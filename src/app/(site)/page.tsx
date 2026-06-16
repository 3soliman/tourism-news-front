import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import HeroNewsGrid from "@/components/news/HeroNewsGrid";
import NewsCard from "@/components/news/NewsCard";
import NewsSection from "@/components/news/NewsSection";
import SectionHeader from "@/components/news/SectionHeader";
import { fetchCategories } from "@/lib/api/categories";
import { isApiOnline } from "@/lib/api/connection";
import { fetchNews, fetchNewsByCategory } from "@/lib/api/news";

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

  const categorySections = await Promise.all(
    categories.map(async (category) => ({
      category,
      articles: await fetchNewsByCategory(category.slug, 4),
    })),
  );

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

      {categorySections.map(({ category, articles }) => (
        <NewsSection
          key={category.slug}
          title={category.label}
          description={category.description}
          articles={articles}
        />
      ))}
    </PageWithSidebar>
  );
}
