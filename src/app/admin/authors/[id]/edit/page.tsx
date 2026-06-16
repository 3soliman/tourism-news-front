import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import AuthorForm from "@/components/admin/AuthorForm";
import { loadAdminAuthorById } from "@/lib/api/admin";
import { toAdminAuthorFormInput } from "@/lib/api/admin-authors";

export const dynamic = "force-dynamic";

type AdminAuthorEditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminAuthorEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadAdminAuthorById(Number(id));

  if (result.status !== "success") {
    return { title: "تعديل الكاتب" };
  }

  return { title: `تعديل: ${result.data.name}` };
}

export default async function AdminAuthorEditPage({ params }: AdminAuthorEditPageProps) {
  const { id } = await params;
  const authorId = Number(id);

  if (Number.isNaN(authorId)) {
    notFound();
  }

  const result = await loadAdminAuthorById(authorId);

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
    <AuthorForm
      mode="edit"
      authorId={authorId}
      initial={toAdminAuthorFormInput(result.data)}
    />
  );
}
