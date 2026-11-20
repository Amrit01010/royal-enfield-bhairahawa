// src/components/accessories/product-card.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { useCart } from '@/hooks/use-cart';
import type { Accessory } from '@/lib/types';
import { formatBikeName } from '@/lib/constants/accessories';

interface ProductCardProps {
  accessory: Accessory;
}

export function ProductCard({ accessory }: ProductCardProps) {
  const { addItem, getQuantity } = useCart();
  const quantity = getQuantity(accessory.id);

  const fitmentLabel =
    accessory.compatibleBikes && accessory.compatibleBikes.length > 0 && !accessory.compatibleBikes.includes('all')
      ? accessory.compatibleBikes.map(formatBikeName).slice(0, 2).join(', ') +
        (accessory.compatibleBikes.length > 2 ? ` +${accessory.compatibleBikes.length - 2}` : '')
      : 'Universal Fit';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(accessory);
  };

  return (
    <div className="group relative flex flex-col bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-black/50">
      {/* Accent line that grows on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full z-10"
      />

      {/* Clickable Image Container */}
      <Link
        href={`/accessories/${accessory.id}`}
        className="relative aspect-[4/3] overflow-hidden bg-[#141414] border-b border-border block"
      >
        <OptimizedImage
          src={accessory.image}
          alt={accessory.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          transformation={{ width: 700, quality: 80, format: 'auto' }}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackText="GEAR"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="bg-black/85 text-accent border border-accent/40 text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-xs">
            {accessory.category}
          </span>
          {accessory.partNumber && (
            <span className="bg-zinc-950/80 text-zinc-300 border border-zinc-700/50 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm backdrop-blur-xs">
              {accessory.partNumber}
            </span>
          )}
        </div>

        {/* Fitment badge on bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 pointer-events-none">
          <span className="inline-block bg-black/80 border border-white/10 text-zinc-300 text-[10px] font-heading uppercase tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-xs truncate max-w-full">
            Fits: {fitmentLabel}
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-col flex-1 p-4">
        <Link
          href={`/accessories/${accessory.id}`}
          className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          <h3 className="font-heading font-bold uppercase tracking-wide text-white text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {accessory.name}
          </h3>
        </Link>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
          {accessory.details}
        </p>

        {/* Bottom Actions (No prices shown) */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-sm text-[11px] font-heading font-bold uppercase tracking-wider transition-all ${
              quantity > 0
                ? 'bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-white'
                : 'bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent hover:text-white'
            }`}
            title="Add to showroom inquiry cart"
          >
            {quantity > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                In Cart ({quantity})
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>

          <Link
            href={`/accessories/${accessory.id}`}
            className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-[0.15em] text-zinc-400 hover:text-accent transition-colors py-1"
          >
            Details
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
