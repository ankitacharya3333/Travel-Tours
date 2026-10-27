"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { Container } from "@/components/ui/Primitives";
import { Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [devResetLink, setDevResetLink] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setSuccessMessage(result.message || "If an account exists, password reset instructions have been sent.");
      if (result.devResetLink) {
        setDevResetLink(result.devResetLink);
      }
    } catch {
      setServerError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="max-w-md mx-auto bg-white p-6 sm:p-8 border border-[#e4dfd5] rounded-sm shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              Account Recovery
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
              Reset Your Password
            </h1>
            <p className="mt-2 text-xs text-[#5a6b61]">
              Enter your registered email address. We will send you an expiring, single-use password reset link.
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-sm flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm flex items-start gap-3 text-xs text-emerald-800 leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-1">Check Your Inbox</strong>
                  <span>{successMessage}</span>
                </div>
              </div>

              {devResetLink && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-900 space-y-2">
                  <strong className="block font-mono uppercase text-[10px]">Development Fast-Track Link:</strong>
                  <a
                    href={devResetLink}
                    className="block font-mono text-xs text-[#b85a3a] underline break-all"
                  >
                    {devResetLink}
                  </a>
                  <p className="text-[11px] text-amber-800">
                    (Visible only in local development because RESEND_API_KEY is unset)
                  </p>
                </div>
              )}

              <div className="pt-4 text-center">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-[#1e3328] hover:text-[#b85a3a]"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register("email")}
                    className={`w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                      errors.email ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#1e3328] hover:bg-[#15241c] text-[#fbf9f5] font-semibold text-xs transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 text-center">
                <Link href="/login" className="text-xs text-[#5a6b61] hover:underline">
                  Remember password? Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
