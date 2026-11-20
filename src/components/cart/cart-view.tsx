// src/components/cart/cart-view.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { QuantityControls } from '@/components/accessories/quantity-controls';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useCart } from '@/hooks/use-cart';
import { buildCartWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { accessoryBikes, formatBikeName } from '@/lib/constants/accessories';

export function CartView() {
  const {
    items,
    itemCount,
    hydrated,
    increment,
    decrement,
    removeItem,
    clear,
  } = useCart();

  const [selectedBike, setSelectedBike] = useState<string>('all');

  if (!hydrated) {
    return (
      <div className="bg-card border border-border rounded-sm p-12 text-center text-muted-foreground animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs font-heading uppercase tracking-widest text-zinc-400">
          Loading accessory inquiry cart...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-card border border-border rounded-sm p-12 lg:p-16 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-secondary/80 border border-border flex items-center justify-center mx-auto mb-5 text-accent">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2 tracking-wide">
          Your Inquiry Cart is Empty
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          Browse our showroom catalog of genuine Royal Enfield accessories, riding gear, and custom parts engineered for your motorcycle.
        </p>
        <Button
          className="bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold h-12 px-8 rounded-sm shadow-lg shadow-accent/20"
          asChild
        >
          <Link href="/accessories">
            Explore Genuine Accessories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    );
  }

  const whatsappMessage = buildCartWhatsAppMessage(items, selectedBike);
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Selected Items List */}
      <div className="lg:col-span-2 space-y-4">
        {/* Motorcycle Model Selector Banner */}
        <div className="bg-secondary/40 border border-border rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                Which Royal Enfield model do you ride?
              </p>
              <p className="text-[11px] text-zinc-400">
                Helps the showroom owner confirm exact fitment and mounting brackets.
              </p>
            </div>
          </div>
          <select
            value={selectedBike}
            onChange={(e) => setSelectedBike(e.target.value)}
            className="h-10 px-3 bg-card border border-border rounded-sm text-xs font-heading uppercase tracking-wider text-white focus:outline-none focus:border-accent w-full sm:w-auto min-w-[200px]"
            aria-label="Select motorcycle for inquiry"
          >
            <option value="all">Select Model (Optional)</option>
            {accessoryBikes
              .filter((b) => b.id !== 'all')
              .map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name}
                </option>
              ))}
          </select>
        </div>

        {/* Item Rows */}
        {items.map((item) => {
          const fitmentText =
            item.compatibleBikes && item.compatibleBikes.length > 0 && !item.compatibleBikes.includes('all')
              ? `Fits: ${item.compatibleBikes.map(formatBikeName).join(', ')}`
              : 'Universal Royal Enfield Fit';

          return (
            <div
              key={item.id}
              className="bg-card border border-border rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 transition-colors hover:border-zinc-700"
            >
              <Link
                href={`/accessories/${item.id}`}
                className="relative w-full sm:w-28 h-40 sm:h-28 shrink-0 overflow-hidden rounded-sm bg-[#181818] border border-border block group"
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  transformation={{
                    width: 250,
                    quality: 80,
                    format: 'auto',
                  }}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackText="GEAR"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                        {item.category}
                      </span>
                      {item.partNumber && (
                        <span className="text-[10px] font-mono text-zinc-400 bg-secondary px-1.5 py-0.5 rounded border border-white/5">
                          {item.partNumber}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-zinc-500 hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Link
                    href={`/accessories/${item.id}`}
                    className="text-white font-heading text-base sm:text-lg font-bold uppercase hover:text-accent transition-colors tracking-wide block mb-1.5"
                  >
                    {item.name}
                  </Link>

                  <p className="text-[11px] text-zinc-400 font-heading uppercase tracking-wider">
                    {fitmentText}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 font-heading uppercase tracking-wider">
                      Qty:
                    </span>
                    <QuantityControls
                      quantity={item.quantity}
                      onDecrement={() => decrement(item.id)}
                      onIncrement={() => increment(item.id)}
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-heading uppercase tracking-wider">
                    Genuine RE GMA
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Clear cart & continue browsing footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-zinc-400 hover:text-destructive text-xs font-heading uppercase tracking-wider"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Clear All Items
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-border text-zinc-300 hover:text-white font-heading text-xs uppercase tracking-wider"
          >
            <Link href="/accessories">
              Add More Accessories
            </Link>
          </Button>
        </div>
      </div>

      {/* Inquiry Summary & WhatsApp Contact */}
      <aside className="bg-card border border-border border-t-2 border-t-accent rounded-sm p-6 h-fit lg:sticky lg:top-28 space-y-6">
        <div>
          <h3 className="font-heading text-lg font-bold uppercase text-white mb-1 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-3 bg-accent" />
            Inquiry Summary
          </h3>
          <p className="text-xs text-zinc-400">
            Royal Enfield Showroom Quotation & Fitment
          </p>
        </div>

        <div className="space-y-3 py-4 border-y border-border">
          <div className="flex items-center justify-between text-xs font-heading uppercase tracking-wider">
            <span className="text-zinc-400">Total Items Selected</span>
            <span className="text-white font-bold text-sm">{itemCount}</span>
          </div>

          <div className="flex items-center justify-between text-xs font-heading uppercase tracking-wider">
            <span className="text-zinc-400">Target Motorcycle</span>
            <span className="text-white font-bold text-xs truncate max-w-[160px]">
              {selectedBike === 'all' ? 'Any / Inquire' : formatBikeName(selectedBike)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-heading uppercase tracking-wider">
            <span className="text-zinc-400">Fitting & Installation</span>
            <span className="text-accent font-semibold text-xs">Available at Showroom</span>
          </div>
        </div>

        {/* WhatsApp Contact Action */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading uppercase tracking-wider font-bold h-12 rounded-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20 text-xs sm:text-sm hover:scale-[1.01]"
          >
            <WhatsAppIcon className="w-5 h-5 text-black shrink-0" />
            Contact Showroom via WhatsApp
          </a>

          <div className="bg-secondary/40 border border-white/5 rounded-sm p-3 space-y-2">
            <div className="flex items-start gap-2 text-zinc-300 text-[11px] leading-relaxed">
              <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
              <span>
                Clicking opens WhatsApp with your pre-formatted accessories list ready to message the showroom owner directly.
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1 border-t border-border/50">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">{siteConfig.location.address}</span>
            </div>
          </div>
        </div>

        {/* Showroom Guarantees */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>100% Genuine Royal Enfield Accessories</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Showroom warranty & fitting support</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
