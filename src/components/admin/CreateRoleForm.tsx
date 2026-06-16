"use client";

import { useMemo, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";
import CanAccess from "@/components/admin/CanAccess";
import { AdminPermission } from "@/lib/admin-permissions";
import {
  groupPermissions,
  shortPermissionLabel,
} from "@/lib/role-permission-groups";
import {
  createAdminRole,
  type ApiPermission,
} from "@/lib/api/admin-roles";
import type { AdminRoleRecord } from "@/lib/api/admin-roles";

type CreateRoleFormProps = {
  permissions: ApiPermission[];
  onCreated: (role: AdminRoleRecord) => void;
  onCancel: () => void;
};

const emptyForm = {
  name: "",
  slug: "",
  description: "",
};

export default function CreateRoleForm({
  permissions,
  onCreated,
  onCancel,
}: CreateRoleFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const permissionGroups = useMemo(
    () => groupPermissions(permissions),
    [permissions],
  );

  const togglePermission = (permissionId: number) => {
    setSelectedIds((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId],
    );
  };

  const setGroupPermissions = (permissionIds: number[], enabled: boolean) => {
    setSelectedIds((current) => {
      const selected = new Set(current);

      for (const id of permissionIds) {
        if (enabled) {
          selected.add(id);
        } else {
          selected.delete(id);
        }
      }

      return Array.from(selected);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setFieldErrors({});

    const result = await createAdminRole({
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      permission_ids: selectedIds,
    });

    setSaving(false);

    if (!result.ok) {
      setError(result.message);
      setFieldErrors(result.errors ?? {});
      return;
    }

    onCreated(result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-3 rounded-lg border border-sky-200 bg-sky-50/40 p-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-black text-slate-900">إنشاء دور جديد</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-bold text-slate-500 hover:text-slate-700"
        >
          إلغاء
        </button>
      </div>

      {error ? <div className={admin.error}>{error}</div> : null}

      <div className="grid gap-2 md:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-600">اسم الدور</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className={admin.input}
            placeholder="مثال: مشرف المحتوى"
            required
          />
          {fieldErrors.name ? (
            <span className="text-xs text-red-600">{fieldErrors.name[0]}</span>
          ) : null}
        </label>

        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-600">المعرّف (slug)</span>
          <input
            type="text"
            value={form.slug}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                slug: event.target.value.toLowerCase().replace(/\s+/g, "-"),
              }))
            }
            className={admin.input}
            placeholder="content-supervisor"
            dir="ltr"
            required
          />
          {fieldErrors.slug ? (
            <span className="text-xs text-red-600">{fieldErrors.slug[0]}</span>
          ) : (
            <span className="text-[11px] text-slate-400">
              أحرف إنجليزية صغيرة وأرقام وشرطات فقط
            </span>
          )}
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-xs font-bold text-slate-600">وصف (اختياري)</span>
        <input
          type="text"
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          className={admin.input}
          placeholder="وصف مختصر للدور"
        />
      </label>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500">
          الصلاحيات ({selectedIds.length}/{permissions.length})
        </div>

        {fieldErrors.permission_ids ? (
          <p className="px-3 pt-2 text-xs text-red-600">
            {fieldErrors.permission_ids[0]}
          </p>
        ) : null}

        {permissionGroups.map((group, index) => {
          const groupIds = group.items.map((item) => item.id);
          const groupSelected = groupIds.filter((id) =>
            selectedIds.includes(id),
          ).length;
          const allSelected = groupSelected === groupIds.length;
          const noneSelected = groupSelected === 0;

          return (
            <div
              key={group.key}
              className={`flex w-full flex-col gap-2 px-3 py-2 md:grid md:grid-cols-[minmax(6.5rem,8.5rem)_2.75rem_1fr] md:items-center md:gap-2 ${
                index > 0 ? "border-t border-slate-100" : ""
              }`}
            >
              <p className="text-sm font-black leading-tight text-slate-800">
                {group.label}
                <span className="mr-1.5 text-[11px] font-semibold text-slate-400">
                  {groupSelected}/{groupIds.length}
                </span>
              </p>

              <div className="flex items-center justify-center gap-0.5">
                <button
                  type="button"
                  title="تحديد الكل"
                  onClick={() => setGroupPermissions(groupIds, true)}
                  disabled={allSelected}
                  className="grid h-6 w-6 place-items-center rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                >
                  <Check size={12} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  title="إلغاء الكل"
                  onClick={() => setGroupPermissions(groupIds, false)}
                  disabled={noneSelected}
                  className="grid h-6 w-6 place-items-center rounded border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-30"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex w-full gap-1.5">
                {group.items.map((permission) => {
                  const checked = selectedIds.includes(permission.id);

                  return (
                    <label
                      key={permission.id}
                      title={permission.name}
                      className={`flex min-h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-bold transition ${
                        checked
                          ? "border-sky-300 bg-sky-50 text-sky-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePermission(permission.id)}
                        className="h-3.5 w-3.5 shrink-0 rounded border-slate-300 text-sky-600"
                      />
                      <span>{shortPermissionLabel(permission.slug)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={admin.btnSecondary}>
          إلغاء
        </button>
        <button type="submit" disabled={saving} className={admin.btnPrimary}>
          {saving ? "جاري الإنشاء..." : "إنشاء الدور"}
        </button>
      </div>
    </form>
  );
}

export function CreateRoleButton({ onClick }: { onClick: () => void }) {
  return (
    <CanAccess permission={AdminPermission.ROLES_CREATE}>
      <button type="button" onClick={onClick} className={admin.btnPrimary}>
        <Plus size={16} className="inline-block" />
        <span className="mr-1">إضافة دور</span>
      </button>
    </CanAccess>
  );
}
