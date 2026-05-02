'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { MaterialsConfiguratorOption, MaterialsData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';
import { MaterialsOptionGroup } from '@/components/catalog/MaterialsOptionGroup';

interface MaterialsSectionProps {
  data: MaterialsData;
}

const EMPTY_MATERIAL_OPTIONS: MaterialsConfiguratorOption[] = [];

const MaterialsQX = ({ data }: MaterialsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const frameOptions = data.configurator?.frameOptions ?? EMPTY_MATERIAL_OPTIONS;
  const desktopOptions =
    data.configurator?.desktopOptions ?? EMPTY_MATERIAL_OPTIONS;
  const hasConfigurator = frameOptions.length > 0 && desktopOptions.length > 0;
  const [selectedFrameId, setSelectedFrameId] = useState(
    frameOptions[0]?.id ?? '',
  );
  const [selectedDesktopId, setSelectedDesktopId] = useState(
    desktopOptions[0]?.id ?? '',
  );

  useEffect(() => {
    setSelectedFrameId((current) =>
      frameOptions.some((option) => option.id === current)
        ? current
        : (frameOptions[0]?.id ?? ''),
    );
  }, [frameOptions]);

  useEffect(() => {
    setSelectedDesktopId((current) =>
      desktopOptions.some((option) => option.id === current)
        ? current
        : (desktopOptions[0]?.id ?? ''),
    );
  }, [desktopOptions]);

  const selectedFrame =
    frameOptions.find((option) => option.id === selectedFrameId) ??
    frameOptions[0];
  const selectedDesktop =
    desktopOptions.find((option) => option.id === selectedDesktopId) ??
    desktopOptions[0];
  const configuratorAlt =
    selectedFrame && selectedDesktop
      ? `Metro desk with desktop ${selectedDesktop.label} and frame ${selectedFrame.label}`
      : data.detailImageAlt;

  return (
    <section
      id="materials"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="materials-title"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:min-h-[960px] lg:px-0 lg:py-0"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6 })}
          className="relative z-10 flex flex-col lg:pt-3"
        >
          <p className="section_ID font-display uppercase">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="materials-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText(data.title)}
          </h2>
          {data.description && (
            <p className="sec_main_text mt-6 max-w-[633px]">
              {renderQxText(data.description)}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={slowTransition({ duration: 0.6, delay: 0.2 })}
          className="mt-10 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-9"
        >
          <div className="lg:col-span-6 lg:h-[633px] lg:w-[633px]">
            {hasConfigurator && selectedFrame && selectedDesktop ? (
              <figure
                className="relative aspect-square w-full"
                role="img"
                aria-label={configuratorAlt}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`frame-${selectedFrame.image}`}
                    src={selectedFrame.image}
                    {...responsiveImg(selectedFrame.image, 'materials-full')}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={slowTransition({
                      duration: 0.22,
                      ease: 'easeOut',
                    })}
                  />
                </AnimatePresence>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={`desktop-${selectedDesktop.image}`}
                    src={selectedDesktop.image}
                    {...responsiveImg(selectedDesktop.image, 'materials-full')}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={slowTransition({
                      duration: 0.22,
                      ease: 'easeOut',
                    })}
                  />
                </AnimatePresence>
              </figure>
            ) : (
              <figure className="group relative aspect-square w-full overflow-hidden">
                <img
                  src={data.detailImage}
                  {...responsiveImg(data.detailImage, 'materials-full')}
                  alt={data.detailImageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
            )}
          </div>

          <div className="space-y-10 lg:col-span-6 lg:col-start-7">
            {hasConfigurator ? (
              <>
                <MaterialsOptionGroup
                  title="Desktop Finish"
                  options={desktopOptions}
                  selectedId={selectedDesktop?.id}
                  onSelect={setSelectedDesktopId}
                />
                <MaterialsOptionGroup
                  title="Frame Colour"
                  options={frameOptions}
                  selectedId={selectedFrame?.id}
                  onSelect={setSelectedFrameId}
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {data.swatches.map((swatch) => (
                  <div key={swatch.name} className="text-center">
                    <div
                      className="aspect-square w-full shadow-md transition-transform hover:scale-110"
                      style={{ backgroundColor: swatch.hex }}
                      role="img"
                      aria-label={`${swatch.name} colour swatch`}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {renderQxText(swatch.name)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialsQX;
