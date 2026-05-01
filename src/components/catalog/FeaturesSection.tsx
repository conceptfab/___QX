'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { FeaturesData } from '@/types/catalog';
import { getIcon } from '@/lib/icon-map';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from './renderQxText';

interface FeaturesSectionProps {
  data: FeaturesData;
}

const FeaturesSection = ({ data }: FeaturesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featureCards = data.items.slice(0, 4);

  return (
    <section
      id="features"
      className="bg-white"
      aria-labelledby="features-title"
    >
      <div
        className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:h-[720px] lg:grid-cols-4 lg:items-center lg:gap-[74px] lg:px-[122px] lg:py-0"
        ref={ref}
      >
        <h2 id="features-title" className="sr-only">
          {renderQxText(data.title)}
        </h2>

        {featureCards.map((feature, index) => {
          const Icon = getIcon(feature.icon);
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={slowTransition({
                duration: 0.5,
                delay: index * 0.08,
              })}
              className="w-full"
            >
              <div
                className="flex aspect-square w-full items-center justify-center"
                aria-hidden="true"
              >
                <Icon
                  size={96}
                  strokeWidth={1}
                  className="text-foreground/55"
                />
              </div>
              <h3 className="section_Title mt-4 font-display">
                {renderQxText(feature.title)}
              </h3>
              <p className="sec_main_text mt-2 font-body">
                {renderQxText(feature.desc)}
              </p>
            </motion.article>
          );
        })}
        </div>
    </section>
  );
};

export default FeaturesSection;
