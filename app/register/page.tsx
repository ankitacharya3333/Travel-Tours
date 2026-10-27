"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterInput } from "@/lib/validations/auth";
import { Container } from "@/components/ui/Primitives";
import { User, Mail, Lock, Phone, Globe, ArrowRight, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      country: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Unable to complete registration. Please check your information.");
        setIsSubmitting(false);
        return;
      }

      router.push(redirectUrl);
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
              New Traveler Account
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
              Join Himalayan Trails
            </h1>
            <p className="mt-2 text-xs text-[#5a6b61]">
              Manage your mountain expeditions, review custom route proposals, and maintain travel documents.
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
              <label htmlFor="name" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Maya Sharma"
                  {...register("name")}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                    errors.name ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
                <input
                  id="email"
                  type="email"
                  placeholder="maya@example.com"
                  {...register("email")}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border rounded-sm focus:outline-none ${
                    errors.email ? "border-rose-400 focus:border-rose-500" : "border-[#d1cbc2] focus:border-[#1e3328]"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                Password * (min 8 chars, 1 uppercase, 1 number)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+977..."
                    {...register("phone")}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                  Country (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#82998c] absolute left-3 top-2.5" />
                  <input
                    id="country"
                    type="text"
                    placeholder="Nepal, UK, USA..."
                    {...register("country")}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                  />
                </div>
              </div>
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#f0ede6] text-center text-xs text-[#5a6b61]">
            Already have an account?{" "}
            <Link
              href={redirectUrl !== "/account" ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"}
              className="text-[#1e3328] font-semibold underline underline-offset-2 hover:text-[#b85a3a]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
