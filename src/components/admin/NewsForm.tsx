"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import ArticleSeoFields from "@/components/admin/ArticleSeoFields";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import AdminContentEditor from "@/components/admin/AdminContentEditor";
import "@/styles/admin-tinymce.css";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { admin } from "@/components/admin/admin-ui";
import {
  editorHtmlToParagraphs,
  paragraphsToEditorHtml,
} from "@/lib/article-content";
import {
  normalizeMediaUrlsInHtml,
  resolveMediaUrlsInHtml,
} from "@/lib/media-url";
import {
  buildNewsPayload,
  createAdminNews,
  updateAdminNews,
} from "@/lib/api/admin-news";
import type { AdminNewsFormInput, AdminNewsPayload } from "@/types";
import type { Author, Category, Country } from "@/types";
import {
  isSeoSyncedWithSource,
  maybeSyncOgDescription,
  maybeSyncOgTitle,
} from "@/lib/seo-field-sync";
import { toDatetimeLocalValue } from "@/lib/datetime-local";

const statusOptions = [
  { value: "draft", label: "مسودة" },
  { value: "review", label: "قيد المراجعة" },
  { value: "published", label: "منشور" },
  { value: "scheduled", label: "مجدول" },
  { value: "archived", label: "مؤرشف" },
];

type NewsFormProps = {
  mode: "create" | "edit";
  articleId?: number;
  initial: AdminNewsFormInput;
  categories: Category[];
  countries: Country[];
  authors: Author[];
  currentAuthorName?: string;
};

