import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, Compass } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Primitives";

export function Footer() {
  return (
    <footer className="bg-[#14231b] text-[#d5ded8] border-t border-[#23382c] mt-auto">
      {/* Top Banner: Responsible Tourism & Local Presence */}
      <div className="border-b border-[#23382c]/80 py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-sm bg-[#1e3328] text-[#a4cdb5] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#fbf9f5]">Based in Kathmandu, Nepal</h3>
                <p className="text-xs text-[#9bb0a4] mt-1 leading-relaxed">
                  Headquartered in Kathmandu Valley with ground logistics teams operating across Khumbu, Annapurna, and Langtang.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-sm bg-[#1e3328] text-[#a4cdb5] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#fbf9f5]">Ethical Sherpa & Porter Welfare</h3>
                <p className="text-xs text-[#9bb0a4] mt-1 leading-relaxed">
                  Fair living wages, mountain safety gear, proper medical coverage, and strict load limits for all mountain crew.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-sm bg-[#1e3328] text-[#a4cdb5] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#fbf9f5]">Leave No Trace Ethos</h3>
                <p className="text-xs text-[#9bb0a4] mt-1 leading-relaxed">
                  Committed to preserving delicate high-alpine ecosystems through low-impact trail practices and waste repatriation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="light" />
              <p className="text-xs text-[#9bb0a4] leading-relaxed max-w-sm pt-2">
                Himalayan Trails crafts carefully paced trekking expeditions, cultural circuits, and wildlife journeys throughout Nepal. Rooted in local heritage and authentic mountain stewardship.
              </p>
              <div className="pt-2 text-xs text-[#82998c] space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#a4cdb5]" />
                  <span>Thamel Marg, Ward 26, Kathmandu, Nepal</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#a4cdb5]" />
                  <span>+977 (1) 470-0000 (Mon–Fri, 9am–6pm NPT)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#a4cdb5]" />
                  <span>adventures@himalayantrails.com</span>
                </p>
              </div>
            </div>

            {/* Himalayan Destinations */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf9f5] mb-4">
                Destinations
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a4]">
                <li>
                  <Link href="/destinations#dest-everest" className="hover:text-[#fbf9f5] transition-colors">
                    Everest & Khumbu
                  </Link>
                </li>
                <li>
                  <Link href="/destinations#dest-annapurna" className="hover:text-[#fbf9f5] transition-colors">
                    Annapurna Massif
                  </Link>
                </li>
                <li>
                  <Link href="/destinations#dest-langtang" className="hover:text-[#fbf9f5] transition-colors">
                    Langtang & Helambu
                  </Link>
                </li>
                <li>
                  <Link href="/destinations#dest-pokhara" className="hover:text-[#fbf9f5] transition-colors">
                    Pokhara Valley
                  </Link>
                </li>
                <li>
                  <Link href="/destinations#dest-chitwan" className="hover:text-[#fbf9f5] transition-colors">
                    Chitwan National Park
                  </Link>
                </li>
                <li>
                  <Link href="/destinations#dest-kathmandu" className="hover:text-[#fbf9f5] transition-colors">
                    Kathmandu Valley
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trekking & Journeys */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf9f5] mb-4">
                Tours & Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a4]">
                <li>
                  <Link href="/trips" className="hover:text-[#fbf9f5] transition-colors">
                    All Trekking Itineraries
                  </Link>
                </li>
                <li>
                  <Link href="/trips?category=Trekking" className="hover:text-[#fbf9f5] transition-colors">
                    High Mountain Treks
                  </Link>
                </li>
                <li>
                  <Link href="/trips?category=Cultural+Heritage" className="hover:text-[#fbf9f5] transition-colors">
                    Cultural Expeditions
                  </Link>
                </li>
                <li>
                  <Link href="/travel-guide" className="hover:text-[#fbf9f5] transition-colors">
                    Nepal Travel Guide
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#fbf9f5] transition-colors">
                    Responsible Tourism Ethos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#fbf9f5] transition-colors">
                    Bespoke Trip Inquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fbf9f5] mb-4">
                Trust & Terms
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a4]">
                <li>
                  <Link href="/terms" className="hover:text-[#fbf9f5] transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#fbf9f5] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="hover:text-[#fbf9f5] transition-colors">
                    Leadership & Local Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#fbf9f5] transition-colors">
                    Emergency Protocols
                  </Link>
                </li>
              </ul>
              <div className="mt-6 p-3 rounded-sm bg-[#1a2d22] border border-[#23382c] text-[11px] text-[#9bb0a4] leading-relaxed">
                Registered Nepal Tour Operator under Ministry of Culture, Tourism & Civil Aviation.
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="mt-12 pt-8 border-t border-[#23382c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#708478]">
            <p>© 2026 Himalayan Trails Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#d5ded8] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#d5ded8] transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-[#d5ded8] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
