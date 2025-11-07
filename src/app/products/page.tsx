import productsData from "@/data/products.json";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="mx-auto max-w-[80%] px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#0a2540] mb-4">
            {productsData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {productsData.titleHighlight}
            </span>
          </h1>
          <p className="text-lg text-[#334155]">
            {productsData.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading text-[#0a2540] mb-2 group-hover:text-[#0ea5ff] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-[#334155] mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.items.slice(0, 3).map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-[#0ea5ff]/10 text-[#0ea5ff]"
                    >
                      {item}
                    </span>
                  ))}
                  {category.items.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-[#0a2540]/10 text-[#0a2540]">
                      +{category.items.length - 3} more
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/products/${category.id}`}
                  className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}