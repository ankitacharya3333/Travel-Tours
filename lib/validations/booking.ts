import { z } from "zod";

export const BookingSchema = z.object({
  tripSlug: z.string().min(1, "Tour slug is required"),
  departureDate: z
    .string()
    .min(1, "Preferred departure date is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !isNaN(date.getTime()) && date >= today;
    }, "Departure date must be today or in the future"),
  travelerCount: z
    .number()
    .int("Traveler count must be an integer")
    .min(1, "At least 1 traveler is required")
    .max(20, "For groups larger than 20, please contact our group desk directly"),
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(120, "Email address is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits")
    .max(30, "Phone number cannot exceed 30 characters")
    .regex(/^[\+\d\s\-\(\)]+$/, "Phone number contains invalid characters"),
  nationality: z
    .string()
    .trim()
    .min(2, "Please provide your nationality")
    .max(60, "Nationality is too long"),
  specialRequirements: z
    .string()
    .trim()
    .max(1000, "Special requirements cannot exceed 1000 characters")
    .optional(),
  privacyAgreed: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy to submit a booking"),
  idempotencyKey: z.string().optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
