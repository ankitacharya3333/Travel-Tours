import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Primitives";
import { DESTINATIONS_DATA } from "@/lib/data";

export const metadata = {
  title: "Himalayan Destinations — Everest, Annapurna, Langtang, Mustang & Beyond",
  description:
    "Explore Nepal's most revered mountain massifs, subtropical nature preserves, and cultural valleys. Authentic regional guides by Himalayan Trails.",
};

export default function DestinationsPage() {
  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Header Introduction */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Regions of Nepal
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Sacred Valleys & Lofty Summits
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            Nepal’s topography is among the most dramatic on Earth, elevating from 60 meters above sea level in the southern plains to 8,848 meters at the pinnacle of Everest. Explore the primary regions where we craft responsible journeys.
          </p>
        </div>

        {/* Detailed Regional Index */}
        <div className="space-y-16">
          {DESTINATIONS_DATA.map((dest, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={dest.id}
                id={dest.id}
                className="scroll-mt-24 p-6 sm:p-8 bg-white border border-[#e4dfd5] rounded-sm transition-all duration-300 hover:border-[#1e3328]/30"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Imagery */}
                  <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative aspect-16/10 w-full rounded-sm overflow-hidden bg-[#efece5]">
                      <Image
                        src={dest.heroImage}
                        alt={`Photography of ${dest.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-xs text-[#fbf9f5] text-xs font-mono rounded-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#f5ebd7]" />
                          {dest.region}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-[#1e3328]/85 backdrop-blur-xs px-3 py-1 rounded-xs text-[11px] font-mono text-[#fbf9f5]">
                        Elevation Profile: {dest.elevation}
                      </div>
                    </div>
                  </div>

                  {/* Regional Narrative */}
                  <div className={`lg:col-span-6 space-y-4 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      <span className="text-xs font-mono uppercase text-[#82998c]">
                        Recommended Time: {dest.recommendedDuration}
                      </span>
                      <h2 className="mt-1 text-2xl sm:text-3xl font-serif text-[#1e3328] font-medium">
                        {dest.name}
                      </h2>
                      <p className="text-sm font-serif italic text-[#b85a3a] mt-1">
                        &ldquo;{dest.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-sm text-[#4d5c53] leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Regional highlights */}
                    <div className="pt-2">
                      <p className="text-xs font-mono uppercase tracking-wider text-[#1e3328] font-semibold mb-2">
                        Key Regional Highlights:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#35433a]">
                        {dest.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2">
                            <span className="text-[#b85a3a] mt-0.5">•</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#f0ede6]">
                      <span className="text-xs text-[#63756b]">
                        <strong>Best Seasons:</strong> {dest.bestTime}
                      </span>
                      <Link
                        href={`/trips?region=${encodeURIComponent(dest.region)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#1e3328] text-[#fbf9f5] rounded-sm hover:bg-[#15241c] transition-colors"
                      >
                        <span>View {dest.region} Treks</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
