/**
 * Airtable Consultation Operations
 *
 * CRUD operations for the Consultations table
 */

import { getAirtableBase, TABLES } from "../client";
import { v4 as uuidv4 } from "uuid";

export interface Consultation {
  consultationId: string;
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  googleMeetLink?: string;
  googleCalendarEventId?: string;
  createdAt: string;
  confirmedAt?: string;
}

export interface CreateConsultationInput {
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface UpdateConsultationInput {
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  googleMeetLink?: string;
  googleCalendarEventId?: string;
  confirmedAt?: string;
  notes?: string;
}

/**
 * Create a new consultation request
 */
export async function createConsultation(
  input: CreateConsultationInput
): Promise<Consultation> {
  const base = getAirtableBase();
  const table = base(TABLES.CONSULTATIONS);

  const consultationId = uuidv4();
  const now = new Date().toISOString();

  const record = await table.create({
    consultationId,
    name: input.name,
    email: input.email,
    phone: input.phone || "",
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
    status: "pending",
    notes: input.notes || "",
    googleMeetLink: "",
    googleCalendarEventId: "",
    createdAt: now,
    confirmedAt: "",
  });

  return {
    consultationId: record.get("consultationId") as string,
    name: record.get("name") as string,
    email: record.get("email") as string,
    phone: record.get("phone") as string | undefined,
    preferredDate: record.get("preferredDate") as string,
    preferredTime: record.get("preferredTime") as string,
    status: record.get("status") as
      | "pending"
      | "confirmed"
      | "completed"
      | "cancelled",
    notes: record.get("notes") as string | undefined,
    googleMeetLink: record.get("googleMeetLink") as string | undefined,
    googleCalendarEventId: record.get("googleCalendarEventId") as
      | string
      | undefined,
    createdAt: record.get("createdAt") as string,
    confirmedAt: record.get("confirmedAt") as string | undefined,
  };
}

/**
 * Find a consultation by ID
 */
export async function findConsultationById(
  consultationId: string
): Promise<Consultation | null> {
  const base = getAirtableBase();
  const table = base(TABLES.CONSULTATIONS);

  try {
    const records = await table
      .select({
        filterByFormula: `{consultationId} = '${consultationId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];

    return {
      consultationId: record.get("consultationId") as string,
      name: record.get("name") as string,
      email: record.get("email") as string,
      phone: record.get("phone") as string | undefined,
      preferredDate: record.get("preferredDate") as string,
      preferredTime: record.get("preferredTime") as string,
      status: record.get("status") as
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled",
      notes: record.get("notes") as string | undefined,
      googleMeetLink: record.get("googleMeetLink") as string | undefined,
      googleCalendarEventId: record.get("googleCalendarEventId") as
        | string
        | undefined,
      createdAt: record.get("createdAt") as string,
      confirmedAt: record.get("confirmedAt") as string | undefined,
    };
  } catch (error) {
    console.error("Error finding consultation:", error);
    return null;
  }
}

/**
 * Update a consultation
 */
export async function updateConsultation(
  consultationId: string,
  updates: UpdateConsultationInput
): Promise<Consultation | null> {
  const base = getAirtableBase();
  const table = base(TABLES.CONSULTATIONS);

  try {
    // Find the record
    const records = await table
      .select({
        filterByFormula: `{consultationId} = '${consultationId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const recordId = records[0].id;

    // Build update object
    const updateFields: any = {};
    if (updates.status !== undefined) updateFields.status = updates.status;
    if (updates.googleMeetLink !== undefined)
      updateFields.googleMeetLink = updates.googleMeetLink;
    if (updates.googleCalendarEventId !== undefined)
      updateFields.googleCalendarEventId = updates.googleCalendarEventId;
    if (updates.confirmedAt !== undefined)
      updateFields.confirmedAt = updates.confirmedAt;
    if (updates.notes !== undefined) updateFields.notes = updates.notes;

    const updatedRecord = await table.update(recordId, updateFields);

    return {
      consultationId: updatedRecord.get("consultationId") as string,
      name: updatedRecord.get("name") as string,
      email: updatedRecord.get("email") as string,
      phone: updatedRecord.get("phone") as string | undefined,
      preferredDate: updatedRecord.get("preferredDate") as string,
      preferredTime: updatedRecord.get("preferredTime") as string,
      status: updatedRecord.get("status") as
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled",
      notes: updatedRecord.get("notes") as string | undefined,
      googleMeetLink: updatedRecord.get("googleMeetLink") as
        | string
        | undefined,
      googleCalendarEventId: updatedRecord.get("googleCalendarEventId") as
        | string
        | undefined,
      createdAt: updatedRecord.get("createdAt") as string,
      confirmedAt: updatedRecord.get("confirmedAt") as string | undefined,
    };
  } catch (error) {
    console.error("Error updating consultation:", error);
    return null;
  }
}

/**
 * Get all consultations by status
 */
export async function getConsultationsByStatus(
  status: "pending" | "confirmed" | "completed" | "cancelled"
): Promise<Consultation[]> {
  const base = getAirtableBase();
  const table = base(TABLES.CONSULTATIONS);

  try {
    const records = await table
      .select({
        filterByFormula: `{status} = '${status}'`,
        sort: [{ field: "createdAt", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      consultationId: record.get("consultationId") as string,
      name: record.get("name") as string,
      email: record.get("email") as string,
      phone: record.get("phone") as string | undefined,
      preferredDate: record.get("preferredDate") as string,
      preferredTime: record.get("preferredTime") as string,
      status: record.get("status") as
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled",
      notes: record.get("notes") as string | undefined,
      googleMeetLink: record.get("googleMeetLink") as string | undefined,
      googleCalendarEventId: record.get("googleCalendarEventId") as
        | string
        | undefined,
      createdAt: record.get("createdAt") as string,
      confirmedAt: record.get("confirmedAt") as string | undefined,
    }));
  } catch (error) {
    console.error("Error getting consultations by status:", error);
    return [];
  }
}

/**
 * Get all consultations (for admin/trainer)
 */
export async function getAllConsultations(): Promise<Consultation[]> {
  const base = getAirtableBase();
  const table = base(TABLES.CONSULTATIONS);

  try {
    const records = await table
      .select({
        sort: [{ field: "createdAt", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      consultationId: record.get("consultationId") as string,
      name: record.get("name") as string,
      email: record.get("email") as string,
      phone: record.get("phone") as string | undefined,
      preferredDate: record.get("preferredDate") as string,
      preferredTime: record.get("preferredTime") as string,
      status: record.get("status") as
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled",
      notes: record.get("notes") as string | undefined,
      googleMeetLink: record.get("googleMeetLink") as string | undefined,
      googleCalendarEventId: record.get("googleCalendarEventId") as
        | string
        | undefined,
      createdAt: record.get("createdAt") as string,
      confirmedAt: record.get("confirmedAt") as string | undefined,
    }));
  } catch (error) {
    console.error("Error getting all consultations:", error);
    return [];
  }
}
