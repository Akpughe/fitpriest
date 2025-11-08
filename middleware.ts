/**
 * Next.js Middleware
 *
 * Protects routes that require authentication (NextAuth v4)
 *
 * Note: Using Node.js runtime instead of Edge to support Airtable operations
 */

import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isLoggedIn = !!token;
      const pathname = req.nextUrl.pathname;

      // Trainer-only routes
      if (pathname.startsWith("/trainer")) {
        return isLoggedIn && (token.role === "trainer" || token.role === "admin");
      }

      // Protected routes
      const isProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/schedule") ||
        pathname.startsWith("/workout") ||
        pathname.startsWith("/analytics") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/consultation");

      if (isProtected) {
        return isLoggedIn;
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

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
  runtime: "nodejs",
};
