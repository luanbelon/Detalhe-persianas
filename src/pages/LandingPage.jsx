import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutUsSection from '@/components/landing/AboutUsSection';
import GallerySection from '@/components/landing/GallerySection';
import ContactCTASection from '@/components/landing/ContactCTASection';
import TestimonialsSection from '@/components/landing/TestimonialsSection'; // Nova seção

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <AboutUsSection />
      <GallerySection />
      <TestimonialsSection /> {/* Testimonials adicionados */}
      <ContactCTASection />
    </div>
  );
};

export default LandingPage;