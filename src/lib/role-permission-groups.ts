import type { ApiPermission } from "@/lib/api/admin-roles";

export const groupLabels: Record<string, string> = {
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

export const groupOrder = [
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

export const actionLabels: Record<string, string> = {
  access: "دخول",
  view: "عرض",
  create: "إضافة",
  update: "تعديل",
  delete: "حذف",
  upload: "رفع",
};

export type PermissionGroup = {
  key: string;
  label: string;
  items: ApiPermission[];
};

export function shortPermissionLabel(slug: string): string {
  const action = slug.split(".")[1] ?? slug;
  return actionLabels[action] ?? action;
}

export function groupPermissions(permissions: ApiPermission[]): PermissionGroup[] {
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

export const reservedRoleSlugs = [
  "super-admin",
  "editor-in-chief",
  "editor",
  "analyst",
];

export function isReservedRoleSlug(slug: string): boolean {
  return reservedRoleSlugs.includes(slug);
}
