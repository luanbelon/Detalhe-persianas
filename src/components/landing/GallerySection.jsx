import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, ChevronRight } from 'lucide-react'; // Usando ChevronRight para o botão
import imgGaleria from '../../assets/img/galeria.jpg'

const galleryItems = [
  { id: 1, srcKey: "gallery-1", alt: "Persiana rolô branca em uma cozinha moderna", description: "Cozinha Minimalista" },
  { id: 2, srcKey: "gallery-2", alt: "Cortina de linho bege em um quarto aconchegante", description: "Quarto Aconchegante" },
  { id: 3, srcKey: "gallery-3", alt: "Persiana romana cinza em um escritório sofisticado", description: "Escritório Elegante" },
  { id: 4, srcKey: "gallery-4", alt: "Cortina blackout em uma sala de TV escura", description: "Sala de Cinema" },
  { id: 5, srcKey: "gallery-5", alt: "Persiana de madeira em uma sala de estar rústica", description: "Estar Rústico" },
  { id: 6, srcKey: "gallery-6", alt: "Cortina voil translúcida em uma varanda gourmet", description: "Varanda Gourmet" },
];

// Mapeamento para facilitar a substituição das imagens
const imagePlaceholders = {
  "gallery-1": "Persiana rolô branca em cozinha moderna",
  "gallery-2": "Cortina de linho bege em quarto aconchegante",
  "gallery-3": "Persiana romana cinza em escritório sofisticado",
  "gallery-4": "Cortina blackout em sala de TV escura",
  "gallery-5": "Persiana de madeira em sala de estar rústica",
  "gallery-6": "Cortina voil translúcida em varanda gourmet",
};


const GallerySection = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
               src={imgGaleria}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-lg font-semibold text-white mb-1">{item.description}</p>
                <div className="text-accent group-hover:text-white transition-colors">
                  <Eye className="w-5 h-5 inline-block" />
                  <span className="ml-1 text-sm">Ver Detalhes</span>
                </div>
              </div>
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
            onClick={scrollToContact}
            className="cta-button-primary rounded-full px-8 py-4 group"
          >
            Realize Seu Projeto Conosco
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;