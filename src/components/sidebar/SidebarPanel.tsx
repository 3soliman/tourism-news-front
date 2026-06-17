import Sidebar from "@/components/sidebar/Sidebar";
import { fetchNews, fetchPopularNews } from "@/lib/api/news";
import type { NewsArticle } from "@/types";

type SidebarPanelProps = {
  latestSeed?: NewsArticle[];
};

export default async function SidebarPanel({ latestSeed }: SidebarPanelProps) {
  const [latest, popular] = await Promise.all([
    latestSeed ? Promise.resolve(latestSeed) : fetchNews({ per_page: 20 }),
    fetchPopularNews(5),
  ]);

  return <Sidebar latest={latest} popular={popular} />;
}
