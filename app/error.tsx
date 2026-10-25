"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service if configured
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="narrow" className="text-center">
        <div className="inline-flex p-4 rounded-full bg-[#b85a3a]/10 text-[#b85a3a] mb-6">
          <AlertTriangle className="w-12 h-12 stroke-[1.5]" />
        </div>
        <p className="text-xs uppercase tracking-widest font-mono text-[#b85a3a] font-semibold">
          Temporary Trail Interruption
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
          We encountered an unexpected obstacle
        </h1>
        <p className="mt-4 text-base text-[#5a6b61] leading-relaxed max-w-lg mx-auto">
          Our team has been notified. You can try refreshing the current page or return to the base camp.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#1e3328] text-[#fbf9f5] text-sm font-medium hover:bg-[#15241c] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[#1e3328]/30 text-[#1e3328] text-sm font-medium hover:bg-[#1e3328]/5 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </Container>
    </div>
  );
}
