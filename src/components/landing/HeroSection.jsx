import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img  
          className="w-full h-full object-cover object-center" 
          alt="Persiana elegante bem instalada em uma sala de estar moderna e iluminada"
         src="https://images.unsplash.com/photo-1680007889201-114ac772447d" />
        <div className="absolute inset-0 bg-[#000C66]/50 backdrop-brightness-75"></div> {/* Overlay escuro */}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 p-6 container mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Elegância e Conforto <br className="hidden sm:block" /> com Nossas <span className="text-accent">Cortinas e Persianas</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          Transforme seus ambientes com soluções sob medida, design sofisticado e instalação profissional.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 150 }}
        >
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="cta-button-accent text-lg px-10 py-7 rounded-full group"
          >
            Solicite um Orçamento Gratuito
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;