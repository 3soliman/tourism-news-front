import Sidebar from "@/components/sidebar/Sidebar";
import { fetchNews, getPopularNews } from "@/lib/api/news";

type PageWithSidebarProps = {
  children: React.ReactNode;
};

export default async function PageWithSidebar({ children }: PageWithSidebarProps) {
  const latest = await fetchNews({ per_page: 20 });
  const popular = getPopularNews(latest, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 lg:py-6">
      <div className="min-w-0">{children}</div>
      <div className="mt-10 border-t border-border pt-8">
        <Sidebar latest={latest} popular={popular} />
      </div>
    </div>
  );
}
