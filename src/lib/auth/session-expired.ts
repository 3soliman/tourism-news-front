import { clearClientAdminToken } from "@/lib/auth/token";

const LOGIN_PATH = "/admin/login";

export function redirectToAdminLogin(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname.startsWith(LOGIN_PATH)) {
    return;
  }

  clearClientAdminToken();

  const loginUrl = new URL(LOGIN_PATH, window.location.origin);
  loginUrl.searchParams.set("stale", "1");
  loginUrl.searchParams.set(
    "next",
    `${window.location.pathname}${window.location.search}`,
  );

  window.location.assign(loginUrl.toString());
}
