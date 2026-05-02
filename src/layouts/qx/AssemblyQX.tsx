'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, FileDown, Mail } from 'lucide-react';
import type { AssemblyData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';

interface AssemblySectionProps {
  data: AssemblyData;
}

const AssemblyQX = ({ data }: AssemblySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="assembly"
      className="relative overflow-hidden bg-white lg:min-h-[960px]"
      aria-labelledby="assembly-title"
    >
      <div
        className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:min-h-[960px] lg:grid-cols-12 lg:gap-0 lg:px-9 lg:py-0"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={slowTransition({ duration: 0.6 })}
          className="relative z-10 flex flex-col lg:col-span-4 lg:max-w-[420px] lg:pt-3"
        >
          <p className="section_ID font-display uppercase">
            {renderQxText(data.sectionLabel)}
          </p>
          <h2
            id="assembly-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText(data.title)}
          </h2>
          <div className="sec_main_text mt-[120px] max-w-[360px] space-y-4 font-body">
            <p>
              {renderQxText(
                `${data.steps.length} assembly steps and ${data.orderCodes.length} order codes for specification.`,
              )}
            </p>
            <p>{renderQxText(data.footerText)}</p>
          </div>
        </motion.div>

        <div className="space-y-14 lg:col-span-7 lg:col-start-6 lg:self-center">
          <div className="grid gap-8 sm:grid-cols-2">
            {data.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={slowTransition({
                  duration: 0.3,
                  delay: 0.1 + i * 0.08,
                })}
              >
                <div className="group flex items-start gap-5">
                  <div className="shrink-0 font-display text-6xl font-medium leading-none text-foreground/20 transition-colors group-hover:text-accent/40">
                    {s.step}
                  </div>
                  <div className="flex flex-col pt-1">
                    <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-foreground">
                      {renderQxText(s.title)}
                    </h3>
                    <p className="sec_main_text font-body">
                      {renderQxText(s.desc)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={slowTransition({ duration: 0.3, delay: 0.65 })}
          >
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-3 font-display text-2xl font-bold text-foreground">
                <Package size={28} strokeWidth={1.2} className="text-accent" />
                Product Codes
              </h3>
              <p className="sec_main_text">
                Use these unique codes when placing your order or specifying
                modules for your workspace.
              </p>
            </div>
            <div className="overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left py-4 pr-4 text-foreground font-bold uppercase tracking-wider text-[10px]">
                        Code Reference
                      </th>
                      <th className="text-left py-4 text-foreground font-bold uppercase tracking-wider text-[10px]">
                        Specifications
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {data.orderCodes.map((o) => (
                      <tr key={o.code} className="group transition-colors">
                        <td className="py-4 pr-4">
                          <span className="font-mono text-xs font-bold px-2 py-1 bg-foreground/5 rounded-md text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                            {o.code}
                          </span>
                        </td>
                        <td className="py-4 text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                          {o.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={slowTransition({ duration: 0.3, delay: 0.85 })}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="inline-flex min-h-[44px] items-center gap-3 bg-accent px-8 py-5 font-display text-sm font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105">
              <Mail size={18} strokeWidth={1.2} />
              {renderQxText(data.ctaLabels.quote)}
            </button>
            <button className="inline-flex min-h-[44px] items-center gap-3 border border-border px-8 py-5 font-display text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:border-foreground">
              <FileDown size={18} strokeWidth={1.2} />
              {renderQxText(data.ctaLabels.pdf)}
            </button>
          </motion.div>

          <p className="text-[10px] font-body uppercase tracking-widest text-muted-foreground/40">
            {renderQxText(data.versionInfo)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AssemblyQX;
