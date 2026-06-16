import { adminRequest } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import { toStoredMediaPath } from "@/lib/media-url";

export type AdminAppearanceSettings = {
  background_images: string[];
};

export type AdminAppearanceMutationResult =
  | { ok: true; data: AdminAppearanceSettings }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

export async function fetchAdminAppearanceSettings(): Promise<AdminAppearanceSettings> {
  const json = await adminRequest<AdminAppearanceSettings>("/admin/settings/appearance");
  return json.data;
}

export async function updateAdminAppearanceSettings(
  background_images: string[],
): Promise<AdminAppearanceMutationResult> {
  try {
    const json = await adminRequest<AdminAppearanceSettings>("/admin/settings/appearance", {
      method: "PUT",
      body: JSON.stringify({
        background_images: background_images
          .map((url) => toStoredMediaPath(url))
          .filter(Boolean),
      }),
    });

    return { ok: true, data: json.data };
  } catch (error) {
    return toApiMutationError(error);
  }
}
