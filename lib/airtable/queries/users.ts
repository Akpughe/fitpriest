/**
 * Airtable User Operations
 *
 * CRUD operations for the Users table
 */

import { getAirtableBase, TABLES } from "../client";
import { v4 as uuidv4 } from "uuid";
import type { FieldSet, Records } from "airtable";

export interface User {
  userId: string;
  email: string;
  name: string;
  role: "client" | "trainer" | "admin";
  authProvider: "google" | "email";
  phone?: string;
  dateJoined: string;
  isActive: boolean;
  profileImage?: string;
  stripeCustomerId?: string;
  passwordHash?: string; // Only for email auth, not stored in Airtable
}

export interface CreateUserInput {
  email: string;
  name: string;
  role?: "client" | "trainer" | "admin";
  authProvider: "google" | "email";
  phone?: string;
  profileImage?: string;
  passwordHash?: string;
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  profileImage?: string;
  isActive?: boolean;
  stripeCustomerId?: string;
}

/**
 * Create a new user in Airtable
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  const userId = uuidv4();
  const now = new Date().toISOString();

  const record = await table.create({
    userId,
    email: input.email,
    name: input.name,
    role: input.role || "client",
    authProvider: input.authProvider,
    phone: input.phone || "",
    dateJoined: now,
    isActive: true,
    profileImage: input.profileImage || "",
    stripeCustomerId: "",
  });

  return {
    userId: record.get("userId") as string,
    email: record.get("email") as string,
    name: record.get("name") as string,
    role: record.get("role") as "client" | "trainer" | "admin",
    authProvider: record.get("authProvider") as "google" | "email",
    phone: record.get("phone") as string | undefined,
    dateJoined: record.get("dateJoined") as string,
    isActive: record.get("isActive") as boolean,
    profileImage: record.get("profileImage") as string | undefined,
    stripeCustomerId: record.get("stripeCustomerId") as string | undefined,
  };
}

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  try {
    const records = await table
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];

    return {
      userId: record.get("userId") as string,
      email: record.get("email") as string,
      name: record.get("name") as string,
      role: record.get("role") as "client" | "trainer" | "admin",
      authProvider: record.get("authProvider") as "google" | "email",
      phone: record.get("phone") as string | undefined,
      dateJoined: record.get("dateJoined") as string,
      isActive: record.get("isActive") as boolean,
      profileImage: record.get("profileImage") as string | undefined,
      stripeCustomerId: record.get("stripeCustomerId") as string | undefined,
    };
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

/**
 * Find a user by userId
 */
export async function findUserById(userId: string): Promise<User | null> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  try {
    const records = await table
      .select({
        filterByFormula: `{userId} = '${userId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];

    return {
      userId: record.get("userId") as string,
      email: record.get("email") as string,
      name: record.get("name") as string,
      role: record.get("role") as "client" | "trainer" | "admin",
      authProvider: record.get("authProvider") as "google" | "email",
      phone: record.get("phone") as string | undefined,
      dateJoined: record.get("dateJoined") as string,
      isActive: record.get("isActive") as boolean,
      profileImage: record.get("profileImage") as string | undefined,
      stripeCustomerId: record.get("stripeCustomerId") as string | undefined,
    };
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
}

/**
 * Update a user's information
 */
export async function updateUser(
  userId: string,
  updates: UpdateUserInput
): Promise<User | null> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  try {
    // First, find the record ID
    const records = await table
      .select({
        filterByFormula: `{userId} = '${userId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const recordId = records[0].id;

    // Update the record
    const updateFields: Partial<FieldSet> = {};
    if (updates.name !== undefined) updateFields.name = updates.name;
    if (updates.phone !== undefined) updateFields.phone = updates.phone;
    if (updates.profileImage !== undefined)
      updateFields.profileImage = updates.profileImage;
    if (updates.isActive !== undefined)
      updateFields.isActive = updates.isActive;
    if (updates.stripeCustomerId !== undefined)
      updateFields.stripeCustomerId = updates.stripeCustomerId;

    const updatedRecord = await table.update(recordId, updateFields);

    return {
      userId: updatedRecord.get("userId") as string,
      email: updatedRecord.get("email") as string,
      name: updatedRecord.get("name") as string,
      role: updatedRecord.get("role") as "client" | "trainer" | "admin",
      authProvider: updatedRecord.get("authProvider") as "google" | "email",
      phone: updatedRecord.get("phone") as string | undefined,
      dateJoined: updatedRecord.get("dateJoined") as string,
      isActive: updatedRecord.get("isActive") as boolean,
      profileImage: updatedRecord.get("profileImage") as string | undefined,
      stripeCustomerId: updatedRecord.get("stripeCustomerId") as
        | string
        | undefined,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

/**
 * Delete/deactivate a user (soft delete)
 */
export async function deactivateUser(userId: string): Promise<boolean> {
  try {
    const updated = await updateUser(userId, { isActive: false });
    return updated !== null;
  } catch (error) {
    console.error("Error deactivating user:", error);
    return false;
  }
}

/**
 * Get all active users (for admin purposes)
 */
export async function getAllActiveUsers(): Promise<User[]> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  try {
    const records = await table
      .select({
        filterByFormula: "{isActive} = TRUE()",
        sort: [{ field: "dateJoined", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      userId: record.get("userId") as string,
      email: record.get("email") as string,
      name: record.get("name") as string,
      role: record.get("role") as "client" | "trainer" | "admin",
      authProvider: record.get("authProvider") as "google" | "email",
      phone: record.get("phone") as string | undefined,
      dateJoined: record.get("dateJoined") as string,
      isActive: record.get("isActive") as boolean,
      profileImage: record.get("profileImage") as string | undefined,
      stripeCustomerId: record.get("stripeCustomerId") as string | undefined,
    }));
  } catch (error) {
    console.error("Error getting all active users:", error);
    return [];
  }
}

/**
 * Get users by role
 */
export async function getUsersByRole(
  role: "client" | "trainer" | "admin"
): Promise<User[]> {
  const base = getAirtableBase();
  const table = base(TABLES.USERS);

  try {
    const records = await table
      .select({
        filterByFormula: `AND({role} = '${role}', {isActive} = TRUE())`,
        sort: [{ field: "dateJoined", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      userId: record.get("userId") as string,
      email: record.get("email") as string,
      name: record.get("name") as string,
      role: record.get("role") as "client" | "trainer" | "admin",
      authProvider: record.get("authProvider") as "google" | "email",
      phone: record.get("phone") as string | undefined,
      dateJoined: record.get("dateJoined") as string,
      isActive: record.get("isActive") as boolean,
      profileImage: record.get("profileImage") as string | undefined,
      stripeCustomerId: record.get("stripeCustomerId") as string | undefined,
    }));
  } catch (error) {
    console.error(`Error getting users by role ${role}:`, error);
    return [];
  }
}
