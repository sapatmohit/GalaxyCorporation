"use client";

import heroData from "@/data/hero.json";
import { motion } from "framer-motion";
import { useState } from "react";

const IMAGES = heroData.slides.map(slide => slide.image);

export default function PremiumHero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % IMAGES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  const goTo = (index: number) => setCurrent(index);

  return (
    <section className="relative bg-white pt-[80px] pb-16">
      <div className="mx-auto max-w-[80%] px-6 py-12">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            {/* Left: Image Carousel */}
            <div className="relative w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <img
                key={current}
                src={IMAGES[current]}
                alt="Galaxy Corporation"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Navigation Arrows on Image */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-[#0a2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-[#0a2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator on Image */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === current ? "bg-[#0ea5ff] w-8" : "bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Static Text Content */}
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 
                className="text-[28px] md:text-[36px] font-heading font-normal text-[#0a2540]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroData.content.title} <span className="text-[#0ea5ff] font-semibold">{heroData.content.highlight}</span>
              </motion.h2>
              <motion.p 
                className="text-[15px] leading-relaxed text-[#334155]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {heroData.content.description1}
              </motion.p>
              <motion.p 
                className="text-[15px] leading-relaxed text-[#334155]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {heroData.content.description2}
              </motion.p>
              <motion.div 
                className="pt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.a
                  href={heroData.content.ctaLink}
                  className="inline-flex items-center justify-center h-11 px-7 rounded-md bg-[#0ea5ff] text-white text-[15px] font-semibold shadow-sm hover:bg-[#0596ea] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {heroData.content.ctaText}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}