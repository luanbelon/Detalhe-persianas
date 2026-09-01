import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/SiteContentContext';
import { renderStatIcon } from '@/lib/serviceIcons';
import { getSectionBackgroundStyle, getSectionClassName } from '@/lib/sectionBackground';

const AboutUsSection = () => {
  const { content } = useSiteContent();
  const { about } = content;

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.4, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section
      id="about"
      className={`section-padding ${getSectionClassName(about.background, 'bg-background')}`}
      style={getSectionBackgroundStyle(about.background)}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{about.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground my-4">
              {about.headingPrefix} <span className="text-primary">{about.headingAccent}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">{about.paragraph1}</p>
            <p className="text-muted-foreground mb-8">{about.paragraph2}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  custom={index}
                  variants={statItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="text-center p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex justify-center mb-2">{renderStatIcon(stat.icon)}</div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          >
            <img className="w-full h-full object-cover" alt={about.imageAlt} src={about.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
