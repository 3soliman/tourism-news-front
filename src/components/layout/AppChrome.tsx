"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import SiteFrame from "@/components/layout/SiteFrame";
import SiteShell from "@/components/layout/SiteShell";

type AppChromeProps = {
  children: React.ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <SiteFrame>
      <SiteShell />
      <main className="bg-page-bg">{children}</main>
      <Footer />
    </SiteFrame>
  );
}
