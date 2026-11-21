// src/lib/imagekit.ts

export const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, '') || 'https://ik.imagekit.io/edzbgdhorz';

export const IMAGEKIT_PRIVATE_KEY =
  process.env.IMAGEKIT_PRIVATE_KEY || '';

export interface ImageKitTransformation {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  cropMode?: 'pad_resize' | 'crop' | 'maintain_ratio' | 'force';
  focus?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'auto';
  blur?: number;
  progressive?: boolean;
  dpr?: number;
}

export type ImageKitFile = {
  fileId: string;
  name: string;
  filePath: string;
  fileType: 'image' | 'video' | 'non-image';
  url: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
  size?: number;
  tags?: string[];
};

/**
 * Builds an ImageKit transformation string with strict, deterministic parameter ordering.
 * Parameter ordering is strictly standardized so prefetch URLs and render URLs match
 * 100% byte-for-byte in browser HTTP cache.
 * e.g. "w-800,q-80,f-auto,dpr-2,pr-true"
 */
export function buildTransformationString(options?: ImageKitTransformation): string {
  if (!options) return '';

  const tr: string[] = [];

  // Consistent deterministic ordering:
  // 1. Dimensions (w, h)
  if (options.width && options.width > 0) tr.push(`w-${Math.round(options.width)}`);
  if (options.height && options.height > 0) tr.push(`h-${Math.round(options.height)}`);

  // 2. DPR: Cap DPR at 2 (dpr-2 max) as 3x adds massive byte weight with negligible visual gain
  if (options.dpr) {
    const cappedDpr = Math.min(Math.max(options.dpr, 1), 2);
    tr.push(`dpr-${cappedDpr}`);
  }

  // 3. Quality: default to q-80 if quality passed
  if (options.quality) tr.push(`q-${options.quality}`);

  // 4. Format: auto converts to AVIF/WebP based on browser support
  if (options.format) {
    tr.push(`f-${options.format}`);
  } else {
    tr.push('f-auto');
  }

  // 5. Crop & Focus
  if (options.cropMode) tr.push(`cm-${options.cropMode}`);
  if (options.focus) tr.push(`fo-${options.focus}`);

  // 6. Blur effects (used for LQIP)
  if (options.blur) tr.push(`bl-${options.blur}`);

  // 7. Progressive loading
  if (options.progressive) tr.push('pr-true');

  return tr.join(',');
}

/**
 * Generates an optimized, deterministic ImageKit URL from a relative path or full URL.
 * Standardizes parameter ordering, encoding, and host handling.
 */
export function getImageKitUrl(
  src: string | undefined | null,
  transformation?: ImageKitTransformation
): string {
  if (!src) return '';

  // Local static SVGs or non-ImageKit public assets
  if (src.endsWith('.svg') || src.startsWith('/favicon') || src === '/logo.svg') {
    return src;
  }

  const trString = buildTransformationString(transformation);

  // If already a full URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    if (src.includes('ik.imagekit.io')) {
      const url = new URL(src);
      if (trString) {
        url.searchParams.set('tr', trString);
      }
      return url.toString();
    }
    return src;
  }

  // Relative path - normalize and encode path segments consistently
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  const encodedPath = cleanPath
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');

  const endpoint = IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/edzbgdhorz';
  const baseUrl = `${endpoint}${encodedPath}`;

  if (!trString) return baseUrl;
  return `${baseUrl}?tr=${trString}`;
}

/**
 * Alias for getImageKitUrl
 */
export const getIkUrl = getImageKitUrl;

/**
 * Generates a Low-Quality Image Placeholder (LQIP) URL.
 * Generates a tiny 20px blurred thumbnail (~500 bytes - 1KB) for instant initial render.
 */
export function getIkLqipUrl(src: string | undefined | null): string {
  if (!src) return '';
  return getImageKitUrl(src, {
    width: 20,
    blur: 6,
    quality: 20,
    format: 'auto',
  });
}

/**
 * Generates a responsive srcset string with consistent ImageKit transformations.
 */
export function getIkSrcSet(
  src: string | undefined | null,
  widths: number[] = [320, 480, 640, 768, 1024, 1280, 1600, 1920],
  baseTransformation?: Omit<ImageKitTransformation, 'width'>
): string {
  if (!src) return '';
  return widths
    .map((w) => `${getImageKitUrl(src, { ...baseTransformation, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Network awareness profile to adjust image quality dynamically based on client connection.
 */
export function getClientNetworkProfile(): {
  saveData: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  isSlowConnection: boolean;
} {
  if (typeof navigator === 'undefined') {
    return { saveData: false, effectiveType: 'unknown', isSlowConnection: false };
  }

  const conn = (navigator as unknown as {
    connection?: {
      saveData?: boolean;
      effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    };
  }).connection;

  const saveData = Boolean(conn?.saveData);
  const effectiveType = conn?.effectiveType || 'unknown';
  const isSlowConnection = saveData || effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';

  return { saveData, effectiveType, isSlowConnection };
}

/**
 * Server-side function to fetch images from ImageKit folder using IMAGEKIT_PRIVATE_KEY
 */
export async function getImageKitFiles(
  folder: string,
  options?: { limit?: number; sort?: string; revalidate?: number }
): Promise<ImageKitFile[]> {
  if (!IMAGEKIT_PRIVATE_KEY || IMAGEKIT_PRIVATE_KEY.includes('your_imagekit_private_key')) {
    return [];
  }

  const auth = Buffer.from(`${IMAGEKIT_PRIVATE_KEY}:`).toString('base64');
  const limit = options?.limit ?? 100;
  const sort = options?.sort ?? 'ASC_CREATED';
  const revalidate = options?.revalidate ?? 300;

  try {
    const res = await fetch(
      `https://api.imagekit.io/v1/files?path=${encodeURIComponent(
        folder
      )}&fileType=image&limit=${limit}&sort=${sort}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate },
      }
    );

    if (!res.ok) {
      console.error('ImageKit API file list error:', res.status, await res.text());
      return [];
    }

    const files: ImageKitFile[] = await res.json();
    return files;
  } catch (error) {
    console.error('Error fetching ImageKit files:', error);
    return [];
  }
}
