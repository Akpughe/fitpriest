/**
 * NextAuth Initialization
 *
 * Main auth instance and helper functions (NextAuth v4)
 */

import NextAuth, { NextAuthOptions } from "next-auth";
import { authConfig } from "./auth.config";

const handler = NextAuth(authConfig as NextAuthOptions);

export { handler as GET, handler as POST };
export default handler;
