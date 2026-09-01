import React from 'react';
import { Instagram } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { getSectionBackgroundStyle, getSectionClassName } from '@/lib/sectionBackground';

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M19.11 17.21c-.28-.14-1.64-.81-1.9-.9-.25-.1-.43-.14-.61.14-.18.28-.7.9-.86 1.09-.16.19-.31.21-.58.07-.28-.14-1.16-.43-2.2-1.38-.82-.73-1.37-1.63-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47h-.52c-.19 0-.5.07-.77.35-.26.28-1 1-1 2.45s1.03 2.85 1.17 3.05c.14.19 2.03 3.1 4.9 4.35.68.29 1.22.47 1.63.6.68.22 1.3.19 1.8.12.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
    <path d="M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.25.59 4.45 1.71 6.4L3.2 28.8l6.57-1.68A12.74 12.74 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2Zm0 23.28c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-3.9 1 1.04-3.8-.26-.39a10.22 10.22 0 0 1-1.56-5.53c0-5.64 4.59-10.23 10.23-10.23 2.73 0 5.3 1.06 7.23 3 1.93 1.93 3 4.5 3 7.23 0 5.64-4.59 10.23-10.23 10.23Z" />
  </svg>
);

const Footer = () => {
  const { content } = useSiteContent();
  const { footer, brand, contact } = content;
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className={`text-muted-foreground section-padding ${getSectionClassName(footer.background, 'bg-muted')}`}
      style={getSectionBackgroundStyle(footer.background)}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="inline-flex items-center">
              <img src={brand.logo} alt={brand.name} className="h-14 w-auto object-contain transition-[filter] duration-300 dark:brightness-0 dark:invert" />
            </a>
            <p className="text-sm">{brand.description}</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">{footer.navHeading}</p>
            <ul className="space-y-2 text-sm">
              {footer.navLinks.map((link) => (
                <li key={link.href + link.text}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-primary transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">{footer.contactHeading}</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <WhatsAppIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center">
                <Instagram className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm">
          <p>&copy; {currentYear} {footer.copyright}</p>
          <p className="mt-1">
            desenvolvido por{' '}
            <a href={footer.developerUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {footer.developerName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
