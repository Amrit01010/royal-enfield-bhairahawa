import { Motorcycle, HeroSlide, NavItem } from '@/lib/types';
import { motorcycleColors } from './motorcycle-colors';

export const heroSlides: HeroSlide[] = [
  // {
  //   id: 'himalayan-450',
  //   title: 'HIMALAYAN 450',
  //   subtitle: 'Adventure begins where roads end.',
  //   description:
  //     'Engineered for the high Himalayas. Powered by the all-new Sherpa 450 liquid-cooled engine with 40 PS power, ride-by-wire, and switchable ABS.',
  //   category: 'Adventure Tourer · 400cc+',
  //   cta: 'Book Test Ride',
  //   href: '/models/himalayan-450',
  //   image: '/royal-enfield/bikes/himalayan-450.jpg',
  //   actionImage: '/royal-enfield/banners/mountain.jpg',
  //   specs: {
  //     displacement: '452 cc',
  //     power: '40.02 PS',
  //     torque: '40.0 Nm',
  //     transmission: '6-Speed · Slipper',
  //   },
  // },
  {
    id: 'hunter-350',
    title: 'HUNTER 350',
    subtitle: 'Agile and sharp for the urban jungle.',
    description:
      'Compact geometry, lightweight wheels, and intuitive ergonomics engineered to carve through busy city traffic and winding weekend roads.',
    category: 'Urban Roadster · 350cc',
    cta: 'Book Test Ride',
    href: '/models/hunter-350',
    image: '/royal-enfield/bikes/hunter-350.jpg',
    actionImage: '/royal-enfield/actions/hunter.jpg',
    studioColorId: 'dapper-grey',
    specs: {
      displacement: '349 cc',
      power: '20.2 BHP',
      torque: '27.0 Nm',
      transmission: '5-Speed Constant',
    },
  },
  {
    id: 'meteor-350',
    title: 'METEOR 350',
    subtitle: 'Supreme comfort for the endless highway.',
    description:
      'Built for effortless long journeys across Nepal. Relaxed forward footpegs, plush contoured seat, low center of gravity, and Tripper navigation.',
    category: 'Highway Cruiser · 350cc',
    cta: 'Book Test Ride',
    href: '/models/meteor-350',
    image: '/royal-enfield/bikes/meteor-350.jpg',
    actionImage: '/royal-enfield/actions/meteor.jpg',
    studioColorId: 'supernova-black',
    specs: {
      displacement: '349 cc',
      power: '20.2 BHP',
      torque: '27.0 Nm',
      transmission: '5-Speed Cruiser',
    },
  },
  {
    id: 'goan-classic-350',
    title: 'GOAN CLASSIC 350',
    subtitle: 'Custom bobber styling for pure individuality.',
    description:
      'A laid-back bobber statement featuring mini ape-hanger bars, custom-styled single floating saddle, and classic spoke wheel detailing.',
    category: 'Bobber Cruiser · 350cc',
    cta: 'Book Test Ride',
    href: '/models/goan-classic-350',
    image: '/royal-enfield/bikes/goan-classic-350.jpg',
    actionImage: '/royal-enfield/actions/goan.jpg',
    studioColorId: 'supernova-black',
    specs: {
      displacement: '349 cc',
      power: '20.2 BHP',
      torque: '27.0 Nm',
      transmission: '5-Speed Bobber',
    },
  },
  {
    id: 'classic-350',
    title: 'CLASSIC 350',
    subtitle: 'Timeless retro icon with handcrafted soul.',
    description:
      'The quintessential Royal Enfield. Authentic teardrop fuel tank, classic casquette headlamp, and the distinct counterbalanced J-platform thump.',
    category: 'Retro Classic · 350cc',
    cta: 'Book Test Ride',
    href: '/models/classic-350',
    image: '/royal-enfield/bikes/classic-350.jpg',
    actionImage: '/royal-enfield/actions/classic-black.jpg',
    studioColorId: 'stealth-black',
    specs: {
      displacement: '349 cc',
      power: '20.2 BHP',
      torque: '27.0 Nm',
      transmission: '5-Speed · Dual ABS',
    },
  },
  // {
  //   id: 'guerrilla-450',
  //   title: 'GUERRILLA 450',
  //   subtitle: 'Raw attitude meets Sherpa performance.',
  //   description:
  //     'An authentic premium roadster with aggressive stance, fat tires, responsive chassis geometry, and explosive mid-range punch.',
  //   category: 'Premium Roadster · 400cc+',
  //   cta: 'Book Test Ride',
  //   href: '/models/guerrilla-450',
  //   image: '/royal-enfield/bikes/guerrilla-450.jpg',
  //   actionImage: '/royal-enfield/actions/guerrilla.jpg',
  //   specs: {
  //     displacement: '452 cc',
  //     power: '40.02 PS',
  //     torque: '40.0 Nm',
  //     transmission: '6-Speed Roadster',
  //   },
  // },
  // {
  //   id: 'scram-440',
  //   title: 'SCRAM 440',
  //   subtitle: 'Crossover scrambler for road and dirt.',
  //   description:
  //     'Versatile scrambler soul with a 19-inch front wheel, high ground clearance, and punchy single-cylinder torque for rugged trails and highways.',
  //   category: 'All-Terrain Scrambler · 400cc+',
  //   cta: 'Book Test Ride',
  //   href: '/models/scram-440',
  //   image: '/royal-enfield/bikes/scram-440.jpg',
  //   actionImage: '/royal-enfield/actions/scram.jpg',
  //   specs: {
  //     displacement: '443 cc',
  //     power: '25.0 PS',
  //     torque: '32.0 Nm',
  //     transmission: '5-Speed Dual ABS',
  //   },
  // },
];

