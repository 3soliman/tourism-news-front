import { apiFetch, apiFetchPaginated, isNotFoundError } from "@/lib/api/client";
import {
  isConnectionError,
  markApiOffline,
} from "@/lib/api/connection";
import { mapCategories, mapCategory } from "@/lib/mappers";
import type { ApiCategory, Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<ApiCategory[]>("/categories");
    return mapCategories(data);
  } catch (error) {
    if (isNotFoundError(error)) return [];
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
}

export async function fetchCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  try {
    const data = await apiFetch<ApiCategory>(`/categories/${slug}`);
    return mapCategory(data);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    if (isConnectionError(error)) markApiOffline();
    return null;
  }
}
