"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema, type BookingInput } from "@/lib/validations/booking";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Users, Send, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface BookingFormProps {
  trip: {
    id: string;
    slug: string;
    title: string;
    priceFromUsd: number;
    currency?: string;
    maxGroupSize?: number;
  };
}

interface BookingSuccessState {
  reference: string;
  status: string;
  tourTitle: string;
  departureDate: string;
  travelerCount: number;
  totalPriceSnapshotUsd: number;
  currency: string;
  fullName: string;
  email: string;
}

export function BookingForm({ trip }: BookingFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<BookingSuccessState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate an idempotency key on initial load
  const [idempotencyKey] = useState(() => `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      tripSlug: trip.slug,
      travelerCount: 2,
      privacyAgreed: true,
      departureDate: "",
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      specialRequirements: "",
      idempotencyKey,
    },
  });

  const travelerCount = watch("travelerCount") || 1;
  const estimatedTotal = trip.priceFromUsd * Number(travelerCount);

  const onSubmit = async (data: BookingInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          travelerCount: Number(data.travelerCount),
          tripSlug: trip.slug,
          idempotencyKey,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "Unable to submit booking request. Please check your information.");
        setIsSubmitting(false);
        return;
      }

      setBookingSuccess(result.booking);
    } catch {
      setServerError("A network error occurred while connecting to our Kathmandu reservation desk. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#1e3328]/30 shadow-md">
        <div className="flex items-center gap-3 text-emerald-800 mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#1e3328]">Booking Request Received</h3>
            <p className="text-xs text-[#5a6b61]">Status: <span className="font-mono font-semibold text-[#b85a3a] uppercase">Pending Operator Review</span></p>
          </div>
        </div>

        <div className="bg-[#fbf9f5] border border-[#e4dfd5] p-4 rounded-sm space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-[#82998c] font-mono uppercase">Reference:</span>
            <span className="font-mono font-bold text-[#1e3328]">{bookingSuccess.reference}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#82998c] font-mono uppercase">Tour Itinerary:</span>
            <span className="font-medium text-[#1e3328] text-right">{bookingSuccess.tourTitle}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#82998c] font-mono uppercase">Preferred Date:</span>
            <span className="text-[#1e3328]">{bookingSuccess.departureDate}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#82998c] font-mono uppercase">Travelers:</span>
            <span className="text-[#1e3328]">{bookingSuccess.travelerCount} person(s)</span>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-[#e4dfd5]">
            <span className="text-[#82998c] font-mono uppercase">Sample Total:</span>
            <span className="font-bold text-[#b85a3a]">{formatCurrency(bookingSuccess.totalPriceSnapshotUsd)} USD</span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-[#4d5c53] leading-relaxed">
          <p>
            An acknowledgment email has been routed to <strong>{bookingSuccess.email}</strong>. Our operations team in Kathmandu is checking trail permits and seasonal teahouse space.
          </p>
          <p>
            No payment has been charged. Formal confirmation and custom payment arrangements will follow via email within 24 hours.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#f0ede6] flex flex-wrap gap-3">
          <Link
            href="/trips"
            className="inline-flex px-4 py-2 text-xs font-semibold rounded-sm bg-[#1e3328] text-white hover:bg-[#15241c] transition-colors"
          >
            Explore More Treks
          </Link>
          <button
            type="button"
            onClick={() => setBookingSuccess(null)}
            className="inline-flex px-4 py-2 text-xs font-medium rounded-sm border border-[#d1cbc2] text-[#4d5c53] hover:bg-[#efece5] transition-colors cursor-pointer"
          >
            Modify / New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#e4dfd5] shadow-xs">
      <div className="mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
          Reserve Departure
        </span>
        <h3 className="text-2xl font-serif text-[#1e3328] font-medium mt-1">
          Request This Journey
        </h3>
        <p className="text-xs text-[#5a6b61] mt-1 leading-relaxed">
          Sample starting rate: <strong>{formatCurrency(trip.priceFromUsd)} USD</strong> per person. Final quote confirmed after permit validation.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-sm bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <strong>Submission Notice:</strong> {serverError}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden inputs */}
        <input type="hidden" {...register("tripSlug")} />
        <input type="hidden" {...register("idempotencyKey")} />

        {/* Date and Travelers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureDate" className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#4d5c53] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#b85a3a]" />
              <span>Preferred Date *</span>
            </label>
            <input
              id="departureDate"
              type="date"
              {...register("departureDate")}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.departureDate ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.departureDate && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.departureDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="travelerCount" className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#4d5c53] mb-1">
              <Users className="w-3.5 h-3.5 text-[#b85a3a]" />
              <span>Travelers *</span>
            </label>
            <input
              id="travelerCount"
              type="number"
              min={1}
              max={trip.maxGroupSize || 10}
              {...register("travelerCount", { valueAsNumber: true })}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.travelerCount ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.travelerCount && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.travelerCount.message}</p>
            )}
          </div>
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Rachel Adams"
              {...register("fullName")}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.fullName ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              placeholder="rachel@example.com"
              {...register("email")}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.email ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone and Nationality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
              Phone / WhatsApp (with country code) *
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 555-0199 or +44 7700..."
              {...register("phone")}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.phone ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nationality" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
              Passport Nationality *
            </label>
            <input
              id="nationality"
              type="text"
              placeholder="e.g. Canadian, German, Australian"
              {...register("nationality")}
              className={`w-full px-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                errors.nationality ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
              }`}
            />
            {errors.nationality && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.nationality.message}</p>
            )}
          </div>
        </div>

        {/* Special Requirements */}
        <div>
          <label htmlFor="specialRequirements" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
            Special Requirements / Dietary / Acclimatization Needs
          </label>
          <textarea
            id="specialRequirements"
            rows={3}
            placeholder="Vegetarian meals, private room preferences, past knee injuries, or custom Lukla flight requests..."
            {...register("specialRequirements")}
            className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
          />
          {errors.specialRequirements && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.specialRequirements.message}</p>
          )}
        </div>

        {/* Estimated Price Snapshot banner */}
        <div className="p-3.5 bg-[#f5f2ea] border border-[#e4dfd5] rounded-sm flex items-center justify-between text-xs">
          <div>
            <span className="font-mono text-[#82998c] uppercase block text-[10px]">Estimated Group Total</span>
            <span className="text-[#1e3328] font-bold text-base">{formatCurrency(estimatedTotal)} USD</span>
          </div>
          <span className="text-[11px] text-[#5a6b61] max-w-[200px] text-right">
            Calculated as {travelerCount} × {formatCurrency(trip.priceFromUsd)}
          </span>
        </div>

        {/* Privacy consent checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register("privacyAgreed")}
              className="mt-1 w-4 h-4 rounded-xs border-[#d1cbc2] text-[#1e3328] focus:ring-[#1e3328]"
            />
            <span className="text-xs text-[#5a6b61] leading-relaxed">
              I agree to the{" "}
              <Link href="/privacy" target="_blank" className="text-[#1e3328] underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              and authorize Himalayan Trails to process my details for permit and logistics verification.
            </span>
          </label>
          {errors.privacyAgreed && (
            <p className="text-[11px] text-rose-600 mt-1">{errors.privacyAgreed.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#b85a3a] hover:bg-[#9e4a2d] active:bg-[#853c23] text-white font-semibold text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Validating with Kathmandu Desk...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Booking Request</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#82998c] pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>No credit card required upfront. 100% verified mountain permit guarantee.</span>
        </div>
      </form>
    </div>
  );
}
