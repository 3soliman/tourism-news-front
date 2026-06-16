import type { AdminUser } from "@/types";

export const AdminPermission = {
  ACCESS: "admin.access",
  DASHBOARD_VIEW: "dashboard.view",

  NEWS_VIEW: "news.view",
  NEWS_CREATE: "news.create",
  NEWS_UPDATE: "news.update",
  NEWS_DELETE: "news.delete",

  CATEGORIES_VIEW: "categories.view",
  CATEGORIES_CREATE: "categories.create",
  CATEGORIES_UPDATE: "categories.update",
  CATEGORIES_DELETE: "categories.delete",

  COUNTRIES_VIEW: "countries.view",
  COUNTRIES_CREATE: "countries.create",
  COUNTRIES_UPDATE: "countries.update",
  COUNTRIES_DELETE: "countries.delete",

  AUTHORS_VIEW: "authors.view",
  AUTHORS_CREATE: "authors.create",
  AUTHORS_UPDATE: "authors.update",
  AUTHORS_DELETE: "authors.delete",

  PAGES_VIEW: "pages.view",
  PAGES_UPDATE: "pages.update",

  ANALYTICS_VIEW: "analytics.view",

  SEO_VIEW: "seo.view",
  SEO_UPDATE: "seo.update",

  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",

  MEDIA_UPLOAD: "media.upload",

  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",

  ROLES_VIEW: "roles.view",
  ROLES_UPDATE: "roles.update",
} as const;

export type AdminPermissionSlug =
  (typeof AdminPermission)[keyof typeof AdminPermission];

export function hasPermission(
  user: AdminUser | null | undefined,
  permission: AdminPermissionSlug | string,
): boolean {
  if (!user) {
    return false;
  }

  if (user.is_super_admin) {
    return true;
  }

  return (user.permissions ?? []).includes(permission);
}

export function hasAnyPermission(
  user: AdminUser | null | undefined,
  permissions: Array<AdminPermissionSlug | string>,
): boolean {
  if (!user) {
    return false;
  }

  if (user.is_super_admin) {
    return true;
  }

  return permissions.some((permission) =>
    (user.permissions ?? []).includes(permission),
  );
}

export function canAccessAdmin(user: AdminUser | null | undefined): boolean {
  return hasPermission(user, AdminPermission.ACCESS);
}
