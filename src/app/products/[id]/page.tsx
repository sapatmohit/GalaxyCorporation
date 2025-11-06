import productsData from "@/data/products.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductCategoryPage({ params }: { params: { id: string } }) {
  const category = productsData.categories.find(cat => cat.id === params.id);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 text-[#0ea5ff] hover:text-[#0596ea] transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/3 h-64 rounded-3xl overflow-hidden shadow-xl">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-[#0a2540] mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-[#334155] mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-[#0ea5ff]/10 text-[#0ea5ff]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-heading text-[#0a2540] mb-8">
            Products in {category.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.products.map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#0a2540]/5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold font-heading text-[#0a2540] mb-3">
                  {product.name}
                </h3>
                <p className="text-[#334155] leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}