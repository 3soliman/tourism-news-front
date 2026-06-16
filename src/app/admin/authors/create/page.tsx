import type { Metadata } from "next";
import AuthorForm from "@/components/admin/AuthorForm";
import type { AdminAuthorFormInput } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة كاتب",
};

const emptyForm: AdminAuthorFormInput = {
  name: "",
  slug: "",
  role: "",
  bio: "",
  image: "",
  is_active: true,
};

export default function AdminAuthorCreatePage() {
  return <AuthorForm mode="create" initial={emptyForm} />;
}
