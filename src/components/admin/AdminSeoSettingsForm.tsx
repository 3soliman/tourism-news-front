"use client";

import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { admin } from "@/components/admin/admin-ui";
import {
  updateAdminSeoSettings,
  type AdminSeoSettings,
  type AdminSeoSettingsInput,
} from "@/lib/api/admin-settings";

type AdminSeoSettingsFormProps = {
  initial: AdminSeoSettings;
};

export default function AdminSeoSettingsForm({ initial }: AdminSeoSettingsFormProps) {
  const [form, setForm] = useState<AdminSeoSettingsInput>({
    google_news_publisher_id: initial.google_news_publisher_id,
    google_news_channel_url: initial.google_news_channel_url,
    google_news_publication_name: initial.google_news_publication_name,
    google_news_language: initial.google_news_language,
    news_sitemap_enabled: initial.news_sitemap_enabled,
    news_sitemap_window_hours: initial.news_sitemap_window_hours,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = <K extends keyof AdminSeoSettingsInput>(
    key: K,
    value: AdminSeoSettingsInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const result = await updateAdminSeoSettings(form);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess("تم حفظ الإعدادات بنجاح");
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      {error ? <div className={admin.error}>{error}</div> : null}
      {success ? <div className={admin.success}>{success}</div> : null}

      <DashboardSection title="Google Publisher Center">
        <div className={admin.formGrid2}>
          <label className="md:col-span-2">
            <span className={admin.label}>معرّف الناشر (Publisher ID)</span>
            <input
              type="text"
              value={form.google_news_publisher_id ?? ""}
              onChange={(event) =>
                updateField("google_news_publisher_id", event.target.value)
              }
              placeholder="مثال: CAAqBwgKMJ..."
              className={admin.input}
            />
          </label>

          <label className="md:col-span-2">
            <span className={admin.label}>رابط قناة Google News</span>
            <input
              type="url"
              value={form.google_news_channel_url ?? ""}
              onChange={(event) =>
                updateField("google_news_channel_url", event.target.value)
              }
              placeholder="https://news.google.com/publications/..."
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>اسم المنشور في News Sitemap</span>
            <input
              type="text"
              value={form.google_news_publication_name ?? ""}
              onChange={(event) =>
                updateField("google_news_publication_name", event.target.value)
              }
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>لغة المنشور</span>
            <input
              type="text"
              value={form.google_news_language ?? "ar"}
              onChange={(event) =>
                updateField("google_news_language", event.target.value)
              }
              className={admin.input}
            />
          </label>
        </div>
      </DashboardSection>

      <DashboardSection title="إعدادات Sitemap">
        <div className={admin.formGrid2}>
          <label className={admin.checkboxRow}>
            <input
              type="checkbox"
              checked={form.news_sitemap_enabled ?? true}
              onChange={(event) =>
                updateField("news_sitemap_enabled", event.target.checked)
              }
            />
            تفعيل News Sitemap
          </label>

          <label>
            <span className={admin.label}>نافذة الأخبار (بالساعات)</span>
            <input
              type="number"
              min={1}
              max={168}
              value={form.news_sitemap_window_hours ?? 48}
              onChange={(event) =>
                updateField("news_sitemap_window_hours", Number(event.target.value))
              }
              className={admin.input}
            />
          </label>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <a
            href={initial.sitemap_url}
            target="_blank"
            rel="noreferrer"
            className={admin.btnSecondary}
          >
            <ExternalLink size={13} />
            sitemap.xml
          </a>
          <a
            href={initial.news_sitemap_url}
            target="_blank"
            rel="noreferrer"
            className={admin.btnSecondary}
          >
            <ExternalLink size={13} />
            news-sitemap.xml
          </a>
        </div>
      </DashboardSection>

      <button type="submit" disabled={submitting} className={admin.btnPrimary}>
        <Save size={14} />
        {submitting ? "جاري الحفظ..." : "حفظ الإعدادات"}
      </button>
    </form>
  );
}
