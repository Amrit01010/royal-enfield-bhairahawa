// src/components/shared/optimized-image.tsx
'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  getImageKitUrl,
  getIkLqipUrl,
  type ImageKitTransformation,
} from '@/lib/imagekit';
import { prefetchEngine } from '@/lib/image-prefetch';

export interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  transformation?: ImageKitTransformation;
  fallbackText?: string;
  showLqip?: boolean;
  onLoad?: () => void;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className,
  containerClassName,
  transformation,
  fallbackText,
  showLqip = true,
  onLoad,
}: OptimizedImageProps) {
  // Derive deterministic transformed ImageKit URL
  const optimizedSrc = useMemo(() => {
    return src ? getImageKitUrl(src, transformation) : '';
  }, [src, transformation]);

  // Derive ultra-lightweight blurred placeholder URL (~500B)
  const lqipSrc = useMemo(() => {
    if (!src || !showLqip || src.endsWith('.svg')) return '';
    return getIkLqipUrl(src);
  }, [src, showLqip]);

  // If already prefetched & decoded by our background engine, mark loaded immediately
  const initialLoaded = useMemo(() => {
    return Boolean(optimizedSrc && prefetchEngine.isPrefetched(optimizedSrc));
  }, [optimizedSrc]);

  const [loadedSrc, setLoadedSrc] = useState<string | null>(initialLoaded ? optimizedSrc : null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const hasError = Boolean(optimizedSrc) && errorSrc === optimizedSrc;
  const isLoaded = Boolean(optimizedSrc) && (loadedSrc === optimizedSrc || initialLoaded);

  // Handle immediate cached completion on mount
  const imageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !optimizedSrc) return;

      if (node.complete) {
        if (node.naturalWidth > 0) {
          setLoadedSrc(optimizedSrc);
        } else {
          setErrorSrc(optimizedSrc);
        }
      }
    },
    [optimizedSrc]
  );

  const isConfigured = Boolean(optimizedSrc && !hasError);

  if (!isConfigured) {
    return (
      <div
        className={cn(
          'relative overflow-hidden flex flex-col items-center justify-center bg-[#131313] text-zinc-500 p-6 select-none',
          fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[180px]',
          containerClassName
        )}
      >
        {/* Subtle topographic contour pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
        
        {/* Subtle emblem watermark */}
        <div className="relative z-1 flex flex-col items-center text-center max-w-[80%]">
          <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-2.5 text-zinc-400">
            <svg
              className="w-4 h-4 text-accent/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="3 20 9 8 13 14 17 9 21 20 3 20" />
            </svg>
          </div>
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-300 line-clamp-1">
            {fallbackText || alt || 'Royal Enfield'}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-0.5">
            Himalayan Expedition
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden select-none',
        fill ? 'absolute inset-0 w-full h-full' : '',
        containerClassName
      )}
    >
      {/* 1. Base dark stage background */}
      <div
        className={cn(
          'absolute inset-0 bg-[#141414] transition-opacity duration-300',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      />

      {/* 2. Low-Quality Blurred Image Placeholder (LQIP) */}
      {lqipSrc && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lqipSrc}
            alt=""
            className="w-full h-full object-cover filter blur-md scale-110 opacity-70 transition-opacity duration-300"
            decoding="async"
          />
        </div>
      )}

      {/* 3. Main High-Resolution Image */}
      <Image
        ref={imageRef}
        src={optimizedSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={sizes || (fill ? '100vw' : undefined)}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'sync' : 'async'}
        className={cn(
          'transition-opacity duration-200 ease-out will-change-[opacity]',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => {
          setLoadedSrc(optimizedSrc);
          onLoad?.();
        }}
        onError={() => {
          setErrorSrc(optimizedSrc);
        }}
      />
    </div>
  );
});
