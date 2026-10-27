"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@/lib/validations/auth";
import { Container } from "@/components/ui/Primitives";
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Invalid email or password combination.");
        setIsSubmitting(false);
        return;
      }

      // Check role if redirected to admin
      if (result.user?.role === "ADMIN" && redirectUrl === "/account") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
      router.refresh();
    } catch {
      setServerError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="max-w-md mx-auto bg-white p-6 sm:p-8 border border-[#e4dfd5] rounded-sm shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              Traveler Portal
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
              Sign in to Your Account
            </h1>
            <p className="mt-2 text-xs text-[#5a6b61]">
              Access your expedition bookings, travel vouchers, and direct communications with Kathmandu.
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-sm flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-mono uppercase text-[#4d5c53]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#b85a3a] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#f0ede6] text-center text-xs text-[#5a6b61]">
            Don&apos;t have an account yet?{" "}
            <Link
              href={redirectUrl !== "/account" ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"}
              className="text-[#1e3328] font-semibold underline underline-offset-2 hover:text-[#b85a3a]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
