import type { Accessory, AccessoryCategory } from '@/lib/types';

const ACCESSORY_IMAGE_BASE = '/royal-enfield/accessories';

export interface AccessoryBike {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
}

export const accessoryBikes: AccessoryBike[] = [
  {
    id: 'all',
    name: 'All Motorcycles',
    shortName: 'All Bikes',
    tagline: 'Universal accessories & riding gear',
  },
  {
    id: 'hunter-350',
    name: 'Hunter 350',
    shortName: 'Hunter 350',
    tagline: 'Urban roadster genuine gear',
  },
  {
    id: 'classic-350',
    name: 'Classic 350',
    shortName: 'Classic 350',
    tagline: 'Retro icon genuine accessories',
  },
  {
    id: 'meteor-350',
    name: 'Meteor 350',
    shortName: 'Meteor 350',
    tagline: 'Highway cruiser touring kit',
  },
  {
    id: 'goan-classic-350',
    name: 'Goan Classic 350',
    shortName: 'Goan Classic',
    tagline: 'Bobber custom styling',
  },
  {
    id: 'himalayan-450',
    name: 'Himalayan 450',
    shortName: 'Himalayan 450',
    tagline: 'High-altitude expedition gear',
  },
  {
    id: 'bullet-350',
    name: 'Bullet 350',
    shortName: 'Bullet 350',
    tagline: 'Legendary pure motorcycling gear',
  },
  {
    id: '650-twins',
    name: 'Continental GT & Interceptor 650',
    shortName: '650 Twins',
    tagline: 'Twin cylinder custom parts',
  },
];

export const accessoryCategories: AccessoryCategory[] = [
  'Protection',
  'Touring & Luggage',
  'Comfort',
  'Style & Body',
  'Electrical & Controls',
  'Safety Gear',
];

export const accessoryCategorySlugs: Record<string, AccessoryCategory> = {
  protection: 'Protection',
  'crash-guards': 'Protection',
  touring: 'Touring & Luggage',
  luggage: 'Touring & Luggage',
  'touring-luggage': 'Touring & Luggage',
  comfort: 'Comfort',
  'seat-covers': 'Comfort',
  seats: 'Comfort',
  style: 'Style & Body',
  'style-body': 'Style & Body',
  mirrors: 'Style & Body',
  electrical: 'Electrical & Controls',
  'electrical-controls': 'Electrical & Controls',
  lights: 'Electrical & Controls',
  'safety-gear': 'Safety Gear',
  helmets: 'Safety Gear',
  jackets: 'Safety Gear',
  gloves: 'Safety Gear',
};

