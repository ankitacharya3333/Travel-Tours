import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, phone, country } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // Return safe message without exposing account presence details
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in or reset your password." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        phone: phone || null,
        country: country || null,
        role: "CUSTOMER", // Default role is strictly CUSTOMER
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Auto-link any previous guest bookings made with this email
    try {
      await prisma.booking.updateMany({
        where: { email: normalizedEmail, userId: null },
        data: { userId: newUser.id },
      });
    } catch {
      // Non-blocking
    }

    // Set secure HTTP-only session cookie
    await setSessionCookie(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during account registration. Please try again." },
      { status: 500 }
    );
  }
}
