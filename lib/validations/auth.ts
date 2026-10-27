import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(120, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(60).optional(),
});

export const LoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const ProfileUpdateSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(60).optional(),
});

export const InquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().max(60).optional(),
  type: z.enum(["GENERAL", "CUSTOM_TOUR", "TRIP_SPECIFIC", "CORPORATE_OR_PRIVATE"]).default("GENERAL"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  customMessage: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  tripSlug: z.string().optional(),
  travelMonth: z.string().trim().max(60).optional(),
  groupSize: z.number().int().min(1).max(50).optional(),
  privacyAgreed: z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;
export type InquiryInput = z.infer<typeof InquirySchema>;
