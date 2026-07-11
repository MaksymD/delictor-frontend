import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

const ADMIN_USER = "kollektiv";
const ADMIN_PASS = "kollektiv2026";

function isAuthorized(request: NextRequest): boolean {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Basic ")) return false;
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = atob(base64Credentials);
    const [user, pass] = credentials.split(":");
    return user === ADMIN_USER && pass === ADMIN_PASS;
}

function unauthorizedResponse() {
    return new NextResponse("Authentication required.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect the admin upload API
    if (pathname.startsWith("/api/admin")) {
        return isAuthorized(request) ? NextResponse.next() : unauthorizedResponse();
    }

    // Skip other internal paths
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return;
    }

    // Protect the admin page
    if (/^\/(en|de)\/admin/.test(pathname)) {
        if (!isAuthorized(request)) {
            return unauthorizedResponse();
        }
    }

    const pathnameHasLocale = locales.some((locale) =>
        pathname.startsWith(`/${locale}`)
    );

    if (!pathnameHasLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};