import { z } from "zod";

/**
 * Validation rules for Full Name:
 * - Required field
 * - Min length: 3 characters, Max length: 100 characters
 * - Letters (English & Unicode including combining marks), spaces, hyphens, apostrophes
 * - Leading/trailing spaces trimmed
 * - No consecutive spaces or consecutive separators (-- or '') or adjacent different separators (-' or '-)
 * - Cannot start or end with a separator
 */
export const FullNameSchema = z
  .string()
  .trim()
  .min(1, "Full Name is required")
  .min(3, "Full Name must be at least 3 characters")
  .max(100, "Full Name cannot exceed 100 characters")
  .regex(
    /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
    "Full Name must contain only letters, single spaces, hyphens, or apostrophes without consecutive separators"
  );

/**
 * Validation rules for Phone Number (Required):
 * - Digits only (0-9)
 * - Required
 * - Max length: 30
 * - Preserves leading zeros and keeps as string
 */
export const RequiredPhoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .max(30, "Phone number cannot exceed 30 digits")
  .regex(/^\d+$/, "Phone number must contain digits only (0-9)");

/**
 * Validation rules for Phone Number (Optional):
 * - Digits only (0-9) if provided
 * - Max length: 30
 * - Allows empty string or undefined
 */
export const OptionalPhoneSchema = z
  .union([
    z
      .string()
      .max(30, "Phone number cannot exceed 30 digits")
      .regex(/^\d+$/, "Phone number must contain digits only (0-9)"),
    z.literal(""),
  ])
  .optional();
