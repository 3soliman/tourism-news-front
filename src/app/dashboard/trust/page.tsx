import { ShieldCheck } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";

export default function DashboardTrustPage() {
  return (
    <SimpleDashboardPage
      title="صفحات الثقة"
      description="متابعة صفحات الشفافية المطلوبة للموقع الإخباري."
      icon={ShieldCheck}
      items={[
        "من نحن",
        "اتصل بنا",
        "هيئة التحرير",
        "سياسة التحرير",
        "سياسة الخصوصية",
        "شروط الاستخدام",
      ]}
    />
  );
}
