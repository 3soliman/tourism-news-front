import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { getClientAdminToken } from "@/lib/auth/token";
import type { UploadedMedia } from "@/types";
import { resolveMediaUrl } from "@/lib/media-url";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

type UploadEnvelope = {
  success: boolean;
  message: string;
  data: UploadedMedia;
  errors?: Record<string, string[]>;
};

export type MediaUploadResult =
  | { ok: true; data: UploadedMedia }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function extractJsonPayload(text: string): UploadEnvelope | null {
  const trimmed = text.trim();
  const jsonStart = trimmed.indexOf("{");

  if (jsonStart === -1) {
    return null;
  }

  try {
    return JSON.parse(trimmed.slice(jsonStart)) as UploadEnvelope;
  } catch {
    return null;
  }
}

function messageFromHtmlResponse(text: string): string {
  const normalized = text.toLowerCase();

  if (
    normalized.includes("unable to create a temporary file")
    || normalized.includes("failed to upload")
  ) {
    return "تعذر رفع الملف على الخادم. أوقف php artisan serve وشغّل serve-dev.bat من مجلد tourism-news-backend.";
  }

  if (
    normalized.includes("upload_max_filesize")
    || normalized.includes("post content-length")
    || normalized.includes("too large")
  ) {
    return "حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت.";
  }

  return "استجابة غير صالحة من الخادم أثناء رفع الصورة.";
}

function toUploadError(error: unknown): MediaUploadResult {
  if (isConnectionError(error)) {
    return {
      ok: false,
      offline: true,
      message: "تعذر الاتصال بالـ API. تأكد أن Laravel يعمل على المنفذ 8070.",
    };
  }

  if (error instanceof ApiError) {
    const body = (error as ApiError & { body?: UploadEnvelope }).body;

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

export async function uploadAdminMedia(
  file: File,
  altText?: string,
): Promise<MediaUploadResult> {
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      message: "حجم الصورة يجب ألا يتجاوز 10 ميجابايت.",
    };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    if (altText?.trim()) {
      formData.append("alt_text", altText.trim());
    }

    const token = getClientAdminToken();
    const response = await fetch(`${API_URL}/admin/media/upload`, {
      method: "POST",
      cache: "no-store",
      body: formData,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const rawText = await response.text();
    const json = extractJsonPayload(rawText);

    if (!json) {
      return {
        ok: false,
        message: messageFromHtmlResponse(rawText),
      };
    }

    if (!response.ok) {
      const error = new ApiError(response.status, `${API_URL}/admin/media/upload`);
      (error as ApiError & { body?: UploadEnvelope }).body = json;
      throw error;
    }

    return {
      ok: true,
      data: { ...json.data, url: resolveMediaUrl(json.data.url) },
    };
  } catch (error) {
    return toUploadError(error);
  }
}
