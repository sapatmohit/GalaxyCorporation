"use client";

import teamData from "@/data/team.json";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = teamData.members.map(member => ({
  ...member
}));

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update itemsPerView based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <section id="team" className="relative py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto w-full px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[#0a2540] mb-3 sm:mb-4">
            {teamData.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
              {teamData.titleHighlight}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto px-2">
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
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-white group"
                  >
                    {/* Image */}
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex-grow flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0a2540] mb-1 group-hover:text-[#0ea5ff] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[#0ea5ff] font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        {member.position}
                      </p>
                      <p className="text-[#334155] leading-relaxed flex-grow text-sm">
                        {member.bio}
                      </p>

                      {/* Contact Options */}
                      <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* Email */}
                        <a 
                          href={`mailto:${member.email}`} 
                          aria-label="Email"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-[#0a2540] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        
                        {/* Instagram */}
                        <a 
                          href={member.social.instagram} 
                          aria-label="Instagram" 
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]"
                        >
                          <FaInstagram className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        
                        {/* X (formerly Twitter) */}
                        <a 
                          href={member.social.twitter} 
                          aria-label="X" 
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <FaXTwitter className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        
                        {/* Facebook */}
                        <a 
                          href={member.social.facebook} 
                          aria-label="Facebook" 
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <FaFacebookF className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                        
                        {/* LinkedIn */}
                        <a 
                          href={member.social.linkedin} 
                          aria-label="LinkedIn" 
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <FaLinkedinIn className="w-3 h-3 sm:w-4 sm:h-4" />
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 z-10 border border-gray-200 hover:shadow-2xl ${
              currentIndex === 0 
                ? "opacity-40 cursor-not-allowed" 
                : "hover:bg-[#0ea5ff] hover:text-white hover:border-[#0ea5ff] hover:scale-110"
            }`}
            aria-label="Previous team members"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 z-10 border border-gray-200 hover:shadow-2xl ${
              currentIndex === maxIndex 
                ? "opacity-40 cursor-not-allowed" 
                : "hover:bg-[#0ea5ff] hover:text-white hover:border-[#0ea5ff] hover:scale-110"
            }`}
            aria-label="Next team members"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#0ea5ff] w-8 sm:w-10" 
                    : "bg-[#0a2540]/20 w-2 sm:w-3 hover:bg-[#0ea5ff]/80"
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