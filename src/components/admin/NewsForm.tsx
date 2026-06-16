"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import ArticleSeoFields from "@/components/admin/ArticleSeoFields";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import AdminRichTextEditor from "@/components/admin/AdminRichTextEditor";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { admin } from "@/components/admin/admin-ui";
import {
  editorHtmlToParagraphs,
  paragraphsToEditorHtml,
} from "@/lib/article-content";
import {
  buildNewsPayload,
  createAdminNews,
  updateAdminNews,
} from "@/lib/api/admin-news";
import type { AdminNewsFormInput } from "@/types";
import type { Author, Category, Country } from "@/types";

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
};

export default function NewsForm({
  mode,
  articleId,
  initial,
  categories,
  countries,
  authors,
}: NewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminNewsFormInput>(initial);
  const [contentHtml, setContentHtml] = useState(
    paragraphsToEditorHtml(initial.content_paragraphs),
  );
  const [keywordsText, setKeywordsText] = useState(initial.keywords.join("، "));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof AdminNewsFormInput>(
    key: K,
    value: AdminNewsFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const contentParagraphs = editorHtmlToParagraphs(contentHtml);
    if (contentParagraphs.length === 0) {
      setSubmitting(false);
      setError("محتوى الخبر مطلوب.");
      return;
    }

    const payload = buildNewsPayload({
      ...form,
      content_paragraphs: contentParagraphs,
      keywords: keywordsText
        .split(/[،,]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    });

    const result =
      mode === "create"
        ? await createAdminNews(payload)
        : await updateAdminNews(articleId!, payload);

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
                onChange={(event) => updateField("title", event.target.value)}
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

            <label>
              <span className={admin.label}>ملخص الخبر</span>
              <textarea
                required
                value={form.excerpt}
                onChange={(event) => updateField("excerpt", event.target.value)}
                className={admin.textarea}
                rows={2}
              />
            </label>

            <AdminRichTextEditor
              label="محتوى الخبر"
              value={contentHtml}
              onChange={setContentHtml}
              placeholder="اكتب محتوى الخبر — عناوين، فقرات، روابط، ألوان، ونوع الخط..."
            />

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

            <label>
              <span className={admin.label}>الكاتب</span>
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
                onChange={(event) => updateField("status", event.target.value)}
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
                onChange={(event) => updateField("published_at", event.target.value)}
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
        onChange={updateField}
      />
    </form>
  );
}
