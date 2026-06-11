import BreakingNewsBar from "@/components/layout/BreakingNewsBar";
import MainNav from "@/components/layout/MainNav";
import SiteHeader from "@/components/layout/SiteHeader";
import TopBar from "@/components/layout/TopBar";

export default function SiteShell() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <BreakingNewsBar />
      <SiteHeader />
      <MainNav />
    </header>
  );
}
