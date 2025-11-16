"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import productsData from "@/data/products.json";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const t = useTranslations('common.products');
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(productsData.categories);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = productsData.categories;
    
    if (activeFilter !== "all") {
      result = result.filter(product => product.id === activeFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.items.some(item => item.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(result);
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[#0a2540] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('title')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {t('titleHighlight')}
            </span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative mb-6">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all text-sm sm:text-base"
            />
            <svg 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white shadow-lg"
                  : "bg-white text-[#0a2540] hover:bg-[#0ea5ff]/10 border border-[#0a2540]/10"
              }`}
            >
              {t('allProducts')}
            </button>
            
            {productsData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white shadow-lg"
                    : "bg-white text-[#0a2540] hover:bg-[#0ea5ff]/10 border border-[#0a2540]/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0a2540] mb-2 group-hover:text-[#0ea5ff] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-[#334155] mb-4 text-sm sm:text-base leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {category.items.slice(0, 3).map((item, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-[#0ea5ff]/10 text-[#0ea5ff]"
                      >
                        {item}
                      </span>
                    ))}
                    {category.items.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-[#0a2540]/10 text-[#0a2540]">
                        +{category.items.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/products/${category.id}`}
                    className="inline-flex items-center justify-center w-full h-10 sm:h-12 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-[#0a2540] mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0a2540] mb-2">{t('noProductsFound')}</h3>
              <p className="text-[#334155] mb-6">{t('tryAdjusting')}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-[#0ea5ff] text-white font-semibold shadow-md hover:bg-[#0596ea] transition-all"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[#0ea5ff]/10 to-[#0596ea]/10 rounded-2xl p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#0a2540] mb-1">{productsData.categories.length}</p>
            <p className="text-sm sm:text-base text-[#334155]">{t('productCategories')}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0ea5ff]/10 to-[#0596ea]/10 rounded-2xl p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#0a2540] mb-1">
              {productsData.categories.reduce((total, category) => total + category.items.length, 0)}
            </p>
            <p className="text-sm sm:text-base text-[#334155]">{t('totalProducts')}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0ea5ff]/10 to-[#0596ea]/10 rounded-2xl p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#0a2540] mb-1">50+</p>
            <p className="text-sm sm:text-base text-[#334155]">{t('countriesServed')}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0ea5ff]/10 to-[#0596ea]/10 rounded-2xl p-5 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#0a2540] mb-1">15+</p>
            <p className="text-sm sm:text-base text-[#334155]">{t('yearsExperience')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

