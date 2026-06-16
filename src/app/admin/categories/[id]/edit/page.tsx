import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import CategoryForm from "@/components/admin/CategoryForm";
import { loadAdminCategoryById } from "@/lib/api/admin";
import { toAdminCategoryFormInput } from "@/lib/api/admin-categories";

export const dynamic = "force-dynamic";

type AdminCategoryEditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminCategoryEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadAdminCategoryById(Number(id));

  if (result.status !== "success") {
    return { title: "تعديل التصنيف" };
  }

  return { title: `تعديل: ${result.data.label}` };
}

export default async function AdminCategoryEditPage({ params }: AdminCategoryEditPageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  if (Number.isNaN(categoryId)) {
    notFound();
  }

  const result = await loadAdminCategoryById(categoryId);

  if (result.status === "error" && result.message === "not-found") {
    notFound();
  }

  if (result.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (result.status !== "success") {
    notFound();
  }

  return (
    <CategoryForm
      mode="edit"
      categoryId={categoryId}
      initial={toAdminCategoryFormInput(result.data)}
    />
  );
}
