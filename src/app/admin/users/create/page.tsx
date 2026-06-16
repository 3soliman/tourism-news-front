import type { Metadata } from "next";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import UserForm from "@/components/admin/UserForm";
import { loadAdminRoles } from "@/lib/api/admin";
import type { ManagedUserFormInput } from "@/lib/api/admin-users";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة مستخدم",
};

const emptyForm: ManagedUserFormInput = {
  name: "",
  public_name: "",
  email: "",
  password: "",
  status: "active",
  slug: "",
  author_title: "",
  bio: "",
  image: "",
  role_ids: [],
};

export default async function AdminUserCreatePage() {
  const rolesResult = await loadAdminRoles();

  if (rolesResult.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (rolesResult.status !== "success") {
    return null;
  }

  return <UserForm mode="create" initial={emptyForm} roles={rolesResult.data} />;
}
