"use client";

import teamData from "@/data/team.json";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = teamData.members.map(member => ({
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

  return (
    <section id="team" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[80%] px-6">
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
                  <div 
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-white"
                  >
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                      {/* Social CTAs (react-icons) */}
                      <div className="mt-6 flex items-center gap-3">
                        {/* Instagram */}
                        <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full text-white flex items-center justify-center hover:opacity-90 transition bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                          <FaInstagram className="w-4 h-4" />
                        </a>
                        {/* X (formerly Twitter) */}
                        <a href="#" aria-label="X" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition">
                          <FaXTwitter className="w-4 h-4" />
                        </a>
                        {/* Facebook */}
                        <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition">
                          <FaFacebookF className="w-4 h-4" />
                        </a>
                      </div>
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#0ea5ff] hover:text-white"}`}
            aria-label="Previous team members"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 ${currentIndex === maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-[#0ea5ff] hover:text-white"}`}
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
                className={`h-3 rounded-full transition-all ${index === currentIndex ? "bg-[#0ea5ff] w-10" : "bg-[#0a2540]/20 w-3"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}