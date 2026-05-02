'use client';

import type { MaterialsConfiguratorOption } from '@/types/catalog';
import { renderQxText } from '@/components/catalog/renderQxText';
import { responsiveImg } from '@/lib/responsive-image';

interface MaterialsOptionGroupProps {
  title: string;
  options: MaterialsConfiguratorOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function MaterialsOptionGroup({
  title,
  options,
  selectedId,
  onSelect,
}: MaterialsOptionGroupProps) {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-normal text-foreground">
        {renderQxText(title)}
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`w-[5.25rem] shrink-0 rounded-lg border p-1 text-left transition-all sm:w-[5.75rem] ${
                isSelected
                  ? 'border-accent bg-accent/10 shadow-lg shadow-accent/10'
                  : 'border-border bg-background hover:border-accent/40 hover:bg-accent/5'
              }`}
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-muted/30">
                <img
                  src={option.thumbnail}
                  {...responsiveImg(option.thumbnail, 'materials-thumb')}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-1.5 text-[11px] font-medium leading-none text-foreground sm:text-xs">
                {renderQxText(option.label)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
