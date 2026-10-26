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

export async function sendBookingNotifications(payload: BookingEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const businessRecipient = process.env.CONTACT_TO_EMAIL || "rmnrr333@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "bookings@himalayantrails.com";

  if (!apiKey) {
    console.warn(
      `[Email Service] RESEND_API_KEY is not configured. Simulating delivery for booking ${payload.reference} to ${businessRecipient}.`
    );
    return {
      businessSent: false,
      customerSent: false,
      simulated: true,
      log: `Simulated delivery: RESEND_API_KEY unset. Notification intended for ${businessRecipient}.`,
    };
  }

  const resend = new Resend(apiKey);
  let businessSent = false;
  let customerSent = false;
  const logs: string[] = [];

  // 1. Business notification
  try {
    const businessHtml = `
      <div style="font-family: Georgia, serif; color: #1c2621; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4dfd5;">
        <h2 style="color: #1e3328; margin-top: 0;">New Tour Booking Request: ${payload.reference}</h2>
        <p style="font-size: 14px; color: #5a6b61;">A new booking request has been submitted on the Himalayan Trails platform.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold; width: 40%;">Booking Reference:</td>
            <td style="padding: 8px 0; font-family: monospace; color: #b85a3a;">${payload.reference}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Tour Itinerary:</td>
            <td style="padding: 8px 0;">${payload.tourTitle}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Requested Departure:</td>
            <td style="padding: 8px 0;">${payload.departureDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Number of Travelers:</td>
            <td style="padding: 8px 0;">${payload.travelerCount} person(s)</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Calculated Snapshot Total:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1e3328;">$${payload.totalPriceUsd.toLocaleString()} USD</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Lead Traveler:</td>
            <td style="padding: 8px 0;">${payload.customerName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${payload.customerEmail}">${payload.customerEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">${payload.customerPhone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede6;">
            <td style="padding: 8px 0; font-weight: bold;">Nationality:</td>
            <td style="padding: 8px 0;">${payload.customerNationality}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Special Requirements:</td>
            <td style="padding: 8px 0;">${payload.specialRequirements || "None specified"}</td>
          </tr>
        </table>

        <div style="background-color: #efece5; padding: 12px; font-size: 12px; color: #4d5c53; margin-top: 20px;">
          <strong>Action Required:</strong> Log in to verify mountain permit availability, guide assignment, and send the official confirmation quote to the client.
        </div>
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

  // 2. Customer acknowledgment
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

        <h3 style="font-size: 15px; color: #1e3328; border-bottom: 1px solid #efece5; padding-bottom: 6px;">Requested Details:</h3>
        <ul style="font-size: 13px; color: #4d5c53; line-height: 1.7; padding-left: 20px;">
          <li><strong>Tour:</strong> ${payload.tourTitle}</li>
          <li><strong>Preferred Departure:</strong> ${payload.departureDate}</li>
          <li><strong>Party Size:</strong> ${payload.travelerCount} traveler(s)</li>
          <li><strong>Starting Price Estimate:</strong> $${payload.totalPriceUsd.toLocaleString()} USD (Sample estimate pending permit & flight alignment)</li>
          <li><strong>Status:</strong> <span style="background-color: #f5ebd7; color: #8a4e21; padding: 2px 6px; border-radius: 2px;">Pending Review</span></li>
        </ul>

        <div style="margin-top: 24px; font-size: 13px; color: #5a6b61; line-height: 1.6;">
          <p><strong>Next Steps:</strong></p>
          <p>Our Kathmandu expedition leads will review mountain lodge availability, local permits, and seasonal pacing. We will email you within 24 hours with a comprehensive itinerary proposal and formal confirmation details.</p>
        </div>

        <p style="font-size: 12px; color: #82998c; margin-top: 30px; border-top: 1px solid #efece5; padding-top: 12px;">
          Himalayan Trails Pvt. Ltd. • Thamel Marg, Ward 26, Kathmandu, Nepal • Phone: +977 (1) 470-0000
        </p>
      </div>
    `;

    const res = await resend.emails.send({
      from: fromEmail,
      to: payload.customerEmail,
      subject: `Your Himalayan Trails Booking Request (${payload.reference})`,
      html: customerHtml,
    });

    if (res.error) {
      logs.push(`Customer email error: ${res.error.message}`);
    } else {
      customerSent = true;
      logs.push(`Customer email delivered (ID: ${res.data?.id})`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logs.push(`Customer email exception: ${msg}`);
  }

  return {
    businessSent,
    customerSent,
    simulated: false,
    log: logs.join("; "),
  };
}
