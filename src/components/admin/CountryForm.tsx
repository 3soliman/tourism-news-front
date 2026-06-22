"use client";

import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { admin } from "@/components/admin/admin-ui";
import {
  createAdminCountry,
  updateAdminCountry,
} from "@/lib/api/admin-countries";
import { toStoredMediaPath } from "@/lib/media-url";
import type { AdminCountryFormInput } from "@/types";

type CountryFormProps = {
  mode: "create" | "edit";
  countryId?: number;
  initial: AdminCountryFormInput;
};

export default function CountryForm({
  mode,
  countryId,
  initial,
}: CountryFormProps) {
  const [form, setForm] = useState<AdminCountryFormInput>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof AdminCountryFormInput>(
    key: K,
    value: AdminCountryFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: AdminCountryFormInput = {
      ...form,
      code: form.code.trim(),
      flag: form.flag.trim(),
      image: toStoredMediaPath(form.image.trim()),
      region: form.region.trim(),
    };

    const result =
      mode === "create"
        ? await createAdminCountry(payload)
        : await updateAdminCountry(countryId!, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    window.location.assign("/admin/countries");
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/countries"
        backLabel="العودة إلى الدول"
        title={mode === "create" ? "إضافة دولة جديدة" : "تعديل الدولة"}
        submitLabel="حفظ الدولة"
        submitting={submitting}
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <DashboardSection title="بيانات الدولة">
        <div className={admin.formGrid2}>
          <label>
            <span className={admin.label}>اسم الدولة</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>Slug</span>
            <input
              type="text"
              required
              dir="ltr"
              value={form.slug}
              onChange={(event) => updateField("slug", event.target.value)}
              className={`${admin.input} font-mono`}
            />
          </label>

          <label>
            <span className={admin.label}>رمز الدولة (ISO)</span>
            <input
              type="text"
              dir="ltr"
              maxLength={5}
              value={form.code}
              onChange={(event) => updateField("code", event.target.value.toUpperCase())}
              placeholder="SA"
              className={`${admin.input} font-mono`}
            />
          </label>

          <label>
            <span className={admin.label}>العلم</span>
            <input
              type="text"
              maxLength={10}
              value={form.flag}
              onChange={(event) => updateField("flag", event.target.value)}
              placeholder="🇸🇦"
              className={`${admin.input} text-lg`}
            />
          </label>

          <div className="md:col-span-2">
            <MediaUploadField
              label="صورة الدولة"
              value={form.image}
              onChange={(url) => updateField("image", url)}
              previewClassName="h-16 w-24 rounded object-cover"
            />
          </div>

          <label className="md:col-span-2">
            <span className={admin.label}>المنطقة</span>
            <input
              type="text"
              value={form.region}
              onChange={(event) => updateField("region", event.target.value)}
              placeholder="الخليج العربي"
              className={admin.input}
            />
          </label>

          <label className={`${admin.checkboxRow} md:col-span-2`}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => updateField("is_active", event.target.checked)}
            />
            دولة نشطة (تظهر في فلتر الزائر)
          </label>
        </div>
      </DashboardSection>
    </form>
  );
}
