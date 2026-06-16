import { AdminPermission } from "@/lib/admin-permissions";
import type { AdminPermissionSlug } from "@/lib/admin-permissions";

type RoutePermissionRule = {
  pattern: RegExp;
  permission: AdminPermissionSlug | AdminPermissionSlug[];
};

const routePermissionRules: RoutePermissionRule[] = [
  { pattern: /^\/admin\/news\/create$/, permission: AdminPermission.NEWS_CREATE },
  { pattern: /^\/admin\/news\/\d+\/edit$/, permission: AdminPermission.NEWS_UPDATE },
  { pattern: /^\/admin\/news(?:\/|$)/, permission: AdminPermission.NEWS_VIEW },

  { pattern: /^\/admin\/analytics(?:\/|$)/, permission: AdminPermission.ANALYTICS_VIEW },

  {
    pattern: /^\/admin\/categories\/create$/,
    permission: AdminPermission.CATEGORIES_CREATE,
  },
  {
    pattern: /^\/admin\/categories\/\d+\/edit$/,
    permission: AdminPermission.CATEGORIES_UPDATE,
  },
  {
    pattern: /^\/admin\/categories(?:\/|$)/,
    permission: AdminPermission.CATEGORIES_VIEW,
  },

  {
    pattern: /^\/admin\/countries\/create$/,
    permission: AdminPermission.COUNTRIES_CREATE,
  },
  {
    pattern: /^\/admin\/countries\/\d+\/edit$/,
    permission: AdminPermission.COUNTRIES_UPDATE,
  },
  {
    pattern: /^\/admin\/countries(?:\/|$)/,
    permission: AdminPermission.COUNTRIES_VIEW,
  },

  {
    pattern: /^\/admin\/pages\/[^/]+\/edit$/,
    permission: AdminPermission.PAGES_UPDATE,
  },
  { pattern: /^\/admin\/pages(?:\/|$)/, permission: AdminPermission.PAGES_VIEW },

  { pattern: /^\/admin\/seo(?:\/|$)/, permission: AdminPermission.SEO_VIEW },
  {
    pattern: /^\/admin\/settings(?:\/|$)/,
    permission: AdminPermission.SETTINGS_VIEW,
  },

  { pattern: /^\/admin\/users\/create$/, permission: AdminPermission.USERS_CREATE },
  {
    pattern: /^\/admin\/users\/\d+\/edit$/,
    permission: AdminPermission.USERS_UPDATE,
  },
  { pattern: /^\/admin\/users(?:\/|$)/, permission: AdminPermission.USERS_VIEW },

  { pattern: /^\/admin\/roles(?:\/|$)/, permission: AdminPermission.ROLES_VIEW },

  { pattern: /^\/admin$/, permission: AdminPermission.DASHBOARD_VIEW },
];

export function resolveAdminRoutePermission(
  pathname: string,
): AdminPermissionSlug | AdminPermissionSlug[] | null {
  for (const rule of routePermissionRules) {
    if (rule.pattern.test(pathname)) {
      return rule.permission;
    }
  }

  return null;
}
