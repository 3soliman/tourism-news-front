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
    <div className="mx-auto max-w-7xl px-4 py-5 lg:py-6">
      <div className="min-w-0">{children}</div>
      <div className="mt-10 border-t border-border pt-8">
        <Suspense fallback={<SidebarSkeleton />}>
          <SidebarPanel latestSeed={latestSeed} />
        </Suspense>
      </div>
    </div>
  );
}
