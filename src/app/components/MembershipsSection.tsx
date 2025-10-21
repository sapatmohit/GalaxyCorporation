"use client";

import membershipsData from "@/data/memberships.json";
import { motion } from "framer-motion";

const MEMBERSHIPS = membershipsData.organizations.map(org => ({
  ...org
}));

export default function MembershipsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#f8f9fa]/30 to-white">
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

        {/* Logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {MEMBERSHIPS.map((membership, index) => (
            <motion.div
              key={membership.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[#0a2540]/5 hover:border-[#0ea5ff]/30 hover:shadow-xl transition-all duration-300 h-full">
                {/* Logo Container */}
                <div className="relative w-24 h-24 mb-5 flex items-center justify-center p-3 rounded-xl bg-[#f8f9fa] border border-[#0a2540]/5 group-hover:border-[#0ea5ff]/20 transition-all duration-300">
                  {/* Placeholder - Replace with actual logo */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-[#0ea5ff] font-heading font-bold text-base leading-tight">
                      {membership.name}
                    </div>
                    {/* When you have logos, replace above div with:
                    <img
                      src={membership.logo}
                      alt={membership.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    */}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold font-heading text-[#0a2540] mb-2 group-hover:text-[#0ea5ff] transition-colors duration-300">
                  {membership.name}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  {membership.description}
                </p>
              </div>
            </motion.div>
          ))}
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