/**
 * Google Calendar API Integration
 *
 * Create calendar events with Google Meet links
 */

import { google } from "googleapis";

// Initialize Google Calendar API
function getCalendarClient() {
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  };

  const auth = new google.auth.GoogleAuth({
    credentials: credentials as any,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

export interface CreateCalendarEventInput {
  summary: string;
  description: string;
  startDateTime: string; // ISO 8601 format
  endDateTime: string; // ISO 8601 format
  attendeeEmail: string;
  attendeeName: string;
}

export interface CalendarEvent {
  id: string;
  htmlLink: string;
  meetLink?: string;
}

/**
 * Create a calendar event with Google Meet
 */
export async function createConsultationEvent(
  input: CreateCalendarEventInput
): Promise<CalendarEvent | null> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const event = {
      summary: input.summary,
      description: input.description,
      start: {
        dateTime: input.startDateTime,
        timeZone: "America/New_York", // TODO: Make this configurable
      },
      end: {
        dateTime: input.endDateTime,
        timeZone: "America/New_York",
      },
      attendees: [
        {
          email: input.attendeeEmail,
          displayName: input.attendeeName,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: `consultation-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    if (!response.data) {
      console.error("No response data from calendar API");
      return null;
    }

    return {
      id: response.data.id!,
      htmlLink: response.data.htmlLink!,
      meetLink: response.data.hangoutLink || undefined,
    };
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return null;
  }
}

/**
 * Update a calendar event
 */
export async function updateConsultationEvent(
  eventId: string,
  updates: Partial<CreateCalendarEventInput>
): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const event: any = {};

    if (updates.summary) event.summary = updates.summary;
    if (updates.description) event.description = updates.description;
    if (updates.startDateTime) {
      event.start = {
        dateTime: updates.startDateTime,
        timeZone: "America/New_York",
      };
    }
    if (updates.endDateTime) {
      event.end = {
        dateTime: updates.endDateTime,
        timeZone: "America/New_York",
      };
    }

    await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: event,
      sendUpdates: "all",
    });

    return true;
  } catch (error) {
    console.error("Error updating calendar event:", error);
    return false;
  }
}

/**
 * Cancel a calendar event
 */
export async function cancelConsultationEvent(
  eventId: string
): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: "all",
    });

    return true;
  } catch (error) {
    console.error("Error canceling calendar event:", error);
    return false;
  }
}

/**
 * Helper: Format date and time for calendar
 */
export function formatCalendarDateTime(date: string, time: string): {
  startDateTime: string;
  endDateTime: string;
} {
  // date format: "2025-01-10"
  // time format: "14:00"

  const [hours, minutes] = time.split(":");
  const startDate = new Date(date);
  startDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  // Consultation duration: 30 minutes
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  return {
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
  };
}
