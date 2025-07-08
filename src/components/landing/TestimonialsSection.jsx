import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, UserCircle } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Silva",
    location: "São Paulo, SP",
    quote: "A Decora Stillo transformou minha sala! As cortinas ficaram perfeitas, exatamente como imaginei. Atendimento nota 1000!",
    rating: 5,
    avatarKey: "avatar-ana"
  },
  {
    name: "Carlos Pereira",
    location: "Rio de Janeiro, RJ",
    quote: "Profissionalismo impecável, desde a medição até a instalação das persianas. Meu escritório ficou muito mais elegante.",
    rating: 5,
    avatarKey: "avatar-carlos"
  },
  {
    name: "Mariana Costa",
    location: "Belo Horizonte, MG",
    quote: "Adorei a consultoria! Me ajudaram a escolher o tecido ideal para o quarto do bebê. Qualidade excelente e entrega no prazo.",
    rating: 5,
    avatarKey: "avatar-mariana"
  },
];

// Mapeamento para avatares
const avatarPlaceholders = {
  "avatar-ana": "Mulher sorridente de meia idade",
  "avatar-carlos": "Homem de negócios confiante",
  "avatar-mariana": "Jovem mãe feliz",
};

const TestimonialsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que Nossos <span className="text-primary">Clientes Dizem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A satisfação de quem confia em nosso trabalho é nossa maior inspiração.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.custom
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col glassmorphism-subtle border-secondary/20">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary bg-muted">
                      <img  
                        className="w-full h-full object-cover" 
                        alt={`Foto de ${testimonial.name}`}
                       src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-start mt-auto">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                    {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i + testimonial.rating} className="w-5 h-5 text-accent" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;