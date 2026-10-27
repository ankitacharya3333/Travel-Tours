"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { Container } from "@/components/ui/Primitives";
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token,
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Unable to reset password. The link may have expired.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
    } catch {
      setServerError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-8 space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-xl font-serif text-[#1e3328]">Invalid Reset Link</h2>
        <p className="text-xs text-[#5a6b61]">
          No password reset token was detected. Please request a new link.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm"
        >
          Request Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 sm:p-8 border border-[#e4dfd5] rounded-sm shadow-xs">
      <div className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
          Secure Reset
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
          Choose New Password
        </h1>
        <p className="mt-2 text-xs text-[#5a6b61]">
          Minimum 8 characters with at least one uppercase letter and one number.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-sm flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {success ? (
        <div className="text-center space-y-4 py-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-serif text-[#1e3328]">Password Reset Complete</h2>
          <p className="text-xs text-[#5a6b61]">
            Your password has been successfully updated. You can now log into your traveler account.
          </p>
          <Link
            href="/login"
            className="inline-flex px-5 py-2.5 bg-[#1e3328] text-white text-xs font-semibold rounded-sm hover:bg-[#15241c]"
          >
            Sign In Now
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("token")} value={token} />

          <div>
            <label htmlFor="password" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
              New Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                  errors.password ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
                }`}
              />
            </div>
            {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>}
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
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <Suspense fallback={<div className="py-12 text-center text-xs text-[#82998c]">Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </Container>
    </div>
  );
}
