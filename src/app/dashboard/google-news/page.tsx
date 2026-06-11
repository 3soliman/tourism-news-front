import { BadgeCheck } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";

export default function DashboardGoogleNewsPage() {
  return (
    <SimpleDashboardPage
      title="Google News"
      description="متابعة أهلية الأخبار، Publisher Center، وحالة ظهور الأخبار في Google News."
      icon={BadgeCheck}
      items={[
        "حالة الناشر في Google News",
        "معرّف الناشر Publisher ID",
        "رابط قناة Google News",
        "آخر مزامنة للمحتوى",
        "الأخبار المؤهلة",
        "الأخبار قيد المراجعة",
      ]}
    />
  );
}
