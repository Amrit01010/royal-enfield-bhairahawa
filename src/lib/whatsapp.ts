// src/lib/whatsapp.ts
import { siteConfig } from '@/config/site';
import type { Accessory, CartItem } from '@/lib/types';
import { formatNpr } from '@/lib/utils';

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
 * Message template for cart items purchase inquiry/order.
 */
export function buildCartWhatsAppMessage(items: CartItem[], subtotal: number): string {
  const itemsBreakdown = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.category})\n   Quantity: ${item.quantity} × ${formatNpr(item.price)} = ${formatNpr(item.price * item.quantity)}`
    )
    .join('\n\n');

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return [
    `Namaste Royal Enfield Bhairahawa! 🙏`,
    ``,
    `I would like to order the following accessories & riding gear:`,
    ``,
    itemsBreakdown,
    ``,
    `----------------------------------------`,
    `Total Items: ${totalCount}`,
    `Order Total: ${formatNpr(subtotal)}`,
    `----------------------------------------`,
    ``,
    `Please confirm item availability and let me know payment and pickup/delivery options at your showroom (${siteConfig.location.address}).`,
  ].join('\n');
}

/**
 * Message template for a single accessory purchase or inquiry.
 */
export function buildAccessoryWhatsAppMessage(
  accessory: Accessory,
  quantity = 1
): string {
  const total = accessory.price * quantity;
  return [
    `Namaste Royal Enfield Bhairahawa! 🙏`,
    ``,
    `I am interested in purchasing this accessory:`,
    `• Product: ${accessory.name}`,
    `• Category: ${accessory.category}`,
    `• Price: ${formatNpr(accessory.price)}`,
    quantity > 1 ? `• Quantity: ${quantity}` : null,
    quantity > 1 ? `• Total: ${formatNpr(total)}` : null,
    ``,
    `Details: ${accessory.details}`,
    ``,
    `Is this currently available in stock at the Bhairahawa showroom? How can I complete the purchase?`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Message template for booking a test ride.
 */
export function buildTestRideWhatsAppMessage(params: {
  motorcycleName?: string;
  preferredDate?: string;
  preferredTime?: string;
  riderName?: string;
  phone?: string;
  notes?: string;
}): string {
  return [
    `Namaste Royal Enfield Bhairahawa! 🙏`,
    ``,
    `I would like to book a Royal Enfield test ride:`,
    params.motorcycleName ? `• Motorcycle: ${params.motorcycleName}` : null,
    params.preferredDate ? `• Preferred Date: ${params.preferredDate}` : null,
    params.preferredTime ? `• Preferred Time: ${params.preferredTime}` : null,
    params.riderName ? `• Rider Name: ${params.riderName}` : null,
    params.phone ? `• Contact Phone: ${params.phone}` : null,
    params.notes ? `• Notes: ${params.notes}` : null,
    ``,
    `Please confirm my test ride appointment at your showroom located at ${siteConfig.location.address}.`,
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
}): string {
  return [
    `Namaste Royal Enfield Bhairahawa! 🙏`,
    ``,
    `I would like to inquire about joining this ride expedition:`,
    `• Expedition: ${ride.name}`,
    ride.duration ? `• Duration: ${ride.duration}` : null,
    ride.difficulty ? `• Difficulty: ${ride.difficulty}` : null,
    ``,
    `Could you please share details regarding upcoming schedule, participation requirements, and registration?`,
  ]
    .filter(Boolean)
    .join('\n');
}
