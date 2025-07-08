import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, TrendingUp } from 'lucide-react'; // Adicionando TrendingUp

const AboutUsSection = () => {
  const stats = [
    { icon: <Award className="w-8 h-8 text-accent" />, value: "10+", label: "Anos de Experiência" },
    { icon: <Users className="w-8 h-8 text-accent" />, value: "500+", label: "Clientes Satisfeitos" },
    { icon: <Heart className="w-8 h-8 text-accent" />, value: "98%", label: "Índice de Aprovação" },
    { icon: <TrendingUp className="w-8 h-8 text-accent" />, value: "Inovação", label: "Constante" }
  ];

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };
  
  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.4, // Delay escalonado após a imagem
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };


  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quem Somos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground my-4">
              Paixão por Detalhes, Compromisso com a <span className="text-primary">Qualidade</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Na Decora Stillo, acreditamos que cada janela conta uma história. Há mais de uma década, dedicamo-nos a transformar casas e escritórios com cortinas e persianas que unem estética, funcionalidade e o mais alto padrão de qualidade.
            </p>
            <p className="text-muted-foreground mb-8">
              Nossa equipe de especialistas está pronta para entender suas necessidades e oferecer soluções personalizadas, desde a escolha dos materiais até a instalação impecável. Valorizamos a confiança de nossos clientes e buscamos superar expectativas em cada projeto.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                 <motion.div 
                  key={index}
                  custom={index}
                  variants={statItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="text-center p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
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
            <img  
              className="w-full h-full object-cover" 
              alt="Equipe Decora Stillo sorrindo em um ambiente de showroom com diversas amostras de tecidos"
             src="https://images.unsplash.com/photo-1677268289056-09dffbac755b" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;