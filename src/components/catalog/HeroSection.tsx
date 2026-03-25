'use client';

import { useState, useEffect, useCallback, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type {
  HeroData,
  HeroSlide,
  HeroDescriptionPosition,
  HeroDescriptionStyleConfig,
} from '@/types/catalog';
import { scaleMotionValue, slowTransition } from '@/lib/motion';
import { renderQxText } from './renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface HeroSectionProps {
  data: HeroData;
  catalogId?: string;
}

const DEFAULT_SLIDER = {
  autoAdvance: true,
  interval: 5000,
  pauseOnHover: true,
  transitionMs: 500,
  showArrows: true,
  showDots: true,
  initialSlide: 0,
};

const DEFAULT_DESCRIPTION_STYLE: Required<HeroDescriptionStyleConfig> = {
  enabled: true,
  position: 'bottom-center',
  offsetPx: 40,
  textColor: 'hsl(var(--on-dark-muted))',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  backdropBlurPx: 6,
  paddingX: 16,
  paddingY: 8,
  borderRadiusPx: 9999,
  fontSizePx: 13,
  fontWeight: 500,
  letterSpacingEm: 0.04,
  maxWidth: '90vw',
  textAlign: 'center',
  uppercase: false,
};

function descriptionPositionClasses(position: HeroDescriptionPosition): string {
  switch (position) {
    case 'bottom-left':
      return 'left-6';
    case 'bottom-right':
      return 'right-6';
    case 'top-left':
      return 'left-6';
    case 'top-right':
      return 'right-6';
    case 'top-center':
      return 'left-1/2 -translate-x-1/2';
    case 'bottom-center':
    default:
      return 'left-1/2 -translate-x-1/2';
  }
}

