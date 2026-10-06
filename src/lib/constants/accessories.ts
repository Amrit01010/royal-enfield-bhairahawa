import type { Accessory, AccessoryCategory } from '@/lib/types';

export const accessoryCategories: AccessoryCategory[] = [
  'Safety Gear',
  'Touring',
  'Performance',
  'Protection',
  'Comfort',
];

export const accessoryCategorySlugs: Record<string, AccessoryCategory> = {
  helmets: 'Safety Gear',
  jackets: 'Safety Gear',
  luggage: 'Touring',
  exhaust: 'Performance',
  'crash-guards': 'Protection',
  'seat-covers': 'Comfort',
};

export const accessories: Accessory[] = [
  {
    id: 'classic-open-face-helmet',
    name: 'Classic Open Face Helmet',
    category: 'Safety Gear',
    price: 12500,
    details: 'ISI-certified open face helmet with a vintage Royal Enfield silhouette.',
    description:
      'A hand-finished open face helmet with a leather-lined interior, quick-release visor, and dual-density EPS liner. Built for city rides and weekend touring.',
    image: '/Royal Enfield/accessories/classic-open-face-helmet.jpg',
  },
  {
    id: 'adventure-full-face-helmet',
    name: 'Adventure Full Face Helmet',
    category: 'Safety Gear',
    price: 18900,
    details: 'Full-face adventure lid with wide visor and peak for Himalayan roads.',
    description:
      'Ventilated full-face shell with an anti-fog visor, removable peak, and moisture-wicking liner. Designed for long days on mixed terrain.',
    image: '/Royal Enfield/accessories/adventure-full-face-helmet.jpg',
  },
  {
    id: 'riding-jacket',
    name: 'Touring Riding Jacket',
    category: 'Safety Gear',
    price: 15900,
    details: 'Armoured riding jacket with waterproof membrane and thermal liner.',
    description:
      'CE-rated shoulder and elbow armour, a waterproof breathable membrane, and a packable thermal liner. Cut for an upright Royal Enfield riding posture.',
    image: '/Royal Enfield/accessories/touring-jacket.jpg',
  },
  {
    id: 'riding-gloves',
    name: 'Leather Riding Gloves',
    category: 'Safety Gear',
    price: 3500,
    details: 'Short-cuff leather gloves with knuckle protection and touchscreen tips.',
    description:
      'Full-grain leather with padded knuckles, a secure wrist strap, and touchscreen-compatible index fingers. Broken in for all-day comfort.',
    image: '/Royal Enfield/accessories/leather-riding-gloves.jpg',
  },
  {
    id: 'touring-boots',
    name: 'Touring Riding Boots',
    category: 'Safety Gear',
    price: 11200,
    details: 'Waterproof touring boots with ankle support and gear-shift pad.',
    description:
      'Oil-resistant sole, reinforced toe and heel, and a waterproof membrane. Ready for monsoon roads and long highway stretches.',
    image: '/Royal Enfield/accessories/touring-riding-shoes.jpg',
  },
  {
    id: 'aluminum-panniers',
    name: 'Aluminum Pannier Set',
    category: 'Touring',
    price: 24500,
    details: 'Lockable 36L aluminum panniers with model-specific mounting kit.',
    description:
      'Weather-sealed expedition cases with a keyed lock, inner dry bags, and a powder-coated finish. Fits Himalayan and touring platforms.',
    image: '/Royal Enfield/accessories/aluminum-pannier-set.jpg',
  },
  {
    id: 'tank-bag',
    name: 'Magnetic Tank Bag',
    category: 'Touring',
    price: 6800,
    details: 'Expandable magnetic tank bag with a waterproof phone window.',
    description:
      'Strong magnets, a clear map/phone pocket, and expansion to 18L. The base stays on the tank so you can lift the bag off at fuel stops.',
    image: '/Royal Enfield/accessories/manetic-tang-bag.jpg',
  },
  {
    id: 'tail-bag',
    name: 'Waterproof Tail Bag',
    category: 'Touring',
    price: 5200,
    details: 'Roll-top tail bag with quick-release straps for pillion or solo setups.',
    description:
      'IPX5-rated fabric, roll-top closure, and reflective piping. Straps around the pillion seat or luggage rack without scratching paint.',
    image: '/Royal Enfield/accessories/waterproof-tail-bag.jpg',
  },
  {
    id: 'performance-exhaust',
    name: 'Performance Exhaust',
    category: 'Performance',
    price: 32000,
    details: 'Stainless slip-on exhaust for a deeper note and cleaner lines.',
    description:
      'TIG-welded stainless steel with a removable baffle and heat shield. Tuned for the J-platform 350s and 450 Sherpa engines.',
    image: '/Royal Enfield/accessories/performance-exhaust.jpg',
  },
  {
    id: 'led-fog-lamps',
    name: 'LED Auxiliary Fog Lamps',
    category: 'Performance',
    price: 7200,
    details: 'Pair of CNC-mounted LED fog lamps with a dedicated switch.',
    description:
      'Spot/flood combo beam, aluminum housings, and a handlebar switch. Wired for the Himalayan and Guerrilla auxiliary circuit.',
    image: '/Royal Enfield/accessories/led-auxiliary-fog-lamps.jpg',
  },
  {
    id: 'engine-guard',
    name: 'Engine Guard',
    category: 'Protection',
    price: 8900,
    details: 'Powder-coated steel engine guard with sliders.',
    description:
      'Protects the cases and radiator on a tip-over. Includes nylon sliders and model-specific brackets that use existing mounting points.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },
  {
    id: 'crash-guard-set',
    name: 'Crash Guard Set',
    category: 'Protection',
    price: 12500,
    details: 'Front and rear crash guards with highway peg mounts.',
    description:
      'A matched pair of crash bars that wrap the engine and mid-frame. Highway peg bosses are included for long-distance comfort.',
    image: '/Royal Enfield/accessories/crash-guard-set.jpg',
  },
  {
    id: 'touring-seat-cover',
    name: 'Touring Seat Cover',
    category: 'Comfort',
    price: 4500,
    details: 'Gel-padded seat cover with a grippy, weather-resistant finish.',
    description:
      'Adds a gel layer over the OEM seat without a full re-upholstery. Non-slip texture keeps you planted on monsoon roads.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'handlebar-grips',
    name: 'Classic Handlebar Grips',
    category: 'Comfort',
    price: 1800,
    details: 'Diamond-pattern rubber grips with bar-end finishers.',
    description:
      'Soft-compound rubber with an OEM-style diamond pattern. Includes polished bar-end caps and throttle-side bushing.',
    image: '/Royal Enfield/accessories/classic-handlebar-grip.jpg',
  },
];

export function getAccessory(id: string) {
  return accessories.find((item) => item.id === id);
}

export const CART_STORAGE_KEY = 're-bhairahawa-cart';
export const CART_MAX_QUANTITY = 10;