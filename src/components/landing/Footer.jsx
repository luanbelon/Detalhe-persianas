import React from 'react';
import { Layers3, Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'; // Adicionado Linkedin

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted text-muted-foreground section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="flex items-center space-x-2 text-2xl font-bold text-foreground">
              <Layers3 className="h-8 w-8 text-primary" />
              <span>Decora <span className="text-primary">Stillo</span></span>
            </a>
            <p className="text-sm">
              Especialistas em transformar ambientes com cortinas e persianas sob medida, combinando design e funcionalidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">Navegação</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-primary transition-colors">Nossos Serviços</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="hover:text-primary transition-colors">Galeria</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-primary transition-colors">Solicitar Orçamento</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">Entre em Contato</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                <span>Rua Exemplo, 123, Bairro Modelo <br />Cidade, UF - CEP 00000-000</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <a href="tel:+5500900000000" className="hover:text-primary transition-colors">(00) 90000-0000</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <a href="mailto:contato@decorastillo.com.br" className="hover:text-primary transition-colors">contato@decorastillo.com.br</a>
              </li>
            </ul>
          </div>
          
          {/* Redes Sociais */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">Siga-nos</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm">
          <p>&copy; {currentYear} Decora Stillo. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido com <span className="text-primary">&hearts;</span> por Hostinger Horizons</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;