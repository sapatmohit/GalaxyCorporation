"use client";

import heroData from "@/data/hero.json";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const IMAGES = heroData.slides.map(slide => slide.image);

export default function PremiumHero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % IMAGES.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Slide variants for animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e3f2fd] pt-[80px] overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-[#0ea5ff]/20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-[#0ea5ff]/10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-[#0ea5ff]/15 animate-pulse delay-1500"></div>
      
      <div className="container mx-auto px-6 py-12 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[#0a2540] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {heroData.content.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5ff] to-[#0596ea]">
                  {heroData.content.highlight}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-[#334155] leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroData.content.description1}
              </motion.p>
              
              <motion.p 
                className="text-lg text-[#334155] leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {heroData.content.description2}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href={heroData.content.ctaLink}
                className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {heroData.content.ctaText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-white text-[#0a2540] text-base font-semibold shadow-md hover:shadow-lg border border-[#0a2540]/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Image Carousel */}
          <motion.div 
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/20 to-transparent z-10"></div>
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={current}
                src={IMAGES[current]}
                alt={heroData.slides[current].alt}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    next();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prev();
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-20 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-[#0a2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-20 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-[#0a2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? "bg-[#0ea5ff] w-8" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-sm text-[#0a2540]/70 mb-2">Scroll to explore</span>
        <div className="w-8 h-12 rounded-full border-2 border-[#0a2540]/30 flex justify-center p-1">
          <motion.div 
            className="w-2 h-2 rounded-full bg-[#0a2540]/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}