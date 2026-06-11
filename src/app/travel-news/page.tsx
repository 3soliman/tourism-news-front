import type { Metadata } from "next";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import CategoryNav from "@/components/CategoryNav";
import CountryFilterNav from "@/components/CountryFilterNav";
import NewsCard from "@/components/news/NewsCard";
import { news } from "@/data/news";
import { getCountryBySlug } from "@/data/countries";

export const metadata: Metadata = {
  title: "أخبار السياحة",
  description:
    "أرشيف أخبار السياحة والسفر: الطيران، التأشيرات، الفنادق، الوجهات، والسفر الدولي للمسافرين العرب.",
};

type TravelNewsPageProps = {
  searchParams: Promise<{ country?: string }>;
};

export default async function TravelNewsPage({ searchParams }: TravelNewsPageProps) {
  const { country: countrySlug } = await searchParams;
  const activeCountry = countrySlug ? getCountryBySlug(countrySlug) : undefined;
  const filteredNews = activeCountry
    ? news.filter((article) => article.countrySlug === activeCountry.slug)
    : news;

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
      <CountryFilterNav activeSlug={activeCountry?.slug} />

      {activeCountry ? (
        <div className="mb-5 rounded-sm border border-[#cfe8f4] bg-[#eaf6fb] p-4 text-[#244958]">
          <p className="text-sm font-bold text-[#53657f]">النتائج الحالية</p>
          <h2 className="mt-1 text-2xl font-black">
            {activeCountry.flag} أخبار السياحة المرتبطة بـ {activeCountry.name}
          </h2>
          <p className="mt-2 text-sm font-bold">
            {filteredNews.length} خبر في هذا الفلتر
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} article={article} variant="vertical" />
        ))}
      </div>

      {filteredNews.length === 0 ? (
        <div className="rounded-sm border border-border bg-white p-6 text-center text-text-muted">
          لا توجد أخبار مرتبطة بهذه الدولة حاليًا.
        </div>
      ) : null}
    </PageWithSidebar>
  );
}
