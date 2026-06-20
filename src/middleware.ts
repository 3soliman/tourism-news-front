import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { lookupRedirect } from "@/lib/api/redirects";
import { isExternalRedirectPath, normalizeRedirectPath } from "@/lib/redirect-path";

const LOGIN_PATH = "/admin/login";

const PUBLIC_FILE = /\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|json)$/i;

function buildRedirectDestination(request: NextRequest, toPath: string): URL {
  if (isExternalRedirectPath(toPath)) {
    return new URL(toPath);
  }

  return new URL(normalizeRedirectPath(toPath), request.url);
}

async function handlePublicRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return null;
  }

  const redirect = await lookupRedirect(normalizeRedirectPath(pathname));

  if (!redirect) {
    return null;
  }

  const destination = buildRedirectDestination(request, redirect.to_path);
  const statusCode = redirect.status_code === 302 ? 302 : 301;

  return NextResponse.redirect(destination, statusCode);
}

function handleAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname === LOGIN_PATH) {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    if (request.nextUrl.searchParams.get("stale") === "1") {
      response.cookies.delete(ADMIN_TOKEN_COOKIE);
    }

    return response;
  }

  if (!token) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return handleAdminAuth(request);
  }

  const redirectResponse = await handlePublicRedirect(request);

  if (redirectResponse) {
    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
