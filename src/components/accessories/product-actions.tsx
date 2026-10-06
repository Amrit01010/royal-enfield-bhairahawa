'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useCart } from '@/hooks/use-cart';
import type { Accessory } from '@/lib/types';
import { buildAccessoryWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

export function AccessoryProductActions({ accessory }: { accessory: Accessory }) {
  const { addItem, getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(accessory.id);
  const activeQuantity = quantity > 0 ? quantity : 1;
  const whatsappUrl = buildWhatsAppUrl(
    buildAccessoryWhatsAppMessage(accessory, activeQuantity)
  );

  if (quantity > 0) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <QuantityControls
          quantity={quantity}
          onDecrement={() => decrement(accessory.id)}
          onIncrement={() => increment(accessory.id)}
        />
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          asChild
        >
          <Link href="/cart">Go to cart</Link>
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-sm bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
        >
          <WhatsAppIcon className="w-4 h-4 text-black" />
          Order ({quantity}) on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        size="lg"
        className="bg-accent hover:bg-accent/90 text-white font-semibold h-12 px-7"
        onClick={() => addItem(accessory)}
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Add to cart
      </Button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
      >
        <WhatsAppIcon className="w-4 h-4 text-black" />
        Buy via WhatsApp
      </a>
    </div>
  );
}