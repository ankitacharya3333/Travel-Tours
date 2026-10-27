import { SafeImage } from "@/components/ui/SafeImage";
import { ShieldCheck, HeartHandshake, Compass } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export const metadata = {
  title: "About Himalayan Trails — Our Heritage, Guiding Ethos & Team",
  description:
    "Learn about our Kathmandu-based travel company, our dedication to porter welfare, transparent guiding, and low-impact mountain travel across Nepal.",
};

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Company Origin & Philosophy */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Our Story & Heritage
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Rooted in the Himalayas. Committed to the Trail.
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            Himalayan Trails was established in Kathmandu by Nepali mountain professionals who grew up in the shadow of high Himalayan passes. We were founded on a singular conviction: mountain journeys should empower local communities, protect high alpine wilderness, and offer travelers genuine human connection.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-sm overflow-hidden border border-[#e4dfd5] shadow-md bg-[#efece5]">
              <SafeImage
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
                alt="Sherpa guide standing before snowcapped Himalayan peaks"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1e3328] font-medium leading-snug">
              Why We Keep Our Expeditions Small and Thoughtful
            </h2>
            <p className="text-sm text-[#4d5c53] leading-relaxed">
              Mass tourism has created crowded trails and industrialized trekking lodges. We choose a different path. By limiting our departure groups to a maximum of 10 people, we preserve the silence of the high mountains, maintain personal safety margins, and ensure fair economic exchange with remote teahouses.
            </p>
            <p className="text-sm text-[#4d5c53] leading-relaxed">
              Every itinerary we design incorporates verified rest days and gradual elevation gains. We prioritize safety and depth of experience over rushing to meet arbitrary deadlines.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-[#f0ede6]">
              <div className="p-4 bg-[#fbf9f5] border border-[#e4dfd5] rounded-sm">
                <span className="block text-2xl font-serif text-[#1e3328] font-semibold">1:4</span>
                <span className="text-xs text-[#5a6b61] mt-1 block">Maximum guide-to-trekker ratio</span>
              </div>
              <div className="p-4 bg-[#fbf9f5] border border-[#e4dfd5] rounded-sm">
                <span className="block text-2xl font-serif text-[#1e3328] font-semibold">20 kg</span>
                <span className="text-xs text-[#5a6b61] mt-1 block">Strict maximum porter load limit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              Principles We Uphold
            </span>
            <h2 className="mt-2 text-3xl font-serif text-[#1e3328] tracking-tight">
              Our Foundational Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-sm border border-[#e4dfd5] flex flex-col justify-between">
              <div>
                <div className="p-3 bg-[#1e3328]/10 text-[#1e3328] w-fit rounded-sm mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif text-[#1e3328] font-medium">Equitable Crew Treatment</h3>
                <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                  Porters and assistant guides are the backbone of the Himalayas. We guarantee above-market wages, personal life and medical insurance, proper insulated clothing, and decent meals in every teahouse.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#e4dfd5] flex flex-col justify-between">
              <div>
                <div className="p-3 bg-[#1e3328]/10 text-[#1e3328] w-fit rounded-sm mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif text-[#1e3328] font-medium">Evidence-Based Altitude Safety</h3>
                <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                  Every lead guide undergoes wilderness medical training and carries calibrated pulse oximeters. We adhere strictly to Himalayan Rescue Association (HRA) ascent guidelines.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#e4dfd5] flex flex-col justify-between">
              <div>
                <div className="p-3 bg-[#1e3328]/10 text-[#1e3328] w-fit rounded-sm mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif text-[#1e3328] font-medium">Environmental Stewardship</h3>
                <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                  We actively discourage single-use plastic water bottles on the trail, recommending water purification tablets and UV purifiers instead. All expedition waste is repatriated to authorized facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local Leadership & Office */}
        <section id="team" className="scroll-mt-24 p-8 bg-[#efece5] border border-[#d1cbc2] rounded-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              Kathmandu Operations Team
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif text-[#1e3328]">
              Registered Base Camp & Administration
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#4d5c53] leading-relaxed">
              Our central office is located on Thamel Marg in Kathmandu, where our operations coordinators, logistics managers, and licensed trekking guides review trail updates, weather telemetry, and national park regulations daily.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[#1e3328]">
              <span className="px-3 py-1.5 bg-white rounded-xs border border-[#d1cbc2]">
                Govt. Tourism License: #2841/078
              </span>
              <span className="px-3 py-1.5 bg-white rounded-xs border border-[#d1cbc2]">
                TAAN Active Member
              </span>
              <span className="px-3 py-1.5 bg-white rounded-xs border border-[#d1cbc2]">
                KEEP Registered Partner
              </span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
