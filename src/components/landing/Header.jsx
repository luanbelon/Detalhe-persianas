import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers3, Menu, X, Sun, Moon, Phone } from 'lucide-react'; // Ícone Layers3 para logo
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

import detalheLogo from "../../assets/img/Detalhe-logo.png"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: '#services', text: 'Serviços' },
    { href: '#about', text: 'Sobre Nós' },
    { href: '#gallery', text: 'Galeria' },
    { href: '#contact', text: 'Contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };


  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" onClick={(e) => scrollToSection(e, '#hero')} className="flex items-center space-x-2">
          <img src={detalheLogo} alt="" srcset="" className="w-[160px]" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.text}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            className="text-muted-foreground hover:text-primary"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button asChild className="hidden lg:inline-flex cta-button-accent rounded-full px-6 py-3">
             <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
              <Phone className="mr-2 h-4 w-4" /> Orçamento Grátis
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/40 bg-background/95 shadow-lg"
        >
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.text}
              </a>
            ))}
            <Button asChild className="w-full cta-button-accent mt-4 rounded-full py-3">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                <Phone className="mr-2 h-4 w-4" /> Orçamento Grátis
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;