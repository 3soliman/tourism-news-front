import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";

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
  return toApiMutationError(error);
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
