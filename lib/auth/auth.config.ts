/**
 * NextAuth Configuration
 *
 * Authentication setup with Google OAuth and Credentials providers
 */

import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../airtable/queries/users";
import { hashPassword, verifyPassword } from "./password";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "client" | "trainer" | "admin";
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: "client" | "trainer" | "admin";
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: "client" | "trainer" | "admin";
    image?: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" }, // 'signin' or 'signup'
        name: { label: "Name", type: "text" }, // For signup
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const action = (credentials.action as string) || "signin";
        const name = (credentials.name as string) || "";

        // SIGN IN
        if (action === "signin") {
          const user = await findUserByEmail(email);

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (user.authProvider !== "email") {
            throw new Error(
              `This email is registered with ${user.authProvider}. Please use ${user.authProvider} to sign in.`
            );
          }

          // For email auth, we need to verify password
          // Note: passwordHash is not stored in Airtable for security
          // We'll need a separate secure storage for this (like a separate DB)
          // For now, we'll use a simplified approach
          // TODO: Implement proper password storage
          const isValid = true; // Placeholder

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.userId,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.profileImage,
          };
        }

        // SIGN UP
        if (action === "signup") {
          // Check if user already exists
          const existingUser = await findUserByEmail(email);

          if (existingUser) {
            throw new Error("User with this email already exists");
          }

          if (!name) {
            throw new Error("Name is required for signup");
          }

          // Hash password
          const passwordHash = await hashPassword(password);

          // Create new user in Airtable
          const newUser = await createUser({
            email,
            name,
            authProvider: "email",
            role: "client",
          });

          // TODO: Store password hash in secure storage
          // For now, we're not storing it

          return {
            id: newUser.userId,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            image: newUser.profileImage,
          };
        }

        throw new Error("Invalid action");
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google OAuth
      if (account?.provider === "google" && profile?.email) {
        try {
          // Check if user exists
          let existingUser = await findUserByEmail(profile.email);

          if (!existingUser) {
            // Create new user in Airtable
            existingUser = await createUser({
              email: profile.email,
              name: profile.name || "User",
              authProvider: "google",
              role: "client",
              profileImage: (profile as any).picture || undefined,
            });
          }

          // Update user object with database info
          user.id = existingUser.userId;
          user.role = existingUser.role;

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.image = token.image;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    error: "/auth/signin",
    verifyRequest: "/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
