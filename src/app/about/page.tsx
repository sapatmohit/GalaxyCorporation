"use client";

import featuresData from "@/data/features.json";
import heroData from "@/data/hero.json";
import membershipsData from "@/data/memberships.json";
import siteConfig from "@/data/siteConfig.json";
import teamData from "@/data/team.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBolt, FaGlobe, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import MembershipsSection from "../components/MembershipsSection";
import TeamSection from "../components/TeamSection";

const featuresIcons = {
  globe: <FaGlobe className="w-8 h-8 text-[#0ea5ff]" />,
  shield: <FaShieldAlt className="w-8 h-8 text-[#0ea5ff]" />,
  lightning: <FaBolt className="w-8 h-8 text-[#0ea5ff]" />,
  money: <FaMoneyBillWave className="w-8 h-8 text-[#0ea5ff]" />,
};

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(percentage * end);
      setCount(currentCount);
      
      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <span>{count}{end >= 100 ? "+" : ""}</span>;
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-white pt-20">
        <div className="mx-auto w-full px-4 sm:px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#0a2540] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-[#0ea5ff]">{siteConfig.company.name}</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-[#334155] mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {siteConfig.company.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-gray-50">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0a2540] mb-6">
                  Our Story
                </h2>
                <p className="text-[#334155] mb-6 leading-relaxed">
                  {heroData.content.description1}
                </p>
                <p className="text-[#334155] mb-6 leading-relaxed">
                  {heroData.content.description2}
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <p className="text-2xl font-bold text-[#0ea5ff]">{siteConfig.company.foundedYear}</p>
                    <p className="text-sm text-[#334155]">Founded</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <p className="text-2xl font-bold text-[#0ea5ff]">50+</p>
                    <p className="text-sm text-[#334155]">Countries Served</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <p className="text-2xl font-bold text-[#0ea5ff]">25+</p>
                    <p className="text-sm text-[#334155]">Product Categories</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg h-80">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop" 
                    alt="Agricultural Products" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-80 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=600&auto=format&fit=crop" 
                    alt="Global Trade" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#0a2540] mb-4">
                {featuresData.title} <span className="text-[#0ea5ff]">{featuresData.titleHighlight}</span>
              </h2>
              <p className="text-lg text-[#334155] max-w-3xl mx-auto">
                {featuresData.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuresData.features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4">
                    {featuresIcons[feature.icon as keyof typeof featuresIcons]}
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2540] mb-3">{feature.title}</h3>
                  <p className="text-[#334155]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#0a2540]/10">
         {featuresData.stats.map((stat, index) => (
         <motion.div 
            key={index} 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
         >
            <div className="text-[36px] md:text-[42px] font-heading font-bold text-[#0ea5ff]">
               {stat.value.includes('+') ? (
               <AnimatedCounter end={parseInt(stat.value)} />
               ) : (
               stat.value
               )}
            </div>
            <div className="text-[14px] text-[#334155] mt-1">{stat.label}</div>
         </motion.div>
         ))}
      </div>

      {/* Memberships Section */}
      <MembershipsSection />

      {/* Team Section */}
      <TeamSection />
    </div>
  );
}