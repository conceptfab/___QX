'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { MaterialsConfiguratorOption, MaterialsData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from './renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface MaterialsSectionProps {
  data: MaterialsData;
}

interface MaterialsOptionGroupProps {
  title: string;
  options: MaterialsConfiguratorOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const EMPTY_MATERIAL_OPTIONS: MaterialsConfiguratorOption[] = [];

function MaterialsOptionGroup({
  title,
  options,
  selectedId,
  onSelect,
}: MaterialsOptionGroupProps) {
  const selectedOption = options.find((option) => option.id === selectedId);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {renderQxText(title)}
        </h3>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {renderQxText(selectedOption?.label ?? '')}
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`w-[5.25rem] shrink-0 rounded-lg border p-1 text-left transition-all sm:w-[5.75rem] ${
                isSelected
                  ? 'border-accent bg-accent/10 shadow-lg shadow-accent/10'
                  : 'border-border bg-background hover:border-accent/40 hover:bg-accent/5'
              }`}
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-muted/30">
                <img
                  src={option.thumbnail}
                  {...responsiveImg(option.thumbnail, 'materials-thumb')}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-1.5 text-[11px] font-medium leading-none text-foreground sm:text-xs">
                {renderQxText(option.label)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const MaterialsSection = ({ data }: MaterialsSectionProps) => {
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
            id="materials-title"
            className="section_Title font-display font-normal"
          >
            {renderQxText(data.title)}
          </h2>
          <div className="mt-[120px] max-w-[420px] space-y-8">
            {data.materials.map((material) => (
              <div key={material.name} className="border-l-2 border-accent pl-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {renderQxText(material.name)}
                </h3>
                <p className="sec_main_text mt-1">
                  {renderQxText(material.desc)}
                </p>
                <p className="mt-2 text-xs font-medium text-accent">
                  {renderQxText(material.specs)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6, delay: 0.2 })}
          className="flex flex-col lg:col-span-7 lg:col-start-6 lg:self-center"
        >
          {hasConfigurator && selectedFrame && selectedDesktop ? (
            <>
              <figure className="relative mb-6 overflow-visible">
                <div className="pointer-events-none absolute inset-x-[12%] bottom-[8%] h-[14%] rounded-full bg-[hsl(35_26%_74%/0.18)] blur-3xl" />
                <div
                  className="relative mx-auto aspect-square w-full max-w-[680px]"
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
                      className="absolute inset-0 h-full w-full object-contain px-2 py-4 sm:px-4 sm:py-6 drop-shadow-[0_18px_38px_rgba(182,171,155,0.2)]"
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
                      className="absolute inset-0 h-full w-full object-contain px-2 py-4 sm:px-4 sm:py-6 drop-shadow-[0_26px_48px_rgba(164,154,139,0.16)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={slowTransition({
                        duration: 0.22,
                        ease: 'easeOut',
                      })}
                    />
                  </AnimatePresence>
                </div>
              </figure>

              <div className="space-y-1 text-left">
                <p className="sec_main_text">
                  {renderQxText(data.detailImageCaption)}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-foreground/90">
                  {renderQxText(
                    `Desktop ${selectedDesktop.label} / Frame ${selectedFrame.label}`,
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <figure className="group relative mb-4 overflow-hidden">
                <img
                  src={data.detailImage}
                  {...responsiveImg(data.detailImage, 'materials-full')}
                  alt={data.detailImageAlt}
                  className="aspect-square h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
              <p className="sec_main_text text-left">
                {renderQxText(data.detailImageCaption)}
              </p>
            </>
          )}

          <div className="mt-10">
            {hasConfigurator ? (
              <div className="space-y-6">
                <MaterialsOptionGroup
                  title="Frame Colours"
                  options={frameOptions}
                  selectedId={selectedFrame?.id}
                  onSelect={setSelectedFrameId}
                />
                <MaterialsOptionGroup
                  title="Desktop Colours"
                  options={desktopOptions}
                  selectedId={selectedDesktop?.id}
                  onSelect={setSelectedDesktopId}
                />
              </div>
            ) : (
              <div>
                <h3 className="mb-4 font-display font-semibold text-foreground">
                  Colour & Decor Palette
                </h3>
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
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialsSection;
