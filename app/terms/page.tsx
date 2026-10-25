import { Container } from "@/components/ui/Primitives";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions of booking and travel with Himalayan Trails Pvt. Ltd.",
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20">
      <Container size="narrow">
        <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
          Legal Agreement
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1e3328] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-xs font-mono text-[#82998c]">
          Standard Operating Conditions • Himalayan Trails Pvt. Ltd., Kathmandu, Nepal
        </p>

        <div className="mt-10 space-y-8 text-sm text-[#4d5c53] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">1. Contract and Registration</h2>
            <p>
              All bookings and expedition contracts are made directly with Himalayan Trails Pvt. Ltd., a registered trekking agency licensed by the Government of Nepal (Department of Tourism). By confirming a trek, you agree to these terms on behalf of all participants in your party.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">2. High Altitude Nature & Assumption of Risk</h2>
            <p>
              Trekking in Nepal involves traveling in remote mountain geography with variable weather, unpredictable trail conditions, and potential high altitude effects. While our guides are certified in wilderness first aid and carry safety gear, participants acknowledge inherent wilderness risks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">3. Mandatory Medical & Evacuation Insurance</h2>
            <p>
              Every trekker must carry valid travel and medical insurance that specifically covers emergency helicopter evacuation up to 6,000 meters. Proof of insurance must be provided to our Kathmandu team prior to trail departure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">4. Itinerary Flexibility & Guide Authority</h2>
            <p>
              Mountain safety is paramount. Our lead guides retain the authority to modify itineraries, bypass passes, or turn back if adverse weather, rockfall, altitude sickness, or participant fatigue compromises team safety. No refunds are issued for safety-mandated itinerary adjustments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">5. Porter Welfare Policy</h2>
            <p>
              We observe strict porter protection regulations. Client duffel bags carried by porters must not exceed 10 kg per trekker (20 kg total per porter). Porters are provided fair wages, teahouse accommodation, meals, and medical coverage on all our departures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif text-[#1e3328] font-medium">6. Cancellation & Postponement</h2>
            <p>
              Cancellations received in writing more than 30 days prior to departure receive a full refund minus permit fees already incurred. In cases of sudden natural disasters or domestic flight cancellations due to weather (e.g. Lukla flights), we offer flexible postponement or alternative route arrangements.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
