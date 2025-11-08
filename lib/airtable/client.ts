/**
 * Airtable Client Configuration
 *
 * Provides configured Airtable clients for both:
 * 1. Record operations (using airtable SDK)
 * 2. Schema/metadata operations (using fetch API)
 */

import Airtable from "airtable";

// Environment variable validation
function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || "";
}

// Airtable configuration - lazy loaded to allow dotenv to load first
export const AIRTABLE_CONFIG = {
  get apiKey() {
    return getEnvVar("AIRTABLE_API_KEY", false);
  },
  get baseId() {
    return getEnvVar("AIRTABLE_BASE_ID", false);
  },
  metaApiUrl: "https://api.airtable.com/v0/meta",
  recordsApiUrl: "https://api.airtable.com/v0",
};

/**
 * Initialize Airtable SDK client for record operations
 * (Create, Read, Update, Delete records)
 */
export function getAirtableBase() {
  if (!AIRTABLE_CONFIG.apiKey) {
    throw new Error("AIRTABLE_API_KEY is not configured");
  }
  if (!AIRTABLE_CONFIG.baseId) {
    throw new Error("AIRTABLE_BASE_ID is not configured");
  }

  Airtable.configure({
    apiKey: AIRTABLE_CONFIG.apiKey,
  });

  return Airtable.base(AIRTABLE_CONFIG.baseId);
}

/**
 * Make a request to the Airtable Metadata API
 * Used for schema operations (create tables, create fields, etc.)
 */
export async function makeMetaApiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  if (!AIRTABLE_CONFIG.apiKey) {
    throw new Error("AIRTABLE_API_KEY is not configured");
  }

  const url = `${AIRTABLE_CONFIG.metaApiUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${AIRTABLE_CONFIG.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Airtable API request failed: ${response.status} ${response.statusText}\n${errorText}`
    );
  }

  return response.json();
}

/**
 * Get the schema of the current base
 */
export async function getBaseSchema() {
  if (!AIRTABLE_CONFIG.baseId) {
    throw new Error("AIRTABLE_BASE_ID is not configured");
  }

  return makeMetaApiRequest(`/bases/${AIRTABLE_CONFIG.baseId}/tables`);
}

/**
 * Create a new table in the base
 */
export async function createTable(tableDefinition: {
  name: string;
  description?: string;
  fields: Array<{
    name: string;
    type: string;
    description?: string;
    options?: Record<string, any>;
  }>;
}) {
  if (!AIRTABLE_CONFIG.baseId) {
    throw new Error("AIRTABLE_BASE_ID is not configured");
  }

  return makeMetaApiRequest(`/bases/${AIRTABLE_CONFIG.baseId}/tables`, {
    method: "POST",
    body: JSON.stringify(tableDefinition),
  });
}

/**
 * Check if a table exists in the base
 */
export async function tableExists(tableName: string): Promise<boolean> {
  try {
    const schema = await getBaseSchema();
    return schema.tables.some((table: any) => table.name === tableName);
  } catch (error) {
    console.error("Error checking if table exists:", error);
    return false;
  }
}

/**
 * Type-safe table name constants
 * Use these when accessing tables to avoid typos
 */
export const TABLES = {
  USERS: "Users",
  SUBSCRIPTIONS: "Subscriptions",
  CONSULTATIONS: "Consultations",
  TRAINER_AVAILABILITY: "TrainerAvailability",
  SESSIONS: "Sessions",
  WORKOUT_PLANS: "WorkoutPlans",
  WORKOUT_LOGS: "WorkoutLogs",
  BODY_METRICS: "BodyMetrics",
} as const;

export type TableName = (typeof TABLES)[keyof typeof TABLES];
