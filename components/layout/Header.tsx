"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, MapPin, BookOpen, Info, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Primitives";

const NAV_LINKS = [
  { name: "Destinations", href: "/destinations", icon: MapPin },
  { name: "Trips & Treks", href: "/trips", icon: Compass },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Travel Guide", href: "/travel-guide", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e4dfd5] shadow-xs py-3.5"
          : "bg-[#fbf9f5] border-b border-[#e4dfd5]/80 py-4.5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 lg:gap-2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors duration-150 ${
                    isActive
                      ? "text-[#1e3328] bg-[#1e3328]/8 font-semibold"
                      : "text-[#4d5c53] hover:text-[#1e3328] hover:bg-[#1e3328]/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action / Quick Contact */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-sm border border-[#1e3328]/30 text-[#1e3328] hover:bg-[#1e3328] hover:text-[#fbf9f5] transition-all duration-200"
            >
              Plan Your Trek
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-sm text-[#1e3328] hover:bg-[#1e3328]/5 focus:outline-none focus:ring-2 focus:ring-[#1e3328]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e4dfd5] bg-[#fbf9f5] px-4 pt-4 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1e3328] text-[#fbf9f5]"
                      : "text-[#2d3e33] hover:bg-[#efece5]"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#e4dfd5]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-[#b85a3a] hover:bg-[#9e4a2d] rounded-sm transition-colors"
              >
                Plan Your Trek / Enquire
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
