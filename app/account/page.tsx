import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Primitives";
import { Calendar, Compass, User, Mail, Phone, Globe, Shield, ArrowRight, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "My Account — Himalayan Trails",
  description: "Customer account portal and booking overview.",
};

export default async function AccountPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login?redirect=/account");
  }

  // Fetch actual customer bookings
  let bookings: any[] = [];
  let userProfile = null;

  try {
    userProfile = await prisma.user.findUnique({
      where: { id: session.id },
      include: {
        bookings: {
          orderBy: { createdAt: "desc" },
          include: { trip: true },
        },
      },
    });

    if (userProfile?.bookings) {
      bookings = userProfile.bookings;
    }
  } catch (error) {
    console.warn("Could not query DB for customer account bookings:", error);
  }

  return (
    <div className="py-12 lg:py-16">
      <Container>
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#e4dfd5] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              Traveler Portal
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-[#1e3328]">
              Namaste, {session.name}
            </h1>
            <p className="text-xs text-[#5a6b61] mt-1">
              Signed in as <strong className="text-[#1e3328]">{session.email}</strong> • Role:{" "}
              <span className="font-mono text-[#b85a3a]">{session.role}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/profile"
              className="px-3.5 py-2 text-xs font-semibold rounded-sm border border-[#1e3328]/30 text-[#1e3328] hover:bg-[#1e3328]/5 transition-colors"
            >
              Edit Profile
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold rounded-sm bg-[#1e3328] text-white hover:bg-[#15241c] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Account Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-[#e4dfd5] mb-8 text-xs font-mono uppercase">
          <Link
            href="/account"
            className="pb-3 border-b-2 border-[#1e3328] font-bold text-[#1e3328]"
          >
            Overview & Bookings
          </Link>
          <Link
            href="/account/profile"
            className="pb-3 text-[#5a6b61] hover:text-[#1e3328] transition-colors"
          >
            Profile & Security
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Bookings Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif text-[#1e3328]">Your Expeditions & Treks</h2>
              <span className="text-xs font-mono text-[#82998c]">
                {bookings.length} Registered {bookings.length === 1 ? "Trip" : "Trips"}
              </span>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const statusColors = {
                    PENDING: "bg-amber-100 text-amber-900 border-amber-300",
                    CONFIRMED: "bg-emerald-100 text-emerald-900 border-emerald-300",
                    CANCELLED: "bg-rose-100 text-rose-900 border-rose-300",
                    COMPLETED: "bg-gray-100 text-gray-800 border-gray-300",
                  }[booking.status as string] || "bg-gray-100 text-gray-800 border-gray-300";

                  const departureDateStr = new Date(booking.departureDate).toISOString().split("T")[0];

                  return (
                    <div
                      key={booking.id}
                      className="p-5 bg-white border border-[#e4dfd5] rounded-sm shadow-xs flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#1e3328]">
                            {booking.reference}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs border font-semibold ${statusColors}`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <h3 className="text-lg font-serif text-[#1e3328]">
                          {booking.trip?.title || "Himalayan Expedition"}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#5a6b61]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#b85a3a]" />
                            {departureDateStr}
                          </span>
                          <span>•</span>
                          <span>{booking.travelerCount} Traveler(s)</span>
                          <span>•</span>
                          <span className="font-bold text-[#1e3328]">
                            {formatCurrency(booking.totalPriceSnapshotUsd)} {booking.currencySnapshot}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col justify-end items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#f0ede6]">
                        <Link
                          href={`/account/bookings#${booking.reference}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 bg-white border border-[#e4dfd5] rounded-sm text-center space-y-3">
                <Compass className="w-10 h-10 text-[#82998c] mx-auto" />
                <h3 className="text-base font-serif text-[#1e3328]">No Bookings on File</h3>
                <p className="text-xs text-[#5a6b61] max-w-sm mx-auto">
                  You haven&apos;t submitted any trip reservations yet under this account.
                </p>
                <Link
                  href="/trips"
                  className="inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm hover:bg-[#15241c] mt-2"
                >
                  Explore Treks & Itineraries
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-[#efece5] border border-[#d1cbc2] rounded-sm space-y-3 text-xs">
              <h3 className="font-serif font-bold text-sm text-[#1e3328]">Traveler Profile Summary</h3>
              <div className="space-y-2 text-[#4d5c53]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#82998c]" />
                  <span>{session.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#82998c]" />
                  <span>{session.email}</span>
                </div>
                {userProfile?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#82998c]" />
                    <span>{userProfile.phone}</span>
                  </div>
                )}
                {userProfile?.country && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#82998c]" />
                    <span>{userProfile.country}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 bg-white border border-[#e4dfd5] rounded-sm space-y-2 text-xs text-[#5a6b61] leading-relaxed">
              <strong className="block text-[#1e3328] font-serif text-sm">Need to Amend a Reservation?</strong>
              <p>
                Because high-altitude expeditions involve non-refundable national park permits and domestic mountain flights, date adjustments require coordination with our Kathmandu logistics desk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#b85a3a] hover:underline pt-1"
              >
                <span>Request Itinerary Modification</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
