import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import img001 from '../../assets/img/001.jpeg';
import img002 from '../../assets/img/002.jpeg';
import img003 from '../../assets/img/003.jpeg';

const galleryItems = [
  { id: 1, src: img001, alt: 'Projeto de cortina e persiana sob medida 001' },
  { id: 2, src: img002, alt: 'Projeto de cortina e persiana sob medida 002' },
  { id: 3, src: img003, alt: 'Projeto de cortina e persiana sob medida 003' },
];


const GallerySection = () => {
  const instagramLink = 'https://instagram.com/detalhe_cortinas';

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <section id="gallery" className="section-padding bg-muted">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inspire-se em Nossos <span className="text-primary">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como nossas cortinas e persianas transformam ambientes com beleza e funcionalidade.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={galleryItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
              <img  
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={item.alt}
               src={item.src}/>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Button
            size="lg"
            asChild
            className="rounded-full px-8 py-4 group bg-primary text-primary-foreground border-2 border-transparent hover:bg-primary hover:border-accent"
          >
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              Confira mais projetos no instagram
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;