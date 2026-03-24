'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { SectionConfig } from '@/types/catalog';
import { renderQxText } from './renderQxText';

const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'cover', label: 'Cover' },
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Looks' },
  { id: 'variants', label: 'Config' },
  { id: 'packshots', label: 'Models' },
  { id: 'dimensions', label: 'Specs' },
  { id: 'materials', label: 'Build' },
  { id: 'features', label: 'Tech' },
  { id: 'assembly', label: 'Setup' },
];

interface CatalogNavProps {
  sections?: SectionConfig[];
  brandLabel?: string;
  brandLogoSrc?: string;
  backToCatalogListHref?: string;
  variant?: 'default' | 'qx0';
}

const CatalogNav = ({
  sections = DEFAULT_SECTIONS,
  brandLabel = 'METRO',
  brandLogoSrc,
  backToCatalogListHref,
  variant = 'default',
}: CatalogNavProps) => {
  const [activeSection, setActiveSection] = useState('cover');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const visibleSections = sections.filter((section) => section.enabled !== false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionElements = visibleSections.map((section) => ({
        id: section.id,
        el: document.getElementById(section.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i].el;
        if (element && element.getBoundingClientRect().top <= 120) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const renderBrand = (logoClassName: string) => {
    if (!brandLogoSrc) return brandLabel;
    return (
      <Image
        src={brandLogoSrc}
        alt={`${brandLabel} logo`}
        width={160}
        height={48}
        className={logoClassName}
      />
    );
  };

  const renderBrandControl = (className: string, logoClassName: string) => {
    if (backToCatalogListHref) {
      return (
        <a
          href={backToCatalogListHref}
          className={className}
          aria-label="Back to catalog list"
        >
          {renderBrand(logoClassName)}
        </a>
      );
    }

    return (
      <button
        onClick={() => scrollTo('cover')}
        className={className}
        aria-label={`${brandLabel} - back to top`}
      >
        {renderBrand(logoClassName)}
      </button>
    );
  };

  if (variant === 'qx0') {
    return (
      <>
        <nav
          role="navigation"
          aria-label="Catalog sections"
          className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
            scrolled || isOpen
              ? 'bg-white/90 border-b border-border shadow-sm backdrop-blur-xl'
              : 'bg-white'
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex h-11 items-center justify-between transition-all duration-300 sm:h-14">
              {renderBrandControl(
                'font-display text-xl font-black tracking-tighter text-slate-900 !rounded-none',
                'h-7 w-auto object-contain !rounded-none',
              )}

              <ul
                className="hidden h-full flex-1 items-stretch justify-end lg:flex"
                role="list"
              >
                {visibleSections.map((section) => (
                  <li key={section.id} className="h-full">
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`flex h-full items-center px-6 text-sm font-medium transition-colors !rounded-none ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-primary'
                      }`}
                      aria-current={
                        activeSection === section.id ? 'true' : undefined
                      }
                    >
                      {renderQxText(section.label)}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsOpen((value) => !value)}
                className="ml-4 p-2 text-primary transition-colors hover:bg-muted !rounded-none lg:hidden"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed left-0 right-0 top-[44px] z-[59] border-b border-border bg-white shadow-xl !rounded-none sm:top-[56px] lg:hidden"
            >
              <ul className="flex flex-col !rounded-none" role="list">
                {visibleSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`w-full border-b border-muted p-5 text-left text-base font-medium transition-colors last:border-0 !rounded-none ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {renderQxText(section.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Catalog sections"
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-white/30 border-b border-slate-200/50 py-3 shadow-sm backdrop-blur-xl'
            : 'bg-white py-4 shadow-none'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {renderBrandControl(
              'font-display text-xl font-black tracking-tighter text-slate-900',
              'h-7 w-auto object-contain',
            )}

            <ul
              className="hidden flex-1 items-center justify-end gap-2 lg:flex"
              role="list"
            >
              {visibleSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-primary'
                    }`}
                    aria-current={
                      activeSection === section.id ? 'true' : undefined
                    }
                  >
                    {renderQxText(section.label)}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsOpen((value) => !value)}
              className="ml-4 rounded-md p-2 text-primary transition-colors hover:bg-muted lg:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-0 right-0 top-[72px] z-[59] border-b border-border bg-white shadow-xl lg:hidden"
          >
            <ul className="flex flex-col p-4" role="list">
              {visibleSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`w-full p-4 text-left text-base font-medium transition-colors ${
                      activeSection === section.id
                        ? 'rounded-md bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {renderQxText(section.label)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CatalogNav;
