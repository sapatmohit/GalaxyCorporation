import Image from "next/image";
import ContactSection from "./components/ContactSection";
import MembershipsSection from "./components/MembershipsSection";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import TeamSection from "./components/TeamSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ProductsSection />
      <MembershipsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
