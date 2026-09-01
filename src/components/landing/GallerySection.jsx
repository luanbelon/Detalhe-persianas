import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { getSectionBackgroundStyle, getSectionClassName } from '@/lib/sectionBackground';

const GallerySection = () => {
  const { content } = useSiteContent();
  const { gallery } = content;
  const galleryItems = gallery.items;

  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length)),
    [galleryItems.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    [galleryItems.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  if (!galleryItems.length) return null;

  return (
    <section
      id="gallery"
      className={`section-padding ${getSectionClassName(gallery.background, 'bg-muted')}`}
      style={getSectionBackgroundStyle(gallery.background)}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {gallery.headingPrefix} <span className="text-primary">{gallery.headingAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{gallery.subtitle}</p>
        </motion.div>

        <div className={`grid gap-6 md:gap-8 ${
          galleryItems.length === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : galleryItems.length === 2
              ? 'sm:grid-cols-2 max-w-3xl mx-auto'
              : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {galleryItems.map((item, index) => (
            <motion.button
              type="button"
              key={item.id}
              custom={index}
              variants={galleryItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Abrir ${item.alt}`}
              className="group relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.button>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Button
            size="lg"
            asChild
            className="rounded-full px-8 py-4 group bg-primary text-primary-foreground border-2 border-transparent hover:bg-primary hover:border-accent"
          >
            <a href={gallery.ctaLink} target="_blank" rel="noopener noreferrer">
              {gallery.ctaText}
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={galleryItems[activeIndex].alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <button type="button" onClick={closeLightbox} aria-label="Fechar" className="absolute top-4 right-4 inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <X className="h-6 w-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); showPrev(); }} aria-label="Imagem anterior" className="absolute left-2 sm:left-6 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); showNext(); }} aria-label="Próxima imagem" className="absolute right-2 sm:right-6 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <ChevronRight className="h-7 w-7" />
            </button>
            <motion.img
              key={galleryItems[activeIndex].id}
              src={galleryItems[activeIndex].src}
              alt={galleryItems[activeIndex].alt}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
