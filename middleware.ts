import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/",
    "/about",
    "/login",
    "/register",
    "/forgot-password",
    "/unauthorized",
  ];

  if (pathname.startsWith("/properties")) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/favorites",
    "/messaging/:path*",
    "/add-property",
    "/logout",
  ],
};
