// src/app/rides/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Wrench, Compass, PhoneCall } from 'lucide-react';
import { RidesSection } from '@/components/sections/rides-section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Official Rides & Expeditions | Royal Enfield Bhairahawa',
  description:
    'Join official Royal Enfield marquee rides, Himalayan expeditions, and community adventures. From Himalayan Odyssey and Upper Mustang to Motoverse and One Ride.',
};

export default function RidesPage() {
  return (
    <div className="pt-20 bg-[#090909] min-h-screen text-foreground">
      {/* Editorial Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-border/70 overflow-hidden bg-gradient-to-b from-[#141414] via-[#0D0D0D] to-[#090909]">
        {/* Subtle Background Accent Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-accent/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/40 rounded-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-heading uppercase tracking-[0.25em] text-accent font-bold">
              Pure Motorcycling Expeditions
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wide leading-tight mb-6">
            The Legend of <span className="text-accent">Royal Enfield</span> Rides
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
            For over two decades, Royal Enfield has pioneered motorcycle journeys to the most
            remote frontiers on earth. Discover the official marquee expeditions, rugged
            high-altitude passes, and global rider gatherings with departure support and prep
            from our official Bhairahawa showroom.
          </p>

          {/* Expedition Assurance Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-3 p-3.5 bg-[#171717] border border-border/80 rounded-sm">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                  Factory Marshals
                </h2>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Every marquee tour is led by certified RE road captains with decades of mountain pedigree.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#171717] border border-border/80 rounded-sm">
              <Wrench className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                  Technical Chase Crew
                </h2>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Support vehicle carrying certified mechanics, genuine spares, luggage, and medical kits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#171717] border border-border/80 rounded-sm">
              <Compass className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                  Bhairahawa Gateway
                </h2>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Pre-departure bike checks, gear fittings, and local Nepal & cross-border permit briefings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Rides Catalog Component */}
      <RidesSection />

      {/* Community Chapter Inquiries Footer Bar */}
      <section className="py-12 bg-[#0E0E0E] border-t border-border/70">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto p-6 bg-[#161616] border border-border/80 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-accent font-semibold block mb-1">
                Bhairahawa Riding Club & Weekend Runs
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
                Want to propose a custom ride or join local weekend thumps?
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                We organize regular weekend breakfasts, hill runs to Palpa, and Lumbini charity rides.
                Visit our showroom at {siteConfig.location.address} or get in touch.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider bg-secondary hover:bg-zinc-800 text-white border border-border rounded-sm transition-colors flex-1 md:flex-initial"
              >
                Book Test Ride
              </Link>
              <a
                href={`tel:${siteConfig.location.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider bg-accent hover:bg-accent/90 text-white rounded-sm transition-colors flex-1 md:flex-initial"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call Showroom
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
