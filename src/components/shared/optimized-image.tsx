// src/components/shared/optimized-image.tsx
'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getImageKitUrl, type ImageKitTransformation } from '@/lib/imagekit';

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
  onLoad?: () => void;
}

export function OptimizedImage({
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
  onLoad,
}: OptimizedImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  // Derive transformed ImageKit URL
  const optimizedSrc = src ? getImageKitUrl(src, transformation) : '';
  const hasError = Boolean(optimizedSrc) && errorSrc === optimizedSrc;
  const isLoaded = Boolean(optimizedSrc) && loadedSrc === optimizedSrc;

  // Priority/preloaded images can finish before React attaches `onLoad`,
  // which would otherwise leave the image permanently transparent.
  const imageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node?.complete || !optimizedSrc) return;

      if (node.naturalWidth > 0) {
        setLoadedSrc(optimizedSrc);
      } else {
        setErrorSrc(optimizedSrc);
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
        'relative overflow-hidden',
        fill ? 'absolute inset-0 w-full h-full' : '',
        containerClassName
      )}
    >
      {/* Background placeholder during load */}
      <div
        className={cn(
          'absolute inset-0 bg-[#161616] transition-opacity duration-700',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      />

      <Image
        ref={imageRef}
        src={optimizedSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={sizes || (fill ? '100vw' : undefined)}
        priority={priority}
        className={cn(
          'transition-all duration-700 ease-out',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]',
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
}
