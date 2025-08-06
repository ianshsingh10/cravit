"use client";
import HeroSection from "@/Components/ui/HeroSection";
import FeaturedSection from "@/Components/ui/FeaturedSection";
import OutletSection from "@/Components/ui/OutletSection";
import TestimonialsSection from "@/Components/ui/TestimonialsSection";

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
