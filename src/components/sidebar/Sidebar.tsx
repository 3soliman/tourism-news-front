import type { NewsArticle } from "@/data/news";
import PopularTabs from "@/components/sidebar/PopularTabs";
import SocialFollowBox from "@/components/sidebar/SocialFollowBox";
import NewsletterBox from "@/components/sidebar/NewsletterBox";
import NewsInPictures from "@/components/sidebar/NewsInPictures";

type SidebarProps = {
  latest: NewsArticle[];
  popular: NewsArticle[];
};

export default function Sidebar({ latest, popular }: SidebarProps) {
  return (
    <aside className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-start">
      <PopularTabs latest={latest} popular={popular} />
      <SocialFollowBox />
      <NewsletterBox />
      <NewsInPictures articles={latest} />
    </aside>
  );
}
