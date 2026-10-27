import { Resend } from "resend";

export interface BookingEmailPayload {
  reference: string;
  tourTitle: string;
  departureDate: string;
  travelerCount: number;
  totalPriceUsd: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNationality: string;
  specialRequirements?: string;
}

export interface InquiryEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  type: string;
  subject: string;
  message: string;
  travelMonth?: string;
  groupSize?: number;
  tripTitle?: string;
}

export interface PasswordResetEmailPayload {
  name: string;
  email: string;
  resetLink: string;
}

export interface BookingStatusUpdatePayload {
  reference: string;
  tourTitle: string;
  newStatus: string;
  customerName: string;
  customerEmail: string;
  notes?: string;
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const businessRecipient = process.env.CONTACT_TO_EMAIL || "rmnrr333@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "bookings@himalayantrails.com";
  return { apiKey, businessRecipient, fromEmail };
}

// 1. Booking Notifications
export async function sendBookingNotifications(payload: BookingEmailPayload) {
  const { apiKey, businessRecipient, fromEmail } = getEmailConfig();

  if (!apiKey) {
    console.warn(`[Email Service] RESEND_API_KEY unset. Simulating booking notification for ${payload.reference}.`);
    return {
      businessSent: false,
      customerSent: false,
      simulated: true,
      log: `Simulated: RESEND_API_KEY unset. Target business: ${businessRecipient}.`,
    };
  }

  const resend = new Resend(apiKey);
  let businessSent = false;
  let customerSent = false;
  const logs: string[] = [];

  try {
    const businessHtml = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">New Tour Booking Request: ${payload.reference}</h2>
        <p style="font-size: 14px; color: #5a6b61;">A new booking request has been submitted on the Himalayan Trails platform.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold; width: 40%;">Reference:</td><td style="padding: 8px 0; font-family: monospace; color: #b85a3a;">${payload.reference}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Tour:</td><td style="padding: 8px 0;">${payload.tourTitle}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Departure Date:</td><td style="padding: 8px 0;">${payload.departureDate}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Travelers:</td><td style="padding: 8px 0;">${payload.travelerCount} person(s)</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Snapshot Total:</td><td style="padding: 8px 0; font-weight: bold; color: #1e3328;">$${payload.totalPriceUsd.toLocaleString()} USD</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Lead Traveler:</td><td style="padding: 8px 0;">${payload.customerName}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${payload.customerEmail}">${payload.customerEmail}</a></td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${payload.customerPhone}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Nationality:</td><td style="padding: 8px 0;">${payload.customerNationality}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Special Requests:</td><td style="padding: 8px 0;">${payload.specialRequirements || "None specified"}</td></tr>
        </table>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: businessRecipient,
      subject: `[Booking Request] ${payload.reference} — ${payload.tourTitle} (${payload.customerName})`,
      html: businessHtml,
    });

    if (res.error) {
      logs.push(`Business email error: ${res.error.message}`);
    } else {
      businessSent = true;
      logs.push(`Business email delivered (ID: ${res.data?.id})`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logs.push(`Business email exception: ${msg}`);
  }

  try {
    const customerHtml = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">Namaste ${payload.customerName},</h2>
        <p style="font-size: 14px; color: #5a6b61; line-height: 1.6;">
          Thank you for requesting to journey with Himalayan Trails. We have received your booking inquiry for <strong>${payload.tourTitle}</strong>.
        </p>
        <div style="background: #fbf9f5; border: 1px solid #e4dfd5; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-family: monospace; color: #82998c;">YOUR BOOKING REFERENCE</p>
          <p style="margin: 0; font-size: 20px; font-family: monospace; font-weight: bold; color: #b85a3a;">${payload.reference}</p>
        </div>
        <p style="font-size: 13px; color: #4d5c53;">Our Kathmandu operations desk will contact you within 24 hours with route permits and booking details.</p>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: payload.customerEmail,
      subject: `Your Himalayan Trails Booking Request (${payload.reference})`,
      html: customerHtml,
    });

    if (!res.error) {
      customerSent = true;
      logs.push(`Customer email delivered (ID: ${res.data?.id})`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logs.push(`Customer email exception: ${msg}`);
  }

  return { businessSent, customerSent, simulated: false, log: logs.join("; ") };
}

