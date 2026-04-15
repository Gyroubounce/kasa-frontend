import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // -----------------------------
  // 1) Routes publiques
  // -----------------------------
  const publicRoutes = [
    "/",
    "/about",
    "/login",
    "/register",
    "/forgot-password",
    "/unauthorized",
  ];

  // Pages publiques dynamiques
  if (pathname.startsWith("/properties")) {
    return NextResponse.next();
  }

  // Si route publique → laisser passer
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // -----------------------------
  // 2) Lire le cookie token
  // -----------------------------
  const token = req.cookies.get("token")?.value;

  // Si pas de token → redirection login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // -----------------------------
  // 3) Vérifier l'utilisateur via /auth/me
  // -----------------------------
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const meRes = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!meRes.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { user } = await meRes.json();

    // -----------------------------
    // 4) Protection OWNER / ADMIN
    // -----------------------------
    if (pathname.startsWith("/add-property")) {
      if (user.role !== "owner" && user.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  } catch  {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// -----------------------------
// 5) Matcher : routes protégées
// -----------------------------
export const config = {
  matcher: [
    "/favorites",
    "/messaging/:path*",
    "/add-property",
    "/logout",
  ],
};
