import { NextResponse } from "next/server";
import { InquirySchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendInquiryNotifications } from "@/lib/email";
import { TRIPS_DATA } from "@/lib/data";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many inquiries submitted from this network. Please wait a moment." },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    const validation = InquirySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Please correct the highlighted form errors.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const input = validation.data;
    const session = await getCurrentUser();

    // Link trip if tripSlug provided
    let tripId: string | null = null;
    let tripTitle: string | undefined = undefined;

    if (input.tripSlug) {
      try {
        const dbTrip = await prisma.trip.findUnique({ where: { slug: input.tripSlug } });
        if (dbTrip) {
          tripId = dbTrip.id;
          tripTitle = dbTrip.title;
        }
      } catch {
        const staticTrip = TRIPS_DATA.find((t) => t.slug === input.tripSlug);
        if (staticTrip) {
          tripId = staticTrip.id;
          tripTitle = staticTrip.title;
        }
      }
    }

    // Persist to PostgreSQL via Prisma
    let inquiry = null;
    try {
      inquiry = await prisma.inquiry.create({
        data: {
          fullName: input.fullName,
          email: input.email.toLowerCase().trim(),
          phone: input.phone || null,
          country: input.country || null,
          type: input.type,
          subject: input.subject,
          customMessage: input.customMessage,
          travelMonth: input.travelMonth || null,
          groupSize: input.groupSize || 1,
          status: "NEW",
          userId: session?.id || null,
          tripId: tripId,
        },
      });
    } catch (dbErr) {
      console.warn("Could not persist inquiry directly to database, proceeding to notification.", dbErr);
    }

    // Dispatch email notification
    await sendInquiryNotifications({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      country: input.country,
      type: input.type,
      subject: input.subject,
      message: input.customMessage,
      travelMonth: input.travelMonth,
      groupSize: input.groupSize,
      tripTitle,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. Your inquiry has been registered with our Kathmandu office.",
        inquiryId: inquiry?.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
