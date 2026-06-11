import type { NewsArticle } from "@/data/news";
import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";

type HeroNewsGridProps = {
  articles: NewsArticle[];
};

export default function HeroNewsGrid({ articles }: HeroNewsGridProps) {
  const [main, ...rest] = articles;

  if (!main) return null;

  return (
    <section className="grid gap-3 lg:grid-cols-2">
      <div className="lg:row-span-2">
        <FeaturedNewsCard article={main} size="large" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {rest.slice(0, 4).map((article) => (
          <FeaturedNewsCard key={article.id} article={article} size="small" />
        ))}
      </div>
    </section>
  );
}
