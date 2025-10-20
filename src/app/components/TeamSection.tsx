"use client";

import { useState } from "react";
import teamData from "@/data/team.json";

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
  useState(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  });

  return (
    <section id="team" className="relative bg-gradient-to-b from-[#f8f9fa] to-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-[#0a2540] mb-4">
            {teamData.title} <span className="text-[#0ea5ff]">{teamData.titleHighlight}</span>
          </h2>
          <p className="text-[16px] text-[#334155] max-w-[680px] mx-auto">
            {teamData.subtitle}
          </p>
        </div>

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
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative h-[280px] overflow-hidden bg-[#f8f9fa]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-[22px] font-heading font-semibold text-[#0a2540] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[14px] font-medium text-[#0ea5ff] mb-3">
                        {member.position}
                      </p>
                      <p className="text-[14px] text-[#6b7280] leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
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
                : "hover:bg-[#0ea5ff] hover:text-white"
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
                : "hover:bg-[#0ea5ff] hover:text-white"
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
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#0ea5ff] w-8" : "bg-[#0a2540]/20 w-2.5"
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
