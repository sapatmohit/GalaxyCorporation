"use client";

import teamData from "@/data/team.json";
import { AnimatePresence, motion } from "framer-motion";
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section id="team" className="relative py-16 md:py-24 bg-white overflow-hidden">
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
                  <div 
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col border border-white"
                    onClick={() => openModal(member)}
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

        {/* Team Member Modal */}
        <AnimatePresence>
          {isModalOpen && selectedMember && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-10"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Header with Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold font-heading text-[#0a2540] mb-2">
                      {selectedMember.name}
                    </h3>
                    <p className="text-[#0ea5ff] font-semibold text-xl mb-6">
                      {selectedMember.position}
                    </p>
                    <p className="text-[#334155] leading-relaxed text-lg mb-8">
                      {selectedMember.bio}
                    </p>
                    
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#0a2540]/5">
                        <div className="w-12 h-12 rounded-xl bg-[#0ea5ff]/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0a2540]">Email</h4>
                          <p className="text-[#334155]">contact@galaxycorp.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#0a2540]/5">
                        <div className="w-12 h-12 rounded-xl bg-[#0ea5ff]/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0a2540]">Phone</h4>
                          <p className="text-[#334155]">+91 20 1234 5678</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}