"use client";

import { useMemo, useState } from "react";
import { Check, Shield, X } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";
import CanAccess from "@/components/admin/CanAccess";
import { AdminPermission } from "@/lib/admin-permissions";
import {
  updateAdminRolePermissions,
  type AdminRoleRecord,
  type ApiPermission,
} from "@/lib/api/admin-roles";

const groupLabels: Record<string, string> = {
  admin: "عام",
  dashboard: "لوحة التحكم",
  news: "الأخبار",
  categories: "التصنيفات",
  countries: "الدول",
  authors: "الكتّاب",
  pages: "صفحات الثقة",
  analytics: "مراقبة القراءة",
  seo: "السيو",
  settings: "الإعدادات",
  media: "الوسائط",
  users: "المستخدمون",
  roles: "الأدوار",
};

const groupOrder = [
  "admin",
  "dashboard",
  "news",
  "categories",
  "countries",
  "authors",
  "pages",
  "analytics",
  "seo",
  "settings",
  "media",
  "users",
  "roles",
];

const actionLabels: Record<string, string> = {
  access: "دخول",
  view: "عرض",
  create: "إضافة",
  update: "تعديل",
  delete: "حذف",
  upload: "رفع",
};

type PermissionGroup = {
  key: string;
  label: string;
  items: ApiPermission[];
};

type RolePermissionsPanelProps = {
  initialRoles: AdminRoleRecord[];
  permissions: ApiPermission[];
};

function shortPermissionLabel(slug: string): string {
  const action = slug.split(".")[1] ?? slug;
  return actionLabels[action] ?? action;
}

function groupPermissions(permissions: ApiPermission[]): PermissionGroup[] {
  const groups = new Map<string, ApiPermission[]>();

  for (const permission of permissions) {
    const [prefix] = permission.slug.split(".");
    const key = prefix || "other";

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)!.push(permission);
  }

  const ordered = groupOrder
    .filter((key) => groups.has(key))
    .map((key) => ({
      key,
      label: groupLabels[key] ?? key,
      items: groups.get(key)!,
    }));

  const extras = Array.from(groups.entries())
    .filter(([key]) => !groupOrder.includes(key))
    .map(([key, items]) => ({
      key,
      label: groupLabels[key] ?? key,
      items,
    }));

  return [...ordered, ...extras];
}

