import { Suspense } from "react";
import Link from "next/link";
import { getTrips } from "@/lib/tours";
import { TripCard } from "@/components/cards/TripCard";
import { TripsFilterBar } from "@/components/trips/TripsFilterBar";
import { Container } from "@/components/ui/Primitives";
import { TripItem } from "@/lib/data";
import { Compass, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Trekking & Tour Catalog — Handcrafted Nepal Expeditions",
  description:
    "Browse Nepal trekking circuits, cultural journeys, wildlife safaris, and pilgrimage routes with honest difficulty grading and verified altitude profiles.",
};

type SortByType = "price-asc" | "price-desc" | "duration-asc" | "duration-desc" | "popular";

async function TripsList({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{
    search?: string;
    category?: string;
    region?: string;
    difficulty?: string;
    duration?: string;
    sortBy?: string;
    page?: string;
  }>;
}) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const search = searchParams?.search;
  const category = searchParams?.category;
  const region = searchParams?.region;
  const difficulty = searchParams?.difficulty;
  const duration = searchParams?.duration;
  const sortBy = (searchParams?.sortBy as SortByType) || undefined;
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  const { trips, totalCount, totalPages, currentPage } = await getTrips({
    search,
    category,
    region,
    difficulty,
    duration,
    sortBy,
    page,
    pageSize: 9,
  });

  return (
    <>
      <TripsFilterBar
        initialSearch={search}
        initialCategory={category}
        initialRegion={region}
        initialDifficulty={difficulty}
        initialDuration={duration}
        initialSortBy={sortBy}
        totalCount={totalCount}
      />

      {/* Trips Grid or Empty State */}
      {trips.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <div key={trip.id} id={trip.id} className="scroll-mt-24">
                <TripCard trip={trip as unknown as TripItem} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 pt-6 border-t border-[#e4dfd5] flex items-center justify-center gap-3 text-xs">
              {currentPage > 1 ? (
                <Link
                  href={`/trips?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-white border border-[#d1cbc2] text-[#1e3328] hover:bg-[#efece5]"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#fbf9f5] border border-[#e4dfd5] text-[#82998c] cursor-not-allowed">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </span>
              )}

              <span className="font-mono text-[#5a6b61]">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/trips?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-white border border-[#d1cbc2] text-[#1e3328] hover:bg-[#efece5]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#fbf9f5] border border-[#e4dfd5] text-[#82998c] cursor-not-allowed">
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white border border-[#e4dfd5] rounded-sm p-8">
          <Compass className="w-12 h-12 text-[#82998c] mx-auto mb-3" />
          <h3 className="text-lg font-serif text-[#1e3328]">No matching expeditions found</h3>
          <p className="text-xs text-[#5a6b61] mt-1 max-w-sm mx-auto">
            We couldn&apos;t find itineraries matching your exact criteria. Try broadening your search or resetting filters.
          </p>
          <div className="mt-6">
            <Link
              href="/trips"
              className="inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm hover:bg-[#15241c]"
            >
              Reset All Filters
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default function TripsPage(props: {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    region?: string;
    difficulty?: string;
    duration?: string;
    sortBy?: string;
    page?: string;
  }>;
}) {
  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Header Introduction */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Expedition Catalog
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Curated Nepal Treks & Journeys
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            From the high alpine passes of Khumbu and Annapurna to the sacred temples of Kathmandu and the dense wildlife reserves of Chitwan. Each itinerary has been vetted for realistic pacing and ethical porter care.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-16 text-center text-xs font-mono text-[#82998c]">
              Loading Himalayan tour catalog...
            </div>
          }
        >
          <TripsList searchParamsPromise={props.searchParams} />
        </Suspense>

        {/* Demonstration Disclaimer Note */}
        <div className="mt-16 p-4 rounded-sm bg-[#efece5] border border-[#d1cbc2] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#b85a3a] shrink-0 mt-0.5" />
          <div className="text-xs text-[#4d5c53] leading-relaxed">
            <strong>Demonstration Content Notice:</strong> The prices, itineraries, and durations shown here are sample templates designed to reflect authentic Nepal conditions. All final expedition bookings are subject to current permit costs, seasonal flight schedules, and custom route alignment confirmed by our operations team.
          </div>
        </div>
      </Container>
    </div>
  );
}
