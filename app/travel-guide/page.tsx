import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Primitives";
import { TRAVEL_ARTICLES } from "@/lib/data";

export const metadata = {
  title: "Nepal Travel Guide & Practical Himalayan Advice",
  description:
    "Essential mountain travel advice: high altitude acclimatization, season comparison, teahouse customs, packing systems, and responsible trekking practices in Nepal.",
};

export default function TravelGuidePage() {
  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Field Knowledge & Planning
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Nepal Travel Guide & Resources
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            Planning a trek into the highest mountain chain on Earth requires reliable preparation. Our guides and operations leaders have compiled these practical field articles to prepare you for life on Nepal&apos;s trails.
          </p>
        </div>

        {/* Featured Guide Articles */}
        <div className="space-y-16">
          {TRAVEL_ARTICLES.map((article) => (
            <article
              key={article.slug}
              id={article.slug}
              className="scroll-mt-24 p-6 sm:p-8 bg-white border border-[#e4dfd5] rounded-sm transition-all hover:border-[#1e3328]/30 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-16/10 rounded-sm overflow-hidden bg-[#efece5]">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-mono uppercase bg-black/60 text-white rounded-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[#82998c] font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readingTimeMin} min read
                      </span>
                      <span>•</span>
                      <span>Published {article.publishedDate}</span>
                    </div>

                    <h2 className="text-2xl font-serif text-[#1e3328] font-medium leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm font-medium text-[#b85a3a] mt-2 italic">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 space-y-3 text-xs text-[#4d5c53] leading-relaxed">
                      {article.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#f0ede6] flex items-center justify-between">
                    <span className="text-xs text-[#5a6b61]">Have a specific query?</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e3328] hover:text-[#b85a3a] transition-colors"
                    >
                      <span>Ask our guides</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quick FAQ / Preparation Strip */}
        <div className="mt-20 p-8 bg-[#efece5] border border-[#d1cbc2] rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-serif text-[#1e3328] font-semibold text-base mb-2">
                Nepal Visa on Arrival
              </h3>
              <p className="text-xs text-[#5a6b61] leading-relaxed">
                Most nationalities can obtain a tourist visa upon arrival at Tribhuvan International Airport (Kathmandu) for 15, 30, or 90 days. Keep USD cash and passport photos handy.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[#1e3328] font-semibold text-base mb-2">
                Mandatory Travel Insurance
              </h3>
              <p className="text-xs text-[#5a6b61] leading-relaxed">
                All trekkers must possess travel insurance that explicitly covers emergency high-altitude helicopter evacuation up to 6,000 meters.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-[#1e3328] font-semibold text-base mb-2">
                Currency & Trail Payments
              </h3>
              <p className="text-xs text-[#5a6b61] leading-relaxed">
                Mountain teahouses operate strictly on cash (Nepalese Rupees, NPR). ATMs are available in Kathmandu, Pokhara, and Namche Bazaar, but carry cash reserves into the trails.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
