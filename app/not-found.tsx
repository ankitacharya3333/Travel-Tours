import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="narrow" className="text-center">
        <div className="inline-flex p-4 rounded-full bg-[#1e3328]/5 text-[#1e3328] mb-6">
          <Compass className="w-12 h-12 stroke-[1.5]" />
        </div>
        <p className="text-xs uppercase tracking-widest font-mono text-[#b85a3a] font-semibold">
          Error 404 — Trail Lost
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
          The path you seek is not on our map
        </h1>
        <p className="mt-4 text-base text-[#5a6b61] leading-relaxed max-w-lg mx-auto">
          Like a misty mountain ridge off the main trail, this page cannot be found or has moved. Return to the main base camp to plan your journey.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#1e3328] text-[#fbf9f5] text-sm font-medium hover:bg-[#15241c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[#1e3328]/30 text-[#1e3328] text-sm font-medium hover:bg-[#1e3328]/5 transition-colors"
          >
            Explore All Treks
          </Link>
        </div>
      </Container>
    </div>
  );
}
