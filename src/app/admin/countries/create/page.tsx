import type { Metadata } from "next";
import CountryForm from "@/components/admin/CountryForm";
import type { AdminCountryFormInput } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة دولة",
};

const emptyForm: AdminCountryFormInput = {
  name: "",
  slug: "",
  code: "",
  flag: "",
  image: "",
  region: "",
  is_active: true,
};

export default function AdminCountryCreatePage() {
  return <CountryForm mode="create" initial={emptyForm} />;
}
