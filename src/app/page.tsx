import PremiumHero from "./components/PremiumHero";
import WhyChooseUs from "./components/WhyChooseUs";
import ProductsSection from "./components/ProductsSection";
import MembershipsSection from "./components/MembershipsSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <PremiumHero />
      <WhyChooseUs />
      <ProductsSection />
      <MembershipsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