export const motorcycles: Motorcycle[] = [
  {
    id: 'hunter-350',
    name: 'Hunter 350',
    tagline: 'Urban Roadster',
    description:
      'A stylish, lightweight urban roadster designed for agile city riding. The Hunter 350 is the most affordable Royal Enfield motorcycle in Nepal.',
    category: '350cc',
    subcategory: 'Urban Roadster',
    href: '/models/hunter-350',
    image: '/royal-enfield/bikes/hunter-350.jpg',
    colors: motorcycleColors['hunter-350'],
    specs: {
      engine: '349cc J-Series Single Cylinder',
      power: '20.2 BHP @ 6100 rpm',
      weight: '181 kg',
      topSpeed: '114 km/h',
    },
  },
  {
    id: 'meteor-350',
    name: 'Meteor 350',
    tagline: 'Highway Cruiser',
    description:
      'Built for long-distance comfort with relaxed ergonomics, forward-set footpegs, and smooth highway performance.',
    category: '350cc',
    subcategory: 'Highway Cruiser',
    href: '/models/meteor-350',
    image: '/royal-enfield/bikes/meteor-350.jpg',
    colors: motorcycleColors['meteor-350'],
    specs: {
      engine: '349cc Air-Oil Cooled SOHC',
      power: '20.2 BHP @ 6100 rpm',
      weight: '191 kg',
      topSpeed: '120 km/h',
    },
  },
  {
    id: 'goan-classic-350',
    name: 'Goan Classic 350',
    tagline: 'Bobber Cruiser',
    description:
      'A custom-inspired bobber version of the Classic 350, built for relaxed cruising and unique road presence.',
    category: '350cc',
    subcategory: 'Bobber Cruiser',
    href: '/models/goan-classic-350',
    image: '/royal-enfield/bikes/goan-classic-350.jpg',
    colors: motorcycleColors['goan-classic-350'],
    specs: {
      engine: '349cc J-Series Single Cylinder',
      power: '20.2 BHP @ 6100 rpm',
      weight: '197 kg',
      topSpeed: '115 km/h',
    },
  },
  {
    id: 'classic-350',
    name: 'Classic 350',
    tagline: 'Retro Motorcycle',
    description:
      'The legendary Classic 350 combines timeless handcrafted styling with modern engineering and dual-channel ABS.',
    category: '350cc',
    subcategory: 'Retro Motorcycle',
    href: '/models/classic-350',
    image: '/royal-enfield/bikes/classic-350.jpg',
    colors: motorcycleColors['classic-350'],
    specs: {
      engine: '349cc Air-Oil Cooled Single',
      power: '20.2 BHP @ 6100 rpm',
      weight: '195 kg',
      topSpeed: '115 km/h',
    },
  },
  // {
  //   id: 'scram-440',
  //   name: 'Scram 440',
  //   tagline: 'Scrambler',
  //   description:
  //     'A versatile scrambler capable of tackling city roads, highways, and light off-road adventures.',
  //   category: '400cc+',
  //   subcategory: 'Scrambler',
  //   href: '/models/scram-440',
  //   image: '/royal-enfield/bikes/scram-440.jpg',
  //   specs: {
  //     engine: '443cc Air-Oil Cooled Single',
  //     power: '25 PS @ 6250 rpm',
  //     weight: '187 kg',
  //     topSpeed: '130 km/h',
  //   },
  // },
  // {
  //   id: 'himalayan-450',
  //   name: 'New Himalayan 450',
  //   tagline: 'Adventure Tourer',
  //   description:
  //     'Powered by the Sherpa 450 engine, built to conquer mountains, rough terrain, and long-distance expeditions.',
  //   category: '400cc+',
  //   subcategory: 'Adventure Tourer',
  //   href: '/models/himalayan-450',
  //   image: '/royal-enfield/bikes/himalayan-450.jpg',
  //   isNew: true,
  //   specs: {
  //     engine: '452cc Sherpa Liquid-Cooled DOHC',
  //     power: '40.02 PS @ 8000 rpm',
  //     weight: '196 kg',
  //     topSpeed: '151 km/h',
  //   },
  // },
  // {
  //   id: 'guerrilla-450',
  //   name: 'Guerrilla 450',
  //   tagline: 'Premium Roadster',
  //   description:
  //     'A modern premium roadster delivering strong performance, agile handling, and dynamic styling.',
  //   category: '400cc+',
  //   subcategory: 'Premium Roadster',
  //   href: '/models/guerrilla-450',
  //   image: '/royal-enfield/bikes/guerrilla-450.jpg',
  //   specs: {
  //     engine: '452cc Sherpa Liquid-Cooled 4V',
  //     power: '40.02 PS @ 8000 rpm',
  //     weight: '185 kg',
  //     topSpeed: '150 km/h',
  //   },
  // },
];

