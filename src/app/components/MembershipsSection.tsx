"use client";

import membershipsData from "@/data/memberships.json";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MEMBERSHIPS = membershipsData.organizations.map(org => ({
  ...org
}));

export default function MembershipsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEMBERSHIPS.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMBERSHIPS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMBERSHIPS.length) % MEMBERSHIPS.length);
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#f0f9ff]/30 to-white">
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
            {membershipsData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {membershipsData.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#334155] max-w-2xl mx-auto">
            {membershipsData.subtitle}
          </p>
        </motion.div>

        {/* Logo Carousel */}
        <div 
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Container */}
          <div className="relative h-32 flex items-center">
            {/* Visible Logos */}
            <div className="flex gap-8 animate-pulse">
              {[...MEMBERSHIPS, ...MEMBERSHIPS].map((membership, index) => (
                <motion.div
                  key={`${membership.id}-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white rounded-2xl border border-[#0a2540]/5 shadow-md hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center px-4">
                    <div className="text-[#0a2540] font-bold text-lg mb-1">
                      {membership.name}
                    </div>
                    <div className="text-[#334155] text-xs">
                      {membership.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0ea5ff] hover:text-white transition-all duration-300 z-10"
            aria-label="Previous organizations"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0ea5ff] hover:text-white transition-all duration-300 z-10"
            aria-label="Next organizations"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Badge */}
        <motion.div 
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#0a2540]/5 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0ea5ff]/10">
              <svg className="w-5 h-5 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-[#0a2540] font-semibold">
              {membershipsData.trustBadge.text}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}