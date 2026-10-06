// src/lib/imagekit.ts

export const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, '') || '';

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
 * Builds an ImageKit transformation string from options
 * e.g., "w-800,q-80,f-auto,pr-true"
 */
export function buildTransformationString(options?: ImageKitTransformation): string {
  if (!options) return '';

  const tr: string[] = [];

  if (options.width) tr.push(`w-${options.width}`);
  if (options.height) tr.push(`h-${options.height}`);
  if (options.quality) tr.push(`q-${options.quality}`);
  if (options.format) tr.push(`f-${options.format}`);
  if (options.cropMode) tr.push(`cm-${options.cropMode}`);
  if (options.focus) tr.push(`fo-${options.focus}`);
  if (options.blur) tr.push(`bl-${options.blur}`);
  if (options.progressive) tr.push('pr-true');

  return tr.join(',');
}

/**
 * Generates an optimized ImageKit URL from a relative path or full URL.
 * Automatically respects NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT.
 */
export function getImageKitUrl(
  src: string | undefined | null,
  transformation?: ImageKitTransformation
): string {
  if (!src) return '';

  const trString = buildTransformationString(transformation);

  // If already a full URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // If it's an ImageKit URL, append/update transformation parameter
    if (src.includes('ik.imagekit.io')) {
      if (!trString) return src;
      const url = new URL(src);
      url.searchParams.set('tr', trString);
      return url.toString();
    }
    return src;
  }

  // Relative path - normalize and encode special characters/spaces safely
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  const encodedPath = cleanPath
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');

  // If endpoint is configured and not default dummy
  if (IMAGEKIT_URL_ENDPOINT && !IMAGEKIT_URL_ENDPOINT.includes('your_imagekit_id')) {
    const baseUrl = `${IMAGEKIT_URL_ENDPOINT}${encodedPath}`;
    if (!trString) return baseUrl;
    return `${baseUrl}?tr=${encodeURIComponent(trString)}`;
  }

  // Fallback to local / public path
  return encodedPath;
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
