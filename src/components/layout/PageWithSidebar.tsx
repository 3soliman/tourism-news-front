import Sidebar from "@/components/sidebar/Sidebar";
import { news, getPopularNews } from "@/data/news";

type PageWithSidebarProps = {
  children: React.ReactNode;
};

export default function PageWithSidebar({ children }: PageWithSidebarProps) {
  const latest = news;
  const popular = getPopularNews(5);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0">{children}</div>
      <Sidebar latest={latest} popular={popular} />
    </div>
  );
}
