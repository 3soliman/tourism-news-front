import { LayoutGrid } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";
import { categories } from "@/data/categories";

export default function DashboardCategoriesPage() {
  return (
    <SimpleDashboardPage
      title="التصنيفات"
      description="إدارة تصنيفات أخبار السياحة وربطها بهيكل الموقع النهائي."
      icon={LayoutGrid}
      items={categories.map((category) => category.label)}
    />
  );
}
