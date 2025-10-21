"use client";

import productsData from "@/data/products.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const PRODUCTS = productsData.categories.map(cat => ({
  id: cat.id,
  name: cat.name,
  image: cat.image,
  description: cat.description
}));

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
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
    <section id="products" className="relative py-20 md:py-28 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[#0a2540] mb-4">
            {productsData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {productsData.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#334155] max-w-2xl mx-auto">
            {productsData.subtitle}
          </p>
        </motion.div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer block h-full transform transition-transform duration-500 hover:-translate-y-2"
              >
                {/* 3D Effect Container */}
                <div className="relative h-64 overflow-hidden rounded-3xl transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Decorative corner element */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6 rounded-b-3xl border border-t-0 border-[#0a2540]/5">
                  <h3 className="text-xl font-bold font-heading text-[#0a2540] mb-2 group-hover:text-[#0ea5ff] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[#334155] mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#0ea5ff] font-semibold group-hover:gap-3 transition-all">
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
        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-[#334155] mb-8">
            Looking for something specific? We deal in 25+ product categories.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}