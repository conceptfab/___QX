'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AssemblyData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';

interface ProductCodesSectionProps {
  data: AssemblyData;
}

const ProductCodesQX = ({ data }: ProductCodesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="codes"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="codes-title"
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
            {renderQxText('Product Codes')}
          </p>
          <h2
            id="codes-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText('Order references')}
          </h2>
          <p className="sec_main_text mt-6 max-w-[633px]">
            Use these unique codes when placing your order or specifying modules
            for your workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={slowTransition({ duration: 0.6, delay: 0.2 })}
          className="mt-10"
        >
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-border/30">
                <th className="py-4 pr-4 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
                  Code Reference
                </th>
                <th className="py-4 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
                  Specifications
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {data.orderCodes.map((o) => (
                <tr key={o.code} className="group transition-colors">
                  <td className="py-4 pr-4">
                    <span className="rounded-md bg-foreground/5 px-2 py-1 font-mono text-xs font-bold text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      {o.code}
                    </span>
                  </td>
                  <td className="py-4 font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {o.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCodesQX;
