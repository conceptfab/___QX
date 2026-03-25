'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type {
  PackshotsData,
  PackshotGroup,
  PackshotItem,
} from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from './renderQxText';
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
        draggable={true}
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

const PackshotsSection = ({ data }: PackshotsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="packshots"
      aria-labelledby="packshots-title"
      className="section-padding bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="packshots-title"
            className="font-display font-semibold text-foreground"
            style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.3rem)' }}
          >
            {renderQxText(data.title)}
          </h2>
          {data.subtitle && (
            <p className="mt-3 text-sm text-muted-foreground">{data.subtitle}</p>
          )}
        </motion.div>

        <div className="space-y-14">
          {data.groups.map((group, index) => {
            const groupDescription = resolveGroupDescription(group);

            return (
              <motion.div
                key={group.model}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
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

export default PackshotsSection;
