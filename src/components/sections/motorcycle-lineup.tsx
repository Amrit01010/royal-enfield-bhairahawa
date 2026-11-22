// src/components/sections/motorcycle-lineup.tsx
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motorcycles, getMotorcycleStudioColor } from '@/lib/constants/motorcycles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { useImagePrefetch } from '@/hooks/use-image-prefetch';
import { getImageKitUrl } from '@/lib/imagekit';
import { prefetchEngine } from '@/lib/image-prefetch';

export function MotorcycleLineup() {
  const series350 = useMemo(() => motorcycles.filter((m) => m.category === '350cc'), []);

  // Pre-generate deterministic card image URLs for all lineup models
  const lineupUrls = useMemo(() => {
    return series350.map((m) => {
      const studioColor = getMotorcycleStudioColor(m.id);
      const studioImage = studioColor?.image ?? m.image;
      return getImageKitUrl(studioImage, { width: 700, quality: 80, format: 'auto' });
    });
  }, [series350]);

  // Idle background prefetch of motorcycle fleet
  useImagePrefetch(lineupUrls, { priority: 25 });

  return (
    <section className="relative py-20 lg:py-28 bg-[#090909] [content-visibility:auto] [contain-intrinsic-size:1px_800px] border-t border-white/[0.06]">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <SectionHeading
          label="Official Fleet"
          title="Motorcycle Lineup"
        />

        {/* 350cc Series */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-white/10">
            <div className="w-1.5 h-3.5 bg-accent" />
            <h3 className="font-heading text-base tracking-[0.15em] text-white uppercase font-bold">
              350cc Series
            </h3>
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest ml-auto">
              J-Platform
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {series350.map((moto) => (
              <MotorcycleCard key={moto.id} motorcycle={moto} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MotorcycleCard({
  motorcycle,
}: {
  motorcycle: (typeof motorcycles)[number];
}) {
  const studioColor = getMotorcycleStudioColor(motorcycle.id);
  const studioImage = studioColor?.image ?? motorcycle.image;

  // On card hover, prefetch the detail page high-res hero image (1200px)
  const handleCardHover = () => {
    if (studioImage) {
      prefetchEngine.prefetchImmediate(
        getImageKitUrl(studioImage, { width: 1200, quality: 85, format: 'auto' })
      );
    }
  };

  return (
    <Card
      onMouseEnter={handleCardHover}
      onFocusCapture={handleCardHover}
      className="group relative bg-[#121212] border border-white/[0.08] hover:border-accent/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1"
    >
      <div>
        {/* Motorcycle visual block */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_50%_72%,#222_0%,#0c0c0c_75%)] border-b border-white/[0.06]">
          {studioColor && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
              style={{
                background: `radial-gradient(ellipse at 50% 82%, ${studioColor.hex}, transparent 65%)`,
              }}
            />
          )}

          {/* Pedestal floor line */}
          <div className="absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <OptimizedImage
            src={studioImage}
            alt={`Royal Enfield ${motorcycle.name} in ${studioColor?.name ?? 'official colourway'}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            transformation={{
              width: 700,
              quality: 80,
              format: 'auto',
            }}
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            fallbackText="RE"
          />

          {motorcycle.isNew && (
            <Badge className="absolute top-3 left-3 bg-accent text-white text-[9px] font-heading tracking-widest font-bold border-none rounded-xs z-10 shadow-sm">
              NEW
            </Badge>
          )}

          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-xs border border-white/10 rounded-xs z-10">
            <span className="text-[10px] font-mono tracking-wider text-zinc-300 uppercase">
              {motorcycle.category}
            </span>
          </div>
        </div>

        <CardContent className="p-5">
          <p className="font-heading text-[10px] tracking-[0.25em] text-accent uppercase font-bold mb-1.5">
            {motorcycle.subcategory}
          </p>
          <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-accent transition-colors tracking-wide">
            {motorcycle.name}
          </h3>
        </CardContent>
      </div>

      <div className="px-5 pb-5 pt-0 border-t border-white/[0.06] mt-auto flex items-center justify-between pt-3.5">
        <Link
          href={motorcycle.href}
          className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-white hover:text-accent transition-colors group/link"
        >
          View Specs
          <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
        <Link
          href={`/book?motorcycle=${motorcycle.id}`}
          className="text-[11px] font-heading uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          Book Ride →
        </Link>
      </div>
    </Card>
  );
}
