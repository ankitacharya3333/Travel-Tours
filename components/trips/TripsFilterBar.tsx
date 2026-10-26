"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, RotateCcw } from "lucide-react";
import { TOUR_CATEGORIES } from "@/lib/data";

interface TripsFilterBarProps {
  initialSearch?: string;
  initialCategory?: string;
  initialRegion?: string;
  initialDifficulty?: string;
  initialDuration?: string;
  initialSortBy?: string;
  totalCount: number;
}

export function TripsFilterBar({
  initialSearch = "",
  initialCategory = "all",
  initialRegion = "all",
  initialDifficulty = "all",
  initialDuration = "all",
  initialSortBy = "popular",
  totalCount,
}: TripsFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [region, setRegion] = useState(initialRegion);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [duration, setDuration] = useState(initialDuration);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const applyFilters = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    const values = {
      search,
      category,
      region,
      difficulty,
      duration,
      sortBy,
      page: "1", // reset to page 1 on filter change
      ...overrides,
    };

    Object.entries(values).forEach(([k, v]) => {
      if (!v || v === "all" || (k === "sortBy" && v === "popular")) {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    });

    startTransition(() => {
      router.push(`/trips?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setRegion("all");
    setDifficulty("all");
    setDuration("all");
    setSortBy("popular");

    startTransition(() => {
      router.push("/trips");
    });
  };

  const hasActiveFilters =
    search !== "" ||
    category !== "all" ||
    region !== "all" ||
    difficulty !== "all" ||
    duration !== "all" ||
    sortBy !== "popular";

  return (
    <div className="bg-white p-5 rounded-sm border border-[#e4dfd5] shadow-xs mb-10">
      {/* Search Input Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#82998c] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="Search treks by mountain, pass, valley, or keyword (e.g. Everest, Larkya La, Wildlife)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm text-sm text-[#1e3328] focus:border-[#1e3328] focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => applyFilters()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1e3328] text-white text-xs font-semibold rounded-sm hover:bg-[#15241c] transition-colors cursor-pointer"
        >
          <span>Search</span>
        </button>
      </div>

      {/* Structured Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-[#f0ede6]">
        {/* Category */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1">
            Tour Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              applyFilters({ category: e.target.value });
            }}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-xs text-[#1e3328] rounded-sm px-2.5 py-2 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">All Categories ({TOUR_CATEGORIES.length})</option>
            {TOUR_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1">
            Region / Massif
          </label>
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              applyFilters({ region: e.target.value });
            }}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-xs text-[#1e3328] rounded-sm px-2.5 py-2 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">All Regions of Nepal</option>
            <option value="Everest">Everest & Khumbu</option>
            <option value="Annapurna">Annapurna Massif</option>
            <option value="Langtang">Langtang & Helambu</option>
            <option value="Manaslu">Manaslu Circuit</option>
            <option value="Mustang">Upper Mustang</option>
            <option value="Pokhara">Pokhara Valley</option>
            <option value="Chitwan">Chitwan Terai</option>
            <option value="Kathmandu">Kathmandu Valley</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1">
            Difficulty Grade
          </label>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              applyFilters({ difficulty: e.target.value });
            }}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-xs text-[#1e3328] rounded-sm px-2.5 py-2 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">Any Difficulty Level</option>
            <option value="Easy">Easy (Valley & Wildlife)</option>
            <option value="Moderate">Moderate (Teahouse Treks)</option>
            <option value="Strenuous">Strenuous (Base Camps)</option>
            <option value="Challenging">Challenging (Remote Circuits)</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              applyFilters({ duration: e.target.value });
            }}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-xs text-[#1e3328] rounded-sm px-2.5 py-2 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">Any Length of Stay</option>
            <option value="short">1 to 8 Days (Short Escapes)</option>
            <option value="medium">9 to 14 Days (Standard Circuits)</option>
            <option value="long">15+ Days (Grand Expeditions)</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-[#82998c] mb-1">
            Sort Order
          </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              applyFilters({ sortBy: e.target.value });
            }}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-xs text-[#1e3328] rounded-sm px-2.5 py-2 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="popular">Featured / Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration-asc">Duration: Short to Long</option>
            <option value="duration-desc">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      {/* Results Count & Reset Controls */}
      <div className="mt-4 pt-3 border-t border-[#f0ede6] flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[#5a6b61]">
          Showing <strong>{totalCount}</strong> matching itineraries {isPending && "(Updating...)"}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-[#b85a3a] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
