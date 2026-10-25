import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Himalayan Trails Home"
    >
      {/* Custom Mountain Stupa Mark */}
      <span className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#1e3328] text-[#fbf9f5] shadow-xs group-hover:scale-105 transition-transform duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#f5ebd7]"
          aria-hidden="true"
        >
          {/* Twin Himalayan Peaks with Ridgeline */}
          <path d="m2 20 7.5-12 4.5 7 3-4.5L22 20H2Z" />
          <path d="M12 4v2" />
          <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <span className="flex flex-col text-left">
        <span
          className={`text-base font-serif tracking-tight font-semibold uppercase leading-none ${
            isDark ? "text-[#1e3328]" : "text-[#fbf9f5]"
          }`}
        >
          Himalayan Trails
        </span>
        <span
          className={`text-[10px] tracking-widest font-mono uppercase mt-0.5 ${
            isDark ? "text-[#5a6b61]" : "text-[#c2ceca]"
          }`}
        >
          Nepal • Est. Kathmandu
        </span>
      </span>
    </Link>
  );
}
