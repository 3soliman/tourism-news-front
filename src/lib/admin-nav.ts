import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Eye,
  FileText,
  Home,
  LayoutGrid,
  MapPin,
  Newspaper,
  Settings,
  Shield,
  UserCog,
  Users,
} from "lucide-react";
import { AdminPermission } from "@/lib/admin-permissions";
import type { AdminPermissionSlug } from "@/lib/admin-permissions";
import { hasAnyPermission } from "@/lib/admin-permissions";
import type { AdminUser } from "@/types";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  permission?: AdminPermissionSlug | AdminPermissionSlug[];
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "لوحة التحكم",
    icon: Home,
    exact: true,
    permission: AdminPermission.DASHBOARD_VIEW,
  },
  {
    href: "/admin/news",
    label: "الأخبار",
    icon: Newspaper,
    permission: AdminPermission.NEWS_VIEW,
  },
  {
    href: "/admin/analytics",
    label: "مراقبة القراءة",
    icon: Eye,
    permission: AdminPermission.ANALYTICS_VIEW,
  },
  {
    href: "/admin/categories",
    label: "التصنيفات",
    icon: LayoutGrid,
    permission: AdminPermission.CATEGORIES_VIEW,
  },
  {
    href: "/admin/countries",
    label: "الدول",
    icon: MapPin,
    permission: AdminPermission.COUNTRIES_VIEW,
  },
  {
    href: "/admin/pages",
    label: "صفحات الثقة",
    icon: FileText,
    permission: AdminPermission.PAGES_VIEW,
  },
  {
    href: "/admin/seo",
    label: "السيو",
    icon: BarChart3,
    permission: AdminPermission.SEO_VIEW,
  },
  {
    href: "/admin/settings",
    label: "الإعدادات",
    icon: Settings,
    permission: AdminPermission.SETTINGS_VIEW,
  },
];

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "الرئيسية",
    items: [
      {
        href: "/admin",
        label: "نظرة عامة",
        icon: Home,
        exact: true,
        permission: AdminPermission.DASHBOARD_VIEW,
      },
    ],
  },
  {
    label: "المحتوى",
    items: [
      {
        href: "/admin/news",
        label: "الأخبار",
        icon: Newspaper,
        permission: AdminPermission.NEWS_VIEW,
      },
      {
        href: "/admin/analytics",
        label: "مراقبة القراءة",
        icon: Eye,
        permission: AdminPermission.ANALYTICS_VIEW,
      },
      {
        href: "/admin/categories",
        label: "التصنيفات",
        icon: LayoutGrid,
        permission: AdminPermission.CATEGORIES_VIEW,
      },
      {
        href: "/admin/countries",
        label: "الدول",
        icon: MapPin,
        permission: AdminPermission.COUNTRIES_VIEW,
      },
      {
        href: "/admin/pages",
        label: "صفحات الثقة",
        icon: FileText,
        permission: AdminPermission.PAGES_VIEW,
      },
    ],
  },
  {
    label: "النشر",
    items: [
      {
        href: "/admin/seo",
        label: "السيو و Google News",
        icon: BarChart3,
        permission: AdminPermission.SEO_VIEW,
      },
      {
        href: "/admin/settings",
        label: "الإعدادات",
        icon: Settings,
        permission: AdminPermission.SETTINGS_VIEW,
      },
    ],
  },
  {
    label: "النظام",
    items: [
      {
        href: "/admin/users",
        label: "المستخدمون",
        icon: UserCog,
        permission: AdminPermission.USERS_VIEW,
      },
      {
        href: "/admin/roles",
        label: "الأدوار والصلاحيات",
        icon: Shield,
        permission: AdminPermission.ROLES_VIEW,
      },
    ],
  },
];

export function filterAdminNavGroups(user: AdminUser): AdminNavGroup[] {
  return adminNavGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (!item.permission) {
          return true;
        }

        const permissions = Array.isArray(item.permission)
          ? item.permission
          : [item.permission];

        return hasAnyPermission(user, permissions);
      }),
    }))
    .filter((group) => group.items.length > 0);
}

export function isAdminNavActive(pathname: string, item: AdminNavItem) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
