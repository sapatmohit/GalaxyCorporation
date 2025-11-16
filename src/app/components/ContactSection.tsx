"use client";

import contactData from "@/data/contact.json";
import { motion } from "framer-motion";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your enquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setPhone("");
  };

  return (
    <section id="contact" className="relative bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto w-full px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-[36px] md:text-[48px] font-heading font-bold text-[#0a2540] mb-3 sm:mb-4">
            {contactData.title} <span className="text-[#0ea5ff]">{contactData.titleHighlight}</span>
          </h2>
          <p className="text-sm sm:text-[16px] text-[#334155] max-w-[680px] mx-auto px-2">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left: Contact Info & Map */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Information */}
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0ea5ff]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-[16px] font-semibold text-[#0a2540] mb-1">Address</h4>
                  <p className="text-xs sm:text-[14px] text-[#6b7280] leading-relaxed">
                    {contactData.contactInfo.address.line1}<br />
                    {contactData.contactInfo.address.line2}<br />
                    {contactData.contactInfo.address.line3}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0ea5ff]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-[16px] font-semibold text-[#0a2540] mb-1">Email</h4>
                  <a
                    href={`mailto:${contactData.contactInfo.email.primary}`}
                    className="text-xs sm:text-[14px] text-[#0ea5ff] hover:underline"
                  >
                    {contactData.contactInfo.email.primary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0ea5ff]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-[16px] font-semibold text-[#0a2540] mb-1">Phone</h4>
                  <a
                    href={`tel:${contactData.contactInfo.phone.primary.replace(/\s/g, '')}`}
                    className="text-xs sm:text-[14px] text-[#0ea5ff] hover:underline"
                  >
                    {contactData.contactInfo.phone.primary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0ea5ff]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-[16px] font-semibold text-[#0a2540] mb-1">Business Hours</h4>
                  <p className="text-xs sm:text-[14px] text-[#6b7280]">
                    {contactData.contactInfo.businessHours.weekdays}<br />
                    {contactData.contactInfo.businessHours.saturday}<br />
                    {contactData.contactInfo.businessHours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md" style={{ height: `${contactData.map.height}px` }}>
              <iframe
                src={contactData.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Galaxy Corporation Location"
              />
            </div>
          </motion.div>

          {/* Right: Enquiry Form */}
          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-white shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-[24px] font-heading font-semibold text-[#0a2540] mb-5 sm:mb-6">
              {contactData.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-[14px] font-medium text-[#0a2540] mb-1.5 sm:mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-[14px] font-medium text-[#0a2540] mb-1.5 sm:mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-[14px] font-medium text-[#0a2540] mb-1.5 sm:mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputClass="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all text-sm sm:text-base"
                    containerClass="w-full"
                    inputProps={{
                      name: 'phone',
                      id: 'phone',
                      required: false,
                    }}
                    buttonClass="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-[14px] font-medium text-[#0a2540] mb-1.5 sm:mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all text-sm sm:text-base"
                >
                  <option value="">Select a subject</option>
                  {contactData.formSubjects.map((subject, idx) => (
                    <option key={idx} value={subject.toLowerCase().replace(/ /g, '-')}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-[14px] font-medium text-[#0a2540] mb-1.5 sm:mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-[#0a2540]/10 bg-white focus:border-[#0ea5ff] focus:ring-2 focus:ring-[#0ea5ff]/20 outline-none transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full h-10 sm:h-12 rounded-lg bg-[#0ea5ff] text-white text-sm sm:text-[15px] font-semibold shadow-md hover:bg-[#0596ea] hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Enquiry
              </motion.button>
            </form>
            
            {/* Contact Banner */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl bg-white border border-[#0ea5ff]/20">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0ea5ff]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0ea5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a2540] text-sm sm:text-base">Need immediate assistance?</h4>
                  <p className="text-[#334155] text-xs sm:text-sm">Call us at <a href={`tel:${contactData.contactInfo.phone.primary}`} className="text-[#0ea5ff] font-semibold hover:underline">{contactData.contactInfo.phone.primary}</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}