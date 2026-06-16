"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { admin } from "@/components/admin/admin-ui";
import {
  createAdminAuthor,
  updateAdminAuthor,
} from "@/lib/api/admin-authors";
import type { AdminAuthorFormInput } from "@/types";

type AuthorFormProps = {
  mode: "create" | "edit";
  authorId?: number;
  initial: AdminAuthorFormInput;
};

export default function AuthorForm({
  mode,
  authorId,
  initial,
}: AuthorFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminAuthorFormInput>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof AdminAuthorFormInput>(
    key: K,
    value: AdminAuthorFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: AdminAuthorFormInput = {
      ...form,
      role: form.role.trim(),
      bio: form.bio.trim(),
      image: form.image.trim(),
    };

    const result =
      mode === "create"
        ? await createAdminAuthor(payload)
        : await updateAdminAuthor(authorId!, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push("/admin/authors");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/authors"
        backLabel="العودة إلى الكتّاب"
        title={mode === "create" ? "إضافة كاتب جديد" : "تعديل الكاتب"}
        submitLabel="حفظ الكاتب"
        submitting={submitting}
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <DashboardSection title="بيانات الكاتب">
        <div className={admin.formGrid2}>
          <label>
            <span className={admin.label}>الاسم</span>
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

          <label className="md:col-span-2">
            <span className={admin.label}>المنصب / الدور</span>
            <input
              type="text"
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
              placeholder="محرر، رئيس التحرير..."
              className={admin.input}
            />
          </label>

          <div className="md:col-span-2">
            <MediaUploadField
              label="صورة الكاتب"
              value={form.image}
              onChange={(url) => updateField("image", url)}
              previewClassName="h-16 w-16 rounded-full object-cover"
            />
          </div>

          <label className="md:col-span-2">
            <span className={admin.label}>النبذة</span>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(event) => updateField("bio", event.target.value)}
              className={admin.textarea}
            />
          </label>

          <label className={`${admin.checkboxRow} md:col-span-2`}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => updateField("is_active", event.target.checked)}
            />
            كاتب نشط (يظهر في الموقع العام)
          </label>
        </div>
      </DashboardSection>
    </form>
  );
}
