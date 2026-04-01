import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("kasa_token")?.value;

  const protectedRoutes = [
    "/add-property",
    "/favorites",
    "/messages",
    "/profile",
    "/my-properties",
  ];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-property/:path*",
    "/favorites/:path*",
    "/messages/:path*",
    "/profile/:path*",
    "/my-properties/:path*",
  ],
};
