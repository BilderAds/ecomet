import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { PainPoints } from "@/components/pain-points";
import { Solution } from "@/components/solution";
import { Steps } from "@/components/steps";
import { Testimonials } from "@/components/testimonials";
import { Features } from "@/components/features";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

const marqueeItems = [
  "4 bis 8 Tage Lieferzeit",
  "Qualitätskontrolle",
  "Kostenloser Service",
  "Persönlicher Agent",
  "Dropshipping & Lagern",
  "1,475+ Empfehlungen",
  "Eigenes Sourcing Team",
  "Branding Möglichkeit",
  "Flexible Zahlung",
  "DACH Raum",
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee items={marqueeItems} />
        <PainPoints />
        <Solution />
        <Steps />
        <Testimonials />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
