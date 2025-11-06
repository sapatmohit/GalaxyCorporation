"use client";

import productsData from "@/data/products.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

const PRODUCTS: Product[] = productsData.categories.map(cat => ({
  id: cat.id,
  name: cat.name,
  image: cat.image,
  description: cat.description
}));

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [isMounted, setIsMounted] = useState(false);

  // Get unique categories for filter buttons
  const categories = ["all", ...PRODUCTS.map(product => product.id)];

  useEffect(() => {
    setIsMounted(true);
    if (activeFilter === "all") {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(product => product.id === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="products" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-[#0a2540] mb-4">
            {productsData.title} <span className="text-[#0ea5ff]">{productsData.titleHighlight}</span>
          </h2>
          <p className="text-[16px] text-[#334155] max-w-[680px] mx-auto">
            {productsData.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-[#0ea5ff] text-white shadow-lg"
                : "bg-white text-[#0a2540] hover:bg-[#0ea5ff]/10 border border-[#0a2540]/10"
            }`}
          >
            All Products
          </button>
          
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveFilter(product.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === product.id
                  ? "bg-[#0ea5ff] text-white shadow-lg"
                  : "bg-white text-[#0a2540] hover:bg-[#0ea5ff]/10 border border-[#0a2540]/10"
              }`}
            >
              {product.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#0ea5ff]/20 transition-all duration-500 cursor-pointer block bg-white border border-white"
              >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Category Name */}
                <h3 className="text-[24px] font-heading font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-[14px] text-white/80 mb-4">
                  {product.description}
                </p>
                <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0ea5ff] group-hover:gap-3 transition-all">
                  Explore Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-[15px] text-[#334155] mb-6">
            Looking for something specific? We deal in 25+ product categories.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#0ea5ff] text-white text-[15px] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}