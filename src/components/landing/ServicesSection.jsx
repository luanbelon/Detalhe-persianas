import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, Ruler, Settings, Palette } from 'lucide-react';

const services = [
  {
    icon: <Ruler className="w-10 h-10 text-primary mb-4" />,
    title: 'Cortinas Sob Medida',
    description: 'Criamos cortinas personalizadas que se encaixam perfeitamente em suas janelas e complementam seu estilo de decoração.',
    details: ["Tecidos nobres e variados", "Modelos clássicos e modernos", "Consultoria especializada"]
  },
  {
    icon: <Settings className="w-10 h-10 text-primary mb-4" />,
    title: 'Instalação de Persianas',
    description: 'Oferecemos uma ampla gama de persianas (rolô, romana, vertical, horizontal) com instalação rápida e precisa.',
    details: ["Materiais duráveis e de alta qualidade", "Opções manuais e motorizadas", "Bloqueio de luz e privacidade"]
  },
  {
    icon: <Palette className="w-10 h-10 text-primary mb-4" />,
    title: 'Consultoria de Design',
    description: 'Nossos especialistas ajudam você a escolher as melhores opções de cortinas e persianas para cada ambiente.',
    details: ["Análise do espaço e iluminação", "Harmonização com o décor existente", "Soluções funcionais e estéticas"]
  },
];

const ServicesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="services" className="section-padding bg-muted">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços Especializados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em cortinas e persianas para valorizar cada detalhe do seu espaço.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.custom
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden glassmorphism-subtle border-primary/20">
                <CardHeader className="items-center text-center pt-8">
                  {service.icon}
                  <CardTitle className="text-2xl font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col flex-grow">
                  <CardDescription className="text-muted-foreground mb-6 flex-grow">{service.description}</CardDescription>
                  <ul className="space-y-2 text-sm text-left text-muted-foreground">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;