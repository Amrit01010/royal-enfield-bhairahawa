// src/lib/imagekit-loader.ts
import { getImageKitUrl, type ImageKitTransformation } from './imagekit';

export default function imageKitLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Pass through local SVGs or non-image assets directly
  if (src.endsWith('.svg') || src.startsWith('/favicon') || src === '/logo.svg') {
    return src;
  }

  // Parse existing transformation query if passed in src
  const existingTr: ImageKitTransformation = {};
  let cleanSrc = src;

  if (src.includes('?tr=')) {
    const [pathPart, queryPart] = src.split('?tr=');
    cleanSrc = pathPart;
    if (queryPart) {
      const parts = decodeURIComponent(queryPart).split(',');
      for (const part of parts) {
        if (part.startsWith('bl-')) existingTr.blur = parseInt(part.replace('bl-', ''), 10);
        if (part.startsWith('cm-')) existingTr.cropMode = part.replace('cm-', '') as ImageKitTransformation['cropMode'];
        if (part.startsWith('fo-')) existingTr.focus = part.replace('fo-', '') as ImageKitTransformation['focus'];
        if (part.startsWith('q-') && !quality) existingTr.quality = parseInt(part.replace('q-', ''), 10);
      }
    }
  }

  const transformation: ImageKitTransformation = {
    ...existingTr,
    width,
    quality: quality || existingTr.quality || 80,
    format: 'auto',
    progressive: true,
  };

  return getImageKitUrl(cleanSrc, transformation);
}
