import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { Clock, Mountain, ArrowRight } from "lucide-react";
import { TripItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function TripCard({ trip }: { trip: TripItem }) {
  const difficultyColor = {
    Easy: "bg-emerald-100/70 text-emerald-800 border-emerald-300",
    Moderate: "bg-amber-100/70 text-amber-800 border-amber-300",
    Strenuous: "bg-orange-100/70 text-orange-800 border-orange-300",
    Challenging: "bg-rose-100/70 text-rose-800 border-rose-300",
  }[trip.difficulty];

  return (
    <article className="group flex flex-col bg-white border border-[#e4dfd5] rounded-sm overflow-hidden hover:border-[#1e3328]/40 transition-all duration-300 hover:shadow-md">
      {/* Visual Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#efece5]">
        <SafeImage
          src={trip.heroImage}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold border rounded-xs backdrop-blur-xs ${difficultyColor}`}
          >
            {trip.difficulty}
          </span>
          <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider font-medium bg-black/60 text-white rounded-xs backdrop-blur-xs">
            {trip.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 text-xs font-semibold bg-[#1e3328] text-[#fbf9f5] rounded-xs shadow-xs">
            From {formatCurrency(trip.priceFromUsd)}
          </span>
        </div>
      </div>

      {/* Trip Information */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 text-[11px] text-[#5a6b61] font-mono mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#b85a3a]" />
              {trip.durationDays} Days
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-[#1e3328]" />
              Max {trip.maxAltitudeMeters.toLocaleString()}m
            </span>
          </div>

          <h3 className="text-xl font-serif text-[#1e3328] font-medium leading-snug group-hover:text-[#b85a3a] transition-colors">
            {trip.title}
          </h3>
          <p className="text-xs text-[#5a6b61] mt-2 line-clamp-2 leading-relaxed">
            {trip.overview}
          </p>

          {/* Key highlights preview */}
          <div className="mt-4 pt-3 border-t border-[#f0ede6]">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1.5">
              Trail Highlights
            </p>
            <ul className="text-xs text-[#35433a] space-y-1">
              {trip.highlights.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 truncate">
                  <span className="text-[#b85a3a] mt-0.5">›</span>
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Link & Sample Disclaimer */}
        <div className="mt-5 pt-3 border-t border-[#f0ede6] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#82998c]">Sample Itinerary</span>
          <Link
            href={`/trips/${trip.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3328] group-hover:text-[#b85a3a] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
