import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  console.log("🟦 [MIDDLEWARE] PATH:", path);
  console.log("🟦 [MIDDLEWARE] TOKEN:", token);

  const protectedRoutes = ["/favorites", "/add-property", "/messaging"];

  const isProtected = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  console.log("🟦 [MIDDLEWARE] isProtected:", isProtected);

  if (isProtected && !token) {
    console.log("❌ [MIDDLEWARE] NO TOKEN → REDIRECT /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("🟩 [MIDDLEWARE] ACCESS GRANTED → NEXT()");
  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites/:path*", "/add-property/:path*", "/messaging/:path*"],
};
