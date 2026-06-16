import { ADMIN_TOKEN_COOKIE, ADMIN_TOKEN_MAX_AGE } from "@/lib/auth/constants";

export function getClientAdminToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ADMIN_TOKEN_COOKIE}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

export function setClientAdminToken(token: string): void {
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${ADMIN_TOKEN_MAX_AGE}; SameSite=Lax`;
}

export function clearClientAdminToken(): void {
  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export async function getServerAdminToken(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}
