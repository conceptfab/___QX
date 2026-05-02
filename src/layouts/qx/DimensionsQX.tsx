'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import type { DimensionsData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';

interface DimensionsSectionProps {
  data: DimensionsData;
}

const DimensionsQX = ({ data }: DimensionsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="dimensions"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="dimensions-title"
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
            id="dimensions-title"
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
          <div className="flex items-center justify-center lg:col-span-6">
            <Image
              src="/axo.svg"
              alt="Technical dimension drawing"
              width={842}
              height={842}
              className="h-auto w-full"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="mb-6 font-display text-2xl font-normal text-foreground">
              Technical Specifications
            </h3>
            <dl>
              {data.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between gap-4 border-b border-border/50 py-4"
                >
                  <dt className="text-base text-muted-foreground">
                    {renderQxText(s.label)}
                  </dt>
                  <dd className="text-right text-base font-bold text-foreground">
                    {renderQxText(s.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DimensionsQX;
