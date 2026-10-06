'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useCart } from '@/hooks/use-cart';
import type { Accessory } from '@/lib/types';
import { formatNpr } from '@/lib/utils';
import { buildAccessoryWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { OptimizedImage } from '@/components/shared/optimized-image';

export function ProductCard({ accessory }: { accessory: Accessory }) {
  const { addItem, getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(accessory.id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(accessory);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card className="group relative bg-card border border-border hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between">
      <div>
        <Link href={`/accessories/${accessory.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#181818] border-b border-border/60">
            <OptimizedImage
              src={accessory.image}
              alt={accessory.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              transformation={{
                width: 600,
                quality: 80,
                format: 'auto',
              }}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fallbackText="GEAR"
            />
            <Badge className="absolute top-3 left-3 bg-black/80 text-accent border border-accent/30 text-[10px] font-heading uppercase tracking-wider font-bold rounded-sm z-10">
              {accessory.category}
            </Badge>
          </div>
        </Link>

        <CardContent className="p-5">
          <Link href={`/accessories/${accessory.id}`}>
            <h3 className="font-heading text-lg font-bold uppercase text-white mb-1 group-hover:text-accent transition-colors tracking-wide">
              {accessory.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 mb-3 line-clamp-2 leading-relaxed">
            {accessory.details}
          </p>
          <p className="font-heading text-lg font-bold text-accent">
            {formatNpr(accessory.price)}
          </p>
        </CardContent>
      </div>

      <div className="p-5 pt-0 mt-auto">
        {quantity > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <QuantityControls
              quantity={quantity}
              onDecrement={() => decrement(accessory.id)}
              onIncrement={() => increment(accessory.id)}
            />
            <div className="flex items-center gap-1.5">
              <a
                href={buildWhatsAppUrl(buildAccessoryWhatsAppMessage(accessory, quantity))}
                target="_blank"
                rel="noopener noreferrer"
                title={`Order ${accessory.name} on WhatsApp`}
                className="p-2 rounded-sm bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 transition-colors"
                aria-label={`Order ${accessory.name} on WhatsApp`}
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/cart"
                className="font-heading text-xs uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors font-medium ml-1"
              >
                Cart →
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="flex-1 bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold text-xs"
              onClick={handleAdd}
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-2" />
              {added ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <a
              href={buildWhatsAppUrl(buildAccessoryWhatsAppMessage(accessory, 1))}
              target="_blank"
              rel="noopener noreferrer"
              title={`Direct order ${accessory.name} on WhatsApp`}
              className="p-2.5 rounded-sm bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 transition-colors shrink-0"
              aria-label={`Direct order ${accessory.name} on WhatsApp`}
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}