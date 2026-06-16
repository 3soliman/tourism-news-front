import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import type { AdminCountryFormInput, ApiCountry, Country } from "@/types";
import { resolveMediaUrl } from "@/lib/media-url";

export type AdminCountryRecord = Country & {
  id: number;
  code: string;
  isActive: boolean;
  articlesCount: number;
  destinationsCount: number;
};

export type AdminMutationResult<T = AdminCountryRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapAdminCountry(raw: ApiCountry): AdminCountryRecord {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    flag: raw.flag ?? "🌍",
    image: resolveMediaUrl(raw.image ?? ""),
    region: raw.region ?? "",
    code: raw.code ?? "",
    isActive: raw.is_active ?? true,
    articlesCount: raw.articles_count ?? 0,
    destinationsCount: raw.destinations_count ?? 0,
  };
}

function toMutationError(error: unknown): AdminMutationResult {
  if (isConnectionError(error)) {
    return {
      ok: false,
      offline: true,
      message: "تعذر الاتصال بالـ API. تأكد أن Laravel يعمل على المنفذ 8070.",
    };
  }

  if (error instanceof ApiError) {
    const body = (error as ApiError & { body?: ApiEnvelope<unknown> }).body;

    return {
      ok: false,
      message: body?.message ?? `فشل الطلب (${error.status})`,
      errors: body?.errors,
    };
  }

  return {
    ok: false,
    message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
  };
}

export async function fetchAdminCountriesList(): Promise<AdminCountryRecord[]> {
  const json = await adminRequest<ApiCountry[]>("/admin/countries");
  return json.data.map(mapAdminCountry);
}

export async function fetchAdminCountryById(
  id: number,
): Promise<AdminCountryRecord | null> {
  try {
    const json = await adminRequest<ApiCountry>(`/admin/countries/${id}`);
    return mapAdminCountry(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminCountry(
  payload: AdminCountryFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiCountry>("/admin/countries", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminCountry(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminCountry(
  id: number,
  payload: Partial<AdminCountryFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiCountry>(`/admin/countries/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminCountry(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminCountry(
  id: number,
): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/countries/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toAdminCountryFormInput(
  country: AdminCountryRecord,
): AdminCountryFormInput {
  return {
    name: country.name,
    slug: country.slug,
    code: country.code,
    flag: country.flag,
    image: country.image ?? "",
    region: country.region,
    is_active: country.isActive,
  };
}

export function countryHasRelations(country: AdminCountryRecord): boolean {
  return country.articlesCount > 0 || country.destinationsCount > 0;
}
