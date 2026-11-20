// src/components/accessories/product-actions.tsx
'use client';

import Link from 'next/link';
import { Check, ShoppingBag } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      {/* Primary Actions Row */}
      <div className="flex flex-wrap items-center gap-3">
        {quantity > 0 ? (
          <>
            <QuantityControls
              quantity={quantity}
              onDecrement={() => decrement(accessory.id)}
              onIncrement={() => increment(accessory.id)}
            />
            <Button
              className="bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-white font-heading text-xs uppercase tracking-wider font-bold h-11 px-5"
              asChild
            >
              <Link href="/cart">
                <Check className="w-4 h-4 mr-2" />
                View in Cart ({quantity})
              </Link>
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-heading text-xs uppercase tracking-wider font-bold h-12 px-7 rounded-sm shadow-md transition-all"
            onClick={() => addItem(accessory)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Inquiry Cart
          </Button>
        )}

        {/* WhatsApp Direct Enquiry */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-sm bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
        >
          <WhatsAppIcon className="w-4 h-4 text-black shrink-0" />
          Enquire on WhatsApp
        </a>
      </div>

      <p className="text-[11px] text-zinc-400">
        Add multiple accessories to your inquiry cart to request a combined availability & fitting quote.
      </p>
    </div>
  );
}
