import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, ArrowRight } from 'lucide-react';

const ContactCTASection = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
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
                <a href="tel:+5500900000000">
                  <Phone className="mr-3 h-5 w-5" /> Ligar Agora
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 120 }}
            >
             <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-accent text-accent hover:bg-accent/10 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-7 rounded-full group w-full sm:w-auto"
              >
                <a href="mailto:contato@decorastillo.com.br">
                  <Mail className="mr-3 h-5 w-5" /> Enviar Email
                </a>
              </Button>
            </motion.div>
          </div>
          
          <p className="text-sm text-primary-foreground/80">
            Ou se preferir, <a href="#hero" onClick={scrollToTop} className="font-semibold underline hover:text-accent transition-colors">preencha nosso formulário de contato online</a> e retornaremos em breve.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;