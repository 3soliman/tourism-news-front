"use client";

import { useEffect, useRef, useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import ArticleCompliancePanel from "@/components/admin/ArticleCompliancePanel";
import ArticleSeoFields from "@/components/admin/ArticleSeoFields";
import ArticleRedirectFields, {
  type ArticleRedirectState,
} from "@/components/admin/ArticleRedirectFields";
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
import { sendNewsletterCampaign } from "@/lib/api/admin-newsletter";
import { syncArticleRedirect } from "@/lib/api/admin-redirects";
import {
  getBlockingComplianceIssue,
  validateArticleComplianceSafe,
  type ArticleComplianceReport,
} from "@/lib/api/admin-news-compliance";
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
  articleOptions?: Array<{ slug: string; title: string }>;
  initialRedirect?: ArticleRedirectState;
  canManageRedirect?: boolean;
  canManageNewsletter?: boolean;
};

export default function NewsForm({
  mode,
  articleId,
  initial,
  categories,
  countries,
  authors,
  currentAuthorName,
  articleOptions = [],
  initialRedirect = { enabled: false, targetSlug: "" },
  canManageRedirect = false,
  canManageNewsletter = false,
}: NewsFormProps) {
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
  const [redirectState, setRedirectState] =
    useState<ArticleRedirectState>(initialRedirect);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState(initial.title);
  const [compliance, setCompliance] = useState<ArticleComplianceReport | null>(null);
  const [complianceLoading, setComplianceLoading] = useState(false);
  const complianceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editingArticleId =
    mode === "edit" && articleId != null && Number(articleId) > 0
      ? Number(articleId)
      : undefined;

  const isPublishing =
    form.status === "published" || form.status === "scheduled";

  const buildCompliancePayload = () => {
    const contentParagraphs = editorHtmlToParagraphs(
      normalizeMediaUrlsInHtml(contentHtml),
    );

    const payload = buildNewsPayload(
      {
        ...form,
        published_at:
          publishedAtSynced && isPublishing
            ? toDatetimeLocalValue()
            : form.published_at,
        content_paragraphs: contentParagraphs,
        keywords: keywordsText
          .split(/[،,]/)
          .map((keyword) => keyword.trim())
          .filter(Boolean),
      },
      { forCreate: mode === "create" },
    );

    return { payload, contentParagraphs };
  };

  const updateField = <K extends keyof AdminNewsFormInput>(
    key: K,
    value: AdminNewsFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    if (!newsletterSubject.trim() || newsletterSubject === form.title) {
      setNewsletterSubject(title);
    }

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

  useEffect(() => {
    if (complianceTimerRef.current) {
      clearTimeout(complianceTimerRef.current);
    }

    complianceTimerRef.current = setTimeout(async () => {
      const { contentParagraphs, payload } = buildCompliancePayload();

      if (!form.title.trim() && contentParagraphs.length === 0) {
        setCompliance(null);
        return;
      }

      setComplianceLoading(true);

      const result = await validateArticleComplianceSafe(
        payload,
        editingArticleId,
      );

      setComplianceLoading(false);

      if (result.ok) {
        setCompliance(result.data);
      }
    }, 900);

    return () => {
      if (complianceTimerRef.current) {
        clearTimeout(complianceTimerRef.current);
      }
    };
  }, [
    articleId,
    editingArticleId,
    contentHtml,
    form,
    isPublishing,
    keywordsText,
    mode,
    publishedAtSynced,
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const { payload, contentParagraphs } = buildCompliancePayload();

    if (contentParagraphs.length === 0) {
      setSubmitting(false);
      setError("محتوى الخبر مطلوب.");
      return;
    }

    const complianceResult = await validateArticleComplianceSafe(
      payload,
      editingArticleId,
    );

    if (!complianceResult.ok) {
      setSubmitting(false);
      setError(complianceResult.message);
      return;
    }

    setCompliance(complianceResult.data);

    const blockingIssue = getBlockingComplianceIssue(
      complianceResult.data,
      isPublishing,
      editingArticleId,
    );

    if (blockingIssue) {
      setSubmitting(false);
      setError(blockingIssue);
      return;
    }

    const result =
      mode === "create"
        ? await createAdminNews(payload)
        : await updateAdminNews(articleId!, payload as AdminNewsPayload);

    if (!result.ok) {
      setSubmitting(false);
      setError(result.message);
      return;
    }

    if (canManageRedirect) {
      const savedArticleId = mode === "create" ? result.data.id : articleId!;

      if (redirectState.enabled && !redirectState.targetSlug) {
        setSubmitting(false);
        setError("اختر الخبر الهدف لإعادة التوجيه.");
        return;
      }

      const redirectResult = await syncArticleRedirect({
        article_id: savedArticleId,
        enabled: redirectState.enabled,
        target_slug: redirectState.enabled ? redirectState.targetSlug : null,
      });

      if (!redirectResult.ok) {
        setSubmitting(false);
        setError(redirectResult.message);
        return;
      }
    }

    if (canManageNewsletter && notifyNewsletter) {
      const savedArticleId = mode === "create" ? result.data.id : articleId!;
      const campaignResult = await sendNewsletterCampaign({
        article_id: savedArticleId,
        subject: newsletterSubject.trim() || form.title,
        preheader: form.excerpt,
        send_now: form.status === "published",
      });

      if (!campaignResult.ok) {
        setSubmitting(false);
        setError(`تم حفظ الخبر، لكن فشل إرسال إشعار النشرة: ${campaignResult.message}`);
        return;
      }
    }

    setSubmitting(false);

    window.location.assign("/admin/news");
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

      <div className="grid gap-3 xl:grid-cols-[1fr_320px]">
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

        <div className="space-y-3">
          <ArticleCompliancePanel
            report={compliance}
            loading={complianceLoading}
            publishing={isPublishing}
          />

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
      </div>

      {canManageNewsletter ? (
        <DashboardSection
          title="إشعار النشرة البريدية"
          description="أرسل تنبيهًا للمشتركين عند نشر خبر مهم."
        >
          <div className={admin.formGrid2}>
            <label className={`${admin.checkboxRow} md:col-span-2`}>
              <input
                type="checkbox"
                checked={notifyNewsletter}
                onChange={(event) => setNotifyNewsletter(event.target.checked)}
              />
              إرسال إشعار بريدي للمشتركين بعد حفظ الخبر
            </label>

            {notifyNewsletter ? (
              <>
                <label className="md:col-span-2">
                  <span className={admin.label}>عنوان الإشعار</span>
                  <input
                    value={newsletterSubject}
                    onChange={(event) => setNewsletterSubject(event.target.value)}
                    className={admin.input}
                    placeholder={form.title || "عنوان الرسالة البريدية"}
                  />
                </label>
                <div className={`${admin.panel} md:col-span-2 text-xs leading-6 text-slate-600`}>
                  إذا كانت حالة الخبر <strong>منشور</strong> سيتم الإرسال الآن.
                  إذا كان <strong>مجدول</strong> يرسل الباك اند الإشعار عند وقت النشر.
                </div>
              </>
            ) : null}
          </div>
        </DashboardSection>
      ) : null}

      {canManageRedirect ? (
        <ArticleRedirectFields
          articleSlug={form.slug}
          value={redirectState}
          articleOptions={articleOptions}
          onChange={setRedirectState}
        />
      ) : null}

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
