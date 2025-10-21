"use client";

import featuresData from "@/data/features.json";
import { motion } from "framer-motion";
import { ReactElement } from "react";

const ICON_MAP: Record<string, ReactElement> = {
  globe: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  shield: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  lightning: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  money: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const FEATURES = featuresData.features.map(feature => ({
  ...feature,
  icon: ICON_MAP[feature.icon]
}));

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#f8f9fa]/30 to-white">
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
            {featuresData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {featuresData.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#334155] max-w-2xl mx-auto">
            {featuresData.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#0a2540]/5 hover:border-[#0ea5ff]/30 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5ff]/5 to-[#0596ea]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Icon container */}
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-xl bg-[#0ea5ff]/10 flex items-center justify-center text-[#0ea5ff] group-hover:bg-[#0ea5ff]/20 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold font-heading text-[#0a2540] mb-3 group-hover:text-[#0ea5ff] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[#334155] leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#0ea5ff]/5 -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-28 pt-12 border-t border-[#0a2540]/10">
          {featuresData.stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold font-heading text-[#0ea5ff] mb-2">{stat.value}</div>
              <div className="text-lg text-[#334155]">{stat.label}</div>
              
              {/* Decorative dots */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0ea5ff] opacity-20"></div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0ea5ff] opacity-20"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}