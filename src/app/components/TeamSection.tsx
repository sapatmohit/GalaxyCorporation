"use client";

import teamData from "@/data/team.json";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TEAM_MEMBERS = teamData.members.map(member => ({
  ...member
}));

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, TEAM_MEMBERS.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goTo = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Adjust items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  return (
    <section id="team" className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#f8f9fa]/30 to-white overflow-hidden">
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
            {teamData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {teamData.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#334155] max-w-2xl mx-auto">
            {teamData.subtitle}
          </p>
        </motion.div>

        {/* Swiper Container */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {TEAM_MEMBERS.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Social Icons - Hidden by default, shown on hover */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a 
                          href="#" 
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a 
                          href="#" 
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="Email"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold font-heading text-[#0a2540] mb-1 group-hover:text-[#0ea5ff] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[#0ea5ff] font-semibold mb-3">
                        {member.position}
                      </p>
                      <p className="text-[#334155] leading-relaxed flex-grow">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 ${
              currentIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#0ea5ff] hover:text-white hover:shadow-xl"
            }`}
            aria-label="Previous team members"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 ${
              currentIndex === maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#0ea5ff] hover:text-white hover:shadow-xl"
            }`}
            aria-label="Next team members"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#0ea5ff] w-10" : "bg-[#0a2540]/20 w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}