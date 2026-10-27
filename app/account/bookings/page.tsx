import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Primitives";
import { Calendar, Users, MapPin, ArrowLeft, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "My Bookings — Himalayan Trails",
  description: "View and manage all your Himalayan Trails reservations.",
};

export default async function CustomerBookingsPage() {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/login?redirect=/account/bookings");
  }

  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      include: { trip: true },
    });
  } catch (error) {
    console.warn("Could not load bookings from DB:", error);
  }

  return (
    <div className="py-12 lg:py-16">
      <Container>
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#5a6b61] hover:text-[#1e3328] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account Overview</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#1e3328]">
            Your Reservation Records
          </h1>
          <p className="text-xs text-[#5a6b61] mt-1">
            Official records for reservations linked to {session.email}
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusColors = {
                PENDING: "bg-amber-100 text-amber-900 border-amber-300",
                CONFIRMED: "bg-emerald-100 text-emerald-900 border-emerald-300",
                CANCELLED: "bg-rose-100 text-rose-900 border-rose-300",
                COMPLETED: "bg-gray-100 text-gray-800 border-gray-300",
              }[booking.status as string] || "bg-gray-100 text-gray-800";

              const departureDateStr = new Date(booking.departureDate).toISOString().split("T")[0];

              return (
                <div
                  key={booking.id}
                  id={booking.reference}
                  className="bg-white p-6 rounded-sm border border-[#e4dfd5] shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#f0ede6] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#1e3328]">
                        Ref: {booking.reference}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-xs border font-semibold ${statusColors}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#82998c]">
                      Created: {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <strong className="block text-[#82998c] font-mono uppercase text-[10px]">Expedition Tour</strong>
                      <span className="font-medium text-[#1e3328] text-sm mt-0.5 block">{booking.trip?.title}</span>
                    </div>

                    <div>
                      <strong className="block text-[#82998c] font-mono uppercase text-[10px]">Departure Date</strong>
                      <span className="text-[#1e3328] mt-0.5 block flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#b85a3a]" />
                        {departureDateStr}
                      </span>
                    </div>

                    <div>
                      <strong className="block text-[#82998c] font-mono uppercase text-[10px]">Party Size</strong>
                      <span className="text-[#1e3328] mt-0.5 block flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#b85a3a]" />
                        {booking.travelerCount} Traveler(s)
                      </span>
                    </div>

                    <div>
                      <strong className="block text-[#82998c] font-mono uppercase text-[10px]">Price Snapshot</strong>
                      <span className="font-bold text-sm text-[#b85a3a] mt-0.5 block">
                        {formatCurrency(booking.totalPriceSnapshotUsd)} {booking.currencySnapshot}
                      </span>
                    </div>
                  </div>

                  {booking.specialRequirements && (
                    <div className="p-3 bg-[#fbf9f5] border border-[#e4dfd5] rounded-xs text-xs">
                      <strong className="block text-[#82998c] font-mono uppercase text-[10px] mb-1">
                        Notes / Special Requirements:
                      </strong>
                      <p className="text-[#4d5c53]">{booking.specialRequirements}</p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between text-xs border-t border-[#f0ede6] gap-2">
                    <span className="text-[#82998c]">
                      Lead Traveler: <strong>{booking.fullName}</strong> ({booking.phone})
                    </span>

                    <Link
                      href={`/contact?subject=Amendment%20Request%20for%20Booking%20${booking.reference}`}
                      className="text-[#b85a3a] font-semibold hover:underline"
                    >
                      Request Modification or Cancellation
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-[#e4dfd5] rounded-sm space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328]">No Bookings Found</h2>
            <p className="text-xs text-[#5a6b61]">
              You do not have any registered trips under this account.
            </p>
            <Link
              href="/trips"
              className="inline-flex px-4 py-2 bg-[#1e3328] text-white text-xs font-semibold rounded-sm mt-2"
            >
              Browse Treks
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
