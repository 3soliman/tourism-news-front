"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import { admin } from "@/components/admin/admin-ui";
import { updateAdminPage } from "@/lib/api/admin-pages";
import { getTrustPagePath } from "@/lib/api/pages";
import type { AdminPageFormInput } from "@/types";
import { isSeoSyncedWithSource } from "@/lib/seo-field-sync";

type PageFormProps = {
  slug: string;
  initial: AdminPageFormInput;
};

export default function PageForm({ slug, initial }: PageFormProps) {
  const [form, setForm] = useState<AdminPageFormInput>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seoTitleSynced, setSeoTitleSynced] = useState(() =>
    isSeoSyncedWithSource(initial.title, initial.seoTitle),
  );
  const [seoDescriptionSynced, setSeoDescriptionSynced] = useState(() =>
    isSeoSyncedWithSource(initial.description, initial.seoDescription),
  );

  const updateField = <K extends keyof AdminPageFormInput>(
    key: K,
    value: AdminPageFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setForm((current) => ({
      ...current,
      title,
      ...(seoTitleSynced ? { seoTitle: title } : {}),
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setForm((current) => ({
      ...current,
      description,
      ...(seoDescriptionSynced ? { seoDescription: description } : {}),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await updateAdminPage(slug, form);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    window.location.assign("/admin/pages");
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/pages"
        backLabel="العودة إلى صفحات الثقة"
        title={`تعديل: ${form.title}`}
        subtitle={slug}
        submitLabel="حفظ الصفحة"
        submitting={submitting}
        extra={
          <a
            href={getTrustPagePath(slug)}
            target="_blank"
            rel="noreferrer"
            className={admin.btnSecondary}
          >
            <ExternalLink size={13} />
            معاينة
          </a>
        }
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <DashboardSection title="البيانات الأساسية">
        <div className={admin.formGrid2}>
          <label className="md:col-span-2">
            <span className={admin.label}>العنوان</span>
            <input
              type="text"
              required
              value={form.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              className={admin.input}
            />
          </label>

          <label className="md:col-span-2">
            <span className={admin.label}>الوصف المختصر</span>
            <textarea
              value={form.description}
              onChange={(event) => handleDescriptionChange(event.target.value)}
              className={admin.textarea}
            />
          </label>

          <label className={`${admin.checkboxRow} md:col-span-2`}>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => updateField("isPublished", event.target.checked)}
            />
            الصفحة منشورة
          </label>
        </div>
      </DashboardSection>

      <DashboardSection title="المحتوى (HTML)">
        <label>
          <span className={admin.label}>محتوى الصفحة</span>
          <textarea
            value={form.content}
            onChange={(event) => updateField("content", event.target.value)}
            className={admin.textareaCode}
            style={{ minHeight: "200px" }}
          />
        </label>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          يمكنك استخدام HTML مثل &lt;p&gt;، &lt;h2&gt;، &lt;ul&gt;، &lt;li&gt;
        </p>
      </DashboardSection>

      <DashboardSection title="إعدادات SEO">
        <div className={admin.formGrid2}>
          <label className="md:col-span-2">
            <span className={admin.label}>عنوان SEO</span>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(event) => {
                setSeoTitleSynced(false);
                updateField("seoTitle", event.target.value);
              }}
              className={admin.input}
            />
          </label>

          <label className="md:col-span-2">
            <span className={admin.label}>وصف SEO</span>
            <textarea
              value={form.seoDescription}
              onChange={(event) => {
                setSeoDescriptionSynced(false);
                updateField("seoDescription", event.target.value);
              }}
              className={admin.textarea}
            />
          </label>
        </div>
      </DashboardSection>
    </form>
  );
}
