'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type {
  MaterialsConfiguratorData,
  MaterialsConfiguratorOption,
  VariantsData,
} from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';
import { MaterialsOptionGroup } from '@/components/catalog/MaterialsOptionGroup';

interface VariantsSectionProps {
  data: VariantsData;
  configurator?: MaterialsConfiguratorData;
}

const EMPTY_OPTIONS: MaterialsConfiguratorOption[] = [];

const VariantsQX = ({ data, configurator }: VariantsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const frameOptions = configurator?.frameOptions ?? EMPTY_OPTIONS;
  const desktopOptions = configurator?.desktopOptions ?? EMPTY_OPTIONS;
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
      ? `Desk with desktop ${selectedDesktop.label} and frame ${selectedFrame.label}`
      : data.title;

  return (
    <section
      id="variants"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="variants-title"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:min-h-[960px] lg:px-9 lg:py-0"
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
            id="variants-title"
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
          className="mt-10 space-y-10 lg:mt-10 lg:max-w-[630px]"
        >
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
            <>
              <div>
                <h3 className="mb-4 font-display text-lg font-normal text-foreground">
                  Desktop Finish
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.desktopColors.map((c) => (
                    <div
                      key={c.name}
                      className="h-12 w-12 rounded-full border border-border"
                      style={{ backgroundColor: c.code }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-display text-lg font-normal text-foreground">
                  Frame Colour
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.frameColors.map((c) => (
                    <div
                      key={c.name}
                      className="h-12 w-12 rounded-full border border-border"
                      style={{ backgroundColor: c.code }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.3, delay: 0.2 })}
          className="mt-10 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[715px] lg:w-[710px]"
        >
          {hasConfigurator && selectedFrame && selectedDesktop ? (
            <figure
              className="relative h-full w-full"
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
            <figure className="relative h-full w-full overflow-hidden">
              <img
                src={data.previewImage}
                {...responsiveImg(data.previewImage, 'variants')}
                alt={configuratorAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VariantsQX;
