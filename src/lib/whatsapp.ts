// src/lib/whatsapp.ts
import { siteConfig } from '@/config/site';
import type { Accessory, CartItem } from '@/lib/types';
import { formatBikeName } from '@/lib/constants/accessories';

/**
 * Normalizes any phone string into digits for WhatsApp wa.me links.
 * Defaults to the showroom phone number defined in siteConfig.
 */
export function getWhatsAppNumber(customPhone?: string): string {
  const phoneToClean =
    customPhone ||
    siteConfig.location.whatsapp ||
    siteConfig.location.phone;
  return phoneToClean.replace(/\D/g, '');
}

/**
 * Builds a direct wa.me URL with a pre-populated message.
 */
export function buildWhatsAppUrl(message: string, customPhone?: string): string {
  const number = getWhatsAppNumber(customPhone);
  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Message template for cart items inquiry sent to the showroom owner.
 * Strictly no e-commerce prices shown; asks for quotation, stock and fitting.
 */
export function buildCartWhatsAppMessage(
  items: CartItem[],
  bikeOrSubtotal?: string | number,
  selectedBikeName?: string
): string {
  // Support both (items, bikeName) and legacy (items, subtotal, bikeName)
  const bike =
    typeof bikeOrSubtotal === 'string'
      ? bikeOrSubtotal
      : selectedBikeName;

  const itemsBreakdown = items
    .map((item, idx) => {
      const partInfo = item.partNumber ? ` (Part: ${item.partNumber})` : '';
      const fitment =
        item.compatibleBikes && item.compatibleBikes.length > 0 && !item.compatibleBikes.includes('all')
          ? `\n   Fitment: ${item.compatibleBikes.map(formatBikeName).join(', ')}`
          : '';
      return `${idx + 1}. ${item.name}${partInfo}\n   Category: ${item.category} | Qty: ${item.quantity}${fitment}`;
    })
    .join('\n\n');

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const lines = [
    `Namaste Royal Enfield Bhairahawa!`,
    ``,
    `I would like to inquire about the following genuine Royal Enfield accessories for my motorcycle:`,
    ``,
    `----------------------------------------`,
    itemsBreakdown,
    `----------------------------------------`,
    `Total Accessories: ${totalCount}`,
    bike && bike !== 'all' ? `Motorcycle Model: ${formatBikeName(bike)}` : null,
    ``,
    `Please confirm stock availability, showroom quotation, and fitting service at your Bhairahawa showroom (${siteConfig.location.address}).`,
    ``,
    `Thank you!`,
  ];

  return lines.filter(Boolean).join('\n');
}

/**
 * Message template for a single accessory inquiry.
 * Strictly no prices shown; prompts showroom owner for quotation & availability.
 */
export function buildAccessoryWhatsAppMessage(
  accessory: Accessory,
  quantity = 1,
  bikeModel?: string
): string {
  const fitment =
    accessory.compatibleBikes && accessory.compatibleBikes.length > 0 && !accessory.compatibleBikes.includes('all')
      ? accessory.compatibleBikes.map(formatBikeName).join(', ')
      : 'Universal Fit / All Models';

  return [
    `Namaste Royal Enfield Bhairahawa!`,
    ``,
    `I am inquiring about this genuine Royal Enfield accessory:`,
    `• Product: ${accessory.name}`,
    `• Category: ${accessory.category}`,
    accessory.partNumber ? `• Part No: ${accessory.partNumber}` : null,
    `• Fitment: ${fitment}`,
    quantity > 1 ? `• Quantity: ${quantity}` : `• Quantity: 1`,
    bikeModel && bikeModel !== 'all' ? `• My Motorcycle: ${formatBikeName(bikeModel)}` : null,
    ``,
    `Details: ${accessory.details}`,
    ``,
    `Could you please let me know current availability, showroom pricing, and installation at your Bhairahawa showroom (${siteConfig.location.address})?`,
    ``,
    `Thank you!`,
  ]
    .filter(Boolean)
    .join('\n');
}

export interface TestRideWhatsAppParams {
  branchName?: string;
  motorcycleName?: string;
  motorcycleColor?: string;
  firstName?: string;
  lastName?: string;
  riderName?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  termsAccepted?: boolean;
}

/**
 * Message template for booking a test ride.
 */
export function buildTestRideWhatsAppMessage(params: TestRideWhatsAppParams): string {
  const riderFullName =
    params.riderName ||
    [params.firstName, params.lastName].filter(Boolean).join(' ') ||
    'Rider';

  return [
    `Namaste Royal Enfield Bhairahawa!`,
    ``,
    `I would like to book an official Royal Enfield test ride:`,
    params.motorcycleName ? `• Motorcycle Model: ${params.motorcycleName}` : null,
    params.motorcycleColor ? `• Colour: ${params.motorcycleColor}` : null,
    params.preferredDate ? `• Preferred Date: ${params.preferredDate}` : null,
    params.preferredTime ? `• Preferred Time: ${params.preferredTime}` : null,
    `• Rider Name: ${riderFullName}`,
    params.phone ? `• Mobile Number: ${params.phone}` : null,
    params.email ? `• Email: ${params.email}` : null,
    `• Showroom: Royal Enfield Bhairahawa (${siteConfig.location.address})`,
    `• Terms & Conditions: Accepted (Valid Driving License & Safety Gear confirmed)`,
    params.notes ? `• Additional Notes: ${params.notes}` : null,
    ``,
    `Please confirm the motorcycle availability and test ride slot at your Bhairahawa showroom. Thank you!`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Message template for joining or booking an expedition / community ride.
 */
export function buildRideExpeditionWhatsAppMessage(ride: {
  name: string;
  duration?: string;
  difficulty?: string;
  route?: string;
  category?: string;
  elevation?: string;
}): string {
  return [
    `Namaste Royal Enfield Bhairahawa!`,
    ``,
    `I would like to inquire about joining this official Royal Enfield expedition / ride:`,
    `• Expedition: ${ride.name}`,
    ride.category ? `• Category: ${ride.category}` : null,
    ride.duration ? `• Duration: ${ride.duration}` : null,
    ride.difficulty ? `• Difficulty: ${ride.difficulty}` : null,
    ride.elevation ? `• Max Elevation: ${ride.elevation}` : null,
    ride.route ? `• Circuit: ${ride.route}` : null,
    ``,
    `Could you please share details regarding upcoming batches, participation requirements, vehicle preparation, and registration from the Bhairahawa showroom?`,
  ]
    .filter(Boolean)
    .join('\n');
}
