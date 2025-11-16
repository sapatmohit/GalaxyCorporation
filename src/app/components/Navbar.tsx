"use client";

import navData from "@/data/navigation.json";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations('common.nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NAV = [
    { label: t('home'), href: '/' },
    { label: t('products'), href: '/#products' },
    { label: t('about'), href: '/about' },
    { label: t('team'), href: '/#team' },
    { label: t('contact'), href: '/contact' },
  ];

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
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20" 
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-[80%] px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
              <div className=" w-40 h-28 flex items-center justify-center">
                <Image
                  src={navData.logo.image}
                  alt={navData.logo.text} 
                  width={160}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>
          </Link>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="relative font-sans text-[15px] font-medium text-[#0a2540]/70 hover:text-[#0a2540] transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0ea5ff] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#0a2540] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0a2540] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#0a2540] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* Right: Language Switcher & Enquire Now */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={navData.cta.href}
              onClick={() => handleLinkClick(navData.cta.href)}
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#0ea5ff] text-white text-[14px] font-semibold shadow-sm hover:bg-[#0596ea] hover:shadow-md transition-all"
            >
              {t('enquireNow')}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#0a2540]/10">
          <nav className="flex flex-col py-4 px-6">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="py-3 text-[15px] font-medium text-[#0a2540]/70 hover:text-[#0a2540] transition-colors border-b border-[#0a2540]/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <div className="px-2">
                <LanguageSwitcher />
              </div>
              <Link
                href={navData.cta.href}
                onClick={() => handleLinkClick(navData.cta.href)}
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#0ea5ff] text-white text-[14px] font-semibold"
              >
                {t('enquireNow')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}