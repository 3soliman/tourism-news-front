import type { NewsArticle } from "@/types";
import PopularTabs from "@/components/sidebar/PopularTabs";
import SocialFollowBox from "@/components/sidebar/SocialFollowBox";
import NewsInPictures from "@/components/sidebar/NewsInPictures";

type SidebarProps = {
  latest: NewsArticle[];
  popular: NewsArticle[];
};

export default function Sidebar({ latest, popular }: SidebarProps) {
  return (
    <aside className="grid gap-5 md:grid-cols-2 lg:grid-cols-1 lg:items-start">
      <PopularTabs latest={latest} popular={popular} />
      <SocialFollowBox />
      <NewsInPictures articles={latest} />
    </aside>
  );
}
