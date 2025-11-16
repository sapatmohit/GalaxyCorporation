import { getTranslations } from 'next-intl/server';
import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import MembershipsSection from '../components/MembershipsSection';
import ProductsSection from '../components/ProductsSection';
import TeamSection from '../components/TeamSection';
import WhyChooseUs from '../components/WhyChooseUs';

export default async function Home() {
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
