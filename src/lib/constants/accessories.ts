import type { Accessory, AccessoryCategory } from '@/lib/types';

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
    name: 'Octagon Engine Guard (Black)',
    category: 'Protection',
    partNumber: 'KXA00004',
    compatibleBikes: ['classic-350', 'bullet-350'],
    material: '32mm Heavy-Gauge Cold Rolled Steel',
    warranty: '2-Year Showroom Warranty',
    details: 'Angular octagon design providing maximum crankcase and lower frame protection.',
    description:
      'Engineered specifically for the Classic 350 and Bullet 350 chassis. Finished with durable corrosion-resistant black powder coating with laser-etched Royal Enfield branding.',
    image: '/Royal Enfield/accessories/crash-guard-set.jpg',
  },
  {
    id: 'classic-airfly-engine-guard',
    name: 'Airfly Engine Guard (Chrome)',
    category: 'Protection',
    partNumber: 'KXA00001',
    compatibleBikes: ['classic-350', 'bullet-350'],
    material: 'High-Lustre Quad-Plated Chrome Steel',
    warranty: '2-Year Showroom Warranty',
    details: 'Distinctive sweeping dual-pipe design with integrated horizontal footrest bars.',
    description:
      'An authentic Royal Enfield statement piece. The Airfly guard combines timeless retro presence with serious low-speed spill impact resistance and relaxed highway riding foot positions.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },
  {
    id: 'hunter-compact-engine-guard',
    name: 'Hunter Compact Engine Guard (Black)',
    category: 'Protection',
    partNumber: 'KXA00128',
    compatibleBikes: ['hunter-350'],
    material: 'Fabricated Steel with Satin Black Powder Coat',
    warranty: '2-Year Showroom Warranty',
    details: 'Discreet, minimalist crash protection tailored for tight urban filtering.',
    description:
      'Specially sculpted to hug the Hunter 350 frame geometry without adding bulk or sacrificing lean angles around tight city corners in Bhairahawa.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },
  {
    id: 'meteor-trapezoid-engine-guard',
    name: 'Meteor Trapezoid Engine Guard',
    category: 'Protection',
    partNumber: 'KXA00062',
    compatibleBikes: ['meteor-350'],
    material: 'Dual-Layer Coated 32mm High-Tensile Steel',
    warranty: '2-Year Showroom Warranty',
    details: 'Trapezoidal cruiser guard engineered for open-highway confidence.',
    description:
      'Form-matched to the cruiser stance of the Meteor 350. Offers broad side coverage to protect cylinder heads, foot controls, and forward footpegs on long highway runs.',
    image: '/Royal Enfield/accessories/crash-guard-set.jpg',
  },
  {
    id: 'himalayan-adventure-engine-guards',
    name: 'Himalayan 450 Adventure Engine Guard',
    category: 'Protection',
    partNumber: 'KXA00401',
    compatibleBikes: ['himalayan-450'],
    material: 'Hardened Steel Tube with Satin Epoxy Finish',
    warranty: '2-Year Showroom Warranty',
    details: 'Full-perimeter radiator and crankcase protection for treacherous terrain.',
    description:
      'Purpose-built for off-road expeditions in Mustang and Himalayan trails. Shields the Sherpa 450 liquid cooling jacket and engine casings from boulder strikes and heavy drops.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },
  {
    id: 'sump-guard-brushed-silver',
    name: 'Heavy-Duty Sump Guard (Aluminium)',
    category: 'Protection',
    partNumber: 'KXA00018',
    compatibleBikes: ['classic-350', 'hunter-350', 'meteor-350', 'bullet-350'],
    material: '4mm Pressed High-Grade Marine Aluminium',
    warranty: '2-Year Showroom Warranty',
    details: 'Undercarriage bash plate protecting oil filter and lower engine cases.',
    description:
      'Essential armor for Nepal road conditions, speed bumps, and flying stones. Mounts directly to factory rubber-damped chassis brackets without drilling.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },
  {
    id: 'himalayan-radiator-guard',
    name: 'Stainless Steel Radiator Guard',
    category: 'Protection',
    partNumber: 'KXA00412',
    compatibleBikes: ['himalayan-450'],
    material: 'Laser-Cut 304 Stainless Steel',
    warranty: '2-Year Showroom Warranty',
    details: 'Hexagonal honeycomb grille allowing full airflow while shielding delicate cooling fins.',
    description:
      'Protects against flying gravel, mud packing, and road debris on highway tours and off-road mountain passes across the Terai and hills.',
    image: '/Royal Enfield/accessories/engine-guard.jpg',
  },

  // --- COMFORT & ERGONOMICS ---
  {
    id: 'classic-touring-rider-seat',
    name: 'Touring Rider Seat (Black)',
    category: 'Comfort',
    partNumber: 'KXA00084',
    compatibleBikes: ['classic-350', 'bullet-350'],
    material: 'Dual-Density Ergonomic Foam with Weatherproof Skin',
    warranty: '1-Year Showroom Warranty',
    details: 'Sculpted touring saddle with lumbar support for multi-hour rides.',
    description:
      'Engineered with premium memory-layered foam and 3D mesh insert technology. Drastically reduces rider fatigue on long stretches between Bhairahawa, Butwal, and Kathmandu.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'classic-passenger-touring-seat',
    name: 'Passenger Touring Seat (Black)',
    category: 'Comfort',
    partNumber: 'KXA00085',
    compatibleBikes: ['classic-350', 'bullet-350'],
    material: 'Contoured Gel-Infused Foam with Ribbed Vinyl',
    warranty: '1-Year Showroom Warranty',
    details: 'Wider, plusher pillion perch designed for two-up travel.',
    description:
      'Matches the Rider Touring Seat profile. Features additional lateral width and vibration-damping dampeners for supreme pillion passenger comfort.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'hunter-signature-bench-seat',
    name: 'Hunter Custom Signature Bench Seat',
    category: 'Comfort',
    partNumber: 'KXA00140',
    compatibleBikes: ['hunter-350'],
    material: 'Tuck-and-Roll Pleated Weatherproof Upholstery',
    warranty: '1-Year Showroom Warranty',
    details: 'Flat-track scrambler styling with upgraded cushioning.',
    description:
      'Gives the Hunter 350 a sportier, retro-custom profile while providing supportive firmness and effortless rider repositioning in traffic.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'meteor-touring-dual-seat',
    name: 'Meteor Deluxe Touring Dual Seat',
    category: 'Comfort',
    partNumber: 'KXA00071',
    compatibleBikes: ['meteor-350'],
    material: 'Sculpted Dual-Layer Foam with French Seam Stitching',
    warranty: '1-Year Showroom Warranty',
    details: 'Plush one-piece highway cruiser seat with integrated rider back-step.',
    description:
      'The ultimate comfort upgrade for Meteor 350 highway cruisers. Features extended thigh support, lumbar cradle, and passenger comfort padding.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'goan-floating-solo-seat',
    name: 'Bobber Solo Floating Saddle',
    category: 'Comfort',
    partNumber: 'KXA00210',
    compatibleBikes: ['goan-classic-350'],
    material: 'Full-Grain Weather-Sealed Leather & Billet Mount',
    warranty: '1-Year Showroom Warranty',
    details: 'Cantilevered bobber single seat with custom under-seat cowl.',
    description:
      'Accentuates the floating rear fender of the Goan Classic 350. Delivers unmistakable custom character with spring-damped road isolation.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'passenger-backrest-mount',
    name: 'Passenger Backrest & Cushion Pad',
    category: 'Comfort',
    partNumber: 'KXA00095',
    compatibleBikes: ['meteor-350', 'classic-350'],
    material: 'Cast Aluminium Uprights with Contoured Foam Pad',
    warranty: '2-Year Showroom Warranty',
    details: 'Secure ergonomic back support for pillion confidence.',
    description:
      'Direct bolt-on backrest engineered to relieve passenger lower back strain and provide confidence during brisk acceleration on highways.',
    image: '/Royal Enfield/accessories/touring-seat-cover.jpg',
  },
  {
    id: 'touring-screen-clear',
    name: 'Deluxe Clear Touring Windscreen',
    category: 'Comfort',
    partNumber: 'KXA00098',
    compatibleBikes: ['classic-350', 'meteor-350'],
    material: 'Optical-Grade High-Impact Polycarbonate (Hard-Coated)',
    warranty: '2-Year Showroom Warranty',
    details: 'Tall wind deflector that redirects buffeting over rider helmet.',
    description:
      'Reduces wind blast on chest and shoulders, cuts fatigue on highway journeys, and deflects highway insects and road grime.',
    image: '/Royal Enfield/accessories/classic-open-face-helmet.jpg',
  },
  {
    id: 'hunter-tinted-flyscreen',
    name: 'Hunter Tinted Urban Flyscreen',
    category: 'Comfort',
    partNumber: 'KXA00135',
    compatibleBikes: ['hunter-350'],
    material: 'Injection-Moulded Dark Smoke Acrylic',
    warranty: '2-Year Showroom Warranty',
    details: 'Aggressive smoked flyscreen highlighting front headlight cowl.',
    description:
      'Cleans up the handlebar instrument cluster aesthetics while providing wind deflection at highway cruising speeds.',
    image: '/Royal Enfield/accessories/adventure-full-face-helmet.jpg',
  },
  {
    id: 'classic-handlebar-grip',
    name: 'Diamond Pattern Handlebar Grips',
    category: 'Comfort',
    partNumber: 'KXA00050',
    compatibleBikes: [
      'classic-350',
      'meteor-350',
      'hunter-350',
      'goan-classic-350',
      'bullet-350',
      '650-twins',
    ],
    material: 'Soft-Compound Vulcanized UV-Resistant Rubber',
    warranty: '1-Year Showroom Warranty',
    details: 'Vintage diamond pattern for improved grip tactile feedback and vibration reduction.',
    description:
      'Reduces hand numbness from road buzz. Features machined alloy end finishers compatible with bar-end mirrors or standard bar weights.',
    image: '/Royal Enfield/accessories/classic-handlebar-grip.jpg',
  },

  // --- STYLE & BODY ---
  {
    id: 'bar-end-mirrors',
    name: 'Machined Black Bar-End Mirrors (Pair)',
    category: 'Style & Body',
    partNumber: 'KXA00115',
    compatibleBikes: ['hunter-350', 'classic-350', 'goan-classic-350', '650-twins'],
    material: 'Billet CNC-Machined Anodized Aluminium',
    warranty: '2-Year Showroom Warranty',
    details: 'Low-profile cafe racer mirrors with anti-glare convex glass.',
    description:
      'Transform the silhouette of your motorcycle. Fully adjustable ball-joint design tested for zero vibration blur across all engine rev ranges.',
    image: '/Royal Enfield/accessories/classic-handlebar-grip.jpg',
  },
  {
    id: 'touring-mirrors',
    name: 'Touring Convex Mirrors (Pair)',
    category: 'Style & Body',
    partNumber: 'KXA00118',
    compatibleBikes: ['meteor-350', 'classic-350', 'himalayan-450', 'bullet-350'],
    material: 'Cast Billet Stem with Wide-Vision Optical Mirror',
    warranty: '2-Year Showroom Warranty',
    details: 'Extended rearview perspective eliminating blind spots.',
    description:
      'Engineered for long-distance tourers and daily commuters. Premium chrome or black finishes that resist weather pitting and road wash.',
    image: '/Royal Enfield/accessories/classic-handlebar-grip.jpg',
  },
  {
    id: 'goan-ape-hanger-bars',
    name: 'Goan Ape-Hanger Handlebar Kit',
    category: 'Style & Body',
    partNumber: 'KXA00215',
    compatibleBikes: ['goan-classic-350'],
    material: 'Polished Seamless Stainless Steel (1-Inch Diameter)',
    warranty: '2-Year Showroom Warranty',
    details: 'Mini ape-hanger bars complete with extended factory cables.',
    description:
      'The definitive bobber customization for Goan Classic 350. Authentic upright swagger with relaxed arm reach and factory electrical harness fit.',
    image: '/Royal Enfield/accessories/classic-handlebar-grip.jpg',
  },
  {
    id: 'performance-exhaust',
    name: 'Stainless Steel Performance Slip-On Exhaust',
    category: 'Style & Body',
    partNumber: 'KXA00160',
    compatibleBikes: ['classic-350', 'meteor-350', 'hunter-350', 'bullet-350'],
    material: 'TIG-Welded 304 Grade Brushed Stainless Steel',
    warranty: '2-Year Showroom Warranty',
    details: 'Deep acoustic exhaust note with lightweight construction.',
    description:
      'Features a removable acoustic baffle, laser-etched insignia, and integrated stainless heat shield. Cleanly accentuates the signature J-series engine cadence.',
    image: '/Royal Enfield/accessories/performance-exhaust.jpg',
  },

  // --- TOURING & LUGGAGE ---
  {
    id: 'aluminum-panniers',
    name: 'Aluminum Expedition Pannier Set (36L)',
    category: 'Touring & Luggage',
    partNumber: 'KXA00445',
    compatibleBikes: ['himalayan-450'],
    material: '2mm Thick Aircraft-Grade Aluminum with Corner Bumpers',
    warranty: '2-Year Showroom Warranty',
    details: 'Heavy-duty quick-release lockable side cases with waterproof sealing.',
    description:
      'Keyed-alike security locks, internal luggage retention belts, and stainless steel tie-down loops on lids. Built to survive gruelling Trans-Himalayan journeys.',
    image: '/Royal Enfield/accessories/aluminum-pannier-set.jpg',
  },
  {
    id: 'black-commuter-pannier',
    name: 'Commuter Pannier with Mounting Rail',
    category: 'Touring & Luggage',
    partNumber: 'KXA00155',
    compatibleBikes: ['hunter-350', 'classic-350', 'meteor-350'],
    material: 'High-Density Ballistic Canvas with Waterproof Inner Liner',
    warranty: '2-Year Showroom Warranty',
    details: 'Quick-detach 12.5L side bag with carry handle and shoulder strap.',
    description:
      'The ideal balance between urban commuting and weekend getaways. Includes dedicated steel subframe mounting bracket for your specific motorcycle.',
    image: '/Royal Enfield/accessories/manetic-tang-bag.jpg',
  },
  {
    id: 'tank-bag',
    name: 'Magnetic Touring Tank Bag (18L)',
    category: 'Touring & Luggage',
    partNumber: 'KXA00180',
    compatibleBikes: ['all'],
    material: '1000D Cordura with High-Power Neodymium Magnets',
    warranty: '1-Year Showroom Warranty',
    details: 'Expandable tank bag featuring clear touch-friendly phone window.',
    description:
      'Secure non-scratch magnetic base, waterproof rain cover included, and integrated headphone/charging cable passthrough. Quick release for fuel stops.',
    image: '/Royal Enfield/accessories/manetic-tang-bag.jpg',
  },
  {
    id: 'tail-bag',
    name: 'Waterproof Roll-Top Tail Bag (30L)',
    category: 'Touring & Luggage',
    partNumber: 'KXA00185',
    compatibleBikes: ['all'],
    material: 'IPX5 Sealed Heavy Duty PVC Tarpaulin',
    warranty: '1-Year Showroom Warranty',
    details: '100% waterproof rear rack and pillion seat expedition luggage.',
    description:
      'Rugged roll-top closure with heavy-duty ITW Nexus cam buckles and 4-point mounting straps. Keeps all gear dry through heavy Terai monsoon rainstorms.',
    image: '/Royal Enfield/accessories/waterproof-tail-bag.jpg',
  },

  // --- ELECTRICAL & CONTROLS ---
  {
    id: 'led-fog-lamps',
    name: 'LED Auxiliary Fog Lamp Kit',
    category: 'Electrical & Controls',
    partNumber: 'KXA00430',
    compatibleBikes: ['himalayan-450', 'classic-350', 'meteor-350'],
    material: 'Die-Cast Aluminium Housing with Cree LED Emitters',
    warranty: '2-Year Showroom Warranty',
    details: 'High-penetration beam kit with handlebar toggle switch and relay.',
    description:
      'Cuts through dense Terai winter fog and unlit highway darkness. Plug-and-play wiring harness connects into factory auxiliary terminal blocks.',
    image: '/Royal Enfield/accessories/led-auxiliary-fog-lamps.jpg',
  },
  {
    id: 'custom-led-indicators',
    name: 'Custom Bullet LED Indicators (Set of 4)',
    category: 'Electrical & Controls',
    partNumber: 'KXA00092',
    compatibleBikes: [
      'hunter-350',
      'classic-350',
      'meteor-350',
      'goan-classic-350',
      '650-twins',
    ],
    material: 'Aluminium Billet Housing with High-Intensity Amber LEDs',
    warranty: '2-Year Showroom Warranty',
    details: 'Sleek compact turn signals with brighter visibility and reduced draw.',
    description:
      'Significantly sharper aesthetic than OEM bulb units. Includes correct-flash rate ballast resistors and factory-matched waterproof pin connectors.',
    image: '/Royal Enfield/accessories/led-auxiliary-fog-lamps.jpg',
  },

  // --- SAFETY GEAR & RIDING GEAR ---
  {
    id: 'classic-open-face-helmet',
    name: 'Classic Open Face Vintage Helmet',
    category: 'Safety Gear',
    partNumber: 'RRGHLM001',
    compatibleBikes: ['all'],
    material: 'Reinforced Fiberglass Shell with Leather-Trimmed EPS Liner',
    warranty: '3-Year Manufacturer Warranty',
    details: 'ISI and DOT certified vintage helmet with quick-release sun visor.',
    description:
      'Hand-stitched leather edge trim, antimicrobial washable cheek pads, and micrometric quick-release chinstrap. Perfect retro style for everyday city cruising.',
    image: '/Royal Enfield/accessories/classic-open-face-helmet.jpg',
  },
  {
    id: 'adventure-full-face-helmet',
    name: 'Adventure Tourer Full-Face Helmet',
    category: 'Safety Gear',
    partNumber: 'RRGHLM004',
    compatibleBikes: ['all'],
    material: 'Multi-Density Polycarbonate with Aerodynamic Peak',
    warranty: '3-Year Manufacturer Warranty',
    details: 'ECE 22.06 & ISI dual-certified adventure helmet with Pinlock lens.',
    description:
      'Engineered with dual visor system (clear main shield + internal drop-down smoked sun shield), multi-port ventilation channels, and emergency quick-release pads.',
    image: '/Royal Enfield/accessories/adventure-full-face-helmet.jpg',
  },
  {
    id: 'riding-jacket',
    name: 'CE-Armoured Touring Riding Jacket',
    category: 'Safety Gear',
    partNumber: 'RRGJKT002',
    compatibleBikes: ['all'],
    material: '600D Abrasion-Resistant Cordura with Knox Level 2 Armour',
    warranty: '2-Year Manufacturer Warranty',
    details: 'All-weather adventure jacket with removable thermal and waterproof liners.',
    description:
      'Features CE Level 2 shoulder and elbow impact protectors, ventilated chest and back zip exhaust ports, and reflective Royal Enfield safety accents.',
    image: '/Royal Enfield/accessories/touring-jacket.jpg',
  },
  {
    id: 'riding-gloves',
    name: 'Full-Grain Leather Riding Gloves',
    category: 'Safety Gear',
    partNumber: 'RRGGLV001',
    compatibleBikes: ['all'],
    material: '100% Goat Leather with TPU Knuckle Protectors',
    warranty: '1-Year Manufacturer Warranty',
    details: 'Pre-curved fingers with touchscreen capability and palm slider.',
    description:
      'Combines supple break-in comfort with robust knuckle impact defense. Reinforced palm padding absorbs handlebar vibrations on long highway stretches.',
    image: '/Royal Enfield/accessories/leather-riding-gloves.jpg',
  },
  {
    id: 'touring-boots',
    name: 'Waterproof Touring Riding Boots',
    category: 'Safety Gear',
    partNumber: 'RRGBOT001',
    compatibleBikes: ['all'],
    material: 'Full-Grain Microfiber Leather with Breathable Waterproof Membrane',
    warranty: '1-Year Manufacturer Warranty',
    details: 'Ankle bone TPU protectors, reinforced gear-shift pad, and non-slip sole.',
    description:
      'Designed for both walking comfort and riding protection. High-grip vulcanized rubber sole ensures positive footing on gravel, mud, and oily pavement.',
    image: '/Royal Enfield/accessories/touring-riding-shoes.jpg',
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
