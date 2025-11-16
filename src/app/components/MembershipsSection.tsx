"use client";

import membershipsData from "@/data/memberships.json";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Membership {
  id: number;
  name: string;
  fullName: string;
  logo: string;
  description: string;
}

const MEMBERSHIPS: Membership[] = membershipsData.organizations.map(org => ({
  ...org
}));

export default function MembershipsSection() {
  const t = useTranslations('common.memberships');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEMBERSHIPS.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMBERSHIPS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMBERSHIPS.length) % MEMBERSHIPS.length);
  };

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[80%] px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-[#0a2540] mb-4">
            {t('title')} <span className="text-[#0ea5ff]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[16px] text-[#334155] max-w-[680px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center">
          {MEMBERSHIPS.map((membership) => (
            <div
              key={membership.id}
              className="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-white hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Logo Container */}
              <div className="relative w-32 h-32 mb-4 flex items-center justify-center p-4 rounded-2xl bg-white border border-[#0a2540]/5 group-hover:border-[#0ea5ff]/30 group-hover:shadow-lg transition-all duration-300">
                <img
                  src={membership.logo}
                  alt={membership.fullName || membership.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="text-[16px] font-heading font-semibold text-[#0a2540] mb-1">
                {membership.name}
              </h3>
              <p className="text-[12px] text-[#6b7280] leading-snug">
                {membership.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-white shadow-lg">
            <svg className="w-5 h-5 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[14px] font-medium text-[#0a2540]">
              {t('trustBadge')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}