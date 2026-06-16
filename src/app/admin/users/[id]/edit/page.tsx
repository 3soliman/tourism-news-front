import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import UserForm from "@/components/admin/UserForm";
import { loadAdminRoles, loadAdminUserById } from "@/lib/api/admin";
import { toManagedUserFormInput } from "@/lib/api/admin-users";

export const dynamic = "force-dynamic";

type AdminUserEditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminUserEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadAdminUserById(Number(id));

  if (result.status !== "success") {
    return { title: "تعديل المستخدم" };
  }

  return { title: `تعديل: ${result.data.name}` };
}

export default async function AdminUserEditPage({ params }: AdminUserEditPageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    notFound();
  }

  const [userResult, rolesResult] = await Promise.all([
    loadAdminUserById(userId),
    loadAdminRoles(),
  ]);

  if (userResult.status === "error" && userResult.message === "not-found") {
    notFound();
  }

  if (userResult.status === "offline" || rolesResult.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (userResult.status !== "success" || rolesResult.status !== "success") {
    notFound();
  }

  return (
    <UserForm
      mode="edit"
      userId={userId}
      initial={toManagedUserFormInput(userResult.data)}
      roles={rolesResult.data}
    />
  );
}
