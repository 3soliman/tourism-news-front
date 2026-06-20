import { Suspense } from "react";
import SidebarPanel from "@/components/sidebar/SidebarPanel";
import SidebarSkeleton from "@/components/sidebar/SidebarSkeleton";
import type { NewsArticle } from "@/types";

type PageWithSidebarProps = {
  children: React.ReactNode;
  latestSeed?: NewsArticle[];
};

export default function PageWithSidebar({
  children,
  latestSeed,
}: PageWithSidebarProps) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8 lg:py-8">
      <div className="min-w-0 space-y-6">{children}</div>
      <div className="min-w-0 border-t border-border/60 pt-6 lg:sticky lg:top-28 lg:border-t-0 lg:pt-0">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarPanel latestSeed={latestSeed} />
        </Suspense>
      </div>
    </div>
  );
}