const HeroSection = ({ data, catalogId }: HeroSectionProps) => {
  const slider = { ...DEFAULT_SLIDER, ...data.slider };
  const fallbackSlides: HeroSlide[] = (data.heroImages ?? []).map(
    (src, index, all) => ({
      src,
      alt:
        index === 0
          ? data.heroImageAlt
          : `${data.heroImageAlt} - slide ${index + 1} of ${all.length}`,
    }),
  );
  const configuredSlides: HeroSlide[] = data.heroSlides ?? fallbackSlides;
  const hasSlider = configuredSlides.length > 0;
  const displaySlides: HeroSlide[] = hasSlider
    ? configuredSlides
    : [{ src: data.heroImage, alt: data.heroImageAlt }];
  const isQx = catalogId?.toUpperCase() === 'QX';
  const initialIdx = Math.min(
    Math.max(0, slider.initialSlide ?? 0),
    displaySlides.length - 1,
  );
  const [currentIndex, setCurrentIndex] = useState(initialIdx);
  const [isHovered, setIsHovered] = useState(false);
  const currentSlide = displaySlides[currentIndex];
  const currentHeroContent = {
    brandLabel: currentSlide?.heroContent?.brandLabel ?? data.brandLabel,
    collectionName:
      currentSlide?.heroContent?.collectionName ?? data.collectionName,
    tagline: currentSlide?.heroContent?.tagline ?? data.tagline,
    taglineLine2:
      currentSlide?.heroContent?.taglineLine2 ?? data.taglineLine2,
    ctaLabel: currentSlide?.heroContent?.ctaLabel ?? data.ctaLabel,
  };
  const slideTransition = slowTransition({
    duration: Math.max(1.6, slider.transitionMs / 1000),
    ease: 'easeInOut' as const,
  });
  const currentDescriptionStyle = {
    ...DEFAULT_DESCRIPTION_STYLE,
    ...data.descriptionStyle,
    ...currentSlide?.descriptionStyle,
  };
  // The first two QX slides use lighter imagery, so anchor the hero copy low-left
  // and switch to near-black text for contrast.
  const useQxCornerHeroLayout = isQx && currentIndex < 2;
  const useQxThirdSlideLift = isQx && currentIndex === 2;
  const showSlideDescription = Boolean(
    currentDescriptionStyle.enabled && currentSlide?.description && !isQx,
  );
  const descriptionPosClass = descriptionPositionClasses(
    currentDescriptionStyle.position,
  );
  const isTopDescription = currentDescriptionStyle.position.startsWith('top');
  const descriptionInlineStyle: CSSProperties = {
    color: currentDescriptionStyle.textColor,
    backgroundColor: currentDescriptionStyle.backgroundColor,
    backdropFilter: `blur(${currentDescriptionStyle.backdropBlurPx}px)`,
    WebkitBackdropFilter: `blur(${currentDescriptionStyle.backdropBlurPx}px)`,
    padding: `${currentDescriptionStyle.paddingY}px ${currentDescriptionStyle.paddingX}px`,
    borderRadius: `${currentDescriptionStyle.borderRadiusPx}px`,
    fontSize: `${currentDescriptionStyle.fontSizePx}px`,
    fontWeight: currentDescriptionStyle.fontWeight,
    letterSpacing: `${currentDescriptionStyle.letterSpacingEm}em`,
    maxWidth: currentDescriptionStyle.maxWidth,
    textAlign: currentDescriptionStyle.textAlign,
    textTransform: currentDescriptionStyle.uppercase ? 'uppercase' : 'none',
    ...(isTopDescription
      ? { top: `${currentDescriptionStyle.offsetPx}px` }
      : { bottom: `${currentDescriptionStyle.offsetPx}px` }),
  };
  const heroTextColor = useQxCornerHeroLayout ? '#151515' : undefined;
  const heroSecondaryTextColor = useQxCornerHeroLayout
    ? 'rgba(21, 21, 21, 0.78)'
    : undefined;
  const heroContentWrapperClassName = useQxCornerHeroLayout
    ? 'relative z-10 flex min-h-screen w-full flex-col items-start justify-end px-5 pb-10 text-left sm:px-8 sm:pb-14 lg:px-10 lg:pb-16'
    : 'relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8';
  const heroTitleClassName = useQxCornerHeroLayout
    ? 'flex flex-col items-start overflow-visible'
    : 'flex flex-col items-center overflow-visible';
  const heroTitleStyle = useQxCornerHeroLayout
    ? { color: heroTextColor }
    : undefined;
  const heroTaglineClassName = useQxCornerHeroLayout
    ? 'mt-4 max-w-xl text-balance font-body text-lg leading-relaxed md:text-xl'
    : 'mx-auto mt-8 max-w-2xl text-balance font-body text-lg leading-relaxed md:text-xl';
  const heroBrandClassName = useQxCornerHeroLayout
    ? 'mb-6 text-left font-body text-sm uppercase tracking-[0.3em]'
    : 'mb-6 font-body text-sm uppercase tracking-[0.3em] text-on-dark-muted';
  const heroCtaWrapperClassName = useQxCornerHeroLayout ? 'mt-8' : 'mt-12';
  const heroFloatingCtaClassName = useQxThirdSlideLift
    ? 'absolute inset-x-0 z-20 flex justify-center'
    : undefined;
  const heroCtaStyle = useQxCornerHeroLayout
    ? {
        color: '#151515',
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 16px 34px rgba(0, 0, 0, 0.1)',
      }
    : undefined;
  const heroFloatingCtaStyle = useQxThirdSlideLift
    ? { bottom: 'clamp(12rem, 22vh, 16rem)' }
    : undefined;
  const heroContentWrapperStyle = useQxThirdSlideLift
    ? {
        transform:
          'translateY(calc(clamp(5.04rem, 15.75vw, 13.86rem) * -1))',
      }
    : undefined;
  const heroCtaTransition = slowTransition({ duration: 0.3, delay: 0.8 });
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(
        ((index % displaySlides.length) + displaySlides.length) %
          displaySlides.length,
      );
    },
    [displaySlides.length],
  );

  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );
  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );

  useEffect(() => {
    if (
      !hasSlider ||
      displaySlides.length <= 1 ||
      prefersReducedMotion ||
      !slider.autoAdvance ||
      (slider.pauseOnHover && isHovered)
    ) {
      return;
    }

    const timer = setInterval(goNext, scaleMotionValue(slider.interval));
    return () => clearInterval(timer);
  }, [
    hasSlider,
    displaySlides.length,
    prefersReducedMotion,
    slider.autoAdvance,
    slider.interval,
    slider.pauseOnHover,
    isHovered,
    goNext,
  ]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!hasSlider) return;
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasSlider, goPrev, goNext]);

  return (
    <section
      id="cover"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label={`${currentHeroContent.collectionName} Collection cover`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0"
        role={hasSlider ? 'region' : undefined}
        aria-roledescription={hasSlider ? 'Image carousel' : undefined}
        aria-live={hasSlider ? 'polite' : undefined}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={`${currentSlide.src}-${currentIndex}`}
            src={currentSlide.src}
            {...responsiveImg(currentSlide.src, 'hero')}
            draggable={true}
            alt={currentSlide.alt}
            className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform]"
            initial={{ opacity: 0, scale: 1.012 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.006 }}
            transition={slideTransition}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />
        </AnimatePresence>
        {!isQx && (
          <div className="hero-overlay-layer absolute inset-0 z-[2] bg-[hsl(var(--hero-overlay)/0.65)]" />
        )}
      </div>

      {hasSlider && displaySlides.length > 1 && (
        <>
          {slider.showArrows && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={slowTransition({ duration: 0.3, delay: 1.2 })}
                onClick={goPrev}
                className="absolute left-4 top-1/2 z-20 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-on-dark-muted transition-colors hover:text-on-dark md:flex"
                aria-label="Previous slide"
              >
                <ArrowDown size={24} strokeWidth={1.2} className="rotate-90" />
              </motion.button>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={slowTransition({ duration: 0.3, delay: 1.2 })}
                onClick={goNext}
                className="absolute right-4 top-1/2 z-20 hidden min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-on-dark-muted transition-colors hover:text-on-dark md:flex"
                aria-label="Next slide"
              >
                <ArrowDown size={24} strokeWidth={1.2} className="-rotate-90" />
              </motion.button>
            </>
          )}
          {slider.showDots && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={slowTransition({ duration: 0.3, delay: 1.2 })}
              className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-24"
              role="tablist"
              aria-label="Slide indicators"
            >
              {displaySlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goTo(index)}
                  className="hero-slider-dot flex min-h-[44px] min-w-[44px] items-center justify-center p-2"
                >
                  <span
                    className={`hero-slider-dot-mark block h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-accent'
                        : 'bg-on-dark-muted/60'
                    }`}
                  />
                </button>
              ))}
            </motion.div>
          )}
        </>
      )}

      {showSlideDescription && (
        <motion.p
          key={`slide-description-${currentIndex}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute z-20 ${descriptionPosClass}`}
          style={descriptionInlineStyle}
          aria-live="polite"
        >
          {currentSlide.description}
        </motion.p>
      )}

      <div
        className={heroContentWrapperClassName}
        style={heroContentWrapperStyle}
      >
        {currentHeroContent.brandLabel?.trim() && (
          <motion.p
            key={`hero-brand-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={slowTransition({ duration: 0.3, delay: 0.2 })}
            className={heroBrandClassName}
            style={heroTextColor ? { color: heroSecondaryTextColor } : undefined}
          >
            {currentHeroContent.brandLabel}
          </motion.p>
        )}

        <motion.h1
          key={`hero-title-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slowTransition({ duration: 0.3, delay: 0.4 })}
          className={`${heroTitleClassName} font-display text-primary-foreground`}
          style={heroTitleStyle}
        >
          {isQx ? (
            <span
              className="qx-giant py-4 text-[clamp(5.6rem,17.5vw,15.4rem)] tracking-tighter"
              style={{
                lineHeight: '0.9',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 200,
              }}
            >
              {renderQxText(currentHeroContent.collectionName)}
            </span>
          ) : (
            <span
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                lineHeight: '0.8',
              }}
            >
              {renderQxText(currentHeroContent.collectionName)}
            </span>
          )}
        </motion.h1>

        <motion.p
          key={`hero-tagline-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slowTransition({ duration: 0.3, delay: 0.6 })}
          className={heroTaglineClassName}
          style={
            heroTextColor
              ? { color: heroTextColor }
              : { textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }
          }
        >
          {renderQxText(currentHeroContent.tagline)}
          {currentHeroContent.taglineLine2 && (
            <>
              <br className="hidden md:block" />
              <span
                className="mt-2 block text-base font-light opacity-80 md:text-lg"
                style={
                  heroSecondaryTextColor
                    ? { color: heroSecondaryTextColor }
                    : undefined
                }
              >
                {renderQxText(currentHeroContent.taglineLine2)}
              </span>
            </>
          )}
        </motion.p>

        {!useQxThirdSlideLift && (
          <motion.div
            key={`hero-cta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroCtaTransition}
            className={heroCtaWrapperClassName}
          >
            <button
              onClick={() =>
                document
                  .getElementById('overview')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-premium inline-flex min-h-[44px] items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:opacity-100"
              style={heroCtaStyle}
            >
              <span>{currentHeroContent.ctaLabel}</span>
              <ArrowDown
                size={18}
                strokeWidth={1.2}
                className="animate-bounce"
              />
            </button>
          </motion.div>
        )}
      </div>

      {useQxThirdSlideLift && (
        <motion.div
          key={`hero-floating-cta-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroCtaTransition}
          className={heroFloatingCtaClassName}
          style={heroFloatingCtaStyle}
        >
          <button
            onClick={() =>
              document
                .getElementById('overview')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-premium inline-flex min-h-[44px] items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:opacity-100"
          >
            <span>{currentHeroContent.ctaLabel}</span>
            <ArrowDown size={18} strokeWidth={1.2} className="animate-bounce" />
          </button>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={slowTransition({ duration: 0.3, delay: 1.2 })}
        onClick={() =>
          document
            .getElementById('overview')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-8 left-1/2 z-20 hidden min-h-[44px] min-w-[44px] -translate-x-1/2 items-center justify-center text-on-dark-muted transition-colors hover:text-on-dark md:flex"
        aria-label="Scroll to overview"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={slowTransition({ repeat: Infinity, duration: 2 })}
        >
          <ArrowDown size={24} strokeWidth={1.2} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
