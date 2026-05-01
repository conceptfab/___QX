'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from './renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface GallerySectionProps {
  data: GalleryData;
}

const GallerySection = ({ data }: GallerySectionProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex + dir + data.images.length) % data.images.length,
    );
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigate(1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="gallery-title"
    >
      <div
        className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:min-h-[960px] lg:grid-cols-12 lg:gap-0 lg:px-9 lg:py-0"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6 })}
          className="relative z-10 flex flex-col lg:col-span-4 lg:max-w-[420px] lg:pt-3"
        >
          <p className="section_ID mb-[120px] font-display uppercase">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="gallery-title"
            className="section_Title font-display font-normal"
          >
            {renderQxText(data.title)}
          </h2>
          <div className="sec_main_text mt-[120px] max-w-[360px] font-body">
            <p>
              {renderQxText(
                `${data.images.length} selected views across ${Array.from(
                  new Set(data.images.map((image) => image.category)),
                ).join(', ')} contexts.`,
              )}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:col-start-6 lg:grid-cols-3 lg:self-center">
          {data.images.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={slowTransition({ duration: 0.3, delay: i * 0.1 })}
              onClick={() => openLightbox(i)}
              className={`group relative overflow-hidden ${
                i === 0 ? 'col-span-2 lg:col-span-2 row-span-2' : ''
              } min-h-[44px]`}
              aria-label={`View ${img.category} image in fullscreen`}
            >
              <img
                src={img.src}
                {...responsiveImg(
                  img.src,
                  'gallery',
                  i === 0 ? '(min-width: 1024px) 66vw, 100vw' : undefined,
                )}
                alt={img.alt}
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                <ZoomIn
                  className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  size={28}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={closeLightbox}
          >
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-on-dark-muted hover:text-on-dark min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-dark-muted hover:text-on-dark min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-dark-muted hover:text-on-dark min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={data.images[lightboxIndex].src}
              draggable={true}
              alt={data.images[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p
              className="absolute bottom-6 text-on-dark-muted text-sm"
              aria-live="polite"
            >
              {lightboxIndex + 1} / {data.images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
