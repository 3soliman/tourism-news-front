"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRightLeft, Pencil, Plus } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import DeleteRedirectButton from "@/components/admin/DeleteRedirectButton";
import { admin } from "@/components/admin/admin-ui";
import {
  createAdminRedirect,
  updateAdminRedirect,
  type AdminRedirectFormInput,
  type AdminRedirectRecord,
} from "@/lib/api/admin-redirects";
import { articleRedirectPath } from "@/lib/redirect-path";

const emptyForm = (): AdminRedirectFormInput => ({
  from_path: "",
  to_path: "",
  status_code: 301,
  is_active: true,
  notes: "",
});

type RedirectManagerProps = {
  redirects: AdminRedirectRecord[];
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export default function RedirectManager({
  redirects,
  canCreate,
  canUpdate,
  canDelete,
}: RedirectManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AdminRedirectFormInput>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editingRedirect = useMemo(
    () => redirects.find((item) => item.id === editingId) ?? null,
    [redirects, editingId],
  );

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError(null);
  };

  const startEdit = (redirect: AdminRedirectRecord) => {
    setEditingId(redirect.id);
    setForm({
      from_path: redirect.fromPath,
      to_path: redirect.toPath,
      status_code: redirect.statusCode,
      is_active: redirect.isActive,
      notes: redirect.notes,
      article_id: redirect.articleId,
    });
    setError(null);
  };

  const updateField = <K extends keyof AdminRedirectFormInput>(
    key: K,
    value: AdminRedirectFormInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result =
      editingId !== null
        ? await updateAdminRedirect(editingId, form)
        : await createAdminRedirect(form);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    resetForm();
    router.refresh();
  };

  const canSubmit = editingId !== null ? canUpdate : canCreate;

  return (
    <div className="space-y-4">
      {canSubmit ? (
        <DashboardSection
          title={editingId ? "تعديل التحويل" : "إضافة تحويل جديد"}
          description="حوّل رابطًا قديمًا مفهرسًا في Google إلى مقال أو صفحة أخرى."
        >
          <form onSubmit={handleSubmit} className={admin.formGrid}>
            {error ? <div className={`${admin.error} md:col-span-2`}>{error}</div> : null}

            <label>
              <span className={admin.label}>من (الرابط القديم)</span>
              <input
                required
                value={form.from_path}
                onChange={(event) => updateField("from_path", event.target.value)}
                className={`${admin.input} font-mono`}
                dir="ltr"
                placeholder="/travel-news/old-article-slug"
              />
            </label>

            <label>
              <span className={admin.label}>إلى (الرابط الجديد)</span>
              <input
                required
                value={form.to_path}
                onChange={(event) => updateField("to_path", event.target.value)}
                className={`${admin.input} font-mono`}
                dir="ltr"
                placeholder="/travel-news/new-article-slug"
              />
            </label>

            <label>
              <span className={admin.label}>نوع التحويل</span>
              <select
                value={form.status_code}
                onChange={(event) =>
                  updateField("status_code", Number(event.target.value))
                }
                className={admin.select}
              >
                <option value={301}>301 — دائم (موصى به لـ SEO)</option>
                <option value={302}>302 — مؤقت</option>
              </select>
            </label>

            <label className="flex items-center gap-2 self-end">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) => updateField("is_active", event.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm font-bold text-slate-700">مفعّل</span>
            </label>

            <label className="md:col-span-2">
              <span className={admin.label}>ملاحظة</span>
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className={admin.textarea}
                rows={2}
                placeholder="مثال: مقال 2024 → النسخة المحدّثة 2026"
              />
            </label>

            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button type="submit" disabled={submitting} className={admin.btnPrimary}>
                {editingId ? <Pencil size={14} /> : <Plus size={14} />}
                {editingId ? "حفظ التعديل" : "إضافة التحويل"}
              </button>
              {editingId ? (
                <button type="button" onClick={resetForm} className={admin.btnSecondary}>
                  إلغاء التعديل
                </button>
              ) : null}
            </div>
          </form>
        </DashboardSection>
      ) : null}

      <section className={admin.tableWrap}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className={admin.th}>من</th>
                <th className={admin.th}>إلى</th>
                <th className={admin.th}>النوع</th>
                <th className={admin.th}>الزيارات</th>
                <th className={admin.th}>الحالة</th>
                <th className={admin.th}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {redirects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    لا توجد تحويلات بعد.
                  </td>
                </tr>
              ) : (
                redirects.map((redirect) => (
                  <tr key={redirect.id} className="border-b border-slate-100 last:border-0">
                    <td className={`${admin.td} font-mono text-slate-700`}>
                      {redirect.fromPath}
                      {redirect.articleTitle ? (
                        <p className="mt-1 font-sans text-[10px] text-slate-500">
                          خبر: {redirect.articleTitle}
                        </p>
                      ) : null}
                    </td>
                    <td className={`${admin.td} font-mono text-slate-700`}>
                      {redirect.toPath}
                    </td>
                    <td className={admin.td}>{redirect.statusCode}</td>
                    <td className={admin.td}>{redirect.hitCount}</td>
                    <td className={admin.td}>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          redirect.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {redirect.isActive ? "مفعّل" : "موقوف"}
                      </span>
                    </td>
                    <td className={admin.td}>
                      <div className="flex items-center gap-1">
                        {canUpdate ? (
                          <button
                            type="button"
                            onClick={() => startEdit(redirect)}
                            className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
                            aria-label="تعديل التحويل"
                            title="تعديل"
                          >
                            <Pencil size={15} />
                          </button>
                        ) : null}
                        {canDelete ? (
                          <DeleteRedirectButton
                            redirectId={redirect.id}
                            fromPath={redirect.fromPath}
                          />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editingRedirect ? (
        <p className="text-xs text-slate-500">
          <ArrowRightLeft size={12} className="inline" /> تعديل: {editingRedirect.fromPath}
          {" → "}
          {editingRedirect.toPath}
        </p>
      ) : null}

      <div className={`${admin.panel} text-xs leading-6 text-slate-600`}>
        <p className="font-bold text-slate-800">أمثلة سريعة</p>
        <p>
          من: <code dir="ltr">{articleRedirectPath("old-article-slug")}</code>
        </p>
        <p>
          إلى: <code dir="ltr">{articleRedirectPath("new-article-slug")}</code>
        </p>
      </div>
    </div>
  );
}
