import { apiFetch, isNotFoundError } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import { mapAuthor, mapAuthors } from "@/lib/mappers";
import type { ApiAuthor, Author } from "@/types";

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const data = await apiFetch<ApiAuthor[]>("/authors");
    return mapAuthors(data);
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
}

export async function fetchAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const data = await apiFetch<ApiAuthor>(`/authors/${slug}`);
    return mapAuthor(data);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    if (isConnectionError(error)) markApiOffline();
    return null;
  }
}
