/**
 * Resend Email Client
 *
 * Configuration and utilities for sending emails via Resend
 */

import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "noreply@fitnesspriest.com",
  replyTo: process.env.RESEND_REPLY_TO_EMAIL || "coach@fitnesspriest.com",
};

/**
 * Send a consultation confirmation email
 */
export async function sendConsultationConfirmation({
  to,
  name,
  date,
  time,
  googleMeetLink,
}: {
  to: string;
  name: string;
  date: string;
  time: string;
  googleMeetLink?: string;
}) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject: "Consultation Confirmed - The Fitness Priest",
      html: consultationConfirmationTemplate({
        name,
        date,
        time,
        googleMeetLink,
      }),
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error };
  }
}

/**
 * Send a consultation notification to trainer
 */
export async function sendConsultationNotificationToTrainer({
  name,
  email,
  phone,
  date,
  time,
  notes,
}: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const trainerEmail =
    process.env.TRAINER_EMAIL || "trainer@fitnesspriest.com";

  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: trainerEmail,
      subject: `New Consultation Request from ${name}`,
      html: trainerNotificationTemplate({
        name,
        email,
        phone,
        date,
        time,
        notes,
      }),
    });

    if (error) {
      console.error("Error sending trainer notification:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending trainer notification:", error);
    return { success: false, error };
  }
}

/**
 * Consultation confirmation email template
 */
function consultationConfirmationTemplate({
  name,
  date,
  time,
  googleMeetLink,
}: {
  name: string;
  date: string;
  time: string;
  googleMeetLink?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">THE FITNESS PRIEST</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 700;">Your Consultation is Confirmed!</h2>

              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px;">
                Hi ${name},
              </p>

              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 24px;">
                Great news! Your free consultation has been confirmed. I'm excited to help you achieve your fitness goals!
              </p>

              <!-- Appointment Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF5F0; border-left: 4px solid #FF5722; margin: 30px 0; border-radius: 4px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #000000; font-size: 18px; font-weight: 600;">Consultation Details</h3>
                    <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px;">
                      <strong>Date:</strong> ${date}
                    </p>
                    <p style="margin: 0 0 8px 0; color: #333333; font-size: 16px;">
                      <strong>Time:</strong> ${time}
                    </p>
                    <p style="margin: 0; color: #333333; font-size: 16px;">
                      <strong>Duration:</strong> 30 minutes
                    </p>
                  </td>
                </tr>
              </table>

              ${
                googleMeetLink
                  ? `
              <!-- Meet Link -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${googleMeetLink}" style="display: inline-block; background-color: #FF5722; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                  Join Google Meet
                </a>
              </div>
              `
                  : ""
              }

              <p style="margin: 30px 0 20px 0; color: #666666; font-size: 16px; line-height: 24px;">
                During this consultation, we'll discuss:
              </p>

              <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #666666; font-size: 16px; line-height: 28px;">
                <li>Your current fitness level and goals</li>
                <li>Your training history and experience</li>
                <li>Potential roadblocks and challenges</li>
                <li>How we can work together to achieve your goals</li>
              </ul>

              <p style="margin: 20px 0 0 0; color: #666666; font-size: 16px; line-height: 24px;">
                If you need to reschedule or have any questions, just reply to this email.
              </p>

              <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 24px;">
                See you soon!<br>
                <strong style="color: #000000;">The Fitness Priest</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 14px;">
                © 2025 The Fitness Priest. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Trainer notification email template
 */
function trainerNotificationTemplate({
  name,
  email,
  phone,
  date,
  time,
  notes,
}: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  notes?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 700;">New Consultation Request</h2>

              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 24px;">
                You have a new consultation request from a potential client:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                      <strong>Name:</strong> ${name}
                    </p>
                    <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                      <strong>Email:</strong> <a href="mailto:${email}" style="color: #FF5722;">${email}</a>
                    </p>
                    ${
                      phone
                        ? `
                    <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                      <strong>Phone:</strong> ${phone}
                    </p>
                    `
                        : ""
                    }
                    <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                      <strong>Preferred Date:</strong> ${date}
                    </p>
                    <p style="margin: 0; color: #333333; font-size: 16px;">
                      <strong>Preferred Time:</strong> ${time}
                    </p>
                  </td>
                </tr>
              </table>

              ${
                notes
                  ? `
              <div style="margin: 20px 0;">
                <h3 style="margin: 0 0 12px 0; color: #000000; font-size: 18px; font-weight: 600;">Notes:</h3>
                <p style="margin: 0; color: #666666; font-size: 16px; line-height: 24px; padding: 16px; background-color: #f9f9f9; border-radius: 4px;">
                  ${notes}
                </p>
              </div>
              `
                  : ""
              }

              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px;">
                This is an automated notification. The client has received a confirmation email with the Google Meet link.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