// 2. Inquiry Notifications
export async function sendInquiryNotifications(payload: InquiryEmailPayload) {
  const { apiKey, businessRecipient, fromEmail } = getEmailConfig();

  if (!apiKey) {
    console.warn(`[Email Service] RESEND_API_KEY unset. Simulating inquiry notification from ${payload.email} to ${businessRecipient}.`);
    return {
      businessSent: false,
      customerSent: false,
      simulated: true,
      log: `Simulated: RESEND_API_KEY unset. Inquiry for ${businessRecipient}.`,
    };
  }

  const resend = new Resend(apiKey);
  let businessSent = false;
  let customerSent = false;
  const logs: string[] = [];

  try {
    const businessHtml = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">New Travel Inquiry: [${payload.type}] ${payload.subject}</h2>
        <p style="font-size: 14px; color: #5a6b61;">A new travel consultation message has been submitted.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold; width: 35%;">Sender:</td><td style="padding: 8px 0;">${payload.fullName}</td></tr>
          <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
          ${payload.phone ? `<tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${payload.phone}</td></tr>` : ""}
          ${payload.country ? `<tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Country:</td><td style="padding: 8px 0;">${payload.country}</td></tr>` : ""}
          ${payload.tripTitle ? `<tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Related Tour:</td><td style="padding: 8px 0;">${payload.tripTitle}</td></tr>` : ""}
          ${payload.travelMonth ? `<tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Travel Window:</td><td style="padding: 8px 0;">${payload.travelMonth}</td></tr>` : ""}
          ${payload.groupSize ? `<tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 8px 0; font-weight: bold;">Group Size:</td><td style="padding: 8px 0;">${payload.groupSize} person(s)</td></tr>` : ""}
        </table>
        <div style="background-color: #fbf9f5; border: 1px solid #e4dfd5; padding: 14px; margin-top: 15px; font-size: 13px; line-height: 1.6;">
          <strong style="color: #1e3328; display: block; margin-bottom: 6px;">Message:</strong>
          ${payload.message.replace(/\n/g, "<br />")}
        </div>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: businessRecipient,
      subject: `[Inquiry: ${payload.type}] ${payload.subject} (${payload.fullName})`,
      html: businessHtml,
    });

    if (!res.error) {
      businessSent = true;
      logs.push(`Business inquiry email delivered (ID: ${res.data?.id})`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logs.push(`Inquiry exception: ${msg}`);
  }

  // Customer confirmation
  try {
    const customerHtml = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">Namaste ${payload.fullName},</h2>
        <p style="font-size: 14px; color: #5a6b61; line-height: 1.6;">
          We have received your message regarding <strong>${payload.subject}</strong>.
        </p>
        <p style="font-size: 13px; color: #4d5c53; line-height: 1.6;">
          Our Kathmandu expedition leads are reviewing your questions. You can expect a thoughtful, personalized response within 24 business hours.
        </p>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: `We have received your Himalayan Trails inquiry`,
      html: customerHtml,
    });

    if (!res.error) customerSent = true;
  } catch {
    // Non-blocking
  }

  return { businessSent, customerSent, simulated: false, log: logs.join("; ") };
}

// 3. Password Reset Email
export async function sendPasswordResetEmail(payload: PasswordResetEmailPayload) {
  const { apiKey, fromEmail } = getEmailConfig();

  if (!apiKey) {
    console.warn(`[Email Service] RESEND_API_KEY unset. Development Reset URL: ${payload.resetLink}`);
    return {
      sent: false,
      simulated: true,
      devResetLink: payload.resetLink,
    };
  }

  const resend = new Resend(apiKey);
  try {
    const html = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">Reset Your Password — Himalayan Trails</h2>
        <p style="font-size: 14px; color: #5a6b61;">Hello ${payload.name},</p>
        <p style="font-size: 14px; color: #5a6b61; line-height: 1.6;">
          We received a request to reset your password. Click the secure link below to choose a new password. This link is single-use and expires in 1 hour.
        </p>
        <p style="margin: 25px 0;">
          <a href="${payload.resetLink}" style="background-color: #1e3328; color: #fbf9f5; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: bold; font-size: 14px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p style="font-size: 12px; color: #82998c;">If you did not request this, please ignore this email. Your account remains secure.</p>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: `Reset your password — Himalayan Trails`,
      html,
    });

    return { sent: !res.error, simulated: false };
  } catch (err: unknown) {
    console.error("Password reset email failed:", err);
    return { sent: false, simulated: false };
  }
}

// 4. Booking Status Update Email
export async function sendBookingStatusUpdateEmail(payload: BookingStatusUpdatePayload) {
  const { apiKey, fromEmail } = getEmailConfig();

  if (!apiKey) {
    console.warn(`[Email Service] RESEND_API_KEY unset. Booking ${payload.reference} updated to ${payload.newStatus}.`);
    return { sent: false, simulated: true };
  }

  const resend = new Resend(apiKey);
  try {
    const html = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">Booking Update: ${payload.reference}</h2>
        <p style="font-size: 14px; color: #5a6b61;">Hello ${payload.customerName},</p>
        <p style="font-size: 14px; color: #5a6b61; line-height: 1.6;">
          The status of your booking request for <strong>${payload.tourTitle}</strong> has been updated to:
        </p>
        <p style="font-size: 16px; font-weight: bold; color: #b85a3a; font-family: monospace;">
          ${payload.newStatus}
        </p>
        ${payload.notes ? `<div style="background-color: #fbf9f5; border: 1px solid #e4dfd5; padding: 12px; margin: 16px 0; font-size: 13px;"><strong>Note from Operations:</strong><br />${payload.notes}</div>` : ""}
        <p style="font-size: 13px; color: #5a6b61;">
          You can review your reservation details at any time by logging into your <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account/bookings" style="color: #1e3328; font-weight: bold;">Himalayan Trails account</a>.
        </p>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: payload.customerEmail,
      subject: `Update on your booking ${payload.reference} — ${payload.newStatus}`,
      html,
    });

    return { sent: !res.error, simulated: false };
  } catch (err: unknown) {
    console.error("Booking status update email error:", err);
    return { sent: false, simulated: false };
  }
}
