import { Suspense } from "react";
import BreakingNewsBar from "@/components/layout/BreakingNewsBar";
import HeaderImagePreload from "@/components/layout/HeaderImagePreload";
import MainNav from "@/components/layout/MainNav";
import SiteHeader from "@/components/layout/SiteHeader";
import TopBar from "@/components/layout/TopBar";
import type { Category, Country, NewsArticle } from "@/types";

type SiteShellProps = {
  categories: Category[];
  countries: Country[];
  breakingNews: NewsArticle[];
  headerImages: string[];
};

export default function SiteShell({
  categories,
  countries,
  breakingNews,
  headerImages,
}: SiteShellProps) {
  return (
    <header>
      <HeaderImagePreload src={headerImages[0]} />
      <TopBar />
      <Suspense
        fallback={
          <div
            className="min-h-[72px] bg-primary md:min-h-[520px]"
            aria-hidden
          />
        }
      >
        <SiteHeader headerImages={headerImages} />
      </Suspense>

      <div className="sticky top-0 z-50 shadow-xl shadow-black/15">
        <MainNav categories={categories} countries={countries} />
        <BreakingNewsBar articles={breakingNews} />
      </div>
    </header>
  );
}
