import { Users } from "lucide-react";
import SimpleDashboardPage from "@/components/dashboard/SimpleDashboardPage";
import { authors } from "@/data/authors";

export default function DashboardAuthorsPage() {
  return (
    <SimpleDashboardPage
      title="الكتّاب"
      description="إدارة الكتّاب، الأدوار، صفحات المؤلفين، وربط الأخبار بأصحابها."
      icon={Users}
      items={authors.map((author) => `${author.name} - ${author.role}`)}
    />
  );
}
