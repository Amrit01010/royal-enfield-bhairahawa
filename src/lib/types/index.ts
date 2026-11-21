// src/lib/types/index.ts
export interface MotorcycleColor {
  /** Stable identifier used by the booking form and stored in notes. */
  id: string;
  name: string;
  /** Swatch colour shown in the colour selector. */
  hex: string;
  /** ImageKit path for the colour-specific motorcycle image. */
  image: string;
}

export interface Motorcycle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: '350cc' | '400cc+';
  subcategory: string;
  image?: string;
  price?: string;
  specs?: {
    engine: string;
    power: string;
    weight: string;
    topSpeed: string;
  };
  href: string;
  isNew?: boolean;
  colors?: MotorcycleColor[];
}

export type RideCategory =
  | 'Marquee'
  | 'Himalayan Adventure'
  | 'Discovery'
  | 'Community & Festival'
  | 'Training';

export type RideDifficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';

/** Supporting photograph shown in the expedition gallery. */
export interface RideImage {
  /** ImageKit path (or full URL) resolved through `getImageKitUrl`. */
  src: string;
  alt: string;
  credit?: string;
}

export interface Ride {
  id: string;
  name: string;
  tagline?: string;
  category: RideCategory;
  description: string;
  fullDescription?: string;
  /** ImageKit path for the primary card/hero photograph. */
  image: string;
  imageAlt?: string;
  imageCredit?: string;
  gallery?: RideImage[];
  duration: string;
  distance?: string;
  difficulty: RideDifficulty;
  elevation?: string;
  route?: string;
  season?: string;
  terrain?: string;
  highlights?: string[];
  inclusions?: string[];
  motorcycleSuitability?: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category?: string;
  cta: string;
  href: string;
  image?: string;
  actionImage?: string;
  /** Colourway id used for the transparent studio image. */
  studioColorId?: string;
  specs?: {
    displacement: string;
    power: string;
    torque: string;
    transmission: string;
  };
}

export type AccessoryCategory =
  | 'Protection'
  | 'Touring & Luggage'
  | 'Comfort'
  | 'Style & Body'
  | 'Electrical & Controls'
  | 'Safety Gear'
  | 'Touring'
  | 'Performance';

export interface Accessory {
  id: string;
  name: string;
  category: AccessoryCategory;
  price?: number;
  details: string;
  description: string;
  image: string;
  compatibleBikes: string[];
  partNumber?: string;
  material?: string;
  warranty?: string;
}

export interface CartItem {
  id: string;
  name: string;
  category: AccessoryCategory;
  price?: number;
  image: string;
  quantity: number;
  compatibleBikes?: string[];
  partNumber?: string;
}
