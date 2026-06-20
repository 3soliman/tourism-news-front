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
  headerPreloadSrc?: string;
};

export default function SiteShell({
  categories,
  countries,
  breakingNews,
  headerImages,
  headerPreloadSrc,
}: SiteShellProps) {
  return (
    <header>
      <HeaderImagePreload src={headerPreloadSrc ?? headerImages[0]} />
      <TopBar />
      <SiteHeader headerImages={headerImages} />

      <div className="sticky top-0 z-50 shadow-lg shadow-primary-dark/8">
        <MainNav categories={categories} countries={countries} />
        <BreakingNewsBar articles={breakingNews} />
      </div>
    </header>
  );
}
