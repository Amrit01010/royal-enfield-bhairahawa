// src/app/book/page.tsx
import { Metadata } from 'next';
import {
  Shield,
  Compass,
  Bike,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { TestRideForm } from '@/components/rides/test-ride-form';
import { getMotorcycle } from '@/lib/constants/motorcycles';
import { siteConfig } from '@/config/site';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Book a Test Ride | Royal Enfield Bhairahawa',
  description:
    'Experience pure motorcycling. Schedule an official Royal Enfield test ride at our Bhairahawa showroom in Nepal. Direct booking via WhatsApp.',
};

export default async function BookTestRidePage({
  searchParams,
}: {
  searchParams: Promise<{ motorcycle?: string }>;
}) {
  const { motorcycle } = await searchParams;
  const selected = motorcycle ? getMotorcycle(motorcycle) : undefined;

  return (
    <div className="pt-24 pb-24 bg-[#0A0A0A] min-h-screen text-white">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
        {/* Breadcrumb & Section Sub-header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-accent/15 border border-accent/30 rounded-sm">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span className="text-[11px] tracking-[0.25em] text-accent uppercase font-heading font-black">
              ROYAL ENFIELD BHAIRAHAWA • OFFICIAL SHOWROOM
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold uppercase text-white tracking-wide mb-3">
            Book a test ride
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Feel the legendary thump firsthand. Select your preferred motorcycle model, choose your date, and confirm your test ride appointment at our Bhairahawa showroom instantly on WhatsApp.
          </p>
        </div>

        {/* Feature Highlights Banner (Matching Royal Enfield carousel-btr-head) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 sm:p-5 bg-[#121212] border border-border/80 rounded-sm flex items-center gap-3.5 hover:border-zinc-700 transition-colors">
            <div className="w-11 h-11 rounded-sm bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-0.5">
                Century-Old Legacy
              </h4>
              <p className="text-xs text-zinc-400 leading-snug">
                Experience a century-old motorcycling legacy on Nepal roads.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#121212] border border-border/80 rounded-sm flex items-center gap-3.5 hover:border-zinc-700 transition-colors">
            <div className="w-11 h-11 rounded-sm bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-0.5">
                The Perfect Match
              </h4>
              <p className="text-xs text-zinc-400 leading-snug">
                Ride to figure out which Royal Enfield works best for you.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#121212] border border-border/80 rounded-sm flex items-center gap-3.5 hover:border-zinc-700 transition-colors">
            <div className="w-11 h-11 rounded-sm bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-0.5">
                Hands-On Evaluation
              </h4>
              <p className="text-xs text-zinc-400 leading-snug">
                Explore all features and handling of the motorcycle before choosing it.
              </p>
            </div>
          </div>
        </div>

        {/* Main Test Ride Form Container */}
        <div className="mb-14">
          <TestRideForm motorcycleId={selected?.id} />
        </div>

        {/* Showroom Information Card */}
        <div className="border-t border-border/70 pt-12">
          <div className="text-center mb-8">
            <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-accent font-semibold block mb-1">
              Authorized Showroom Location
            </span>
            <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide">
              Visit Royal Enfield Bhairahawa
            </h3>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-[#121212] border border-border rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading text-xl font-bold uppercase text-white">
                  Royal Enfield Bhairahawa
                </h4>
                <p className="text-xs text-zinc-400">
                  Official Showroom & Authorized Service Center
                </p>
              </div>
              <span className="text-[10px] font-heading uppercase tracking-wider px-2 py-0.5 bg-accent/15 border border-accent/30 text-accent font-bold rounded-xs">
                Open for Test Rides
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{siteConfig.location.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: {siteConfig.location.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Showroom Hours: Sunday – Friday: 10:00 AM – 6:30 PM</span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl(
                  'Namaste Royal Enfield Bhairahawa, I would like to inquire about showroom visits and test rides.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-xs transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-black" />
                Chat on WhatsApp
              </a>
              {siteConfig.location.mapsUrl && (
                <a
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading uppercase tracking-wider text-zinc-300 hover:text-white border border-border hover:border-zinc-500 rounded-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  Google Maps Directions
                </a>
              )}
            </div>
          </div>
        </div>

        {/* What to Bring on Test Ride Day */}
        <div className="mt-10 p-6 bg-[#141414] border border-border/80 rounded-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-5 h-5 text-accent" />
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Test Ride Day Checklist
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block font-heading uppercase">1. Original Driving License</strong>
                Valid two-wheeler license issued by DoTM Nepal or International Permit.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block font-heading uppercase">2. Safety Riding Gear</strong>
                ISI/DOT approved helmet & closed-toe footwear are strictly mandatory.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block font-heading uppercase">3. Minimum Age 18+</strong>
                Rider must be at least 18 years old and physically ready to ride.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
