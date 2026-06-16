import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";

export type AdminSeoSettings = {
  google_news_publisher_id: string;
  google_news_channel_url: string;
  google_news_publication_name: string;
  google_news_language: string;
  news_sitemap_enabled: boolean;
  news_sitemap_window_hours: number;
  site_name: string;
  site_url: string;
  sitemap_url: string;
  news_sitemap_url: string;
};

export type AdminSeoSettingsInput = {
  google_news_publisher_id?: string;
  google_news_channel_url?: string;
  google_news_publication_name?: string;
  google_news_language?: string;
  news_sitemap_enabled?: boolean;
  news_sitemap_window_hours?: number;
};

export type AdminSettingsMutationResult =
  | { ok: true; data: AdminSeoSettings }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function toMutationError(error: unknown): AdminSettingsMutationResult {
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

export async function fetchAdminSeoSettings(): Promise<AdminSeoSettings> {
  const json = await adminRequest<AdminSeoSettings>("/admin/settings/seo");
  return json.data;
}

export async function updateAdminSeoSettings(
  payload: AdminSeoSettingsInput,
): Promise<AdminSettingsMutationResult> {
  try {
    const json = await adminRequest<AdminSeoSettings>("/admin/settings/seo", {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: json.data };
  } catch (error) {
    return toMutationError(error);
  }
}
