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
            id="features-title"
            className="section_Title font-display font-normal"
          >
            {renderQxText(data.title)}
          </h2>
          <div className="sec_main_text mt-[120px] max-w-[360px] font-body">
            <p>
              {renderQxText(
                `${data.items.length} ergonomic and technical feature groups for adaptable workstations.`,
              )}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:self-center">
          {data.items.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
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
      </div>
    </section>
  );
};

export default FeaturesQX;
