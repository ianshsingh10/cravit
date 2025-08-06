"use client";
import HeroSection from "@/components/ui/HeroSection";
import FeaturedSection from "@/components/ui/FeaturedSection";
import OutletSection from "@/components/ui/OutletSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <HeroSection/>
        {/* Features Section */}
        <FeaturedSection/>
        {/* Participating Outlets Section */}
        <OutletSection/>
        {/* Testimonials Section */}
        <TestimonialsSection/>
      </main>
      
    </>
  );
}
