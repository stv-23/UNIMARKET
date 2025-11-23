import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register", "/api", "/favicon.ico"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const cookie = req.headers.get("cookie") || "";
  const match = cookie.split("; ").find(c => c.startsWith("unimarket_token="));
  const token = match?.split("=")[1];

  const JWT_SECRET = process.env.JWT_SECRET!;
  if (!token) {
    // redirect to login
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }
}

// Apply to all routes under app (except API/public) — tune matcher as needed:
export const config = {
  matcher: ["/home/:path*", "/market/:path*", "/profile/:path*", "/dashboard/:path*"],
};
