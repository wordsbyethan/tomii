import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { HeroSlider } from "@/components/site/HeroSlider";
import { WelcomeModal } from "@/components/site/WelcomeModal";
import { ServiceHighlight } from "@/components/site/ServiceHighlight";
import { Services } from "@/components/site/Services";
import { Steps } from "@/components/site/Steps";
import { ProductInfo } from "@/components/site/ProductInfo";
import { BestSellers } from "@/components/site/BestSellers";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tomi Beauty & Spa — Luxury Beauty & Wellness in Arepo, Ogun State" },
      {
        name: "description",
        content:
          "Premium beauty treatments, advanced skincare and wellness rituals at Tomi Beauty & Spa in Arepo, Ogun State. Book your luxury experience today.",
      },
      { property: "og:title", content: "Tomi Beauty & Spa — Luxury Beauty & Wellness" },
      {
        property: "og:description",
        content:
          "Indulge in luxury beauty treatments and wellness rituals tailored to perfection.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WelcomeModal />
      <main>
        <HeroSlider />
        <ServiceHighlight />
        <Services />
        <Steps />
        <ProductInfo />
        <BestSellers />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
