import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import productsData from "@/data/products.json";

type Props = {
  params: { id: string }
}

// Convert JSON data to the format needed by the component
const PRODUCT_DATA = productsData.categories.reduce((acc, cat) => {
  acc[cat.id] = {
    name: cat.name,
    description: cat.description,
    products: cat.products
  };
  return acc;
}, {} as Record<string, { name: string; description: string; products: { name: string; description: string }[] }>);

const OLD_PRODUCT_DATA: Record<string, { name: string; description: string; products: { name: string; description: string }[] }> = {
  "pulses-legumes": {
    name: "Pulses & Legumes",
    description: "We source and export premium quality pulses and legumes from the best agricultural regions of India. Our products undergo strict quality control to ensure they meet international standards.",
    products: [
      { name: "Chickpeas (Kabuli & Desi)", description: "High protein content, ideal for various culinary applications" },
      { name: "Red Lentils (Masoor Dal)", description: "Quick-cooking lentils with excellent nutritional value" },
      { name: "Green Lentils", description: "Rich in fiber and minerals, perfect for soups and salads" },
      { name: "Black Lentils (Urad Dal)", description: "Premium quality with high protein content" },
      { name: "Kidney Beans (Rajma)", description: "Large, nutritious beans ideal for curries and stews" },
      { name: "Mung Beans (Moong Dal)", description: "Easily digestible, rich in vitamins and minerals" },
      { name: "Pigeon Peas (Toor Dal)", description: "Staple pulse with excellent taste and nutrition" },
      { name: "Black-eyed Peas", description: "Versatile legume with distinct flavor" },
      { name: "Soya Beans", description: "High protein content, multipurpose legume" },
    ],
  },
  "oil-seeds": {
    name: "Oil Seeds",
    description: "Premium quality oil seeds for industrial and culinary applications. We ensure proper cleaning, grading, and packaging to maintain freshness and quality.",
    products: [
      { name: "White Sesame Seeds", description: "Natural, unhulled seeds with rich nutty flavor" },
      { name: "Black Sesame Seeds", description: "Premium quality seeds for oil extraction and culinary use" },
      { name: "Sunflower Seeds", description: "High oil content, perfect for extraction and snacking" },
      { name: "Peanuts (Groundnuts)", description: "Bold and java varieties available" },
      { name: "Mustard Seeds (Yellow & Black)", description: "Pungent seeds for oil and spice applications" },
      { name: "Castor Seeds", description: "Industrial grade seeds for oil extraction" },
      { name: "Flax Seeds (Linseed)", description: "Rich in omega-3 fatty acids" },
      { name: "Niger Seeds", description: "Bird feed and oil extraction grade" },
    ],
  },
  "spices": {
    name: "Spices",
    description: "Authentic Indian spices with rich aroma and superior quality. We source directly from spice-growing regions and maintain strict quality standards.",
    products: [
      { name: "Turmeric Powder", description: "Bright color, high curcumin content" },
      { name: "Turmeric Whole (Fingers)", description: "Premium grade whole turmeric" },
      { name: "Cumin Seeds", description: "Aromatic seeds with distinct flavor" },
      { name: "Coriander Seeds", description: "Fresh, aromatic seeds for grinding" },
      { name: "Coriander Powder", description: "Finely ground, preserving natural oils" },
      { name: "Red Chilli Powder", description: "Various heat levels available" },
      { name: "Whole Dry Red Chillies", description: "Premium grade, sun-dried" },
      { name: "Black Pepper", description: "Bold, pungent flavor" },
      { name: "Green Cardamom", description: "Aromatic pods with sweet flavor" },
      { name: "Cloves", description: "Premium quality, hand-picked" },
      { name: "Fenugreek Seeds", description: "Bitter-sweet seeds with health benefits" },
      { name: "Fennel Seeds", description: "Sweet, aromatic seeds" },
    ],
  },
  "cereals": {
    name: "Cereals",
    description: "Premium grains sourced from the finest agricultural regions. We offer a wide variety of cereals to meet diverse market needs.",
    products: [
      { name: "Basmati Rice (1121)", description: "Extra long grain, aged rice with superior aroma" },
      { name: "Basmati Rice (Pusa)", description: "Traditional basmati variety" },
      { name: "Non-Basmati Rice (IR64)", description: "Long grain, non-sticky rice" },
      { name: "Parboiled Rice", description: "Partially cooked rice with enhanced nutrition" },
      { name: "Wheat Flour", description: "Fine quality, suitable for various applications" },
      { name: "Pearl Millet (Bajra)", description: "Nutritious millet variety" },
      { name: "Sorghum (Jowar)", description: "Gluten-free grain alternative" },
      { name: "Maize (Corn)", description: "Yellow and white varieties available" },
      { name: "Barley", description: "Hulled and pearl barley" },
    ],
  },
  "fresh-vegetables": {
    name: "Fresh Vegetables",
    description: "Farm-fresh vegetables carefully selected, graded, and packed to ensure maximum freshness during export. We maintain cold chain logistics for optimal quality.",
    products: [
      { name: "Red Onions", description: "Sharp flavor, ideal for cooking and salads" },
      { name: "White Onions", description: "Mild, sweet variety" },
      { name: "Potatoes", description: "Multiple varieties for different uses" },
      { name: "Tomatoes", description: "Fresh, firm tomatoes" },
      { name: "Green Chillies", description: "Hot and medium heat varieties" },
      { name: "Bell Peppers (Capsicum)", description: "Green, red, and yellow varieties" },
      { name: "Okra (Lady Finger)", description: "Fresh, tender okra" },
      { name: "Eggplant (Brinjal)", description: "Various sizes and varieties" },
      { name: "Cabbage", description: "Fresh, crisp heads" },
      { name: "Cauliflower", description: "White, firm florets" },
    ],
  },
  "dry-fruits-nuts": {
    name: "Dry Fruits & Nuts",
    description: "Premium quality dry fruits and nuts sourced from the best producers. We ensure proper grading, cleaning, and packaging to maintain freshness.",
    products: [
      { name: "Almonds", description: "California and mamra varieties" },
      { name: "Cashews (W180, W240, W320)", description: "Premium grade, whole cashews" },
      { name: "Walnuts", description: "Light and amber varieties" },
      { name: "Pistachios", description: "Iranian and Afghan varieties" },
      { name: "Golden Raisins", description: "Sweet, seedless raisins" },
      { name: "Black Raisins", description: "Natural, sun-dried" },
      { name: "Dates (Medjool, Deglet Noor)", description: "Premium quality, soft dates" },
      { name: "Dried Apricots", description: "Sweet, naturally preserved" },
      { name: "Figs", description: "Dried figs with natural sweetness" },
    ],
  },
};

