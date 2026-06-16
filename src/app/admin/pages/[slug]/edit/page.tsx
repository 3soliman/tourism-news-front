import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import PageForm from "@/components/admin/PageForm";
import { loadAdminPageBySlug } from "@/lib/api/admin";
import { toAdminPageFormInput } from "@/lib/api/admin-pages";
import { TRUST_PAGE_ROUTES } from "@/lib/api/pages";

export const dynamic = "force-dynamic";

type AdminPageEditPageProps = {
  params: Promise<{ slug: string }>;
};

const allowedSlugs = new Set<string>(TRUST_PAGE_ROUTES.map((page) => page.slug));

export async function generateMetadata({
  params,
}: AdminPageEditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadAdminPageBySlug(slug);

  if (result.status !== "success") {
    return { title: "تعديل الصفحة" };
  }

  return { title: `تعديل: ${result.data.title}` };
}

export default async function AdminPageEditPage({ params }: AdminPageEditPageProps) {
  const { slug } = await params;

  if (!allowedSlugs.has(slug)) {
    notFound();
  }

  const result = await loadAdminPageBySlug(slug);

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
    <PageForm slug={slug} initial={toAdminPageFormInput(result.data)} />
  );
}
