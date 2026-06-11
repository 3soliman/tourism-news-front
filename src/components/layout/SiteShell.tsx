import BreakingNewsBar from "@/components/layout/BreakingNewsBar";
import MainNav from "@/components/layout/MainNav";
import SiteHeader from "@/components/layout/SiteHeader";
import TopBar from "@/components/layout/TopBar";

export default function SiteShell() {
  return (
    <header>
      <TopBar />
      <SiteHeader />

      <div className="sticky top-0 z-50 shadow-xl shadow-black/15">
        <MainNav />
        <BreakingNewsBar />
      </div>
    </header>
  );
}
