'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { FeaturesData } from '@/types/catalog';
import { getIcon } from '@/lib/icon-map';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';

interface FeaturesSectionProps {
  data: FeaturesData;
}

const FeaturesQX = ({ data }: FeaturesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="features"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="features-title"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-0 lg:py-0"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6 })}
          className="relative z-10 flex flex-col lg:max-w-[520px] lg:pt-3"
        >
          <p className="section_ID font-display uppercase">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="features-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText(data.title)}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-[calc((100%-1029px)/2)]">
          {data.items.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={slowTransition({
                  duration: 0.5,
                  delay: index * 0.08,
                })}
                className="w-full lg:w-[343px]"
              >
                <div
                  className="flex h-[212px] w-full items-center justify-center bg-background"
                  aria-hidden="true"
                >
                  <Icon
                    size={120}
                    strokeWidth={1}
                    className="text-foreground/55"
                  />
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  {renderQxText(feature.title)}
                </h3>
                <p className="sec_main_text mt-1 max-w-[360px] font-body">
                  {renderQxText(feature.desc)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesQX;
