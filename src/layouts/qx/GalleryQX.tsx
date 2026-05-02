'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface GallerySectionProps {
  data: GalleryData;
}

const GalleryQX = ({ data }: GallerySectionProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const galleryImages = data.images.slice(0, 4);
  const mainImage = galleryImages[0];
  const thumbnailImages = galleryImages.slice(1, 4);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex + dir + galleryImages.length) % galleryImages.length,
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
      className="bg-white"
      aria-labelledby="gallery-title"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-0 lg:py-0"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6 })}
          className="relative z-10 flex flex-col"
        >
          <p className="section_ID font-display uppercase">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="gallery-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText(data.title)}
          </h2>
        </motion.div>

        {mainImage && (
          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1075px)_345px] lg:items-start">
            <motion.button
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={slowTransition({ duration: 0.3 })}
              onClick={() => openLightbox(0)}
              className="group relative aspect-[1075/1078] min-h-[44px] w-full overflow-hidden"
              aria-label={`View ${mainImage.category} image in fullscreen`}
            >
              <img
                src={mainImage.src}
                {...responsiveImg(
                  mainImage.src,
                  'gallery',
                  '(min-width: 1440px) 1075px, (min-width: 1024px) calc(100vw - 365px), 100vw',
                )}
                alt={mainImage.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                <ZoomIn
                  className="text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  size={28}
                />
              </div>
            </motion.button>

            <div className="grid grid-cols-3 gap-5 lg:grid-cols-1 lg:grid-rows-3">
              {thumbnailImages.map((img, i) => (
                <motion.button
                  key={img.src}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={slowTransition({
                    duration: 0.3,
                    delay: (i + 1) * 0.1,
                  })}
                  onClick={() => openLightbox(i + 1)}
                  className="group relative aspect-square min-h-[44px] w-full overflow-hidden"
                  aria-label={`View ${img.category} image in fullscreen`}
                >
                  <img
                    src={img.src}
                    {...responsiveImg(
                      img.src,
                      'gallery',
                      '(min-width: 1024px) 345px, 33vw',
                    )}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                    <ZoomIn
                      className="text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      size={24}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
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
              src={galleryImages[lightboxIndex].src}
              draggable={true}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p
              className="absolute bottom-6 text-on-dark-muted text-sm"
              aria-live="polite"
            >
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryQX;
