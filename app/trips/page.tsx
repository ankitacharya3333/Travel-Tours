import { Suspense } from "react";
import Link from "next/link";
import { TRIPS_DATA } from "@/lib/data";
import { TripCard } from "@/components/cards/TripCard";
import { Container } from "@/components/ui/Primitives";
import { Filter, Compass, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Trekking & Tour Catalog — Handcrafted Nepal Expeditions",
  description:
    "Browse sample trekking circuits, alpine expeditions, and cultural tours across Nepal with honest difficulty grading and acclimatization profiles.",
};

async function TripsList({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{
    region?: string;
    difficulty?: string;
    duration?: string;
    category?: string;
  }>;
}) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const regionFilter = searchParams?.region;
  const difficultyFilter = searchParams?.difficulty;
  const categoryFilter = searchParams?.category;

  const filteredTrips = TRIPS_DATA.filter((trip) => {
    if (regionFilter && regionFilter !== "all") {
      if (!trip.region.toLowerCase().includes(regionFilter.toLowerCase())) {
        return false;
      }
    }
    if (difficultyFilter && difficultyFilter !== "all") {
      if (trip.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }
    }
    if (categoryFilter && categoryFilter !== "all") {
      if (trip.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      {/* Filter Navigation Bar */}
      <div className="bg-white p-4 rounded-sm border border-[#e4dfd5] mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#82998c] font-mono uppercase mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#1e3328]" /> Quick Filter:
          </span>
          <Link
            href="/trips"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              !regionFilter && !difficultyFilter && !categoryFilter
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            All Treks ({TRIPS_DATA.length})
          </Link>
          <Link
            href="/trips?region=Everest"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              regionFilter === "Everest"
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            Everest
          </Link>
          <Link
            href="/trips?region=Annapurna"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              regionFilter === "Annapurna"
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            Annapurna
          </Link>
          <Link
            href="/trips?region=Langtang"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              regionFilter === "Langtang"
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            Langtang
          </Link>
          <Link
            href="/trips?difficulty=Moderate"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              difficultyFilter === "Moderate"
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            Moderate Grade
          </Link>
          <Link
            href="/trips?difficulty=Strenuous"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              difficultyFilter === "Strenuous"
                ? "bg-[#1e3328] text-[#fbf9f5] font-semibold"
                : "bg-[#f5f2ea] text-[#35433a] hover:bg-[#e4dfd5]"
            }`}
          >
            High Altitude
          </Link>
        </div>

        <div className="text-xs text-[#63756b]">
          Showing <strong>{filteredTrips.length}</strong> itineraries
        </div>
      </div>

      {/* Trips Grid or Empty State */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <div key={trip.id} id={trip.id} className="scroll-mt-24">
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#e4dfd5] rounded-sm p-8">
          <Compass className="w-12 h-12 text-[#82998c] mx-auto mb-3" />
          <h3 className="text-lg font-serif text-[#1e3328]">No matching itineraries found</h3>
          <p className="text-xs text-[#5a6b61] mt-1 max-w-sm mx-auto">
            We couldn&apos;t find sample treks matching your current filter criteria.
          </p>
          <div className="mt-6">
            <Link
              href="/trips"
              className="inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm hover:bg-[#15241c]"
            >
              Reset Filters
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default function TripsPage(props: {
  searchParams?: Promise<{
    region?: string;
    difficulty?: string;
    duration?: string;
    category?: string;
  }>;
}) {
  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Header Introduction */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Expedition Directory
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Curated Nepal Treks & Journeys
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            All itineraries below are curated sample routes developed by our licensed Kathmandu operations team. Each can be calibrated for personal fitness levels, schedule constraints, and custom group requirements.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-16 text-center text-xs font-mono text-[#82998c]">
              Loading matching Himalayan itineraries...
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
