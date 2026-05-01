'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  const scrollAnimationRef = useRef<number | null>(null);
  const scrollingToSectionRef = useRef<string | null>(null);
  const navExpanded = !scrolled;
  const isSectionHighlighted = (sectionId: string) =>
    sectionId !== 'cover' && activeSection === sectionId;

  const visibleSections = useMemo(
    () => sections.filter((section) => section.enabled !== false),
    [sections],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (scrollingToSectionRef.current) {
        setActiveSection(scrollingToSectionRef.current);
        return;
      }

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const getScrollOffset = () => {
    if (variant === 'qx0') {
      return window.matchMedia('(min-width: 640px)').matches ? 56 : 44;
    }

    return 72;
  };

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    scrollingToSectionRef.current = id;
    setActiveSection(id);

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const rawTarget = id === 'cover' ? 0 : sectionTop - getScrollOffset();
    const targetTop = id === 'cover' ? Math.max(rawTarget, 0) : rawTarget;
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = Math.min(Math.max(Math.abs(distance) * 0.55, 420), 900);
    const startTime = window.performance.now();

    setIsOpen(false);

    const animateScroll = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startTop + distance * eased);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
        return;
      }

      scrollAnimationRef.current = null;
      scrollingToSectionRef.current = null;
    };

    scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
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
              ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
              : 'shadow-none'
          }`}
        >
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                navExpanded ? 'h-[166px]' : 'h-11 sm:h-14'
              }`}
            >
              {renderBrandControl(
                'font-display text-xl font-black tracking-tighter text-slate-900 !rounded-none',
                'h-7 w-auto object-contain !rounded-none',
              )}

              <div className="ml-auto hidden h-full w-full max-w-[1150px] lg:block">
                <ul className="flex h-full items-stretch" role="list">
                  {visibleSections.map((section) => (
                    <li key={section.id} className="h-full flex-1">
                      <button
                        onClick={() => scrollTo(section.id)}
                        className={`catalog-nav-link flex h-full w-full items-center justify-center px-3 text-sm font-medium transition-colors !rounded-none ${
                          isSectionHighlighted(section.id)
                            ? '!font-bold !text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        aria-current={
                          isSectionHighlighted(section.id) ? 'true' : undefined
                        }
                      >
                        {renderQxText(section.label)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setIsOpen((value) => !value)}
                className="ml-4 p-2 text-primary transition-colors hover:text-primary/75 !rounded-none lg:hidden"
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
              className={`fixed left-0 right-0 z-[59] border-b border-border bg-white shadow-xl !rounded-none lg:hidden ${
                navExpanded ? 'top-[166px]' : 'top-[44px] sm:top-[56px]'
              }`}
            >
              <ul className="flex flex-col !rounded-none" role="list">
                {visibleSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`catalog-nav-link w-full border-b border-muted p-5 text-left text-base font-medium transition-colors last:border-0 !rounded-none ${
                        isSectionHighlighted(section.id)
                          ? '!font-bold !text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-current={
                        isSectionHighlighted(section.id) ? 'true' : undefined
                      }
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
            ? 'bg-white py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
            : 'shadow-none'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              navExpanded ? 'h-[166px]' : ''
            }`}
          >
            {renderBrandControl(
              'font-display text-xl font-black tracking-tighter text-slate-900',
              'h-7 w-auto object-contain',
            )}

            <div className="ml-auto hidden w-full max-w-[1150px] lg:block">
              <ul className="flex items-center" role="list">
                {visibleSections.map((section) => (
                  <li key={section.id} className="flex-1">
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`catalog-nav-link flex w-full items-center justify-center border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                        isSectionHighlighted(section.id)
                          ? '!border-foreground !font-bold !text-foreground'
                          : 'border-transparent text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                      aria-current={
                        isSectionHighlighted(section.id) ? 'true' : undefined
                      }
                    >
                      {renderQxText(section.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setIsOpen((value) => !value)}
              className="ml-4 rounded-md p-2 text-primary transition-colors hover:text-primary/75 lg:hidden"
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
            className={`fixed left-0 right-0 z-[59] border-b border-border bg-white shadow-xl lg:hidden ${
              navExpanded ? 'top-[166px]' : 'top-[72px]'
            }`}
          >
            <ul className="flex flex-col p-4" role="list">
              {visibleSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`catalog-nav-link w-full p-4 text-left text-base font-medium transition-colors ${
                        isSectionHighlighted(section.id)
                          ? '!font-bold !text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-current={
                      isSectionHighlighted(section.id) ? 'true' : undefined
                    }
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
