import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, Mountain, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Primitives";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { TripCard } from "@/components/cards/TripCard";
import { TripSearchFilter } from "@/components/home/TripSearchFilter";
import { DESTINATIONS_DATA, TRIPS_DATA, TRAVEL_ARTICLES } from "@/lib/data";

export default function HomePage() {
  const featuredTrips = TRIPS_DATA.filter((t) => t.featured);
  const featuredDestinations = DESTINATIONS_DATA.slice(0, 6);
  const recentArticles = TRAVEL_ARTICLES.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#14231b]">
        {/* Background Nepal Mountain Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop"
            alt="Majestic Himalayan snow peaks towering above prayer flags in Nepal"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14231b] via-[#14231b]/50 to-black/40" />
        </div>

        <Container className="relative z-10 py-20 lg:py-28 text-center text-[#fbf9f5]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5ebd7] text-xs font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#e5a072]" />
              <span>Independent Nepal Trekking & Cultural Journeys</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.15] text-balance">
              Walk the timeless trails of the High Himalayas
            </h1>

            <p className="text-base sm:text-lg text-[#d5ded8] max-w-2xl mx-auto font-normal leading-relaxed">
              Thoughtfully curated trekking routes, Sherpa-guided high passes, and quiet mountain valleys. Grounded in authentic local stewardship and responsible mountain practices.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#b85a3a] text-white font-medium hover:bg-[#9e4a2d] active:bg-[#853c23] transition-all shadow-md hover:shadow-lg"
              >
                <span>Browse Curated Treks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-white/10 hover:bg-white/15 text-white font-medium border border-white/20 transition-all backdrop-blur-xs"
              >
                <span>Our Local Ethos</span>
              </Link>
            </div>
          </div>

          {/* 2. TRIP DISCOVERY / SEARCH BAR */}
          <div className="mt-14 max-w-5xl mx-auto">
            <TripSearchFilter />
          </div>
        </Container>
      </section>

      {/* 3. FEATURED DESTINATIONS */}
      <section className="py-20 lg:py-24 bg-[#fbf9f5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                Sanctuaries of Nepal
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
                Featured Destinations
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5a6b61] max-w-xl">
                From the glaciated amphitheater of Everest to the sub-tropical river sanctuaries of Chitwan.
              </p>
            </div>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors self-start md:self-auto"
            >
              <span>View all regions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. CURATED TREKKING & CULTURAL SAMPLE PACKAGES */}
      <section className="py-20 lg:py-24 bg-[#f5f2ea] border-y border-[#e4dfd5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                Sample Expedition Itineraries
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
                Featured Treks & Journeys
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5a6b61] max-w-xl">
                Balanced pacing, built-in acclimatization profiles, and authentic teahouse hospitality. Demonstration routes pending client customization.
              </p>
            </div>
            <Link
              href="/trips"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors self-start md:self-auto"
            >
              <span>Browse full catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. RESPONSIBLE TOURISM & LOCAL EXPERTISE */}
      <section className="py-20 lg:py-28 bg-[#1e3328] text-[#fbf9f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#e5a072] font-semibold">
                Our Mountain Code
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight leading-snug">
                Responsible tourism is not an afterthought; it is our foundation.
              </h2>
              <p className="text-sm sm:text-base text-[#c2ceca] leading-relaxed">
                Traveling through Nepal’s sensitive highland landscapes demands respect for fragile ecosystems and mountain communities. We adhere strictly to ethical guiding protocols, fair compensation, and environmental preservation.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-1 rounded-full bg-[#2a4537] text-[#a4cdb5] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Porter Welfare & Fair Living Wages</h3>
                    <p className="text-xs text-[#a3b8ad] mt-0.5 leading-relaxed">
                      All our mountain crew receive regulated maximum load limits (20kg), expedition-grade sleeping gear, nutritious meals, and comprehensive altitude health insurance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-1 rounded-full bg-[#2a4537] text-[#a4cdb5] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Direct Local Community Reinvestment</h3>
                    <p className="text-xs text-[#a3b8ad] mt-0.5 leading-relaxed">
                      We support locally owned family teahouses along the routes, source trail provisions from highland agricultural hamlets, and minimize corporate middleman overhead.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-1 rounded-full bg-[#2a4537] text-[#a4cdb5] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Leave No Trace & Clean Trail Ethics</h3>
                    <p className="text-xs text-[#a3b8ad] mt-0.5 leading-relaxed">
                      Strict non-plastic water bottle policies in alpine zones, safe water purification solutions, and complete packaging waste repatriation back to district hubs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#e5a072] hover:text-[#f5ebd7] transition-colors"
                >
                  <span>Learn more about our local team & ethics</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-sm overflow-hidden border border-[#345140] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
                  alt="Himalayan mountain guide leading trekkers through Nepal trail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. HOW IT WORKS: ENQUIRY & BOOKING PROCESS */}
      <section className="py-20 lg:py-24 bg-[#fbf9f5]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
              The Journey Ahead
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
              How We Plan Your Himalayan Trek
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5a6b61]">
              A transparent, supportive process from your initial inquiry in Kathmandu to your final flight home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col bg-white p-6 rounded-sm border border-[#e4dfd5]">
              <span className="text-xs font-mono font-semibold text-[#b85a3a] mb-2">Step 01</span>
              <h3 className="text-lg font-serif text-[#1e3328] font-medium">Select or Customize</h3>
              <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                Choose one of our established sample itineraries or send your custom dates, fitness goals, and preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col bg-white p-6 rounded-sm border border-[#e4dfd5]">
              <span className="text-xs font-mono font-semibold text-[#b85a3a] mb-2">Step 02</span>
              <h3 className="text-lg font-serif text-[#1e3328] font-medium">Route Consultation</h3>
              <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                Connect directly with our Kathmandu expedition leads to refine your acclimatization schedule and gear requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col bg-white p-6 rounded-sm border border-[#e4dfd5]">
              <span className="text-xs font-mono font-semibold text-[#b85a3a] mb-2">Step 03</span>
              <h3 className="text-lg font-serif text-[#1e3328] font-medium">Permits & Logistics</h3>
              <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                We secure all required TIMS cards, National Park permits, domestic mountain flights, and licensed Sherpa guides.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col bg-white p-6 rounded-sm border border-[#e4dfd5]">
              <span className="text-xs font-mono font-semibold text-[#b85a3a] mb-2">Step 04</span>
              <h3 className="text-lg font-serif text-[#1e3328] font-medium">Trail Execution</h3>
              <p className="text-xs text-[#5a6b61] mt-2 leading-relaxed">
                Arrive in Kathmandu for briefing and gear checks before stepping onto the mountain trail with 24/7 emergency dispatch.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. VERIFIABLE TRUST & STANDARDS */}
      <section className="py-16 bg-[#efece5] border-y border-[#e4dfd5]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-sm border border-[#d1cbc2] text-[#1e3328] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-serif font-medium text-[#1e3328]">Legally Registered Operator</h3>
                <p className="text-xs text-[#5a6b61] mt-1 leading-relaxed">
                  Fully licensed with the Department of Tourism, Government of Nepal and Nepal Rastra Bank foreign exchange authority.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-sm border border-[#d1cbc2] text-[#1e3328] shrink-0">
                <Mountain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-serif font-medium text-[#1e3328]">Wilderness First Aid Certified</h3>
                <p className="text-xs text-[#5a6b61] mt-1 leading-relaxed">
                  All lead guides maintain current wilderness first aid credentials, carry pulse oximeters, and have satellite communication access.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-sm border border-[#d1cbc2] text-[#1e3328] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-serif font-medium text-[#1e3328]">Small Group Ratios</h3>
                <p className="text-xs text-[#5a6b61] mt-1 leading-relaxed">
                  We limit group departures to a maximum of 10 trekkers per departure to guarantee personal attention and trail safety.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. TRAVEL JOURNAL / GUIDE PREVIEW */}
      <section className="py-20 lg:py-24 bg-[#fbf9f5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
                Himalayan Field Notes
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
                Nepal Travel Resources
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5a6b61] max-w-xl">
                Practical, field-tested guidance on high altitudes, packing strategies, and regional weather windows.
              </p>
            </div>
            <Link
              href="/travel-guide"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors self-start md:self-auto"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col bg-white border border-[#e4dfd5] rounded-sm overflow-hidden hover:border-[#1e3328]/40 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#efece5]">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-black/60 text-white rounded-xs">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#82998c]">
                      {article.readingTimeMin} min read • {article.publishedDate}
                    </span>
                    <h3 className="mt-2 text-lg font-serif text-[#1e3328] font-medium leading-snug group-hover:text-[#b85a3a] transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5a6b61] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#f0ede6]">
                    <Link
                      href={`/travel-guide#${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3328] group-hover:text-[#b85a3a] transition-colors"
                    >
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. FINAL INQUIRY CALL TO ACTION */}
      <section className="py-20 bg-[#14231b] text-[#fbf9f5] border-t border-[#23382c]">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e5a072] font-semibold">
            Begin Your Expedition
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif tracking-tight leading-snug">
            Ready to plan your journey through Nepal?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#c2ceca] leading-relaxed max-w-xl mx-auto">
            Whether you seek high-altitude mountaineering passes, scenic teahouse trails, or cultural journeys in Kathmandu Valley, our Kathmandu team provides realistic advice and personalized planning.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#b85a3a] text-white font-medium hover:bg-[#9e4a2d] transition-all shadow-md"
            >
              <span>Submit a Trip Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trips"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-[#c2ceca]/30 text-[#fbf9f5] hover:bg-white/5 transition-all"
            >
              <span>Explore All Sample Treks</span>
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#82998c]">
            No obligation. We reply within 24 hours with honest route assessments and permit timelines.
          </p>
        </Container>
      </section>
    </div>
  );
}
