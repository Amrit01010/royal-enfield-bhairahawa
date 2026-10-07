// src/components/accessories/product-card.tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/optimized-image';

interface ProductCardProps {
  accessory: {
    id: string;
    name: string;
    category: string;
    image: string;
    details: string;
  };
}

export function ProductCard({ accessory }: ProductCardProps) {
  return (
    <Link
      href={`/accessories/${accessory.id}`}
      className="group relative flex flex-col bg-card border border-border rounded-sm overflow-hidden transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      {/* accent line that grows on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full z-10"
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-[#141414] border-b border-border">
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
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <span className="absolute top-3 left-3 bg-black/80 text-accent border border-accent/30 text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
          {accessory.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-heading font-bold uppercase tracking-wide text-white text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {accessory.name}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
          {accessory.details}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-zinc-300 group-hover:text-accent transition-colors">
          View details
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
