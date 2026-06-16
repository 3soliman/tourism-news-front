import {
  fetchAdminCategoriesList,
  fetchAdminCategoryById,
  type AdminCategoryRecord,
} from "@/lib/api/admin-categories";
import {
  fetchAdminCountriesList,
  fetchAdminCountryById,
  type AdminCountryRecord,
} from "@/lib/api/admin-countries";
import { fetchAdminSeoOverview, type AdminSeoOverview } from "@/lib/api/admin-seo";
import { fetchAdminOverview, type AdminOverviewData } from "@/lib/api/admin-overview";
import { fetchAdminPagesList, fetchAdminPageBySlug } from "@/lib/api/admin-pages";
import {
  fetchAdminRolesList,
  fetchAdminPermissionsList,
  type AdminRoleRecord,
  type ApiPermission,
} from "@/lib/api/admin-roles";
import {
  fetchAdminUsersList,
  fetchAdminUserById,
  type ManagedUserRecord,
} from "@/lib/api/admin-users";
import type { Author, TrustPage } from "@/types";
import { fetchAdminNewsList, fetchAdminNewsById, type AdminNewsListQuery } from "@/lib/api/admin-news";
import { isConnectionError } from "@/lib/api/connection";
import type { PaginationMeta } from "@/types";
import type { AdminNewsRecord } from "@/lib/api/admin-news";

export type AdminLoadResult<T> =
  | { status: "success"; data: T; meta?: PaginationMeta }
  | { status: "offline" }
  | { status: "error"; message: string };

function toOfflineOrError(error: unknown): AdminLoadResult<never> {
  if (isConnectionError(error)) {
    return { status: "offline" };
  }

  return {
    status: "error",
    message: error instanceof Error ? error.message : "تعذر تحميل البيانات",
  };
}

export async function loadAdminNews(
  query: AdminNewsListQuery = { per_page: 20 },
): Promise<AdminLoadResult<AdminNewsRecord[]>> {
  try {
    const { articles, meta } = await fetchAdminNewsList(query);
    return { status: "success", data: articles, meta };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminNewsById(
  id: number,
): Promise<AdminLoadResult<AdminNewsRecord>> {
  try {
    const article = await fetchAdminNewsById(id);

    if (!article) {
      return { status: "error", message: "not-found" };
    }

    return { status: "success", data: article };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminAuthors(): Promise<AdminLoadResult<Author[]>> {
  try {
    const users = await fetchAdminUsersList();
    const authors = users
      .filter((user) => user.slug)
      .map((user) => ({
        id: user.id,
        slug: user.slug,
        name: user.publicName || user.name,
        role: user.authorTitle,
        image: user.image,
        bio: user.bio,
        isActive: user.status === "active",
      }));

    return { status: "success", data: authors };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminAuthorById(
  id: number,
): Promise<AdminLoadResult<Author>> {
  try {
    const user = await fetchAdminUserById(id);

    if (!user || !user.slug) {
      return { status: "error", message: "not-found" };
    }

    return {
      status: "success",
      data: {
        id: user.id,
        slug: user.slug,
        name: user.publicName || user.name,
        role: user.authorTitle,
        image: user.image,
        bio: user.bio,
        isActive: user.status === "active",
      },
    };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminCategories(): Promise<AdminLoadResult<AdminCategoryRecord[]>> {
  try {
    const categories = await fetchAdminCategoriesList();
    return { status: "success", data: categories };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminCategoryById(
  id: number,
): Promise<AdminLoadResult<AdminCategoryRecord>> {
  try {
    const category = await fetchAdminCategoryById(id);

    if (!category) {
      return { status: "error", message: "not-found" };
    }

    return { status: "success", data: category };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminCountries(): Promise<AdminLoadResult<AdminCountryRecord[]>> {
  try {
    const countries = await fetchAdminCountriesList();
    return { status: "success", data: countries };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminCountryById(
  id: number,
): Promise<AdminLoadResult<AdminCountryRecord>> {
  try {
    const country = await fetchAdminCountryById(id);

    if (!country) {
      return { status: "error", message: "not-found" };
    }

    return { status: "success", data: country };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminPages(): Promise<AdminLoadResult<TrustPage[]>> {
  try {
    const pages = await fetchAdminPagesList();
    return { status: "success", data: pages };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminPageBySlug(
  slug: string,
): Promise<AdminLoadResult<TrustPage>> {
  try {
    const page = await fetchAdminPageBySlug(slug);

    if (!page) {
      return { status: "error", message: "not-found" };
    }

    return { status: "success", data: page };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminSeoOverview(): Promise<AdminLoadResult<AdminSeoOverview>> {
  try {
    const data = await fetchAdminSeoOverview();
    return { status: "success", data };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminOverview(): Promise<AdminLoadResult<AdminOverviewData>> {
  try {
    const data = await fetchAdminOverview();
    return { status: "success", data };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminUsers(): Promise<AdminLoadResult<ManagedUserRecord[]>> {
  try {
    const users = await fetchAdminUsersList();
    return { status: "success", data: users };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminUserById(
  id: number,
): Promise<AdminLoadResult<ManagedUserRecord>> {
  try {
    const user = await fetchAdminUserById(id);

    if (!user) {
      return { status: "error", message: "not-found" };
    }

    return { status: "success", data: user };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminRoles(): Promise<AdminLoadResult<AdminRoleRecord[]>> {
  try {
    const roles = await fetchAdminRolesList();
    return { status: "success", data: roles };
  } catch (error) {
    return toOfflineOrError(error);
  }
}

export async function loadAdminPermissions(): Promise<AdminLoadResult<ApiPermission[]>> {
  try {
    const permissions = await fetchAdminPermissionsList();
    return { status: "success", data: permissions };
  } catch (error) {
    return toOfflineOrError(error);
  }
}
