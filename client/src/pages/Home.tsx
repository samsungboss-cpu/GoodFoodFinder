import Hero from "@/components/Hero";
import BenefitsSection from "@/components/BenefitsSection";
import LocationRequestForm from "@/components/LocationRequestForm";
import FoodCriticSection from "@/components/FoodCriticSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <BenefitsSection />
      <LocationRequestForm />
      <FoodCriticSection />
      <Footer />
    </div>
  );
}
