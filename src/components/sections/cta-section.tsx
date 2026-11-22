// src/components/sections/cta-section.tsx
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(216,35,42,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-[#101010] border border-white/[0.08] rounded-sm p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle top red highlight line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-accent/15 border border-accent/30 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-accent font-semibold">
                  Authorized Showroom &amp; Service
                </span>
              </div>

              <div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide leading-tight">
                  Experience Pure Motorcycling
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                  Schedule your test ride at Royal Enfield Bhairahawa. Feel the engine, inspect the craftsmanship, and plan your next Nepal route with our team.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold px-7 h-11 text-xs shadow-lg shadow-accent/20 transition-all rounded-sm cursor-pointer"
                  asChild
                >
                  <Link href="/book">
                    Book a Test Ride
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] text-white font-heading uppercase tracking-wider text-xs h-11 px-6 rounded-sm transition-all cursor-pointer"
                  asChild
                >
                  <Link href={siteConfig.location.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 w-3.5 h-3.5 text-accent" />
                    Address / Location
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Verified Showroom Telemetry Card */}
            <div className="lg:col-span-5 bg-[#141414] border border-white/[0.08] p-6 rounded-sm space-y-4">
              <div className="border-b border-white/[0.06] pb-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                  Dealership
                </p>
                <h3 className="font-heading text-lg font-bold uppercase text-white tracking-wide">
                  Royal Enfield Bhairahawa
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">{siteConfig.location.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hotline: {siteConfig.location.phone}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Sun – Fri: 10:00 AM – 6:30 PM (Sat Closed)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <a
                  href={buildWhatsAppUrl('Namaste Royal Enfield Bhairahawa, I would like to inquire about showroom visits and motorcycles.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 hover:border-[#25D366] rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Direct WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