export default function NewsForm({
  mode,
  articleId,
  initial,
  categories,
  countries,
  authors,
  currentAuthorName,
}: NewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminNewsFormInput>(initial);
  const [contentHtml, setContentHtml] = useState(
    resolveMediaUrlsInHtml(paragraphsToEditorHtml(initial.content_paragraphs)),
  );
  const [keywordsText, setKeywordsText] = useState(initial.keywords.join("، "));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seoTitleSynced, setSeoTitleSynced] = useState(() =>
    isSeoSyncedWithSource(initial.title, initial.seo_title),
  );
  const [seoDescriptionSynced, setSeoDescriptionSynced] = useState(() =>
    isSeoSyncedWithSource(initial.excerpt, initial.seo_description),
  );
  const [publishedAtSynced, setPublishedAtSynced] = useState(() =>
    mode === "create" ? true : !initial.published_at,
  );

  const updateField = <K extends keyof AdminNewsFormInput>(
    key: K,
    value: AdminNewsFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setForm((current) => {
      const next = { ...current, title };

      if (seoTitleSynced) {
        next.seo_title = title;
        const ogTitle = maybeSyncOgTitle(title, current.seo_title, current.og_title);
        if (ogTitle !== undefined) {
          next.og_title = ogTitle;
        }
      }

      return next;
    });
  };

  const handleExcerptChange = (excerpt: string) => {
    setForm((current) => {
      const next = { ...current, excerpt };

      if (seoDescriptionSynced) {
        next.seo_description = excerpt;
        const ogDescription = maybeSyncOgDescription(
          excerpt,
          current.seo_description,
          current.og_description,
        );
        if (ogDescription !== undefined) {
          next.og_description = ogDescription;
        }
      }

      return next;
    });
  };

  const handleSeoTitleChange = (seo_title: string) => {
    setSeoTitleSynced(false);
    updateField("seo_title", seo_title);
  };

  const handleSeoDescriptionChange = (seo_description: string) => {
    setSeoDescriptionSynced(false);
    updateField("seo_description", seo_description);
  };

  const handleStatusChange = (status: string) => {
    setForm((current) => {
      const next = { ...current, status };

      if (
        publishedAtSynced &&
        (status === "published" || status === "scheduled")
      ) {
        next.published_at = toDatetimeLocalValue();
      }

      return next;
    });
  };

  const handlePublishedAtChange = (published_at: string) => {
    setPublishedAtSynced(false);
    updateField("published_at", published_at);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const contentParagraphs = editorHtmlToParagraphs(
      normalizeMediaUrlsInHtml(contentHtml),
    );
    if (contentParagraphs.length === 0) {
      setSubmitting(false);
      setError("محتوى الخبر مطلوب.");
      return;
    }

    const resolvedPublishedAt =
      publishedAtSynced &&
      (form.status === "published" || form.status === "scheduled")
        ? toDatetimeLocalValue()
        : form.published_at;

    const formForSubmit = {
      ...form,
      published_at: resolvedPublishedAt,
      content_paragraphs: contentParagraphs,
      keywords: keywordsText
        .split(/[،,]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    };

    const payload =
      mode === "create"
        ? buildNewsPayload(formForSubmit, { forCreate: true })
        : buildNewsPayload(formForSubmit);

    const result =
      mode === "create"
        ? await createAdminNews(payload)
        : await updateAdminNews(articleId!, payload as AdminNewsPayload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push("/admin/news");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/news"
        backLabel="العودة إلى الأخبار"
        title={mode === "create" ? "إضافة خبر جديد" : "تعديل الخبر"}
        submitLabel="حفظ الخبر"
        submitting={submitting}
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <div className="grid gap-3 xl:grid-cols-[1fr_300px]">
        <section className={admin.card}>
          <div className={admin.formGrid}>
            <label>
              <span className={admin.label}>عنوان الخبر</span>
              <input
                required
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                className={admin.input}
              />
            </label>

            <label>
              <span className={admin.label}>Slug</span>
              <input
                required
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className={`${admin.input} font-mono`}
                dir="ltr"
              />
            </label>

            <label className="xl:col-span-2">
              <span className={admin.label}>ملخص الخبر</span>
              <textarea
                required
                value={form.excerpt}
                onChange={(event) => handleExcerptChange(event.target.value)}
                className={admin.textarea}
                rows={2}
              />
            </label>

            <div className="xl:col-span-2">
              <AdminContentEditor
                label="محتوى الخبر"
                value={contentHtml}
                onChange={setContentHtml}
              />
            </div>

            <MediaUploadField
              label="صورة الخبر"
              value={form.image}
              onChange={(url) => updateField("image", url)}
              required
              previewClassName="h-20 w-32 rounded object-cover"
            />
          </div>
        </section>

        <DashboardSection title="الربط التحريري">
          <div className={admin.formGrid}>
            <label>
              <span className={admin.label}>التصنيف</span>
              <select
                required
                value={form.category_id || ""}
                onChange={(event) => updateField("category_id", Number(event.target.value))}
                className={admin.select}
              >
                <option value="" disabled>
                  اختر التصنيف
                </option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            {mode === "create" ? (
              <div>
                <span className={admin.label}>الكاتب (مستخدم)</span>
                <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                  {currentAuthorName ?? "المستخدم الحالي"}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  يُسجَّل الخبر تلقائياً باسمك.
                </p>
              </div>
            ) : (
              <label>
                <span className={admin.label}>الكاتب (مستخدم)</span>
                <select
                  required
                  value={form.author_id || ""}
                  onChange={(event) => updateField("author_id", Number(event.target.value))}
                  className={admin.select}
                >
                  <option value="" disabled>
                    اختر الكاتب
                  </option>
                  {authors.map((author) => (
                    <option key={author.slug} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              <span className={admin.label}>الدولة</span>
              <select
                value={form.country_id ?? ""}
                onChange={(event) =>
                  updateField(
                    "country_id",
                    event.target.value ? Number(event.target.value) : null,
                  )
                }
                className={admin.select}
              >
                <option value="">بدون دولة</option>
                {countries.map((country) => (
                  <option key={country.slug} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={admin.label}>الوجهة</span>
              <input
                value={form.destination}
                onChange={(event) => updateField("destination", event.target.value)}
                className={admin.input}
              />
            </label>

            <label>
              <span className={admin.label}>الحالة</span>
              <select
                value={form.status}
                onChange={(event) => handleStatusChange(event.target.value)}
                className={admin.select}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className={admin.label}>تاريخ النشر</span>
              <input
                type="datetime-local"
                value={form.published_at}
                onChange={(event) => handlePublishedAtChange(event.target.value)}
                className={admin.input}
              />
            </label>

            <label>
              <span className={admin.label}>وقت القراءة</span>
              <input
                value={form.reading_time}
                onChange={(event) => updateField("reading_time", event.target.value)}
                className={admin.input}
                placeholder="5 دقائق"
              />
            </label>
          </div>
        </DashboardSection>
      </div>

      <ArticleSeoFields
        form={form}
        keywordsText={keywordsText}
        onKeywordsChange={setKeywordsText}
        onSeoTitleChange={handleSeoTitleChange}
        onSeoDescriptionChange={handleSeoDescriptionChange}
        onChange={updateField}
      />
    </form>
  );
}
