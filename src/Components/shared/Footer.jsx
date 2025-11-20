"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Twitter, Instagram, Facebook, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Shared Link Component ---
const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="block text-sm lg:text-base text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 hover:translate-x-1"
  >
    {children}
  </Link>
);

// --- FIXED SECTION COMPONENT ---
// Uses a single DOM structure that adapts styles, preventing duplication issues.
const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if we are on desktop to disable accordion logic
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 lg:border-none">
      {/* Single Header for both Mobile & Desktop */}
      <button
        onClick={() => !isDesktop && setIsOpen(!isOpen)}
        disabled={isDesktop}
        className={`flex items-center justify-between w-full py-4 lg:py-0 lg:mb-6 group ${
          isDesktop ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <h3 className="font-bold text-lg text-gray-900 dark:text-white relative inline-block">
          {title}
          {/* Orange Underline (Desktop Only) */}
          <span className="hidden lg:block absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
        </h3>
        
        {/* Arrow Icon (Mobile Only) */}
        <ChevronDown
          className={`lg:hidden text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>

      {/* Single Content List with Conditional Animation */}
      <AnimatePresence initial={false}>
        {(isOpen || isDesktop) && (
          <motion.div
            key="content"
            initial={isDesktop ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={isDesktop ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 pb-4 lg:pb-0">
              {links.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/search" },
    { name: "Cart", href: "/cart" },
    { name: "About Us", href: "/about" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/policy/privacy-policy" },
    { name: "Terms & Conditions", href: "/policy/terms-and-conditions" },
    { name: "Refund Policy", href: "/policy/cancellation-and-refund-policy" },
    { name: "Shipping", href: "/policy/shipping-and-delivery" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-sans border-t border-gray-200 dark:border-gray-800/60">
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* 1. BRAND COLUMN */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
             <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-14 h-14 rounded-full border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                  <Image src="/cravit-logo.jpg" alt="craVIT" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">craVIT</h4>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">BEYOND INFINITY</span>
                </div>
              </Link>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                The easiest way to discover and enjoy food at VIT. Join our community and never miss out on the best culinary experiences on campus.
              </p>
              {/* Desktop Socials */}
              <div className="hidden lg:flex gap-4 mt-4">
                  <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
                  <SocialLink href="#" icon={<Facebook size={18} />} label="Facebook" />
                  <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
              </div>
          </div>

          {/* 2. LINKS COLUMNS */}
          <div className="lg:col-span-1">
             <FooterSection title="Quick Links" links={quickLinks} />
          </div>
          
          <div className="lg:col-span-1">
             <FooterSection title="Policies" links={policyLinks} />
          </div>

          {/* 3. CONTACT COLUMN */}
          <div className="lg:col-span-1 lg:pl-4">
             <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 text-center lg:text-left relative inline-block w-full lg:w-auto">
               Contact Us
               <span className="hidden lg:block absolute -bottom-2 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
             </h3>
             
             <ul className="space-y-4 text-sm flex flex-col items-center lg:items-start">
                <ContactItem icon={<Mail size={16} />} text="sp.cravit@gmail.com" href="mailto:sp.cravit@gmail.com" />
                <ContactItem icon={<Phone size={16} />} text="+91 95557 51574" href="tel:+919555751574" />
                <ContactItem icon={<MapPin size={16} />} text="VIT Bhopal University, Madhya Pradesh, India" />
             </ul>

             {/* Mobile Socials */}
             <div className="flex lg:hidden gap-4 justify-center mt-8">
                  <SocialLink href="#" icon={<Twitter size={20} />} label="Twitter" />
                  <SocialLink href="#" icon={<Facebook size={20} />} label="Facebook" />
                  <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
             </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>&copy; {currentYear} <span className="font-bold text-orange-600">craVIT</span>. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-1.5">
            Made with <span className="text-red-500 animate-pulse text-sm">♥</span> by Beyond Infinity
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Sub-Components ---

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
  </a>
);

const ContactItem = ({ icon, text, href }) => {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper 
      href={href} 
      className={`flex items-center gap-3 group ${href ? 'hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer' : ''}`}
    >
      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 transition-colors">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </Wrapper>
  );
};