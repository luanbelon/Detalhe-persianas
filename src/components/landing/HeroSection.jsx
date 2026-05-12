import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19.11 17.21c-.28-.14-1.64-.81-1.9-.9-.25-.1-.43-.14-.61.14-.18.28-.7.9-.86 1.09-.16.19-.31.21-.58.07-.28-.14-1.16-.43-2.2-1.38-.82-.73-1.37-1.63-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47h-.52c-.19 0-.5.07-.77.35-.26.28-1 1-1 2.45s1.03 2.85 1.17 3.05c.14.19 2.03 3.1 4.9 4.35.68.29 1.22.47 1.63.6.68.22 1.3.19 1.8.12.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
    <path d="M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.25.59 4.45 1.71 6.4L3.2 28.8l6.57-1.68A12.74 12.74 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2Zm0 23.28c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-3.9 1 1.04-3.8-.26-.39a10.22 10.22 0 0 1-1.56-5.53c0-5.64 4.59-10.23 10.23-10.23 2.73 0 5.3 1.06 7.23 3 1.93 1.93 3 4.5 3 7.23 0 5.64-4.59 10.23-10.23 10.23Z" />
  </svg>
);

const HeroSection = () => {
  const whatsappLink = 'https://wa.me/5571981018563';
  const instagramLink = 'https://instagram.com/detalhe_cortinas';

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
          <span className="text-accent">Cortinas e Persianas</span> <br className="hidden sm:block" /> sob medida
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="text-lg px-10 py-7 rounded-full bg-accent text-accent-foreground hover:bg-accent/85 transition-colors">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Solicite um Orçamento
              <WhatsAppIcon className="ml-3 h-5 w-5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 rounded-full group bg-white/10 border-white/60 text-white hover:bg-white hover:text-[#000C66]">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              Seguir no Instagram
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;