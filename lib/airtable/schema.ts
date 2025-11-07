/**
 * Airtable Schema Definitions
 *
 * This file defines the complete schema for all Airtable tables
 * used in The Fitness Priest application.
 */

export interface FieldDefinition {
  name: string;
  type: string;
  description?: string;
  options?: Record<string, any>;
}

export interface TableDefinition {
  name: string;
  description: string;
  fields: FieldDefinition[];
}

/**
 * Complete schema for all tables in the Airtable base
 */
export const AIRTABLE_SCHEMA: TableDefinition[] = [
  // ===================================
  // 1. USERS TABLE
  // ===================================
  {
    name: "Users",
    description: "Store all user accounts (clients and trainers)",
    fields: [
      {
        name: "userId",
        type: "singleLineText",
        description: "Unique user identifier"
      },
      {
        name: "email",
        type: "email",
        description: "User email address"
      },
      {
        name: "name",
        type: "singleLineText",
        description: "Full name"
      },
      {
        name: "role",
        type: "singleSelect",
        description: "User role in the system",
        options: {
          choices: [
            { name: "client" },
            { name: "trainer" },
            { name: "admin" }
          ]
        }
      },
      {
        name: "authProvider",
        type: "singleSelect",
        description: "Authentication provider used",
        options: {
          choices: [
            { name: "google" },
            { name: "email" }
          ]
        }
      },
      {
        name: "phone",
        type: "phoneNumber",
        description: "Contact phone number"
      },
      {
        name: "dateJoined",
        type: "date",
        description: "Account creation date",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "isActive",
        type: "checkbox",
        description: "Whether the account is active",
        options: {
          color: "greenBright",
          icon: "check"
        }
      },
      {
        name: "profileImage",
        type: "url",
        description: "Profile picture URL"
      },
      {
        name: "stripeCustomerId",
        type: "singleLineText",
        description: "Stripe customer ID for payments"
      }
    ]
  },

  // ===================================
  // 2. SUBSCRIPTIONS TABLE
  // ===================================
  {
    name: "Subscriptions",
    description: "Track active plans and payment subscriptions",
    fields: [
      {
        name: "subscriptionId",
        type: "singleLineText",
        description: "Unique subscription identifier"
      },
      {
        name: "userId",
        type: "singleLineText",
        description: "Reference to user (will be converted to linked record after Users table exists)"
      },
      {
        name: "planType",
        type: "singleSelect",
        description: "Subscription plan tier",
        options: {
          choices: [
            { name: "starter" },
            { name: "pro" },
            { name: "elite" }
          ]
        }
      },
      {
        name: "status",
        type: "singleSelect",
        description: "Current subscription status",
        options: {
          choices: [
            { name: "active" },
            { name: "cancelled" },
            { name: "past_due" },
            { name: "trialing" }
          ]
        }
      },
      {
        name: "stripeSubscriptionId",
        type: "singleLineText",
        description: "Stripe subscription ID"
      },
      {
        name: "startDate",
        type: "date",
        description: "Subscription start date",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "endDate",
        type: "date",
        description: "Subscription end date",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "sessionsIncluded",
        type: "number",
        description: "Total sessions included in plan",
        options: {
          precision: 0
        }
      },
      {
        name: "sessionsRemaining",
        type: "number",
        description: "Sessions remaining in current period",
        options: {
          precision: 0
        }
      },
      {
        name: "monthlyPrice",
        type: "currency",
        description: "Monthly subscription price",
        options: {
          precision: 2,
          symbol: "$"
        }
      },
      {
        name: "autoRenew",
        type: "checkbox",
        description: "Whether subscription auto-renews",
        options: {
          color: "greenBright",
          icon: "check"
        }
      }
    ]
  },

  // ===================================
  // 3. CONSULTATIONS TABLE
  // ===================================
  {
    name: "Consultations",
    description: "Free consultation booking requests",
    fields: [
      {
        name: "consultationId",
        type: "singleLineText",
        description: "Unique consultation identifier"
      },
      {
        name: "name",
        type: "singleLineText",
        description: "Client name"
      },
      {
        name: "email",
        type: "email",
        description: "Client email"
      },
      {
        name: "phone",
        type: "phoneNumber",
        description: "Client phone number"
      },
      {
        name: "preferredDate",
        type: "date",
        description: "Preferred consultation date",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "preferredTime",
        type: "singleLineText",
        description: "Preferred consultation time (e.g., '14:00')"
      },
      {
        name: "status",
        type: "singleSelect",
        description: "Consultation status",
        options: {
          choices: [
            { name: "pending" },
            { name: "confirmed" },
            { name: "completed" },
            { name: "cancelled" }
          ]
        }
      },
      {
        name: "notes",
        type: "multilineText",
        description: "Additional notes or goals"
      },
      {
        name: "googleMeetLink",
        type: "url",
        description: "Google Meet link for virtual consultation"
      },
      {
        name: "googleCalendarEventId",
        type: "singleLineText",
        description: "Google Calendar event ID"
      },
      {
        name: "createdAt",
        type: "date",
        description: "Request creation timestamp",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "confirmedAt",
        type: "date",
        description: "Confirmation timestamp",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      }
    ]
  },

  // ===================================
  // 4. TRAINER AVAILABILITY TABLE
  // ===================================
  {
    name: "TrainerAvailability",
    description: "Define when trainer is available for booking sessions",
    fields: [
      {
        name: "availabilityId",
        type: "singleLineText",
        description: "Unique availability slot identifier"
      },
      {
        name: "dayOfWeek",
        type: "singleSelect",
        description: "Day of the week",
        options: {
          choices: [
            { name: "monday" },
            { name: "tuesday" },
            { name: "wednesday" },
            { name: "thursday" },
            { name: "friday" },
            { name: "saturday" },
            { name: "sunday" }
          ]
        }
      },
      {
        name: "startTime",
        type: "singleLineText",
        description: "Start time in HH:mm format (e.g., '09:00')"
      },
      {
        name: "endTime",
        type: "singleLineText",
        description: "End time in HH:mm format (e.g., '17:00')"
      },
      {
        name: "isAvailable",
        type: "checkbox",
        description: "Whether this slot is currently available",
        options: {
          color: "greenBright",
          icon: "check"
        }
      },
      {
        name: "sessionDuration",
        type: "number",
        description: "Duration of each session in minutes",
        options: {
          precision: 0
        }
      },
      {
        name: "maxSessionsPerDay",
        type: "number",
        description: "Maximum sessions allowed per day",
        options: {
          precision: 0
        }
      }
    ]
  },

  // ===================================
  // 5. SESSIONS TABLE
  // ===================================
  {
    name: "Sessions",
    description: "All booked training sessions",
    fields: [
      {
        name: "sessionId",
        type: "singleLineText",
        description: "Unique session identifier"
      },
      {
        name: "clientId",
        type: "singleLineText",
        description: "Reference to client user (will be converted to linked record)"
      },
      {
        name: "subscriptionId",
        type: "singleLineText",
        description: "Reference to subscription (will be converted to linked record)"
      },
      {
        name: "sessionDate",
        type: "date",
        description: "Date of the session",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "sessionTime",
        type: "singleLineText",
        description: "Time of session in HH:mm format"
      },
      {
        name: "duration",
        type: "number",
        description: "Session duration in minutes",
        options: {
          precision: 0
        }
      },
      {
        name: "status",
        type: "singleSelect",
        description: "Session status",
        options: {
          choices: [
            { name: "scheduled" },
            { name: "completed" },
            { name: "cancelled" },
            { name: "no_show" }
          ]
        }
      },
      {
        name: "sessionType",
        type: "singleSelect",
        description: "Type of session",
        options: {
          choices: [
            { name: "in_person" },
            { name: "virtual" }
          ]
        }
      },
      {
        name: "googleMeetLink",
        type: "url",
        description: "Google Meet link for virtual sessions"
      },
      {
        name: "googleCalendarEventId",
        type: "singleLineText",
        description: "Google Calendar event ID"
      },
      {
        name: "notes",
        type: "multilineText",
        description: "Session notes"
      },
      {
        name: "completedAt",
        type: "date",
        description: "Session completion timestamp",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      }
    ]
  },

  // ===================================
  // 6. WORKOUT PLANS TABLE
  // ===================================
  {
    name: "WorkoutPlans",
    description: "Trainer-defined workout programs for clients",
    fields: [
      {
        name: "workoutPlanId",
        type: "singleLineText",
        description: "Unique workout plan identifier"
      },
      {
        name: "clientId",
        type: "singleLineText",
        description: "Reference to client (will be converted to linked record)"
      },
      {
        name: "sessionId",
        type: "singleLineText",
        description: "Optional reference to session (will be converted to linked record)"
      },
      {
        name: "planName",
        type: "singleLineText",
        description: "Name of the workout plan"
      },
      {
        name: "planDate",
        type: "date",
        description: "Date the plan is assigned for",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "focusArea",
        type: "multipleSelects",
        description: "Focus areas for this workout",
        options: {
          choices: [
            { name: "strength" },
            { name: "cardio" },
            { name: "flexibility" },
            { name: "endurance" }
          ]
        }
      },
      {
        name: "exercises",
        type: "multilineText",
        description: "JSON array of exercise objects (name, sets, reps, etc.)"
      },
      {
        name: "totalEstimatedTime",
        type: "number",
        description: "Estimated total time in minutes",
        options: {
          precision: 0
        }
      },
      {
        name: "notes",
        type: "multilineText",
        description: "Additional notes or instructions"
      },
      {
        name: "status",
        type: "singleSelect",
        description: "Workout plan status",
        options: {
          choices: [
            { name: "draft" },
            { name: "assigned" },
            { name: "in_progress" },
            { name: "completed" }
          ]
        }
      }
    ]
  },

  // ===================================
  // 7. WORKOUT LOGS TABLE
  // ===================================
  {
    name: "WorkoutLogs",
    description: "Client-logged workout data and performance tracking",
    fields: [
      {
        name: "workoutLogId",
        type: "singleLineText",
        description: "Unique workout log identifier"
      },
      {
        name: "clientId",
        type: "singleLineText",
        description: "Reference to client (will be converted to linked record)"
      },
      {
        name: "workoutPlanId",
        type: "singleLineText",
        description: "Optional reference to workout plan (will be converted to linked record)"
      },
      {
        name: "workoutDate",
        type: "date",
        description: "Date the workout was performed",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "exerciseName",
        type: "singleLineText",
        description: "Name of the exercise"
      },
      {
        name: "sets",
        type: "number",
        description: "Number of sets performed",
        options: {
          precision: 0
        }
      },
      {
        name: "reps",
        type: "number",
        description: "Number of reps per set",
        options: {
          precision: 0
        }
      },
      {
        name: "weight",
        type: "number",
        description: "Weight used",
        options: {
          precision: 2
        }
      },
      {
        name: "unit",
        type: "singleSelect",
        description: "Weight unit",
        options: {
          choices: [
            { name: "kg" },
            { name: "lbs" }
          ]
        }
      },
      {
        name: "duration",
        type: "number",
        description: "Exercise duration in minutes",
        options: {
          precision: 0
        }
      },
      {
        name: "notes",
        type: "multilineText",
        description: "Notes about the exercise or performance"
      },
      {
        name: "perceivedDifficulty",
        type: "number",
        description: "Difficulty rating 1-10",
        options: {
          precision: 0
        }
      },
      {
        name: "createdAt",
        type: "date",
        description: "Log creation timestamp",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      }
    ]
  },

  // ===================================
  // 8. BODY METRICS TABLE
  // ===================================
  {
    name: "BodyMetrics",
    description: "Track client body measurements and progress photos",
    fields: [
      {
        name: "metricId",
        type: "singleLineText",
        description: "Unique metric record identifier"
      },
      {
        name: "clientId",
        type: "singleLineText",
        description: "Reference to client (will be converted to linked record)"
      },
      {
        name: "recordDate",
        type: "date",
        description: "Date of measurement",
        options: {
          dateFormat: {
            name: "iso"
          }
        }
      },
      {
        name: "weight",
        type: "number",
        description: "Body weight",
        options: {
          precision: 2
        }
      },
      {
        name: "weightUnit",
        type: "singleSelect",
        description: "Weight measurement unit",
        options: {
          choices: [
            { name: "kg" },
            { name: "lbs" }
          ]
        }
      },
      {
        name: "bodyFatPercentage",
        type: "number",
        description: "Body fat percentage",
        options: {
          precision: 2
        }
      },
      {
        name: "muscleMass",
        type: "number",
        description: "Muscle mass in kg or lbs",
        options: {
          precision: 2
        }
      },
      {
        name: "chest",
        type: "number",
        description: "Chest circumference measurement",
        options: {
          precision: 2
        }
      },
      {
        name: "waist",
        type: "number",
        description: "Waist circumference measurement",
        options: {
          precision: 2
        }
      },
      {
        name: "hips",
        type: "number",
        description: "Hip circumference measurement",
        options: {
          precision: 2
        }
      },
      {
        name: "biceps",
        type: "number",
        description: "Bicep circumference measurement",
        options: {
          precision: 2
        }
      },
      {
        name: "thighs",
        type: "number",
        description: "Thigh circumference measurement",
        options: {
          precision: 2
        }
      },
      {
        name: "measurementUnit",
        type: "singleSelect",
        description: "Unit for body measurements",
        options: {
          choices: [
            { name: "cm" },
            { name: "inches" }
          ]
        }
      },
      {
        name: "notes",
        type: "multilineText",
        description: "Additional notes"
      }
    ]
  }
];

/**
 * Get table definition by name
 */
export function getTableDefinition(tableName: string): TableDefinition | undefined {
  return AIRTABLE_SCHEMA.find(table => table.name === tableName);
}

/**
 * Get all table names
 */
export function getTableNames(): string[] {
  return AIRTABLE_SCHEMA.map(table => table.name);
}
