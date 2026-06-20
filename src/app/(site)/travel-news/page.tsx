import type { Metadata } from "next";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import NewsCard from "@/components/news/NewsCard";
import TravelNewsFilters, {
  getTravelNewsFiltersData,
} from "@/components/TravelNewsFilters";
import { isApiOnline } from "@/lib/api/connection";
import { fetchNews } from "@/lib/api/news";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "أخبار السياحة",
  description:
    "أرشيف أخبار السياحة والسفر: الطيران، التأشيرات، الفنادق، الوجهات، والسفر الدولي للمسافرين العرب.",
};

type TravelNewsPageProps = {
  searchParams: Promise<{ country?: string; q?: string }>;
};

export default async function TravelNewsPage({
  searchParams,
}: TravelNewsPageProps) {
  const { country: countrySlug, q } = await searchParams;
  const searchQuery = q?.trim() || undefined;

  const [{ activeCountry }, filteredNews] = await Promise.all([
    getTravelNewsFiltersData(countrySlug),
    fetchNews({
      per_page: 100,
      ...(searchQuery ? { search: searchQuery } : {}),
      ...(countrySlug ? { country: countrySlug } : {}),
    }),
  ]);

  if (!isApiOnline()) {
    return (
      <PageWithSidebar>
        <header className="mb-6">
          <h1 className="border-b-2 border-primary pb-2 text-3xl font-black text-text-dark">
            أخبار السياحة
          </h1>
        </header>
        <ApiOfflineMessage />
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar latestSeed={filteredNews.slice(0, 20)}>
      <header className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/50">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">
          <Newspaper size={16} />
          أرشيف الأخبار
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-text-dark">
          {searchQuery ? "نتائج البحث" : "أخبار السياحة"}
        </h1>
        <p className="mt-3 max-w-3xl leading-8 text-text-muted">
          {searchQuery
            ? `عرض الأخبار المطابقة لـ "${searchQuery}"`
            : "أرشيف الأخبار والتغطيات السياحية مع تصنيفات واضحة وتحديثات مستمرة للمسافرين العرب."}
        </p>
      </header>

      <TravelNewsFilters activeCountrySlug={countrySlug} />

      {searchQuery ? (
        <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50 p-5">
          <p className="text-sm font-bold text-text-muted">البحث</p>
          <h2 className="mt-1 text-2xl font-black text-text-dark">
            &ldquo;{searchQuery}&rdquo;
          </h2>
          <p className="mt-2 text-sm font-bold text-text-muted">
            {filteredNews.length} نتيجة
          </p>
        </div>
      ) : null}

      {!searchQuery && activeCountry ? (
        <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50 p-5">
          <p className="text-sm font-bold text-text-muted">النتائج الحالية</p>
          <h2 className="mt-1 text-2xl font-black text-text-dark">
            {activeCountry.flag} أخبار السياحة المرتبطة بـ {activeCountry.name}
          </h2>
          <p className="mt-2 text-sm font-bold text-text-muted">
            {filteredNews.length} خبر في هذا الفلتر
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} article={article} variant="vertical" />
        ))}
      </div>

      {filteredNews.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-white p-10 text-center">
          <p className="text-text-muted">
            {searchQuery
              ? `لا توجد نتائج للبحث عن "${searchQuery}".`
              : "لا توجد أخبار مرتبطة بهذه الدولة حاليًا."}
          </p>
        </div>
      ) : null}
    </PageWithSidebar>
  );
}
