/**
 * Next.js Middleware
 *
 * Protects routes that require authentication
 */

export { auth as middleware } from "@/lib/auth/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/schedule/:path*",
    "/workout/:path*",
    "/analytics/:path*",
    "/profile/:path*",
    "/consultation/:path*",
    "/trainer/:path*",
  ],
};
