'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type {
  PackshotsData,
  PackshotGroup,
  PackshotItem,
} from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface PackshotsSectionProps {
  data: PackshotsData;
}

const ADJUSTABLE_DESK_LABEL = 'Height-adjustable desk';

function hasAdjustableMarker(value?: string): boolean {
  if (!value) return false;
  const modelToken = value.toUpperCase().split(/[\\/_-]/)[0];
  return modelToken.includes('R');
}

function isAdjustableGroup(group: PackshotGroup): boolean {
  if (hasAdjustableMarker(group.model) || hasAdjustableMarker(group.label)) {
    return true;
  }

  return group.items.some((item) => hasAdjustableMarker(item.code));
}

function resolveGroupDescription(group: PackshotGroup): string | undefined {
  if (isAdjustableGroup(group)) {
    return ADJUSTABLE_DESK_LABEL;
  }

  return group.desc?.trim() || undefined;
}

function DefaultCard({ item }: { item: PackshotItem }) {
  return (
    <div className="group overflow-hidden rounded-[1.75rem] bg-background">
      <img
        src={item.image}
        {...responsiveImg(item.image, 'packshot')}
        alt={`${item.code} - ${item.colorName}`}
        className="block aspect-[16/11] w-full object-cover object-[center_84%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        loading="lazy"
      />
      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <p className="font-mono text-sm font-semibold tracking-wide text-foreground">
          {item.code}
        </p>
        <div className="mt-1.5 flex items-center gap-2.5">
          {item.colorHex && (
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: item.colorHex }}
              aria-hidden="true"
            />
          )}
          <p className="text-sm text-muted-foreground">{item.colorName}</p>
        </div>
      </div>
    </div>
  );
}

const PackshotsQX = ({ data }: PackshotsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="packshots"
      aria-labelledby="packshots-title"
      className="bg-white lg:min-h-[960px]"
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
            id="packshots-title"
            className="section_Title font-display font-normal"
          >
            {renderQxText(data.title)}
          </h2>
          {data.subtitle && (
            <p className="sec_main_text mt-[120px] max-w-[360px] font-body">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-14 lg:col-span-7 lg:col-start-6 lg:self-center">
          {data.groups.map((group, index) => {
            const groupDescription = resolveGroupDescription(group);

            return (
              <motion.div
                key={group.model}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={slowTransition({
                  duration: 0.3,
                  delay: 0.06 + index * 0.07,
                })}
              >
                <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {renderQxText(group.label)}
                  </h3>
                  {groupDescription && (
                    <span className="text-sm text-muted-foreground">
                      {groupDescription}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-8">
                  {group.items.map((item) => (
                    <DefaultCard key={item.code} item={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackshotsQX;
