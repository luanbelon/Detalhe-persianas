import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { renderServiceIcon } from '@/lib/serviceIcons';
import { getSectionBackgroundStyle, getSectionClassName } from '@/lib/sectionBackground';

const ServicesSection = () => {
  const { content } = useSiteContent();
  const { services } = content;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section
      id="services"
      className={`section-padding ${getSectionClassName(services.background, 'bg-muted')}`}
      style={getSectionBackgroundStyle(services.background)}
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
            {services.headingPrefix} <span className="text-primary">{services.headingAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{services.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service, index) => (
            <motion.custom
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden glassmorphism-subtle border-primary/20">
                <CardHeader className="items-center text-center pt-8">
                  {renderServiceIcon(service.icon)}
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
