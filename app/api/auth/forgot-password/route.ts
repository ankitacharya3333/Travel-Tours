import { NextResponse } from "next/server";
import { ForgotPasswordSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const validation = ForgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const { email } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    let devResetLink: string | undefined = undefined;

    // Only generate token if user exists, but always return generic success message to prevent user enumeration
    if (user) {
      const { token, hash, expiresAt } = generatePasswordResetToken();

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordTokenHash: hash,
          resetPasswordExpiresAt: expiresAt,
        },
      });

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const resetLink = `${baseUrl}/reset-password?token=${token}`;

      const emailResult = await sendPasswordResetEmail({
        name: user.name,
        email: user.email,
        resetLink,
      });

      // Development fallback if Resend API key is unconfigured
      if (emailResult.simulated && process.env.NODE_ENV !== "production") {
        devResetLink = emailResult.devResetLink;
      }
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, password reset instructions have been sent.",
      ...(devResetLink ? { devResetLink } : {}),
    });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
