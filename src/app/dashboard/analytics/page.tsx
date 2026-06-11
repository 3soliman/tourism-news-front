import { BarChart3 } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";

export default function DashboardAnalyticsPage() {
  return (
    <SimpleDashboardPage
      title="التحليلات"
      description="لوحة مؤشرات الأداء، الزيارات، مصادر المرور، ونمو الأخبار."
      icon={BarChart3}
      items={[
        "الزيارات اليومية",
        "مصادر الزيارات",
        "أفضل الأخبار أداءً",
        "أفضل التصنيفات",
        "نمو Google News",
        "معدل القراءة",
      ]}
    />
  );
}
