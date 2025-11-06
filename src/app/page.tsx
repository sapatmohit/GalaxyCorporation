import Image from "next/image";
import ContactSection from "./components/ContactSection";
import MembershipsSection from "./components/MembershipsSection";
import PremiumHero from "./components/PremiumHero";
import ProductsSection from "./components/ProductsSection";
import TeamSection from "./components/TeamSection";
import WhyChooseUs from "./components/WhyChooseUs";

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
