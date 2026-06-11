import Sidebar from "@/components/sidebar/Sidebar";
import { news, getPopularNews } from "@/data/news";

type PageWithSidebarProps = {
  children: React.ReactNode;
};

export default function PageWithSidebar({ children }: PageWithSidebarProps) {
  const latest = news;
  const popular = getPopularNews(5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:py-10">
      <div className="min-w-0">{children}</div>
      <div className="mt-10 border-t border-border pt-8">
        <Sidebar latest={latest} popular={popular} />
      </div>
    </div>
  );
}
