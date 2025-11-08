/**
 * Consultation Booking API Route
 *
 * Handles consultation booking requests
 */

import { NextRequest, NextResponse } from "next/server";
import { createConsultation, updateConsultation } from "@/lib/airtable/queries/consultations";
import {
  createConsultationEvent,
  formatCalendarDateTime,
} from "@/lib/google/calendar";
import {
  sendConsultationConfirmation,
  sendConsultationNotificationToTrainer,
} from "@/lib/email/client";
import { z } from "zod";

// Validation schema
const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  notes: z.string().optional(),
});

/**
 * POST /api/consultations
 * Create a new consultation booking
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = consultationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Step 1: Create consultation in Airtable
    const consultation = await createConsultation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      notes: data.notes,
    });

    // Step 2: Create Google Calendar event
    const { startDateTime, endDateTime } = formatCalendarDateTime(
      data.preferredDate,
      data.preferredTime
    );

    const calendarEvent = await createConsultationEvent({
      summary: `Consultation with ${data.name}`,
      description: `Free consultation call with ${data.name}\n\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\n\n${data.notes ? `Notes: ${data.notes}` : ""}`,
      startDateTime,
      endDateTime,
      attendeeEmail: data.email,
      attendeeName: data.name,
    });

    let googleMeetLink: string | undefined;
    let googleCalendarEventId: string | undefined;

    if (calendarEvent) {
      googleMeetLink = calendarEvent.meetLink;
      googleCalendarEventId = calendarEvent.id;

      // Update consultation with calendar info
      await updateConsultation(consultation.consultationId, {
        googleMeetLink,
        googleCalendarEventId,
        status: "confirmed",
        confirmedAt: new Date().toISOString(),
      });
    }

    // Step 3: Send confirmation email to client
    await sendConsultationConfirmation({
      to: data.email,
      name: data.name,
      date: formatDate(data.preferredDate),
      time: data.preferredTime,
      googleMeetLink,
    });

    // Step 4: Send notification to trainer
    await sendConsultationNotificationToTrainer({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: formatDate(data.preferredDate),
      time: data.preferredTime,
      notes: data.notes,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        consultation: {
          id: consultation.consultationId,
          googleMeetLink,
        },
        message: "Consultation booked successfully! Check your email for details.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      {
        error: "Failed to create consultation",
        message:
          error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
