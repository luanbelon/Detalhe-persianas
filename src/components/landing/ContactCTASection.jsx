import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

const ContactCTASection = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Pronto para Transformar Seu Ambiente?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
            Entre em contato conosco hoje mesmo para um orçamento sem compromisso. Nossa equipe está pronta para te ajudar a encontrar a solução perfeita em cortinas e persianas.
          </p>
          
          <div className="flex justify-center items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-7 rounded-full group w-full sm:w-auto"
              >
                <a href="https://wa.me/5571981018563" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-3 h-5 w-5" /> Quero fazer um orçamento
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;