// Merge with old data for backward compatibility (remove if not needed)
Object.assign(PRODUCT_DATA, OLD_PRODUCT_DATA);

export async function generateStaticParams() {
  return [
    { id: 'pulses-legumes' },
    { id: 'oil-seeds' },
    { id: 'spices' },
    { id: 'cereals' },
    { id: 'fresh-vegetables' },
    { id: 'dry-fruits-nuts' },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = PRODUCT_DATA[params.id];
  
  if (!data) {
    return {
      title: "Product Not Found",
    };
  }
  
  return {
    title: `${data.name} - Premium Quality Export`,
    description: `${data.description} View our complete range of ${data.name.toLowerCase()}.`,
    keywords: [data.name.toLowerCase(), "export", "India", "quality", "agricultural products"],
    openGraph: {
      title: `${data.name} | Galaxy Corporation`,
      description: data.description,
      url: `https://galaxycorporation.co.in/products/${params.id}`,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const data = PRODUCT_DATA[params.id];

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-[#f8f9fa] pt-[80px] pb-16">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] text-[#6b7280] mb-8">
          <Link href="/" className="hover:text-[#0ea5ff] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0ea5ff] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#0a2540] font-medium">{data.name}</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-[42px] md:text-[56px] font-heading font-bold text-[#0a2540] mb-4">
            {data.name}
          </h1>
          <p className="text-[16px] text-[#334155] max-w-[820px]">
            {data.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#0a2540]/5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#0ea5ff]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-heading font-semibold text-[#0a2540] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <h3 className="text-[28px] font-heading font-semibold text-[#0a2540] mb-4">
            Interested in {data.name}?
          </h3>
          <p className="text-[15px] text-[#334155] mb-6 max-w-[600px] mx-auto">
            Contact us for bulk orders, pricing, and custom requirements. Our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#0ea5ff] text-white text-[15px] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Request Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-[#0a2540]/25 text-[#0a2540] text-[15px] font-semibold hover:bg-[#0a2540]/5 transition-all"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
