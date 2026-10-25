import { Container } from "@/components/ui/Primitives";

export default function Loading() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="narrow" className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#1e3328]/20 border-t-[#1e3328] rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest font-mono text-[#5a6b61]">
          Loading Himalayan Trails...
        </p>
      </Container>
    </div>
  );
}
