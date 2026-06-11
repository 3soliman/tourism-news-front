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
    <aside className="space-y-5">
      <PopularTabs latest={latest} popular={popular} />
      <SocialFollowBox />
      <NewsletterBox />
      <NewsInPictures articles={latest} />
    </aside>
  );
}
