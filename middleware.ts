/**
 * Next.js Middleware
 *
 * Protects routes that require authentication
 */

import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes require authentication
const protectedRoutes = [
  "/dashboard",
  "/schedule",
  "/workout",
  "/analytics",
  "/profile",
  "/consultation",
];

// Define trainer-only routes
const trainerRoutes = ["/trainer"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isTrainerRoute = trainerRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to signin if accessing protected route without auth
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect non-trainers trying to access trainer routes
  if (
    isTrainerRoute &&
    session?.user?.role !== "trainer" &&
    session?.user?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
