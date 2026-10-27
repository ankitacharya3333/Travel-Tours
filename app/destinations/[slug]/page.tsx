import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { getDestinationBySlug } from "@/lib/tours";
import { Container } from "@/components/ui/Primitives";
import { TripCard } from "@/components/cards/TripCard";
import { TripItem } from "@/lib/data";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} — Nepal Himalayan Sanctuary Guide`,
    description: destination.tagline || destination.description.slice(0, 160),
    openGraph: {
      title: `${destination.name} | Himalayan Trails`,
      description: destination.description,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const regionTrips = destination.trips || [];

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative min-h-[50vh] lg:min-h-[55vh] flex items-end overflow-hidden bg-[#14231b]">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14231b] via-[#14231b]/50 to-black/30" />
        </div>

        <Container className="relative z-10 py-12 lg:py-16 text-[#fbf9f5]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#a4cdb5] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white">{destination.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider uppercase bg-black/50 text-[#fbf9f5] border border-white/20 rounded-xs">
              <MapPin className="w-3 h-3 text-[#f5ebd7]" />
              {destination.region}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-base sm:text-lg text-[#d5ded8] font-serif italic">
              &ldquo;{destination.tagline}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* Main Destination Narrative & Highlights */}
      <section className="py-12 lg:py-16 bg-[#fbf9f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                  Regional Geography & Culture
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
                  About the Region
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#4d5c53] leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-6 bg-white border border-[#e4dfd5] rounded-sm">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#1e3328] font-bold mb-4">
                  Signature Regional Experiences:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#35433a]">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#b85a3a] mt-0.5 font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Profile Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#efece5] p-6 rounded-sm border border-[#d1cbc2] space-y-4 text-xs">
                <h3 className="font-serif font-bold text-base text-[#1e3328]">Region Fast Facts</h3>
                <div className="space-y-3 pt-2 text-[#4d5c53]">
                  <div>
                    <strong className="block text-[#1e3328] font-semibold">Elevation Range:</strong>
                    <span>{destination.elevation || "Variable"}</span>
                  </div>
                  <div>
                    <strong className="block text-[#1e3328] font-semibold">Best Trekking Window:</strong>
                    <span>{destination.bestTime || "Spring & Autumn"}</span>
                  </div>
                  <div>
                    <strong className="block text-[#1e3328] font-semibold">Recommended Stay:</strong>
                    <span>{destination.recommendedDuration || "7-14 Days"}</span>
                  </div>
                  <div className="pt-2 border-t border-[#d8d2c6]">
                    <Link
                      href={`/trips?region=${encodeURIComponent(destination.region)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b85a3a] hover:underline"
                    >
                      <span>Filter treks in {destination.region}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Relevant Tours in this Destination */}
      <section className="py-16 bg-[#f5f2ea] border-t border-[#e4dfd5]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                Available Itineraries
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1e3328] tracking-tight">
                Featured Treks in {destination.name}
              </h2>
            </div>
            <Link
              href="/trips"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors"
            >
              <span>View all expeditions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {regionTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip as unknown as TripItem} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-sm border border-[#e4dfd5] text-center">
              <p className="text-xs text-[#5a6b61]">
                No fixed departures currently listed. We design custom private departures for this region on request.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm"
              >
                Inquire About Custom Trip
              </Link>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
