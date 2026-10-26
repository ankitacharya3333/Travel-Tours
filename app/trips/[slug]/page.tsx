import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTripBySlug, getTrips } from "@/lib/tours";
import { Container } from "@/components/ui/Primitives";
import { BookingForm } from "@/components/booking/BookingForm";
import { TripCard } from "@/components/cards/TripCard";
import { TripItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  Clock,
  Mountain,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const trip = await getTripBySlug(params.slug);

  if (!trip) {
    return {
      title: "Expedition Not Found",
    };
  }

  return {
    title: `${trip.title} — Nepal Trekking & Expeditions`,
    description: trip.subtitle || trip.overview.slice(0, 160),
    openGraph: {
      title: `${trip.title} | Himalayan Trails Nepal`,
      description: trip.subtitle,
      images: [{ url: trip.heroImage }],
    },
  };
}

export default async function TripDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const trip = await getTripBySlug(params.slug);

  if (!trip) {
    notFound();
  }

  // Fetch related tours in same category or region
  const { trips: allTrips } = await getTrips({ pageSize: 6 });
  const relatedTrips = allTrips
    .filter((t) => t.slug !== trip.slug && (t.region === trip.region || t.category === trip.category))
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. PHOTOGRAPHIC HERO HEADER */}
      <section className="relative min-h-[60vh] lg:min-h-[65vh] flex items-end overflow-hidden bg-[#14231b]">
        <div className="absolute inset-0 z-0">
          <Image
            src={trip.heroImage}
            alt={trip.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14231b] via-[#14231b]/60 to-black/30" />
        </div>

        <Container className="relative z-10 py-12 lg:py-16 text-[#fbf9f5]">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#a4cdb5] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link href="/trips" className="hover:text-white transition-colors">Tours & Treks</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white truncate max-w-[200px] sm:max-w-none">{trip.title}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 text-xs uppercase font-mono tracking-wider font-semibold bg-[#b85a3a] text-white rounded-xs">
                {trip.difficulty} Grade
              </span>
              <span className="px-2.5 py-1 text-xs font-mono tracking-wider uppercase bg-black/50 text-[#fbf9f5] border border-white/20 rounded-xs">
                {trip.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-mono tracking-wider uppercase bg-white/10 text-[#fbf9f5] rounded-xs">
                {trip.region}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-tight text-white">
              {trip.title}
            </h1>

            <p className="text-base sm:text-lg text-[#d5ded8] max-w-2xl font-serif italic">
              &ldquo;{trip.subtitle}&rdquo;
            </p>

            {/* Metric pill bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#a4cdb5] block">Duration</span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4 text-[#e5a072]" />
                  {trip.durationDays} Days
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[#a4cdb5] block">Maximum Altitude</span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Mountain className="w-4 h-4 text-[#e5a072]" />
                  {trip.maxAltitudeMeters.toLocaleString()}m
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[#a4cdb5] block">Trail Starting Point</span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#e5a072]" />
                  {trip.startingPoint}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-[#a4cdb5] block">Starting From</span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5 text-[#f5ebd7]">
                  {formatCurrency(trip.priceFromUsd)} USD
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MAIN CONTENT & BOOKING SIDEBAR GRID */}
      <section className="py-12 lg:py-20 bg-[#fbf9f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Tour Details */}
            <div className="lg:col-span-7 space-y-12">
              {/* Overview */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                  Expedition Brief
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
                  Overview & Philosophy
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#4d5c53] leading-relaxed">
                  {trip.overview}
                </p>

                {/* Trail Highlights */}
                <div className="mt-6 p-5 bg-white border border-[#e4dfd5] rounded-sm">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#1e3328] font-bold mb-3">
                    Featured Trail Highlights:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#35433a]">
                    {trip.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#b85a3a] mt-0.5 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              {trip.itinerarySummary && trip.itinerarySummary.length > 0 && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                    Trail Progression
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
                    Day-by-Day Itinerary
                  </h2>
                  <div className="mt-6 space-y-3">
                    {trip.itinerarySummary.map((dayPlan, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-[#e4dfd5] rounded-sm flex items-start gap-3.5 hover:border-[#1e3328]/30 transition-colors"
                      >
                        <span className="text-xs font-mono font-bold text-[#b85a3a] shrink-0 mt-0.5 bg-[#b85a3a]/10 px-2 py-0.5 rounded-xs">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#35433a] leading-relaxed">
                          {dayPlan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Fitness and Preparation */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                  Altitude & Conditioning
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
                  Fitness & Technical Preparation
                </h2>
                <div className="mt-4 p-5 bg-[#efece5] border border-[#d1cbc2] rounded-sm space-y-3 text-xs sm:text-sm text-[#4d5c53] leading-relaxed">
                  <div className="flex items-start gap-3">
                    <HeartPulse className="w-5 h-5 text-[#b85a3a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1e3328] font-semibold mb-1">
                        Physical Demands:
                      </strong>
                      <p>{trip.fitnessRequired || "Standard aerobic endurance and walking conditioning."}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#d8d2c6] text-xs">
                    <strong>High-Altitude Notice:</strong> This trek ascends to {trip.maxAltitudeMeters.toLocaleString()}m. Our itinerary includes gradual staging to allow natural physiological acclimatization. All lead guides carry portable pulse oximeters and first-aid kits.
                  </div>
                </div>
              </div>

              {/* Inclusions and Exclusions */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                  Package Transparency
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
                  Services Included & Excluded
                </h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Included */}
                  <div className="bg-white p-5 rounded-sm border border-[#e4dfd5]">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      What is Included:
                    </h3>
                    <ul className="space-y-2 text-xs text-[#35433a]">
                      {trip.includedItems && trip.includedItems.length > 0 ? (
                        trip.includedItems.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 mt-0.5">•</span>
                            <span>{inc}</span>
                          </li>
                        ))
                      ) : (
                        <li>All mountain permits, licensed Sherpa guide, teahouse lodging, and porter transport.</li>
                      )}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div className="bg-white p-5 rounded-sm border border-[#e4dfd5]">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-rose-800 font-bold mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      What is Excluded:
                    </h3>
                    <ul className="space-y-2 text-xs text-[#35433a]">
                      {trip.excludedItems && trip.excludedItems.length > 0 ? (
                        trip.excludedItems.map((exc, e) => (
                          <li key={e} className="flex items-start gap-2">
                            <span className="text-rose-700 mt-0.5">•</span>
                            <span>{exc}</span>
                          </li>
                        ))
                      ) : (
                        <li>International airfare, travel insurance covering mountain rescue, and crew gratuities.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sample Data Disclaimer Banner */}
              <div className="p-4 bg-[#efece5] border border-[#d1cbc2] rounded-sm flex items-start gap-3 text-xs text-[#5a6b61] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-[#b85a3a] shrink-0 mt-0.5" />
                <div>
                  <strong>Demonstration Notice:</strong> Prices, group size caps, and daily routes reflect authentic Nepal conditions but are subject to seasonal lodge availability and personalized client adjustments. Submitting a booking request creates a reservation query; no payment is taken online.
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Booking Component */}
            <div className="lg:col-span-5 sticky top-24">
              <BookingForm trip={trip} />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. RELATED TOURS */}
      {relatedTrips.length > 0 && (
        <section className="py-16 bg-[#f5f2ea] border-t border-[#e4dfd5]">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                  Alternative Trails
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1e3328] tracking-tight">
                  Related Expeditions in {trip.region}
                </h2>
              </div>
              <Link
                href="/trips"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors"
              >
                <span>Browse full catalog</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTrips.map((related) => (
                <TripCard key={related.id} trip={related as unknown as TripItem} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
