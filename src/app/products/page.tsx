import Link from "next/link";
import type { Metadata } from "next";
import productsData from "@/data/products.json";

export const metadata: Metadata = {
  title: "Our Products - Premium Agricultural Commodities",
  description: "Explore our wide range of premium agricultural products including pulses, spices, cereals, oil seeds, fresh vegetables, and dry fruits. Quality assured exports from India.",
  keywords: ["agricultural products", "agro commodities", "pulses", "spices", "cereals", "oil seeds", "fresh vegetables", "dry fruits", "export quality"],
  openGraph: {
    title: "Our Products - Galaxy Corporation",
    description: "Premium agricultural commodities for global markets",
    url: "https://galaxycorporation.co.in/products",
  },
};

const PRODUCT_CATEGORIES = productsData.categories.map(cat => ({
  ...cat
}));

export default function ProductsPage() {
  return (
    <main className="bg-[#f8f9fa] pt-[80px] pb-16">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-[42px] md:text-[56px] font-heading font-bold text-[#0a2540] mb-4">
            {productsData.title} <span className="text-[#0ea5ff]">{productsData.titleHighlight}</span>
          </h1>
          <p className="text-[16px] text-[#334155] max-w-[720px] mx-auto">
            {productsData.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-[240px_1fr] gap-6">
                {/* Image */}
                <div className="relative h-[200px] md:h-auto overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:py-6 md:pr-6 md:pl-0">
                  <h3 className="text-[24px] font-heading font-semibold text-[#0a2540] mb-3">
                    {category.name}
                  </h3>
                  <p className="text-[14px] text-[#334155] mb-4">
                    {category.description}
                  </p>
                  <div className="text-[13px] text-[#6b7280] mb-4">
                    <span className="font-medium">Products include:</span>{" "}
                    {category.items.slice(0, 3).join(", ")}
                    {category.items.length > 3 && ` +${category.items.length - 3} more`}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0ea5ff] group-hover:gap-3 transition-all">
                    View All Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
