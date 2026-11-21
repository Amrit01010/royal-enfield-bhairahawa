// src/lib/constants/rides.ts
import { Ride } from '@/lib/types';

/**
 * ImageKit folder holding the ride photography.
 * Paths are relative so `OptimizedImage` can append delivery transformations.
 */
const RIDE_IMAGE_BASE = '/royal-enfield/rides';

/**
 * Six curated Nepal rides, all departing from the Bhairahawa showroom.
 * Ordered from a gentle morning run to a full Himalayan expedition.
 */
export const rides: Ride[] = [
  {
    id: 'lumbini-dawn-run',
    name: 'Lumbini Dawn Run',
    tagline: 'First Light at the Birthplace of Buddha',
    category: 'Community & Festival',
    description:
      'A quiet sunrise loop from the showroom through the Terai to the Sacred Garden at Lumbini. The easiest way into the Bhairahawa riding family.',
    fullDescription:
      'Leave before dawn, ride empty Terai roads under a pink sky, and arrive as the monastic zone wakes up. After a slow lap past the Maya Devi Temple and the Ashoka Pillar, the group continues to Tilaurakot for a village-style breakfast before rolling back to the showroom by mid-morning. No pressure, no pace, just good company and good exhaust notes.',
    image: `${RIDE_IMAGE_BASE}/lumbini-dawn-run.jpg`,
    imageAlt:
      'The white World Peace Pagoda at Lumbini, Nepal, framed by trees and a stone walkway',
    imageCredit: 'Ashishranamgr1 / Wikimedia Commons · CC BY-SA 4.0',
    gallery: [
      {
        src: `${RIDE_IMAGE_BASE}/lumbini-dawn-run-2.jpg`,
        alt: 'The Maya Devi Temple and Ashoka Pillar in the Lumbini sacred garden',
        credit: 'Shadow Ayush / Wikimedia Commons · CC BY-SA 4.0',
      },
      {
        src: `${RIDE_IMAGE_BASE}/lumbini-dawn-run-3.jpg`,
        alt: 'The lotus pond and white stupa on the Lumbini monastic axis',
        credit: 'Mana890 / Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
    duration: '1 Day',
    distance: '60 km',
    difficulty: 'Easy',
    elevation: '350 ft (Terai Plains)',
    route: 'Bhairahawa Showroom → Lumbini Sacred Garden → Tilaurakot → Bhairahawa',
    season: 'Year-round (best October – March)',
    terrain: 'Smooth tarmac, shaded rural roads, flat Terai farmland',
    highlights: [
      'Sunrise at the Maya Devi Temple precinct',
      'Slow ride past the monastic zone and Ashoka Pillar',
      'Village breakfast at Tilaurakot',
      'Perfect first ride for new owners',
    ],
    inclusions: [
      'Free pre-ride motorcycle check by showroom technicians',
      'Road captain and sweep rider',
      'Breakfast',
      'Chapter ride patch',
    ],
    motorcycleSuitability: 'All Royal Enfield models',
    href: '/rides/lumbini-dawn-run',
  },
  {
    id: 'palpa-tansen-heritage',
    name: 'Palpa Tansen Heritage Ride',
    tagline: 'Switchbacks, Hill Towns and a Palace on the River',
    category: 'Discovery',
    description:
      'Carve the Siddhartha Highway hairpins up to the misty hill town of Tansen, then down to Rani Mahal on the Kali Gandaki.',
    fullDescription:
      'The showroom chapter’s signature weekend ride. Cross Butwal and climb steadily into the cool air of Palpa, where cobbled Newari streets, Dhaka-topi workshops and the old Tansen Durbar wait. Day two drops to Rani Mahal, the riverside palace often called the Taj Mahal of Nepal, before the easy run home.',
    image: `${RIDE_IMAGE_BASE}/palpa-tansen-heritage.jpg`,
    imageAlt: 'Sunset over the hill town of Tansen in Palpa, Nepal',
    imageCredit: 'Vyacheslav Argenberg / Wikimedia Commons · CC BY 4.0',
    gallery: [
      {
        src: `${RIDE_IMAGE_BASE}/palpa-tansen-heritage-2.jpg`,
        alt: 'A quiet bend on the Siddhartha Highway above a forested Nepali gorge',
        credit: 'Acharya Bipin / Wikimedia Commons · CC BY-SA 4.0',
      },
      {
        src: `${RIDE_IMAGE_BASE}/palpa-tansen-heritage-3.jpg`,
        alt: 'Rani Mahal palace above the Kali Gandaki river in Palpa',
        credit: 'DrooNa.Bhusal / Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
    duration: '2 Days',
    distance: '180 km',
    difficulty: 'Moderate',
    elevation: '4,400 ft (Tansen)',
    route: 'Bhairahawa → Butwal → Siddhartha Highway → Tansen → Rani Mahal → Bhairahawa',
    season: 'October – March',
    terrain: 'Mountain asphalt hairpins, hill-town cobbles, riverside roads',
    highlights: [
      'Siddhartha Highway switchbacks',
      'Tansen Durbar and old bazaar walk',
      'Rani Mahal on the Kali Gandaki',
      'Campfire dinner with the chapter',
    ],
    inclusions: [
      'Road captain, sweep rider and technician with puncture kit',
      'Hilltop hotel stay',
      'Dinner and breakfast',
      'Chapter ride patch',
    ],
    motorcycleSuitability: 'All Royal Enfield models',
    href: '/rides/palpa-tansen-heritage',
  },
  {
    id: 'pokhara-lakes-hills',
    name: 'Pokhara Lakes & Hills',
    tagline: 'Mid-Hill Highways to the Annapurna Skyline',
    category: 'Discovery',
    description:
      'Three days of sweeping Nepali hill roads ending at Phewa Lake, with Machhapuchhre and the Annapurna range as your backdrop.',
    fullDescription:
      'A relaxed touring run for riders who want mountain scenery without the hardship. The route climbs from the Terai into the Mahabharat hills, rolls through river valleys and tea-stall towns, and finishes in Pokhara. A free day covers Sarangkot sunrise, World Peace Pagoda and a lakeside ride before the return leg.',
    image: `${RIDE_IMAGE_BASE}/pokhara-lakes-hills.jpg`,
    imageAlt: 'Phewa Lake below Machhapuchhre and the Annapurna range in Pokhara',
    imageCredit: 'Jmhullot / Wikimedia Commons · CC BY 3.0',
    gallery: [
      {
        src: `${RIDE_IMAGE_BASE}/pokhara-lakes-hills-2.jpg`,
        alt: 'Aerial view of Phewa Lake with the Annapurna Himalaya behind',
        credit: 'Rajivkilanashrestha / Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
    duration: '3 Days',
    distance: '420 km',
    difficulty: 'Moderate',
    elevation: '5,200 ft (Sarangkot)',
    route: 'Bhairahawa → Tansen → Kaligandaki Corridor → Pokhara → Sarangkot → Bhairahawa',
    season: 'October – April',
    terrain: 'Smooth hill highways, river valleys, short steep climbs',
    highlights: [
      'Sunrise over the Annapurna range at Sarangkot',
      'Lakeside evening ride at Phewa Tal',
      'World Peace Pagoda viewpoint',
      'Long, flowing twisties with little traffic',
    ],
    inclusions: [
      'Road captain and sweep rider',
      'Chase vehicle with luggage and spares',
      'Two nights lakeside accommodation',
      'Breakfasts and one group dinner',
    ],
    motorcycleSuitability: 'All Royal Enfield models',
    href: '/rides/pokhara-lakes-hills',
  },
  {
    id: 'muktinath-pilgrim-pass',
    name: 'Muktinath Pilgrim Pass',
    tagline: 'Up the Kali Gandaki to a Holy Himalayan Shrine',
    category: 'Himalayan Adventure',
    description:
      'Ride into the deepest gorge on earth, past Marpha’s apple orchards, to the sacred temple of Muktinath at 3,800 m.',
    fullDescription:
      'The gateway Himalayan ride. From Pokhara the road follows the Kali Gandaki through Beni and Tatopani, then climbs into the dry, wind-scoured Thak Khola valley. Riders cross rough sections and river beds to Jomsom, taste fresh apple brandy in Marpha, and finally reach the pilgrimage site of Muktinath, where Hindu and Buddhist traditions meet.',
    image: `${RIDE_IMAGE_BASE}/muktinath-pilgrim-pass.jpg`,
    imageAlt: 'The rocky Kali Gandaki gorge on the road to Muktinath',
    imageCredit: 'Jean-Marie Hullot / Wikimedia Commons · CC BY 2.0',
    gallery: [
      {
        src: `${RIDE_IMAGE_BASE}/muktinath-pilgrim-pass-2.jpg`,
        alt: 'The main Muktinath temple courtyard and sacred water ponds',
        credit: 'Faj2323 / Wikimedia Commons · CC BY-SA 4.0',
      },
      {
        src: `${RIDE_IMAGE_BASE}/muktinath-pilgrim-pass-3.jpg`,
        alt: 'Kagbeni village beneath snow-capped Nilgiri in Mustang',
        credit: 'Bijay Chaurasia / Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
    duration: '6 Days',
    distance: '780 km',
    difficulty: 'Challenging',
    elevation: '12,460 ft (Muktinath)',
    route: 'Bhairahawa → Pokhara → Beni → Tatopani → Jomsom → Marpha → Muktinath',
    season: 'March – May & October – November',
    terrain: 'Rocky gorge tracks, river crossings, loose gravel, strong afternoon winds',
    highlights: [
      'Ride beneath Annapurna and Dhaulagiri',
      'Marpha apple orchards and Thakali hospitality',
      'Sunrise at Muktinath temple',
      'Technical sections coached by the road captain',
    ],
    inclusions: [
      'ACAP conservation permit',
      'Road captain, sweep rider and mechanic',
      'Backup vehicle with spare tyres and tubes',
      'Lodge stays with meals',
    ],
    motorcycleSuitability: 'Himalayan 450, Scram 440, Guerrilla 450',
    href: '/rides/muktinath-pilgrim-pass',
  },
  {
    id: 'upper-mustang-expedition',
    name: 'Upper Mustang Expedition',
    tagline: 'Into the Walled Kingdom of Lo Manthang',
    category: 'Himalayan Adventure',
    description:
      'The flagship Nepal expedition: a restricted-area ride across the Tibetan-style high desert to the ancient walled city of Lo Manthang.',
    fullDescription:
      'Beyond Kagbeni the world turns to red canyons, wind-carved cliffs, cave monasteries and whitewashed chortens. This limited-group expedition follows the Kali Gandaki north through Charang and Ghami to Lo Manthang, a medieval walled city that was closed to outsiders until 1992. Small groups, serious preparation and a full support crew make it the capstone of the Bhairahawa calendar.',
    image: `${RIDE_IMAGE_BASE}/upper-mustang-expedition.jpg`,
    imageAlt: 'Weathered chortens and the Kali Gandaki riverbed in Upper Mustang',
    imageCredit: 'Anton Gutmann / Wikimedia Commons · CC BY-SA 4.0',
    gallery: [
      {
        src: `${RIDE_IMAGE_BASE}/upper-mustang-expedition-2.jpg`,
        alt: 'Sungda Chorten with prayer flags near Lo Manthang',
        credit: 'Afzal Khan Visuals / Wikimedia Commons · CC BY-SA 4.0',
      },
      {
        src: `${RIDE_IMAGE_BASE}/upper-mustang-expedition-3.jpg`,
        alt: 'The walled city of Lo Manthang in the Upper Mustang valley',
        credit: 'Safalphotos / Wikimedia Commons · CC BY-SA 4.0',
      },
    ],
    duration: '9 Days',
    distance: '950 km',
    difficulty: 'Extreme',
    elevation: '12,600 ft (Lo Manthang)',
    route: 'Bhairahawa → Pokhara → Jomsom → Kagbeni → Ghami → Lo Manthang → Jomsom',
    season: 'April – May & September – October',
    terrain: 'Boulder-strewn riverbeds, high desert dust, steep gravel climbs, wind corridors',
    highlights: [
      'Walled city and royal palace of Lo Manthang',
      'Cave monasteries and sky-high chortens',
      'Red-cliff canyons of the Mustang plateau',
      'Capped at a small group for safety and permit rules',
    ],
    inclusions: [
      'Upper Mustang restricted-area permit and ACAP fees',
      'Licensed local guide as required by regulation',
      'Mechanic, chase vehicle and spares',
      'Teahouse and lodge stays with meals',
    ],
    motorcycleSuitability: 'Himalayan 450, Scram 440, Guerrilla 450',
    href: '/rides/upper-mustang-expedition',
  },
  {
    id: 'trail-school',
    name: 'Trail School',
    tagline: 'Learn the Dirt Before You Meet the Mountain',
    category: 'Training',
    description:
      'A weekend of off-road coaching: gravel, water crossings, hill climbs and bike recovery. Required prep for the Himalayan rides.',
    fullDescription:
      'Built as the stepping stone to Muktinath and Mustang, Trail School teaches riders to stand, balance and recover. Instructors work in small batches on a closed gravel circuit and nearby riverbed, covering low-speed clutch control, loose-surface braking, water crossings and picking up a fallen bike on a slope.',
    image: `${RIDE_IMAGE_BASE}/trail-school.jpg`,
    imageAlt: 'Two Royal Enfield Himalayan riders on a rocky high-altitude trail',
    imageCredit: 'lensnmatter / Wikimedia Commons · CC BY 2.0',
    duration: '2 Days',
    distance: '80 km circuit',
    difficulty: 'Moderate',
    elevation: '1,800 ft',
    route: 'Bhairahawa foothill gravel circuit and riverbed section',
    season: 'October – May (weekend batches)',
    terrain: 'Gravel, sand, log obstacles, hill climbs, shallow river crossings',
    highlights: [
      'Small batches with close coaching',
      'Standing posture and clutch control drills',
      'Water crossings and slope recovery',
      'Completion badge',
    ],
    inclusions: [
      'Closed training circuit access',
      'Certified instruction and feedback',
      'Pre- and post-session bike check',
      'Lunch and hydration',
    ],
    motorcycleSuitability: 'Himalayan 450, Scram 440, Guerrilla 450, Hunter 350',
    href: '/rides/trail-school',
  },
];
