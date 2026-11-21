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
          'relative overflow-hidden flex items-center justify-center bg-[#141414]',
          fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full min-h-[160px]',
          containerClassName
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#282828_0%,#0e0e0e_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <span className="font-heading text-5xl font-black uppercase text-white tracking-widest select-none">
            {fallbackText || 'ROYAL ENFIELD'}
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
