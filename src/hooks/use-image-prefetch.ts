// src/hooks/use-image-prefetch.ts
'use client';

import { useEffect, useCallback, useRef } from 'react';
import { prefetchEngine, sortByProximity } from '@/lib/image-prefetch';

interface UseImagePrefetchOptions {
  activeIndex?: number;
  priority?: number;
  enabled?: boolean;
  loop?: boolean;
}

export function useImagePrefetch(
  urls: (string | undefined | null)[],
  options: UseImagePrefetchOptions = {}
) {
  const { activeIndex, priority = 10, enabled = true, loop = true } = options;
  const previousUrlsRef = useRef<string[]>([]);

  // Compute prioritized list based on activeIndex proximity
  const getPrioritizedUrls = useCallback(() => {
    const valid = urls.filter((u): u is string => Boolean(u && u.trim().length > 0));
    if (activeIndex !== undefined && activeIndex >= 0 && valid.length > 1) {
      return sortByProximity(valid, activeIndex, loop);
    }
    return valid;
  }, [urls, activeIndex, loop]);

  useEffect(() => {
    if (!enabled) return;

    const prioritized = getPrioritizedUrls();
    if (prioritized.length === 0) return;

    // Enqueue during idle
    prefetchEngine.enqueue(prioritized, priority);
    previousUrlsRef.current = prioritized;
  }, [enabled, getPrioritizedUrls, priority]);

  // Fast-path for mouseenter / touchstart / focus
  const prefetchOnDemand = useCallback((url: string | undefined | null) => {
    if (!url) return;
    prefetchEngine.prefetchImmediate(url);
  }, []);

  return {
    prefetchOnDemand,
  };
}
