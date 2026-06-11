import { Network } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";

export default function DashboardSitemapsPage() {
  return (
    <SimpleDashboardPage
      title="خرائط الموقع"
      description="مراقبة sitemap العادي و News Sitemap وتحديثات الفهرسة."
      icon={Network}
      items={[
        "/sitemap.xml",
        "/news-sitemap.xml",
        "/robots.txt",
        "روابط الأخبار",
        "روابط التصنيفات",
        "روابط الكتّاب",
      ]}
    />
  );
}
