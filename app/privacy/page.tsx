import { Container } from "@/components/ui/Primitives";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy and data protection commitments of Himalayan Trails Pvt. Ltd.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 lg:py-20">
      <Container size="narrow">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
          Legal & Transparency
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs font-mono text-[#82998c]">
          Last revised: October 2026 • Himalayan Trails Pvt. Ltd., Kathmandu, Nepal
        </p>

        <div className="mt-10 space-y-8 text-sm text-[#4d5c53] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">1. Overview and Scope</h2>
            <p>
              Himalayan Trails Pvt. Ltd. (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy outlines how we collect, store, and utilize information provided when you interact with our website, inquire about our trekking itineraries, or correspond with our Kathmandu team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">2. Information We Collect</h2>
            <p>
              When you submit a trip inquiry or communicate with our operations staff, we collect necessary expedition planning details:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Full contact details (name, email address, country of residence, phone number).</li>
              <li>Trekking preferences (intended travel dates, fitness background, dietary needs).</li>
              <li>Passport and visa documentation required by the Nepal Department of Immigration and National Park authorities for trekking permits (collected prior to departure).</li>
              <li>Emergency medical insurance policy numbers and emergency contact contacts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">3. How Your Information is Used</h2>
            <p>
              We use your data solely for the legal arrangement and safe execution of your journey:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Securing Trekker&apos;s Information Management System (TIMS) cards and national park entry permits.</li>
              <li>Booking domestic mountain flight tickets and teahouse accommodations.</li>
              <li>Coordinating wilderness search and rescue or medical emergency response if necessary.</li>
              <li>Responding directly to your communications.</li>
            </ul>
            <p>
              We never sell, rent, or trade traveler data to commercial third parties or external marketing agencies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">4. Data Retention & Contact</h2>
            <p>
              We retain permit and booking records as required by the Ministry of Culture, Tourism and Civil Aviation and Nepal taxation laws. If you wish to review, update, or request deletion of your inquiry details, please contact us at:
            </p>
            <p className="p-4 bg-white border border-[#e4dfd5] rounded-sm font-mono text-xs">
              Himalayan Trails Pvt. Ltd.<br />
              Email: privacy@himalayantrails.com<br />
              Thamel Marg, Ward 26, Kathmandu, Nepal
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
