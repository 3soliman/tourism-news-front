"use client";

import DashboardSection from "@/components/dashboard/DashboardSection";
import { admin } from "@/components/admin/admin-ui";
import { articleRedirectPath } from "@/lib/redirect-path";

export type ArticleRedirectState = {
  enabled: boolean;
  targetSlug: string;
};

type ArticleRedirectFieldsProps = {
  articleSlug: string;
  value: ArticleRedirectState;
  articleOptions: Array<{ slug: string; title: string }>;
  onChange: (value: ArticleRedirectState) => void;
};

export default function ArticleRedirectFields({
  articleSlug,
  value,
  articleOptions,
  onChange,
}: ArticleRedirectFieldsProps) {
  const fromPath = articleRedirectPath(articleSlug);
  const targetArticle = articleOptions.find((item) => item.slug === value.targetSlug);
  const toPath = value.targetSlug ? articleRedirectPath(value.targetSlug) : "";

  return (
    <DashboardSection
      title="إعادة التوجيه"
      description="عند تفعيل هذا الخيار، أي زائر يفتح رابط هذا الخبر سيُحوَّل تلقائيًا إلى خبر آخر."
    >
      <div className={admin.formGrid}>
        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(event) =>
              onChange({ ...value, enabled: event.target.checked })
            }
            className="h-4 w-4"
          />
          <span className="text-sm font-bold text-slate-700">
            تحويل زوار هذا الخبر إلى خبر آخر
          </span>
        </label>

        {value.enabled ? (
          <>
            <label className="md:col-span-2">
              <span className={admin.label}>الخبر الهدف</span>
              <select
                required
                value={value.targetSlug}
                onChange={(event) =>
                  onChange({ ...value, targetSlug: event.target.value })
                }
                className={admin.select}
              >
                <option value="" disabled>
                  اختر الخبر الهدف
                </option>
                {articleOptions
                  .filter((item) => item.slug !== articleSlug)
                  .map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </label>

            <div className={`${admin.panel} md:col-span-2 text-xs leading-6 text-slate-600`}>
              <p>
                <span className="font-bold text-slate-800">من:</span>{" "}
                <code dir="ltr">{fromPath}</code>
              </p>
              <p>
                <span className="font-bold text-slate-800">إلى:</span>{" "}
                <code dir="ltr">{toPath || "—"}</code>
              </p>
              {targetArticle ? (
                <p className="mt-1 text-slate-500">الهدف: {targetArticle.title}</p>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </DashboardSection>
  );
}
