// src/lib/constants/motorcycle-colors.ts
import type { MotorcycleColor } from '@/lib/types';

const VARIANT_IMAGE_BASE = '/royal-enfield/variants';

/**
 * Official colourways available at Royal Enfield Bhairahawa.
 * Images are transparent studio shots hosted on ImageKit so they sit cleanly
 * on the dark showroom theme. Keep IDs stable — the booking flow persists them.
 */
export const motorcycleColors = {
  'hunter-350': [
    {
      id: 'mumbai-yellow',
      name: 'Mumbai Yellow',
      hex: '#C9A227',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/mumbai-yellow.webp`,
    },
    {
      id: 'moonshot-white',
      name: 'Moonshot White',
      hex: '#E6E2D6',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/moonshot-white.webp`,
    },
    {
      id: 'tarmac-black',
      name: 'Tarmac Black',
      hex: '#1B1B1B',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/tarmac-black.webp`,
    },
    {
      id: 'graphite-grey',
      name: 'Graphite Grey',
      hex: '#4B4F52',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/graphite-grey.webp`,
    },
    {
      id: 'tokyo-black',
      name: 'Tokyo Black',
      hex: '#141414',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/tokyo-black.webp`,
    },
    {
      id: 'london-red',
      name: 'London Red',
      hex: '#7E1A1F',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/london-red.webp`,
    },
    {
      id: 'rebel-blue',
      name: 'Rebel Blue',
      hex: '#2E5C8A',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/rebel-blue.webp`,
    },
    {
      id: 'dapper-grey',
      name: 'Dapper Grey',
      hex: '#6B6D70',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/dapper-grey.webp`,
    },
    {
      id: 'rio-white',
      name: 'Rio White',
      hex: '#E9E7E1',
      image: `${VARIANT_IMAGE_BASE}/hunter-350/rio-white.webp`,
    },
  ],
  'meteor-350': [
    {
      id: 'supernova-black',
      name: 'Supernova Black',
      hex: '#171717',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/supernova-black.webp`,
    },
    {
      id: 'aurora-retro-green',
      name: 'Aurora Retro Green',
      hex: '#1F5A54',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/aurora-retro-green.webp`,
    },
    {
      id: 'aurora-red',
      name: 'Aurora Red',
      hex: '#8C1F24',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/aurora-red.webp`,
    },
    {
      id: 'stellar-marine-blue',
      name: 'Stellar Marine Blue',
      hex: '#2F5D8C',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/stellar-marine-blue.webp`,
    },
    {
      id: 'stellar-matt-grey',
      name: 'Stellar Matt Grey',
      hex: '#5C5E61',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/stellar-matt-grey.webp`,
    },
    {
      id: 'fireball-orange',
      name: 'Fireball Orange',
      hex: '#C4621E',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/fireball-orange.webp`,
    },
    {
      id: 'fireball-grey',
      name: 'Fireball Grey',
      hex: '#8A8D90',
      image: `${VARIANT_IMAGE_BASE}/meteor-350/fireball-grey.webp`,
    },
  ],
  'classic-350': [
    {
      id: 'gorkha-edition',
      name: 'Gorkha Edition',
      hex: '#3F4A3C',
      image: `${VARIANT_IMAGE_BASE}/classic-350/gorkha-edition.webp`,
    },
    {
      id: 'emerald',
      name: 'Emerald',
      hex: '#1F5B45',
      image: `${VARIANT_IMAGE_BASE}/classic-350/emerald.webp`,
    },
    {
      id: 'stealth-black',
      name: 'Stealth Black',
      hex: '#171717',
      image: `${VARIANT_IMAGE_BASE}/classic-350/stealth-black.webp`,
    },
    {
      id: 'gun-grey',
      name: 'Gun Grey',
      hex: '#4B5054',
      image: `${VARIANT_IMAGE_BASE}/classic-350/gun-grey.webp`,
    },
    {
      id: 'commando-sand',
      name: 'Commando Sand',
      hex: '#C7B79E',
      image: `${VARIANT_IMAGE_BASE}/classic-350/commando-sand.webp`,
    },
    {
      id: 'medallion-bronze',
      name: 'Medallion Bronze',
      hex: '#7B5B3D',
      image: `${VARIANT_IMAGE_BASE}/classic-350/medallion-bronze.webp`,
    },
    {
      id: 'madras-red',
      name: 'Madras Red',
      hex: '#8B1E22',
      image: `${VARIANT_IMAGE_BASE}/classic-350/madras-red.webp`,
    },
  ],
  'goan-classic-350': [
    {
      id: 'shack-black',
      name: 'Shack Black',
      hex: '#141414',
      image: `${VARIANT_IMAGE_BASE}/goan-classic-350/shack-black.webp`,
    },
    {
      id: 'trip-teal',
      name: 'Trip Teal',
      hex: '#1F7774',
      image: `${VARIANT_IMAGE_BASE}/goan-classic-350/trip-teal.webp`,
    },
    {
      id: 'rave-red',
      name: 'Rave Red',
      hex: '#A31E26',
      image: `${VARIANT_IMAGE_BASE}/goan-classic-350/rave-red.webp`,
    },
    {
      id: 'purple-haze',
      name: 'Purple Haze',
      hex: '#6D4E92',
      image: `${VARIANT_IMAGE_BASE}/goan-classic-350/purple-haze.webp`,
    },
  ],
} satisfies Record<string, MotorcycleColor[]>;
