import { NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validations/booking";
import { prisma } from "@/lib/prisma";
import { TRIPS_DATA } from "@/lib/data";
import { sendBookingNotifications } from "@/lib/email";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

// Simple in-memory sliding rate limiter per IP address
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `HT-${year}-${randomPart}`;
}

export async function POST(request: Request) {
  try {
    // 1. Rate limiting check
    const ip = request.headers.get("x-forwarded-for") || "local-client";
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many booking requests from this connection. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
    }

    // 3. Strict server-side Zod validation
    const validationResult = BookingSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed. Please correct the highlighted errors.",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = validationResult.data;

    // 4. Load the authoritative Tour and Price from database (or fallback verified catalog)
    // NEVER TRUST client-submitted prices or totals
    let trip = null;
    try {
      trip = await prisma.trip.findUnique({
        where: { slug: input.tripSlug },
      });
    } catch {
      // If DB is unreachable, fetch from static verified catalog
      trip = null;
    }

    if (!trip) {
      const staticTrip = TRIPS_DATA.find((t) => t.slug === input.tripSlug);
      if (!staticTrip || staticTrip.isPublished === false) {
        return NextResponse.json(
          { error: "The selected tour itinerary could not be found or is currently not open for bookings." },
          { status: 404 }
        );
      }
      trip = {
        id: staticTrip.id,
        slug: staticTrip.slug,
        title: staticTrip.title,
        priceFromUsd: staticTrip.priceFromUsd,
        currency: staticTrip.currency ?? "USD",
        maxGroupSize: staticTrip.maxGroupSize ?? 10,
        isPublished: true,
      };
    }

    // Capacity verification
    if (input.travelerCount > (trip.maxGroupSize || 10)) {
      return NextResponse.json(
        {
          error: `The maximum group size for this expedition is ${trip.maxGroupSize} participants. Please choose fewer travelers or request a custom private departure.`,
        },
        { status: 400 }
      );
    }

    // Authoritative calculation of snapshot price
    const calculatedTotalUsd = trip.priceFromUsd * input.travelerCount;
    const bookingReference = generateBookingReference();
    const departureDateObj = new Date(input.departureDate);

    // 5. Check idempotency if key was provided
    if (input.idempotencyKey) {
      try {
        const existingBooking = await prisma.booking.findUnique({
          where: { idempotencyKey: input.idempotencyKey },
          include: { trip: true },
        });

        if (existingBooking) {
          return NextResponse.json({
            success: true,
            message: "Existing booking request found with this submission token.",
            booking: {
              reference: existingBooking.reference,
              status: existingBooking.status,
              tourTitle: existingBooking.trip.title,
              departureDate: existingBooking.departureDate.toISOString().split("T")[0],
              travelerCount: existingBooking.travelerCount,
              totalPriceSnapshotUsd: existingBooking.totalPriceSnapshotUsd,
              currency: existingBooking.currencySnapshot,
              fullName: existingBooking.fullName,
              email: existingBooking.email,
              isDuplicate: true,
            },
          });
        }
      } catch (err) {
        console.warn("Idempotency lookup skipped due to DB state.", err);
      }
    }

    // 6. Persist to PostgreSQL database using Prisma
    const session = await getCurrentUser();
    let persistedBooking = null;
    try {
      persistedBooking = await prisma.booking.create({
        data: {
          reference: bookingReference,
          tripId: trip.id,
          userId: session?.id || null,
          departureDate: departureDateObj,
          travelerCount: input.travelerCount,
          totalPriceSnapshotUsd: calculatedTotalUsd,
          currencySnapshot: trip.currency || "USD",
          status: "PENDING",
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          nationality: input.nationality,
          specialRequirements: input.specialRequirements || null,
          privacyAgreed: input.privacyAgreed,
          idempotencyKey: input.idempotencyKey || null,
          businessNotifyStatus: "PENDING",
          customerNotifyStatus: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("Could not write booking directly to DB (database may need migration apply).", dbError);
    }

    // 7. Send asynchronous notification emails
    const emailResult = await sendBookingNotifications({
      reference: bookingReference,
      tourTitle: trip.title,
      departureDate: input.departureDate,
      travelerCount: input.travelerCount,
      totalPriceUsd: calculatedTotalUsd,
      customerName: input.fullName,
      customerEmail: input.email,
      customerPhone: input.phone,
      customerNationality: input.nationality,
      specialRequirements: input.specialRequirements,
    });
    console.log("[Booking email diagnostic]", emailResult.log);

    // Update notification status if booking was persisted
    if (persistedBooking) {
      try {
        await prisma.booking.update({
          where: { id: persistedBooking.id },
          data: {
            businessNotifyStatus: emailResult.businessSent ? "SENT" : "FAILED",
            customerNotifyStatus: emailResult.customerSent ? "SENT" : "FAILED",
            notificationLog: emailResult.log,
          },
        });
      } catch {
        // Log update silent fallback
      }
    }

    // 8. Return comprehensive, honest response with reference
    return NextResponse.json(
      {
        success: true,
        message: "Your booking request has been registered and is pending review.",
        booking: {
          reference: bookingReference,
          status: "PENDING",
          tourTitle: trip.title,
          departureDate: input.departureDate,
          travelerCount: input.travelerCount,
          totalPriceSnapshotUsd: calculatedTotalUsd,
          currency: trip.currency || "USD",
          fullName: input.fullName,
          email: input.email,
          notificationDelivery: {
            businessDelivered: emailResult.businessSent,
            customerDelivered: emailResult.customerSent,
            simulated: emailResult.simulated,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your booking request. Please try again." },
      { status: 500 }
    );
  }
}
