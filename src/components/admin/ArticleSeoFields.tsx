"use client";

import DashboardSection from "@/components/dashboard/DashboardSection";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { admin } from "@/components/admin/admin-ui";
import type { AdminNewsFormInput } from "@/types";

const schemaStatusOptions = [
  { value: "valid", label: "NewsArticle Schema صالح" },
  { value: "incomplete", label: "Schema غير مكتمل" },
  { value: "disabled", label: "Schema معطّل" },
];

const googleNewsStatusOptions = [
  { value: "pending", label: "قيد المراجعة" },
  { value: "eligible", label: "مؤهل" },
  { value: "published", label: "منشور في Google News" },
  { value: "rejected", label: "مرفوض" },
];

type ArticleSeoFieldsProps = {
  form: AdminNewsFormInput;
  keywordsText: string;
  onKeywordsChange: (value: string) => void;
  onChange: <K extends keyof AdminNewsFormInput>(
    key: K,
    value: AdminNewsFormInput[K],
  ) => void;
};

export default function ArticleSeoFields({
  form,
  keywordsText,
  onKeywordsChange,
  onChange,
}: ArticleSeoFieldsProps) {
  return (
    <DashboardSection title="إعدادات SEO">
      <div className={admin.formGrid}>
        <label>
          <span className={admin.label}>SEO Title</span>
          <input
            value={form.seo_title}
            onChange={(event) => onChange("seo_title", event.target.value)}
            className={admin.input}
            placeholder="عنوان يظهر في نتائج البحث"
          />
        </label>

        <label>
          <span className={admin.label}>SEO Description</span>
          <textarea
            value={form.seo_description}
            onChange={(event) => onChange("seo_description", event.target.value)}
            className={admin.textarea}
            rows={2}
            placeholder="وصف الميتا"
          />
        </label>

        <div className={`${admin.formGrid2} md:col-span-2`}>
          <label>
            <span className={admin.label}>Focus Keyword</span>
            <input
              value={form.focus_keyword}
              onChange={(event) => onChange("focus_keyword", event.target.value)}
              className={admin.input}
            />
          </label>
          <label>
            <span className={admin.label}>Keywords</span>
            <input
              value={keywordsText}
              onChange={(event) => onKeywordsChange(event.target.value)}
              className={admin.input}
              placeholder="سياحة، فنادق، تركيا"
            />
          </label>
        </div>

        <label className="md:col-span-2">
          <span className={admin.label}>Canonical URL</span>
          <input
            value={form.canonical_url}
            onChange={(event) => onChange("canonical_url", event.target.value)}
            className={admin.input}
            dir="ltr"
          />
        </label>

        <div className={`${admin.panel} md:col-span-2`}>
          <p className={admin.panelTitle}>Open Graph</p>
          <div className={admin.formGrid}>
            <label>
              <span className={admin.label}>OG Title</span>
              <input
                value={form.og_title}
                onChange={(event) => onChange("og_title", event.target.value)}
                className={admin.input}
              />
            </label>
            <label>
              <span className={admin.label}>OG Description</span>
              <textarea
                value={form.og_description}
                onChange={(event) => onChange("og_description", event.target.value)}
                className={admin.textarea}
                rows={2}
              />
            </label>
            <MediaUploadField
              label="OG Image"
              value={form.og_image}
              onChange={(url) => onChange("og_image", url)}
              previewClassName="h-16 w-28 rounded object-cover"
            />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:col-span-2">
          <label className={admin.checkboxRow}>
            <input
              type="checkbox"
              checked={form.robots_index}
              onChange={(event) => onChange("robots_index", event.target.checked)}
            />
            Robots: Index
          </label>
          <label className={admin.checkboxRow}>
            <input
              type="checkbox"
              checked={form.robots_follow}
              onChange={(event) => onChange("robots_follow", event.target.checked)}
            />
            Robots: Follow
          </label>
        </div>

        <label>
          <span className={admin.label}>NewsArticle Schema</span>
          <select
            value={form.schema_status}
            onChange={(event) => onChange("schema_status", event.target.value)}
            className={admin.select}
          >
            {schemaStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className={admin.panel}>
          <p className={admin.panelTitle}>Google News</p>
          <label className={`${admin.checkboxRow} mb-2`}>
            <input
              type="checkbox"
              checked={form.is_google_news_enabled}
              onChange={(event) =>
                onChange("is_google_news_enabled", event.target.checked)
              }
            />
            مؤهل لـ Google News
          </label>
          <select
            value={form.google_news_status}
            onChange={(event) => onChange("google_news_status", event.target.value)}
            className={admin.select}
          >
            {googleNewsStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </DashboardSection>
  );
}
