'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ProductCodeGroup, ProductCodesData } from '@/types/catalog';
import { slowTransition } from '@/lib/motion';
import { renderQxText } from '@/components/catalog/renderQxText';

interface ProductCodesSectionProps {
  data: ProductCodesData;
}

const ProductCodeTable = ({ group }: { group: ProductCodeGroup }) => (
  <article className="w-full lg:w-[343px]">
    <div className="mb-1 h-[54px]">
      <h3 className="font-body text-[13px] leading-tight text-foreground/65">
        {renderQxText(group.title)}
      </h3>
      <p className="mt-1 font-body text-[13px] leading-tight text-foreground/65">
        leveling range +/- 1cm
      </p>
    </div>
    <table
      className="w-full table-fixed border-separate border-spacing-0 text-[13px]"
      role="table"
    >
      <thead>
        <tr className="bg-[#ffcb05] font-bold text-white">
          <th className="w-[34%] px-3 py-1.5 text-left lowercase">index</th>
          <th className="px-3 py-1.5 text-left" colSpan={3}>
            Dimensions/cm
          </th>
        </tr>
      </thead>
      <tbody className="font-body text-[#7a7a7a]">
        {group.rows.map((row) => {
          const dimensions = row.dimensions.split('×').map((part) => part.trim());
          return (
            <tr key={`${group.id}-${row.index}`}>
              <td className="border-r-2 border-t-2 border-white bg-[#d9d9d9] px-3 py-1.5 font-medium">
                {row.index}
              </td>
              {dimensions.map((dimension, index) => (
                <td
                  key={`${row.index}-${dimension}-${index}`}
                  className="border-r-2 border-t-2 border-white bg-[#d9d9d9] px-3 py-1.5"
                >
                  {dimension}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </article>
);

const ProductCodesQX = ({ data }: ProductCodesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const singleDeskGroups = data.groups.filter(
    (group) => group.category === 'single',
  );
  const benchGroups = data.groups.filter((group) => group.category === 'bench');
  const managerGroups = data.groups.filter(
    (group) => group.category === 'manager',
  );

  return (
    <section
      id="codes"
      className="bg-white lg:min-h-[960px]"
      aria-labelledby="codes-title"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] px-5 pt-6 pb-12 sm:px-8 sm:pt-8 lg:min-h-[960px] lg:px-0 lg:py-0"
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
            id="codes-title"
            className="section_Title mt-8 font-display font-normal lg:mt-7"
          >
            {renderQxText(data.title)}
          </h2>
          <p className="sec_main_text mt-6 max-w-[633px]">
            {renderQxText(data.description)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={slowTransition({ duration: 0.6, delay: 0.2 })}
          className="mt-7 space-y-5 lg:mt-7 lg:space-y-4"
        >
          <div>
            <h3 className="mb-3 font-display text-sm font-bold uppercase text-foreground/70">
              Single desks
            </h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-[calc((100%-1372px)/3)]">
              {singleDeskGroups.map((group) => (
                <ProductCodeTable key={group.id} group={group} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold uppercase text-foreground/70">
              Bench desks
            </h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-[calc((100%-1372px)/3)]">
              {benchGroups.map((group) => (
                <ProductCodeTable key={group.id} group={group} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-display text-sm font-bold uppercase text-foreground/70">
              Manager desk
            </h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-[calc((100%-1372px)/3)]">
              {managerGroups.map((group) => (
                <ProductCodeTable key={group.id} group={group} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCodesQX;
