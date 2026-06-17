import ApiOfflineBanner from "@/components/ApiOfflineBanner";
import Footer from "@/components/layout/Footer";
import SiteFrame from "@/components/layout/SiteFrame";
import SiteShell from "@/components/layout/SiteShell";
import { fetchCategories } from "@/lib/api/categories";
import { fetchCountries } from "@/lib/api/countries";
import { isApiOnline } from "@/lib/api/connection";
import { fetchNews } from "@/lib/api/news";
import { resolveMediaUrl } from "@/lib/media-url";
import { IMAGE_WIDTHS, optimizeImageUrl } from "@/lib/optimize-image";
import { getSiteConfig } from "@/lib/site";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const [categories, countries, breakingNews, siteConfig] = await Promise.all([
    fetchCategories(),
    fetchCountries(),
    fetchNews({ per_page: 10 }),
    getSiteConfig(),
  ]);

  const rawHeaderImages = siteConfig.backgroundImages
    .map((image) => resolveMediaUrl(image))
    .filter(Boolean);

  const headerImages = rawHeaderImages.map((image) =>
    optimizeImageUrl(image, {
      width: IMAGE_WIDTHS.header,
      quality: 70,
    }),
  );

  return (
    <SiteFrame>
      <SiteShell
        categories={categories}
        countries={countries}
        breakingNews={breakingNews}
        headerImages={headerImages}
        headerPreloadSrc={rawHeaderImages[0]}
      />
      {!isApiOnline() ? <ApiOfflineBanner /> : null}
      <main className="bg-page-bg">{children}</main>
      <Footer categories={categories} />
    </SiteFrame>
  );
}
