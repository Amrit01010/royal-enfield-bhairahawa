// src/components/rides/motorcycle-color-picker.tsx
'use client';

import { useMemo } from 'react';
import { Check } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/optimized-image';
import type { Motorcycle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getImageKitUrl } from '@/lib/imagekit';
import { useImagePrefetch } from '@/hooks/use-image-prefetch';

interface MotorcycleColorPickerProps {
  motorcycle: Motorcycle;
  value?: string;
  onChange: (colorId: string) => void;
  className?: string;
}

export function MotorcycleColorPicker({
  motorcycle,
  value,
  onChange,
  className,
}: MotorcycleColorPickerProps) {
  const colors = useMemo(() => motorcycle.colors ?? [], [motorcycle.colors]);
  const activeColor = colors.find((color) => color.id === value) ?? colors[0];
  const previewImage = activeColor?.image ?? motorcycle.image;
  const activeLabel = activeColor?.name ?? 'Standard';

  const activeIndex = useMemo(() => {
    return colors.findIndex((c) => c.id === activeColor?.id);
  }, [colors, activeColor?.id]);

  // Build exact deterministic ImageKit URLs for all colorways
  const colorUrls = useMemo(() => {
    return colors.map((c) =>
      getImageKitUrl(c.image, { width: 1100, quality: 88, format: 'auto' })
    );
  }, [colors]);

  // Idle background prefetch of all color variants, prioritizing nearest neighbors
  const { prefetchOnDemand } = useImagePrefetch(colorUrls, {
    activeIndex: activeIndex >= 0 ? activeIndex : 0,
    priority: 40,
  });

  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm border border-border bg-[#101010]',
        className
      )}
    >
      {/* Studio stage */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_68%,#242424_0%,#0c0c0c_72%)]">
        {activeColor && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-25 blur-3xl transition-colors duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 85%, ${activeColor.hex}, transparent 62%)`,
            }}
          />
        )}

        <OptimizedImage
          key={`${motorcycle.id}-${activeColor?.id ?? 'base'}`}
          src={previewImage}
          alt={`Royal Enfield ${motorcycle.name} in ${activeLabel}`}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          transformation={{ width: 1100, quality: 88, format: 'auto' }}
          className="object-contain p-2 sm:p-4"
          fallbackText={motorcycle.name}
        />

        <span className="absolute top-3 left-3 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-zinc-400">
          Official Colourway
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-heading uppercase tracking-wider text-zinc-500">
          {motorcycle.category}
        </span>
      </div>

      {/* Colour controls */}
      <div className="border-t border-border/70 bg-[#141414] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
          <div>
            <p className="text-[10px] font-heading uppercase tracking-[0.2em] text-zinc-400">
              Colour
            </p>
            <p
              aria-live="polite"
              className="font-heading text-base font-bold uppercase tracking-wide text-white"
            >
              {activeLabel}
            </p>
          </div>
          <p className="text-[10px] font-heading uppercase tracking-wider text-zinc-400 font-medium">
            {colors.length} {colors.length === 1 ? 'colour' : 'colours'} available
          </p>
        </div>

        {colors.length > 0 && (
          <div
            role="group"
            aria-label={`Choose a colour for the ${motorcycle.name}`}
            className="mt-3 flex flex-wrap items-center gap-2.5"
          >
            {colors.map((color, idx) => {
              const isSelected = color.id === activeColor?.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onChange(color.id)}
                  onMouseEnter={() => prefetchOnDemand(colorUrls[idx])}
                  onTouchStart={() => prefetchOnDemand(colorUrls[idx])}
                  onFocus={() => prefetchOnDemand(colorUrls[idx])}
                  aria-pressed={isSelected}
                  aria-label={color.name}
                  title={color.name}
                  className={cn(
                    'group relative grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] cursor-pointer',
                    isSelected
                      ? 'scale-110 border-white ring-2 ring-accent/60'
                      : 'border-white/25 hover:scale-105 hover:border-white/70'
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-[3.5px] rounded-full border border-black/50 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <Check
                    aria-hidden
                    className={cn(
                      'relative z-10 h-4 w-4 stroke-[3] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] transition-opacity',
                      isSelected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
