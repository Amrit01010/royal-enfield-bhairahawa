// src/lib/image-prefetch.ts

/**
 * High-performance background image prefetch and decode engine.
 * Downloads and decodes images in GPU memory during browser idle cycles,
 * ensuring interactive transitions (tabs, sliders, colourway swatches) are instantaneous (0ms lag).
 */

type NetworkConnection = {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

interface QueueItem {
  id: string;
  url: string;
  priority: number; // Higher number = higher priority
  timestamp: number;
}

class ImagePrefetchEngine {
  private queue: QueueItem[] = [];
  private prefetchedUrls = new Set<string>();
  private inFlightUrls = new Set<string>();
  private activeConcurrency = 0;
  private readonly MAX_CONCURRENCY = 2; // Strict limit to never congest main-thread or user requests
  private isIdleScheduled = false;
  private isPaused = false;
  private pageLoaded = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Defer all background prefetching until initial view/LCP is rendered
      if (document.readyState === 'complete') {
        this.pageLoaded = true;
      } else {
        window.addEventListener(
          'load',
          () => {
            this.pageLoaded = true;
            this.scheduleTick();
          },
          { once: true }
        );
      }

      // Pause when tab is hidden / in background to save battery & data
      document.addEventListener('visibilitychange', () => {
        this.isPaused = document.hidden;
        if (!this.isPaused) {
          this.scheduleTick();
        }
      });
    }
  }

  /**
   * Evaluates client network constraints.
   */
  private getNetworkStatus(): {
    shouldSkipAll: boolean;
    limitToOne: boolean;
  } {
    if (typeof navigator === 'undefined') {
      return { shouldSkipAll: false, limitToOne: false };
    }

    const conn = (navigator as unknown as { connection?: NetworkConnection }).connection;
    if (!conn) {
      return { shouldSkipAll: false, limitToOne: false };
    }

    // Never prefetch if user has Save-Data enabled
    if (conn.saveData) {
      return { shouldSkipAll: true, limitToOne: false };
    }

    // Skip prefetching on slow-2g or 2g
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
      return { shouldSkipAll: true, limitToOne: false };
    }

    // On 3G, throttle prefetch to only the single next-most-likely item
    if (conn.effectiveType === '3g') {
      return { shouldSkipAll: false, limitToOne: true };
    }

    return { shouldSkipAll: false, limitToOne: false };
  }

  /**
   * Adds an array of URLs to the prefetch queue with priority scoring.
   * Higher priority items execute first.
   */
  public enqueue(urls: (string | undefined | null)[], basePriority: number = 10): void {
    if (typeof window === 'undefined') return;

    const validUrls = urls.filter((url): url is string => Boolean(url && url.trim().length > 0));
    if (validUrls.length === 0) return;

    const { shouldSkipAll, limitToOne } = this.getNetworkStatus();
    if (shouldSkipAll) return;

    const urlsToEnqueue = limitToOne ? validUrls.slice(0, 1) : validUrls;

    urlsToEnqueue.forEach((url, index) => {
      // Don't enqueue if already downloaded/decoded or currently in flight
      if (this.prefetchedUrls.has(url) || this.inFlightUrls.has(url)) {
        return;
      }

      // Check if already in queue: if yes, boost priority if new priority is higher
      const existing = this.queue.find((item) => item.url === url);
      const computedPriority = basePriority - index; // Earlier items get slightly higher priority

      if (existing) {
        if (computedPriority > existing.priority) {
          existing.priority = computedPriority;
        }
      } else {
        this.queue.push({
          id: `${url}-${Date.now()}-${Math.random()}`,
          url,
          priority: computedPriority,
          timestamp: Date.now(),
        });
      }
    });

    // Sort queue descending by priority
    this.sortQueue();
    this.scheduleTick();
  }

  /**
   * Fast-path: immediately prioritize and prefetch a single URL (e.g. on mouse hover, focus, touchstart).
   */
  public prefetchImmediate(url: string | undefined | null): void {
    if (!url || typeof window === 'undefined') return;
    if (this.prefetchedUrls.has(url) || this.inFlightUrls.has(url)) return;

    const { shouldSkipAll } = this.getNetworkStatus();
    if (shouldSkipAll) return;

    // Remove from existing queue if present
    this.queue = this.queue.filter((item) => item.url !== url);

    // Place at the very top of queue with maximum priority
    this.queue.unshift({
      id: `urgent-${url}`,
      url,
      priority: 9999,
      timestamp: Date.now(),
    });

    this.scheduleTick(true);
  }

  /**
   * Re-prioritizes existing queue items by moving preferred URLs to top.
   */
  public prioritize(urls: string[]): void {
    const urlSet = new Set(urls);
    this.queue.forEach((item) => {
      if (urlSet.has(item.url)) {
        item.priority += 50;
      }
    });
    this.sortQueue();
    this.scheduleTick();
  }

  /**
   * Purges specific URLs from pending queue.
   */
  public cancel(urls: string[]): void {
    const cancelSet = new Set(urls);
    this.queue = this.queue.filter((item) => !cancelSet.has(item.url));
  }

  public isPrefetched(url: string): boolean {
    return this.prefetchedUrls.has(url);
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => b.priority - a.priority || a.timestamp - b.timestamp);
  }

  /**
   * Schedules queue worker tick using requestIdleCallback to avoid janking main thread.
   */
  private scheduleTick(urgent: boolean = false): void {
    if (this.isIdleScheduled || this.isPaused || (!this.pageLoaded && !urgent)) {
      return;
    }

    if (this.queue.length === 0 || this.activeConcurrency >= this.MAX_CONCURRENCY) {
      return;
    }

    this.isIdleScheduled = true;

    const run = () => {
      this.isIdleScheduled = false;
      this.processQueue();
    };

    if (urgent) {
      // Urgent requests run on next animation frame / microtask
      requestAnimationFrame(run);
    } else if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 100);
    }
  }

  private processQueue(): void {
    if (this.isPaused || this.queue.length === 0) return;

    const { shouldSkipAll } = this.getNetworkStatus();
    if (shouldSkipAll) {
      this.queue = [];
      return;
    }

    while (this.activeConcurrency < this.MAX_CONCURRENCY && this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) break;

      if (this.prefetchedUrls.has(item.url) || this.inFlightUrls.has(item.url)) {
        continue;
      }

      this.executePrefetch(item.url);
    }
  }

  private executePrefetch(url: string): void {
    this.inFlightUrls.add(url);
    this.activeConcurrency++;

    const img = new Image();
    img.decoding = 'async';

    // Hint browser network scheduler that this is a low-priority background prefetch
    if ('fetchPriority' in img) {
      (img as unknown as { fetchPriority: string }).fetchPriority = 'low';
    }

    const cleanup = () => {
      this.inFlightUrls.delete(url);
      this.activeConcurrency--;
      this.scheduleTick();
    };

    const handleSuccess = () => {
      this.prefetchedUrls.add(url);
      cleanup();
    };

    const handleError = () => {
      // Don't retry failed images to avoid loops
      cleanup();
    };

    img.src = url;

    // Use decode() to decode bitmap directly into GPU memory
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(handleSuccess)
        .catch(() => {
          // If decode fails or completes via regular load
          if (img.complete && img.naturalWidth > 0) {
            handleSuccess();
          } else {
            handleError();
          }
        });
    } else {
      img.onload = handleSuccess;
      img.onerror = handleError;
    }
  }
}

// Global singleton prefetch engine across all components and page transitions
export const prefetchEngine = new ImagePrefetchEngine();

/**
 * Reorders an array of items by proximity to current active index (nearest neighbors first: +1, -1, +2, -2...)
 */
export function sortByProximity<T>(items: T[], activeIndex: number, loop: boolean = true): T[] {
  const len = items.length;
  if (len <= 1) return items;

  const result: T[] = [];
  const visited = new Set<number>();

  // Add nearest neighbors progressively
  for (let offset = 1; offset < len; offset++) {
    // Next item
    let nextIdx = activeIndex + offset;
    if (loop) nextIdx = nextIdx % len;
    if (nextIdx < len && !visited.has(nextIdx)) {
      visited.add(nextIdx);
      result.push(items[nextIdx]);
    }

    // Previous item
    let prevIdx = activeIndex - offset;
    if (loop) prevIdx = (prevIdx + len) % len;
    if (prevIdx >= 0 && !visited.has(prevIdx)) {
      visited.add(prevIdx);
      result.push(items[prevIdx]);
    }
  }

  return result;
}
