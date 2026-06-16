import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import CountryForm from "@/components/admin/CountryForm";
import { loadAdminCountryById } from "@/lib/api/admin";
import { toAdminCountryFormInput } from "@/lib/api/admin-countries";

export const dynamic = "force-dynamic";

type AdminCountryEditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminCountryEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadAdminCountryById(Number(id));

  if (result.status !== "success") {
    return { title: "تعديل الدولة" };
  }

  return { title: `تعديل: ${result.data.name}` };
}

export default async function AdminCountryEditPage({ params }: AdminCountryEditPageProps) {
  const { id } = await params;
  const countryId = Number(id);

  if (Number.isNaN(countryId)) {
    notFound();
  }

  const result = await loadAdminCountryById(countryId);

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
    <CountryForm
      mode="edit"
      countryId={countryId}
      initial={toAdminCountryFormInput(result.data)}
    />
  );
}
