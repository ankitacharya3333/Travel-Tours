"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Activity } from "lucide-react";

export function TripSearchFilter() {
  const router = useRouter();
  const [region, setRegion] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [duration, setDuration] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region !== "all") params.append("region", region);
    if (difficulty !== "all") params.append("difficulty", difficulty);
    if (duration !== "all") params.append("duration", duration);

    router.push(`/trips?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-sm shadow-xl border border-[#e4dfd5] text-[#1c2621]"
      aria-label="Trip Discovery & Search Form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Region selector */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-region" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5a6b61]">
            <MapPin className="w-3.5 h-3.5 text-[#b85a3a]" />
            <span>Region</span>
          </label>
          <select
            id="search-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-sm text-[#1e3328] rounded-sm px-3 py-2.5 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">All Regions of Nepal</option>
            <option value="Everest">Everest & Khumbu</option>
            <option value="Annapurna">Annapurna Massif</option>
            <option value="Langtang">Langtang & Helambu</option>
            <option value="Manaslu">Manaslu Circuit</option>
            <option value="Mustang">Upper Mustang</option>
            <option value="Kathmandu">Kathmandu Valley</option>
          </select>
        </div>

        {/* Difficulty selector */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-difficulty" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5a6b61]">
            <Activity className="w-3.5 h-3.5 text-[#b85a3a]" />
            <span>Grade / Difficulty</span>
          </label>
          <select
            id="search-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-sm text-[#1e3328] rounded-sm px-3 py-2.5 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">Any Difficulty Level</option>
            <option value="Easy">Easy (Cultural / Valley)</option>
            <option value="Moderate">Moderate (Teahouse Treks)</option>
            <option value="Strenuous">Strenuous (High Passes/Base Camps)</option>
            <option value="Challenging">Challenging (Remote Circuits)</option>
          </select>
        </div>

        {/* Duration selector */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="search-duration" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5a6b61]">
            <Calendar className="w-3.5 h-3.5 text-[#b85a3a]" />
            <span>Duration</span>
          </label>
          <select
            id="search-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-[#fbf9f5] border border-[#d1cbc2] text-sm text-[#1e3328] rounded-sm px-3 py-2.5 focus:border-[#1e3328] focus:outline-none"
          >
            <option value="all">Any Length of Stay</option>
            <option value="short">1 to 8 Days (Short escapes)</option>
            <option value="medium">9 to 14 Days (Standard circuits)</option>
            <option value="long">15+ Days (Grand expeditions)</option>
          </select>
        </div>

        {/* Submit action */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm bg-[#1e3328] text-[#fbf9f5] hover:bg-[#15241c] active:bg-[#0e1913] transition-colors cursor-pointer h-[42px]"
          >
            <Search className="w-4 h-4" />
            <span>Explore Treks</span>
          </button>
        </div>
      </div>
    </form>
  );
}
