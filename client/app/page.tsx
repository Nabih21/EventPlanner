import HeroSection from "@/components/home/hero-section"
import FeaturedEvents from "@/components/home/featured-events"
import BenefitsSection from "@/components/home/benefits-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import CtaSection from "@/components/home/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedEvents />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  )
}

