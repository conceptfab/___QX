'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
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
            id="dimensions-title"
            className="section_Title font-display font-normal"
          >
            {renderQxText(data.title)}
          </h2>
          <div className="sec_main_text mt-[120px] max-w-[360px] space-y-4 font-body">
            {data.certifications.slice(0, 2).map((certification) => (
              <p key={certification}>{renderQxText(certification)}</p>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-10 lg:col-span-7 lg:col-start-6 lg:grid-cols-5 lg:self-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={slowTransition({ duration: 0.3, delay: 0.2 })}
            className="flex items-center justify-center bg-transparent p-0 lg:col-span-3"
          >
            <Image
              src="/axo.svg"
              alt="Technical dimension drawing"
              width={842}
              height={842}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={slowTransition({ duration: 0.3, delay: 0.3 })}
            className="lg:col-span-2"
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
              Technical Specifications
            </h3>
            <dl className="space-y-4">
              {data.specs.map((s) => (
                <div
                  key={s.label}
                  className="py-2 flex justify-between gap-4 border-b border-border/50"
                >
                  <dt className="text-muted-foreground text-base">
                    {renderQxText(s.label)}
                  </dt>
                  <dd className="text-foreground text-base font-bold text-right">
                    {renderQxText(s.value)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award size={18} className="text-accent" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {data.certifications.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      size={16}
                      className="text-success mt-0.5 shrink-0"
                    />
                    {renderQxText(c)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DimensionsQX;
