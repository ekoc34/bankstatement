import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <section id="pricing">
          <PricingSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