export default function RolePermissionsPanel({
  initialRoles,
  permissions,
}: RolePermissionsPanelProps) {
  const [roles, setRoles] = useState(initialRoles);
  const [activeRoleId, setActiveRoleId] = useState(initialRoles[0]?.id ?? 0);
  const [drafts, setDrafts] = useState<Record<number, number[]>>(() =>
    Object.fromEntries(
      initialRoles.map((role) => [role.id, [...role.permissionIds]]),
    ),
  );
  const [savingRoleId, setSavingRoleId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const permissionGroups = useMemo(
    () => groupPermissions(permissions),
    [permissions],
  );

  const activeRole =
    roles.find((role) => role.id === activeRoleId) ?? roles[0] ?? null;

  const selectedIds = activeRole ? (drafts[activeRole.id] ?? []) : [];
  const isSuperAdmin = activeRole?.slug === "super-admin";

  const togglePermission = (roleId: number, permissionId: number) => {
    setDrafts((current) => {
      const selected = current[roleId] ?? [];
      const exists = selected.includes(permissionId);

      return {
        ...current,
        [roleId]: exists
          ? selected.filter((id) => id !== permissionId)
          : [...selected, permissionId],
      };
    });
  };

  const setGroupPermissions = (
    roleId: number,
    permissionIds: number[],
    enabled: boolean,
  ) => {
    setDrafts((current) => {
      const selected = new Set(current[roleId] ?? []);

      for (const id of permissionIds) {
        if (enabled) {
          selected.add(id);
        } else {
          selected.delete(id);
        }
      }

      return { ...current, [roleId]: Array.from(selected) };
    });
  };

  const handleSave = async (role: AdminRoleRecord) => {
    setSavingRoleId(role.id);
    setError(null);
    setSuccess(null);

    const result = await updateAdminRolePermissions(
      role.id,
      drafts[role.id] ?? [],
    );

    setSavingRoleId(null);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setRoles((current) =>
      current.map((item) => (item.id === role.id ? result.data : item)),
    );
    setDrafts((current) => ({
      ...current,
      [role.id]: [...result.data.permissionIds],
    }));
    setSuccess(`تم حفظ «${role.name}»`);
  };

  if (!activeRole) {
    return null;
  }

  return (
    <div className="w-full space-y-2">
      {error ? <div className={admin.error}>{error}</div> : null}
      {success ? <div className={admin.success}>{success}</div> : null}

      <div className="grid w-full grid-cols-2 gap-1.5 rounded-lg border border-slate-200 bg-white p-1.5 lg:grid-cols-4">
        {roles.map((role) => {
          const count = (drafts[role.id] ?? []).length;
          const active = role.id === activeRoleId;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => {
                setActiveRoleId(role.id);
                setError(null);
                setSuccess(null);
              }}
              className={`flex w-full items-center justify-between gap-1.5 rounded-md px-2.5 py-2 text-sm font-bold transition ${
                active
                  ? "bg-sky-600 text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="truncate">{role.name}</span>
              <span
                className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-black ${
                  active ? "bg-sky-500 text-white" : "bg-white text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sky-50 text-sky-600">
            <Shield size={16} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-black text-slate-900">{activeRole.name}</p>
            <p className="text-xs font-medium text-slate-500">
              {activeRole.usersCount} مستخدم · {selectedIds.length}/
              {permissions.length} صلاحية
            </p>
          </div>
        </div>

        <CanAccess permission={AdminPermission.ROLES_UPDATE}>
          {isSuperAdmin ? (
            <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
              ثابت — كل الصلاحيات
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleSave(activeRole)}
              disabled={savingRoleId === activeRole.id}
              className={admin.btnPrimary}
            >
              {savingRoleId === activeRole.id ? "جاري الحفظ..." : "حفظ"}
            </button>
          )}
        </CanAccess>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="hidden border-b border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500 md:grid md:grid-cols-[minmax(6.5rem,8.5rem)_2.75rem_1fr] md:items-center md:gap-2">
          <span>القسم</span>
          <span className="text-center">الكل</span>
          <span>الصلاحيات</span>
        </div>

        {permissionGroups.map((group, index) => {
          const groupIds = group.items.map((item) => item.id);
          const groupSelected = groupIds.filter((id) =>
            selectedIds.includes(id),
          ).length;
          const allSelected = groupSelected === groupIds.length;
          const noneSelected = groupSelected === 0;

          const toggleButtons = !isSuperAdmin ? (
            <div className="flex items-center justify-center gap-0.5">
              <button
                type="button"
                title="تحديد الكل"
                onClick={() =>
                  setGroupPermissions(activeRole.id, groupIds, true)
                }
                disabled={allSelected}
                className="grid h-6 w-6 place-items-center rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
              >
                <Check size={12} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                title="إلغاء الكل"
                onClick={() =>
                  setGroupPermissions(activeRole.id, groupIds, false)
                }
                disabled={noneSelected}
                className="grid h-6 w-6 place-items-center rounded border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-30"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>
          ) : null;

          return (
            <div
              key={group.key}
              className={`flex w-full flex-col gap-2 px-3 py-2 md:grid md:grid-cols-[minmax(6.5rem,8.5rem)_2.75rem_1fr] md:items-center md:gap-2 ${
                index > 0 ? "border-t border-slate-100" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2 md:block">
                <p className="text-sm font-black leading-tight text-slate-800">
                  {group.label}
                  <span className="mr-1.5 text-[11px] font-semibold text-slate-400">
                    {groupSelected}/{groupIds.length}
                  </span>
                </p>
                <div className="md:hidden">{toggleButtons}</div>
              </div>

              <div className="hidden md:block">
                {toggleButtons ?? <span />}
              </div>

              <div className="flex w-full gap-1.5">
                {group.items.map((permission) => {
                  const checked =
                    selectedIds.includes(permission.id) || isSuperAdmin;

                  return (
                    <label
                      key={permission.id}
                      title={permission.name}
                      className={`flex min-h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-bold transition ${
                        checked
                          ? "border-sky-300 bg-sky-50 text-sky-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      } ${isSuperAdmin ? "cursor-default opacity-80" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={isSuperAdmin}
                        onChange={() =>
                          togglePermission(activeRole.id, permission.id)
                        }
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

      <p className="text-[11px] font-medium text-slate-400">
        مرّر المؤشر على أي صلاحية لعرض الاسم الكامل.
      </p>
    </div>
  );
}
