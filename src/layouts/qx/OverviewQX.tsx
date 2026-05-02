'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { OverviewData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface OverviewSectionProps {
  data: OverviewData;
}

const OverviewQX = ({ data }: OverviewSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="overview"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="overview-title"
    >
      <div
        className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:min-h-[960px] lg:grid-cols-12 lg:gap-0 lg:px-9 lg:py-0"
        ref={ref}
      >
        <div className="relative z-10 flex flex-col lg:col-span-6 lg:max-w-[540px] lg:pt-3">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={slowTransition({ duration: 0.6 })}
          >
            <p className="section_ID mb-[120px] font-display uppercase">
              {renderQxText(data.sectionLabel)}
            </p>
            <h2
              id="overview-title"
              className="section_Title font-display font-normal"
            >
              {renderQxText(data.title)}
              {data.titleLine2 && (
                <>
                  <br />
                  {renderQxText(data.titleLine2)}
                </>
              )}
            </h2>
            <div className="sec_main_text mt-[120px] max-w-[520px] space-y-4 font-body">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{renderQxText(p)}</p>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="min-h-[360px] lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:min-h-0">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={slowTransition({ duration: 0.6, delay: 0.2 })}
            className="h-full w-full"
          >
            <figure className="h-full w-full overflow-hidden bg-transparent">
              <div className="relative h-full min-h-[360px] w-full overflow-hidden">
                <img
                  src={data.packshotImage}
                  {...responsiveImg(data.packshotImage, 'overview')}
                  alt={data.packshotImageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <figcaption className="sr-only">
                {renderQxText(data.packshotCaption)}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OverviewQX;
