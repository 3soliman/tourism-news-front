import type { Metadata } from "next";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import CategoryForm from "@/components/admin/CategoryForm";
import type { AdminCategoryFormInput } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة تصنيف",
};

const emptyForm: AdminCategoryFormInput = {
  name: "",
  slug: "",
  description: "",
  sort_order: 0,
  is_active: true,
  seo_title: "",
  seo_description: "",
};

export default function AdminCategoryCreatePage() {
  return <CategoryForm mode="create" initial={emptyForm} />;
}
