import type { AdminUser } from "@/types";
import { getServerAdminToken } from "@/lib/auth/token";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

type MeEnvelope = {
  success: boolean;
  data: AdminUser;
};

export async function verifyAdminSession(): Promise<AdminUser | null> {
  const token = await getServerAdminToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/me`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as MeEnvelope;

    return json.success ? json.data : null;
  } catch {
    return null;
  }
}
