import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DestinationItem } from "@/lib/data";

export function DestinationCard({ destination }: { destination: DestinationItem }) {
  return (
    <article className="group relative flex flex-col bg-white border border-[#e4dfd5] rounded-sm overflow-hidden hover:border-[#1e3328]/40 transition-all duration-300 hover:shadow-md">
      {/* Visual Photography */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#efece5]">
        <Image
          src={destination.heroImage}
          alt={`Scenic view of ${destination.name} in Nepal`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur-xs text-[#fbf9f5] rounded-xs">
            <MapPin className="w-3.5 h-3.5 text-[#f5ebd7]" />
            {destination.region}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] font-mono tracking-wide text-white/90 block">
            Elevation: {destination.elevation}
          </span>
        </div>
      </div>

      {/* Narrative & Details */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif text-[#1e3328] font-medium group-hover:text-[#b85a3a] transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs font-serif italic text-[#63756b] mt-1 line-clamp-1">
            &ldquo;{destination.tagline}&rdquo;
          </p>
          <p className="text-xs text-[#4d5c53] mt-2.5 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights */}
          <div className="mt-4 pt-4 border-t border-[#f0ede6]">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-2">
              Key Experiences
            </p>
            <ul className="space-y-1 text-xs text-[#35433a]">
              {destination.highlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <span className="w-1 h-1 rounded-full bg-[#b85a3a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-5 pt-3 border-t border-[#f0ede6] flex items-center justify-between">
          <span className="text-xs text-[#5a6b61]">Duration: {destination.recommendedDuration}</span>
          <Link
            href={`/destinations#${destination.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3328] group-hover:text-[#b85a3a] transition-colors"
          >
            <span>Explore Region</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
