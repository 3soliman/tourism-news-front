import type { Metadata } from "next";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import CategoryNav from "@/components/CategoryNav";
import NewsCard from "@/components/news/NewsCard";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "أخبار السياحة",
  description:
    "أرشيف أخبار السياحة والسفر: الطيران، التأشيرات، الفنادق، الوجهات، والسفر الدولي للمسافرين العرب.",
};

export default function TravelNewsPage() {
  return (
    <PageWithSidebar>
      <header className="mb-6">
        <h1 className="border-b-2 border-primary pb-2 text-3xl font-black text-text-dark">
          أخبار السياحة
        </h1>
        <p className="mt-3 text-text-muted">
          أرشيف الأخبار والتغطيات السياحية مع تصنيفات واضحة وتحديثات مستمرة
          للمسافرين العرب.
        </p>
      </header>

      <CategoryNav />

      <div className="grid gap-4 sm:grid-cols-2">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} variant="vertical" />
        ))}
      </div>
    </PageWithSidebar>
  );
}
