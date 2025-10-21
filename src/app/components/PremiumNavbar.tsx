"use client";

import navData from "@/data/navigation.json";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = navData.mainNav;

export default function PremiumNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20" 
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-32 h-20 flex items-center justify-center">
              <Image
                src={navData.logo.image}
                alt={navData.logo.text} 
                width={100}
                height={180}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Center: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-[#0ea5ff] bg-[#0ea5ff]/10" 
                      : "text-[#0a2540]/70 hover:text-[#0a2540] hover:bg-[#0a2540]/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0ea5ff]"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Enquire Now */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={navData.cta.href}
              onClick={() => handleLinkClick(navData.cta.href)}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {navData.cta.text}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#0a2540] rounded-full transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0a2540] rounded-full transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0a2540] rounded-full transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-20 bg-white border-t border-[#0a2540]/10 shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col py-4 px-6">
          {NAV.map((item) => {
            const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={`py-4 text-lg font-medium transition-colors border-b border-[#0a2540]/5 last:border-0 ${
                  isActive 
                    ? "text-[#0ea5ff]" 
                    : "text-[#0a2540]/70 hover:text-[#0a2540]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={navData.cta.href}
            onClick={() => handleLinkClick(navData.cta.href)}
            className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-xl bg-gradient-to-r from-[#0ea5ff] to-[#0596ea] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {navData.cta.text}
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-[-1] transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}