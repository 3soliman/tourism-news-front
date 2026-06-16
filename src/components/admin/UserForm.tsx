"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AdminFormHeader from "@/components/admin/AdminFormHeader";
import { admin } from "@/components/admin/admin-ui";
import {
  createAdminUser,
  updateAdminUser,
  type ManagedUserFormInput,
} from "@/lib/api/admin-users";
import type { AdminRoleRecord } from "@/lib/api/admin-roles";

type UserFormProps = {
  mode: "create" | "edit";
  userId?: number;
  initial: ManagedUserFormInput;
  roles: AdminRoleRecord[];
};

export default function UserForm({
  mode,
  userId,
  initial,
  roles,
}: UserFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ManagedUserFormInput>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRole = (roleId: number) => {
    setForm((current) => {
      const exists = current.role_ids.includes(roleId);

      return {
        ...current,
        role_ids: exists
          ? current.role_ids.filter((id) => id !== roleId)
          : [...current.role_ids, roleId],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    if (form.role_ids.length === 0) {
      setSubmitting(false);
      setError("يجب اختيار دور واحد على الأقل");
      return;
    }

    const payload: Partial<ManagedUserFormInput> = {
      name: form.name.trim(),
      email: form.email.trim(),
      status: form.status,
      role_ids: form.role_ids,
    };

    if (mode === "create" || form.password.trim()) {
      payload.password = form.password;
    }

    const result =
      mode === "create"
        ? await createAdminUser({
            ...form,
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          })
        : await updateAdminUser(userId!, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push("/admin/users");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <AdminFormHeader
        backHref="/admin/users"
        backLabel="العودة إلى المستخدمين"
        title={mode === "create" ? "إضافة مستخدم" : "تعديل المستخدم"}
        submitLabel={mode === "create" ? "إنشاء المستخدم" : "حفظ التعديلات"}
        submitting={submitting}
      />

      {error ? <div className={admin.error}>{error}</div> : null}

      <DashboardSection title="بيانات الحساب">
        <div className={admin.formGrid2}>
          <label>
            <span className={admin.label}>الاسم</span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>البريد الإلكتروني</span>
            <input
              required
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>
              {mode === "create" ? "كلمة المرور" : "كلمة مرور جديدة (اختياري)"}
            </span>
            <input
              type="password"
              dir="ltr"
              required={mode === "create"}
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className={admin.input}
              minLength={mode === "create" ? 8 : undefined}
            />
          </label>

          <label>
            <span className={admin.label}>الحالة</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as "active" | "inactive",
                }))
              }
              className={admin.input}
            >
              <option value="active">نشط</option>
              <option value="inactive">معطّل</option>
            </select>
          </label>
        </div>
      </DashboardSection>

      <DashboardSection title="الأدوار">
        <div className="grid gap-2 sm:grid-cols-2">
          {roles.map((role) => {
            const checked = form.role_ids.includes(role.id);

            return (
              <label
                key={role.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition ${
                  checked
                    ? "border-sky-200 bg-sky-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleRole(role.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    {role.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium text-slate-500">
                    {role.description || role.slug}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </DashboardSection>
    </form>
  );
}