export const accessories: Accessory[] = [
  // --- PROTECTION ---
  {
    id: 'classic-octagon-engine-guard',
    name: 'Black Octagon Engine Guard',
    category: 'Protection',
    partNumber: 'KXA00005',
    compatibleBikes: ['classic-350', 'goan-classic-350', 'meteor-350'],
    material: 'Steel',
    warranty: '3-Year Warranty',
    details: 'Angular octagon profile with a durable black powder-coated finish.',
    description:
      'Official Royal Enfield engine guard for the Classic 350, Goan Classic 350 and Meteor 350. The octagon design protects the lower engine cases and frame rails while adding a bold, geometric look.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-octagon-engine-guard.jpg`,
  },
  {
    id: 'classic-airfly-engine-guard',
    name: 'Silver Airfly Engine Guard',
    category: 'Protection',
    partNumber: 'KXA00002',
    compatibleBikes: ['classic-350', 'goan-classic-350', 'meteor-350'],
    material: 'Stainless Steel',
    warranty: '3-Year Warranty',
    details: 'Sweeping dual-pipe stainless steel design with a polished silver finish.',
    description:
      'Official Royal Enfield Airfly engine guard for the Classic 350, Goan Classic 350 and Meteor 350. The twin-loop profile guards the engine and lower frame while giving the bike a classic touring stance.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-airfly-engine-guard.jpg`,
  },
  {
    id: 'hunter-compact-engine-guard',
    name: 'Black Compact Engine Guards',
    category: 'Protection',
    partNumber: 'KXA00128',
    compatibleBikes: ['hunter-350'],
    material: 'Mild Steel',
    warranty: '3-Year Warranty',
    details: 'Compact mild-steel guards with a satin black powder coat.',
    description:
      'Official Royal Enfield compact engine guards built for the Hunter 350. The close-fitting design adds crankcase protection without widening the bike for city filtering.',
    image: `${ACCESSORY_IMAGE_BASE}/hunter-compact-engine-guard.jpg`,
  },
  {
    id: 'meteor-trapezoid-engine-guard',
    name: 'Black Trapezium Engine Guard',
    category: 'Protection',
    partNumber: 'KXA00007',
    compatibleBikes: ['classic-350', 'goan-classic-350', 'meteor-350'],
    material: 'Steel',
    warranty: '3-Year Warranty',
    details: 'Trapezium-shaped steel guard with a black powder-coated finish.',
    description:
      'Official Royal Enfield trapezium engine guard for the Classic 350, Goan Classic 350 and Meteor 350. Broad side coverage protects the engine cases and lower frame on highway runs.',
    image: `${ACCESSORY_IMAGE_BASE}/meteor-trapezoid-engine-guard.jpg`,
  },
  {
    id: 'himalayan-adventure-engine-guards',
    name: 'Black Adventure Engine Guards',
    category: 'Protection',
    partNumber: '1990262',
    compatibleBikes: ['himalayan-450'],
    material: 'Mild Steel',
    warranty: '3-Year Warranty',
    details: 'Full-wrap mild-steel guards finished in black.',
    description:
      'Official Royal Enfield adventure engine guards for the New Himalayan 450. Built to shield the engine and lower bodywork on rough trails and long expedition routes.',
    image: `${ACCESSORY_IMAGE_BASE}/himalayan-adventure-engine-guards.png`,
  },
  {
    id: 'sump-guard-brushed-silver',
    name: 'Silver Sumpguard',
    category: 'Protection',
    partNumber: 'KXA00651',
    compatibleBikes: ['classic-350', 'goan-classic-350', 'meteor-350'],
    material: 'Aluminium',
    details: 'Pressed aluminium bash plate with Royal Enfield branding.',
    description:
      'Official Royal Enfield sumpguard for the Classic 350, Goan Classic 350 and Meteor 350. Adds a protective aluminium layer over the engine and lower frame rails on rough roads.',
    image: `${ACCESSORY_IMAGE_BASE}/sump-guard-brushed-silver.jpg`,
  },
  {
    id: 'himalayan-radiator-guard',
    name: 'Silver Radiator Guard',
    category: 'Protection',
    partNumber: 'KXA00404',
    compatibleBikes: ['himalayan-450'],
    material: 'Aluminium',
    warranty: '3-Year Warranty',
    details: 'Laser-cut aluminium grille in a silver finish.',
    description:
      'Official Royal Enfield radiator guard for the New Himalayan 450. Shields the radiator fins from flying gravel and debris without restricting airflow.',
    image: `${ACCESSORY_IMAGE_BASE}/himalayan-radiator-guard.png`,
  },

  // --- COMFORT ---
  {
    id: 'classic-touring-rider-seat',
    name: 'Black Touring Rider Seat',
    category: 'Comfort',
    partNumber: 'KXA00069',
    compatibleBikes: ['classic-350'],
    details: 'Touring-profile rider seat in black.',
    description:
      'Official Royal Enfield touring rider seat for the Classic 350. The reshaped saddle is designed for greater support and reduced fatigue over long rides.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-touring-rider-seat.jpg`,
  },
  {
    id: 'classic-passenger-touring-seat',
    name: 'Black Touring Passenger Seat',
    category: 'Comfort',
    partNumber: 'KXA00071',
    compatibleBikes: ['classic-350'],
    details: 'Matching touring passenger seat in black.',
    description:
      'Official Royal Enfield touring passenger seat for the Classic 350. Pairs with the touring rider seat to give the pillion a wider, more supportive perch.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-passenger-touring-seat.jpg`,
  },
  {
    id: 'hunter-signature-bench-seat',
    name: 'Black Custom Seat',
    category: 'Comfort',
    partNumber: 'KXA00140',
    compatibleBikes: ['hunter-350'],
    warranty: '3-Year Warranty',
    details: 'Slim custom-profile seat with a 3D net comfort layer.',
    description:
      'Official Royal Enfield custom seat for the Hunter 350. The slimmer profile and 3D net construction sharpen the bike’s lines while improving rider comfort.',
    image: `${ACCESSORY_IMAGE_BASE}/hunter-signature-bench-seat.jpg`,
  },
  {
    id: 'meteor-touring-dual-seat',
    name: 'Black Touring Rider Seat',
    category: 'Comfort',
    partNumber: 'KXA00073',
    compatibleBikes: ['meteor-350'],
    material: 'NA',
    warranty: '3-Year Warranty',
    details: 'Touring rider seat developed for the Meteor 350.',
    description:
      'Official Royal Enfield touring rider seat for the Meteor 350. Shaped for long-distance comfort with a supportive, cruiser-friendly profile.',
    image: `${ACCESSORY_IMAGE_BASE}/meteor-touring-dual-seat.jpg`,
  },
  {
    id: 'goan-floating-solo-seat',
    name: 'Brown Custom Rider Seat',
    category: 'Comfort',
    partNumber: 'KXA00187',
    compatibleBikes: ['goan-classic-350'],
    material: 'Various',
    warranty: '3-Year Warranty',
    details: 'Brown custom rider seat for the Goan Classic 350.',
    description:
      'Official Royal Enfield custom rider seat for the Goan Classic 350. The brown finish and custom shape complement the bobber styling of the Goan Classic.',
    image: `${ACCESSORY_IMAGE_BASE}/goan-floating-solo-seat.png`,
  },
  {
    id: 'passenger-backrest-mount',
    name: 'Black Passenger Backrest Pad',
    category: 'Comfort',
    partNumber: 'KXA00088',
    compatibleBikes: ['meteor-350'],
    warranty: '3-Year Warranty',
    details: 'Contoured passenger backrest pad in black.',
    description:
      'Official Royal Enfield passenger backrest pad for the Meteor 350. Adds padded lower-back support for the pillion on longer rides.',
    image: `${ACCESSORY_IMAGE_BASE}/passenger-backrest-mount.jpg`,
  },
  {
    id: 'touring-screen-clear',
    name: 'Touring Screen',
    category: 'Comfort',
    partNumber: 'KXA00147',
    compatibleBikes: ['classic-350', 'bullet-350'],
    material: 'High Impact Acrylic',
    details: 'Clear high-impact acrylic touring screen.',
    description:
      'Official Royal Enfield touring screen for the Classic 350 and Bullet 350. Deflects wind away from the rider’s chest and shoulders for more relaxed highway cruising.',
    image: `${ACCESSORY_IMAGE_BASE}/touring-screen-clear.jpg`,
  },
  {
    id: 'hunter-tinted-flyscreen',
    name: 'Tinted Flyscreen',
    category: 'Comfort',
    partNumber: 'KXA00126',
    compatibleBikes: ['hunter-350'],
    material: 'High Impact Acrylic',
    warranty: '3-Year Warranty',
    details: 'Tinted high-impact acrylic flyscreen.',
    description:
      'Official Royal Enfield tinted flyscreen for the Hunter 350. Cleans up the front-end look while offering light wind deflection at speed.',
    image: `${ACCESSORY_IMAGE_BASE}/hunter-tinted-flyscreen.jpg`,
  },
  {
    id: 'classic-handlebar-grip',
    name: 'Brown Handlebar Grips',
    category: 'Comfort',
    partNumber: 'KXA00189',
    compatibleBikes: ['classic-350', 'goan-classic-350'],
    material: 'Various',
    warranty: '3-Year Warranty',
    details: 'Brown handlebar grips for a classic custom finish.',
    description:
      'Official Royal Enfield brown handlebar grips for the Classic 350 and Goan Classic 350. The warm brown finish complements retro and bobber builds.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-handlebar-grip.png`,
  },

  // --- STYLE & BODY ---
  {
    id: 'bar-end-mirrors',
    name: 'Black Tapered Bar End Mirrors',
    category: 'Style & Body',
    partNumber: 'KXA00281',
    compatibleBikes: ['classic-350', 'hunter-350', 'meteor-350', 'goan-classic-350'],
    material: 'Aluminium & Plastic',
    warranty: '3-Year Warranty',
    details: 'Tapered bar-end mirrors with Royal Enfield branding.',
    description:
      'Official Royal Enfield tapered bar-end mirrors for the Classic 350, Hunter 350, Meteor 350 and Goan Classic 350. The low-profile shape widens rear visibility and sharpens the bike’s silhouette.',
    image: `${ACCESSORY_IMAGE_BASE}/bar-end-mirrors.jpg`,
  },
  {
    id: 'touring-mirrors',
    name: 'Black Tappered Mirrors',
    category: 'Style & Body',
    partNumber: 'KXA00276',
    compatibleBikes: [
      'classic-350',
      'hunter-350',
      'meteor-350',
      'goan-classic-350',
      'himalayan-450',
    ],
    material: 'Aluminium',
    warranty: '3-Year Warranty',
    details: 'Teardrop-shaped mirrors with cast aluminium stems.',
    description:
      'Official Royal Enfield tapered mirrors for the Classic 350, Hunter 350, Meteor 350, Goan Classic 350 and New Himalayan 450. The sculpted teardrop shape offers a wide rear view with a clean, custom look.',
    image: `${ACCESSORY_IMAGE_BASE}/touring-mirrors.jpg`,
  },
  {
    id: 'goan-ape-hanger-bars',
    name: 'Black Touring Handlebar',
    category: 'Style & Body',
    partNumber: 'KXA00800',
    compatibleBikes: ['classic-350'],
    material: 'Steel',
    warranty: '3-Year Warranty',
    details: 'Complete touring handlebar kit with all fitting components.',
    description:
      'Official Royal Enfield touring handlebar kit for the Classic 350. Designed for a more relaxed riding position on long journeys and supplied with the components required for fitment.',
    image: `${ACCESSORY_IMAGE_BASE}/goan-ape-hanger-bars.jpg`,
  },
  {
    id: 'performance-exhaust',
    name: 'Black Aero Visor',
    category: 'Style & Body',
    partNumber: 'KXA00089',
    compatibleBikes: ['classic-350'],
    material: 'Stainless Steel',
    details: 'Powder-coated stainless steel headlight bezel with integrated visor peak.',
    description:
      'Official Royal Enfield aero visor for the Classic 350. Streamlines the headlight with a branded stainless steel bezel and an integrated peak.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-aero-visor.jpg`,
  },

  // --- TOURING & LUGGAGE ---
  {
    id: 'aluminum-panniers',
    name: 'Silver Adventure Panniers',
    category: 'Touring & Luggage',
    partNumber: '1990200',
    compatibleBikes: ['himalayan-450'],
    material: 'Aluminium',
    details: '26-litre aluminium panniers with ABS corner protection.',
    description:
      'Official Royal Enfield silver adventure panniers for the New Himalayan 450. Thick-walled aluminium construction and ABS corner guards are built for rugged touring.',
    image: `${ACCESSORY_IMAGE_BASE}/aluminum-panniers.jpg`,
  },
  {
    id: 'black-commuter-pannier',
    name: 'Black Commuter Pannier',
    category: 'Touring & Luggage',
    partNumber: 'KXA00076',
    compatibleBikes: ['classic-350', 'goan-classic-350', 'meteor-350', 'hunter-350'],
    material: 'ABS',
    warranty: '3-Year Warranty',
    details: '12.5-litre injection-moulded pannier.',
    description:
      'Official Royal Enfield commuter pannier for the Classic 350, Goan Classic 350, Meteor 350 and Hunter 350. The ammunition-crate styling and 12.5-litre capacity make it a practical daily companion.',
    image: `${ACCESSORY_IMAGE_BASE}/black-commuter-pannier.jpg`,
  },
  {
    id: 'tank-bag',
    name: 'Adventure Tank Rail Bags',
    category: 'Touring & Luggage',
    partNumber: 'KXA00413',
    compatibleBikes: ['himalayan-450'],
    material: 'Waterproof TPU',
    warranty: '3-Year Warranty',
    details: 'Pair of waterproof tank rail bags, 9 litres each.',
    description:
      'Official Royal Enfield adventure tank rail bags for the New Himalayan 450. Contoured to follow the tank rails, with waterproof construction and 9 litres of capacity per bag.',
    image: `${ACCESSORY_IMAGE_BASE}/tank-bag.jpg`,
  },
  {
    id: 'tail-bag',
    name: 'Black Tail Pack',
    category: 'Touring & Luggage',
    partNumber: 'KXA00442',
    compatibleBikes: ['himalayan-450'],
    material: 'Waterproof TPU',
    warranty: '3-Year Warranty',
    details: 'Waterproof 12.5-litre tail pack.',
    description:
      'Official Royal Enfield tail pack for the New Himalayan 450. Mounts to the pillion seat or top-box rack and offers a lightweight, waterproof 12.5-litre carry solution.',
    image: `${ACCESSORY_IMAGE_BASE}/tail-bag.png`,
  },

  // --- ELECTRICAL & CONTROLS ---
  {
    id: 'led-fog-lamps',
    name: 'Black Led Fog Lights',
    category: 'Electrical & Controls',
    partNumber: 'KXA00075',
    compatibleBikes: ['classic-350', 'meteor-350', 'goan-classic-350'],
    warranty: '3-Year Warranty',
    details: 'Auxiliary LED fog light kit in black.',
    description:
      'Official Royal Enfield LED fog lights for the Classic 350, Meteor 350 and Goan Classic 350. Adds a bright auxiliary beam for low-visibility rides.',
    image: `${ACCESSORY_IMAGE_BASE}/led-fog-lamps.jpg`,
  },
  {
    id: 'custom-led-indicators',
    name: 'Black LED Indicators',
    category: 'Electrical & Controls',
    partNumber: 'KXA00096',
    compatibleBikes: ['hunter-350', 'meteor-350'],
    warranty: '3-Year Warranty',
    details: 'Set of compact black LED turn indicators.',
    description:
      'Official Royal Enfield LED indicators for the Hunter 350 and Meteor 350. Brighter, cleaner-running indicators in a compact black housing.',
    image: `${ACCESSORY_IMAGE_BASE}/custom-led-indicators.jpg`,
  },

  // --- SAFETY GEAR & RIDING GEAR ---
  {
    id: 'classic-open-face-helmet',
    name: 'Aviator Open Face Helmet',
    category: 'Safety Gear',
    compatibleBikes: ['all'],
    details: 'Classic open-face Royal Enfield helmet.',
    description:
      'The Aviator is Royal Enfield’s retro open-face helmet, pairing a clean vintage profile with everyday riding comfort.',
    image: `${ACCESSORY_IMAGE_BASE}/classic-open-face-helmet.jpg`,
  },
  {
    id: 'adventure-full-face-helmet',
    name: 'Optimus DS Full Face Helmet',
    category: 'Safety Gear',
    compatibleBikes: ['all'],
    details: 'Full-face Royal Enfield helmet with a dual visor.',
    description:
      'The Optimus DS is Royal Enfield’s full-face touring helmet, featuring a full-face shell and a dual-visor setup for day-to-day and highway riding.',
    image: `${ACCESSORY_IMAGE_BASE}/adventure-full-face-helmet.jpg`,
  },
  {
    id: 'riding-jacket',
    name: 'Adventure XT Riding Jacket',
    category: 'Safety Gear',
    compatibleBikes: ['all'],
    details: 'All-weather Royal Enfield adventure riding jacket.',
    description:
      'The Adventure XT jacket is built for touring across varied conditions, with a protective riding shell and adventure-focused detailing.',
    image: `${ACCESSORY_IMAGE_BASE}/riding-jacket.jpg`,
  },
  {
    id: 'riding-gloves',
    name: 'Arizona Leather Gloves',
    category: 'Safety Gear',
    compatibleBikes: ['all'],
    details: 'Leather Royal Enfield riding gloves.',
    description:
      'The Arizona Leather gloves pair a classic leather finish with everyday riding comfort and grip.',
    image: `${ACCESSORY_IMAGE_BASE}/riding-gloves.jpg`,
  },
  {
    id: 'touring-boots',
    name: 'Urban Mid Top Boots',
    category: 'Safety Gear',
    compatibleBikes: ['all'],
    details: 'Mid-top Royal Enfield riding boots.',
    description:
      'The Urban Mid Top boots blend casual street style with riding-focused support for daily commutes and weekend rides.',
    image: `${ACCESSORY_IMAGE_BASE}/touring-boots.jpg`,
  },
];

export function getAccessory(id: string): Accessory | undefined {
  return accessories.find((item) => item.id === id);
}

export function getAccessoriesByBike(bikeId: string): Accessory[] {
  if (!bikeId || bikeId === 'all') return accessories;
  return accessories.filter(
    (item) => item.compatibleBikes.includes(bikeId) || item.compatibleBikes.includes('all')
  );
}

export function formatBikeName(bikeId: string): string {
  const bike = accessoryBikes.find((b) => b.id === bikeId);
  if (bike) return bike.name;
  return bikeId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const CART_STORAGE_KEY = 're-bhairahawa-cart';
export const CART_MAX_QUANTITY = 10;