export function getMotorcycle(id: string) {
  return motorcycles.find((motorcycle) => motorcycle.id === id);
}

export function getMotorcycleColor(motorcycleId: string, colorId: string) {
  return getMotorcycle(motorcycleId)?.colors?.find((color) => color.id === colorId);
}

/**
 * Resolves the transparent studio colourway used for showcase imagery.
 * Hero slides pin a signature colour; other surfaces fall back to the first
 * official colourway for the model.
 */
export function getMotorcycleStudioColor(motorcycleId: string) {
  const motorcycle = getMotorcycle(motorcycleId);
  if (!motorcycle?.colors?.length) return undefined;

  const studioColorId = heroSlides.find((slide) => slide.id === motorcycleId)?.studioColorId;
  return (
    motorcycle.colors.find((color) => color.id === studioColorId) ?? motorcycle.colors[0]
  );
}

export { rides } from './rides';

export const navItems: NavItem[] = [
  { label: 'Motorcycles', href: '/models' },
  {
    label: 'Rides',
    href: '/rides',
    children: [
      { label: 'All Expeditions', href: '/rides' },
      { label: 'Himalayan Odyssey', href: '/rides/himalayan-odyssey' },
      { label: 'Moto Himalaya', href: '/rides/moto-himalaya' },
      { label: 'Tour of Bhutan', href: '/rides/tour-of-bhutan' },
      { label: 'Mustang Adventure', href: '/rides/himalayan-adventure-mustang' },
      { label: 'Tour of North East', href: '/rides/tour-of-north-east' },
      { label: 'One Ride & Community', href: '/rides/one-ride' },
      { label: 'Motoverse (Goa)', href: '/rides/motoverse' },
    ],
  },
  { label: 'Accessories', href: '/accessories' },
];
