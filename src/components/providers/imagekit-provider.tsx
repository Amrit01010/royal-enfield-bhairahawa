// src/components/providers/imagekit-provider.tsx
'use client';

import React from 'react';
import { ImageKitProvider as IKProvider } from '@imagekit/next';
import { IMAGEKIT_URL_ENDPOINT } from '@/lib/imagekit';

export function ImageKitProvider({ children }: { children: React.ReactNode }) {
  // Use configured endpoint or safe fallback
  const urlEndpoint = IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/royal_enfield';

  return (
    <IKProvider urlEndpoint={urlEndpoint}>
      {children}
    </IKProvider>
  );
}
