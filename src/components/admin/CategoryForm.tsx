"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import { admin } from "@/components/admin/admin-ui";
import {
  createAdminCategory,
  updateAdminCategory,
} from "@/lib/api/admin-categories";
import type { AdminCategoryFormInput } from "@/types";

type CategoryFormProps = {
  mode: "create" | "edit";
  categoryId?: number;
  initial: AdminCategoryFormInput;
};

export default function CategoryForm({
  mode,
  categoryId,
  initial,
}: CategoryFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminCategoryFormInput>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof AdminCategoryFormInput>(
    key: K,
    value: AdminCategoryFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result =
      mode === "create"
        ? await createAdminCategory(form)
        : await updateAdminCategory(categoryId!, form);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/categories"
        backLabel="العودة إلى التصنيفات"
        title={mode === "create" ? "إضافة تصنيف جديد" : "تعديل التصنيف"}
        submitLabel="حفظ التصنيف"
        submitting={submitting}
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <DashboardSection title="البيانات الأساسية">
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
            <span className={admin.label}>الوصف</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              className={admin.textarea}
            />
          </label>

          <label>
            <span className={admin.label}>ترتيب العرض</span>
            <input
              type="number"
              min={0}
              value={form.sort_order}
              onChange={(event) =>
                updateField("sort_order", Number(event.target.value) || 0)
              }
              className={admin.input}
            />
          </label>

          <label className={admin.checkboxRow}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => updateField("is_active", event.target.checked)}
            />
            تصنيف نشط
          </label>
        </div>
      </DashboardSection>

      <DashboardSection title="SEO">
        <div className={admin.formGrid}>
          <label>
            <span className={admin.label}>عنوان SEO</span>
            <input
              type="text"
              value={form.seo_title}
              onChange={(event) => updateField("seo_title", event.target.value)}
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>وصف SEO</span>
            <textarea
              rows={2}
              value={form.seo_description}
              onChange={(event) => updateField("seo_description", event.target.value)}
              className={admin.textarea}
            />
          </label>
        </div>
      </DashboardSection>
    </form>
  );
}
