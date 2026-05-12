import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

import detalheLogo from '../../assets/img/Detalhe-logo.png';

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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? 'border-b border-border/40 bg-background shadow-md' : 'bg-background'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" onClick={(e) => scrollToSection(e, '#hero')} className="flex items-center space-x-2">
          <img
            src={detalheLogo}
            alt="Detalhe Cortinas & Persianas"
            className="w-[160px] transition-[filter] duration-300 dark:brightness-0 dark:invert"
          />
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
          <ThemeToggle />
          <Button asChild className="hidden lg:inline-flex cta-button-accent rounded-full px-6 py-3">
             <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
              <WhatsAppIcon className="mr-2 h-4 w-4" /> Solicite um orçamento
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
                <WhatsAppIcon className="mr-2 h-4 w-4" /> Solicite um orçamento
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;