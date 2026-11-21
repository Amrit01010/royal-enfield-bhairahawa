// src/app/rides/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Clock,
  Compass,
  Mountain,
  MapPin,
  Calendar,
  CheckCircle2,
  Wrench,
  Shield,
  ArrowLeft,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { rides } from '@/lib/constants/rides';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildRideExpeditionWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { getImageKitUrl } from '@/lib/imagekit';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return rides.map((ride) => ({
    slug: ride.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ride = rides.find((r) => r.id === slug);

  if (!ride) {
    return {
      title: 'Ride Not Found | Royal Enfield Bhairahawa',
    };
  }

  const socialImage = getImageKitUrl(ride.image, {
    width: 1200,
    height: 630,
    cropMode: 'crop',
    focus: 'auto',
    quality: 80,
    format: 'auto',
  });

  return {
    title: `${ride.name} — Official Expedition | Royal Enfield Bhairahawa`,
    description: ride.description,
    openGraph: {
      title: `${ride.name} | Royal Enfield Expeditions`,
      description: ride.description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: ride.imageAlt || ride.name,
        },
      ],
    },
  };
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
  Moderate: 'bg-amber-950/80 text-amber-400 border-amber-800',
  Challenging: 'bg-orange-950/80 text-orange-400 border-orange-800',
  Extreme: 'bg-red-950/80 text-red-400 border-red-800',
};

const categoryBadgeColors: Record<string, string> = {
  Marquee: 'bg-accent/20 text-accent border-accent/40',
  'Himalayan Adventure': 'bg-cyan-950/70 text-cyan-400 border-cyan-800/60',
  Discovery: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
  'Community & Festival': 'bg-purple-950/60 text-purple-300 border-purple-800/50',
  Training: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50',
};

export default async function RideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ride = rides.find((r) => r.id === slug);

  if (!ride) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride));
  const relatedRides = rides.filter((r) => r.id !== ride.id).slice(0, 3);

  return (
    <div className="pt-20 bg-[#090909] min-h-screen text-foreground">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="border-b border-border/60 bg-[#0E0E0E]">
        <div className="container mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/rides"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-accent transition-transform group-hover:-translate-x-1" />
            Back to All Expeditions
          </Link>

          <span className="text-[11px] font-heading uppercase tracking-widest text-zinc-500 hidden sm:inline-block">
            Official Royal Enfield Expedition Briefing
          </span>
        </div>
      </div>

      {/* Hero Visual Banner */}
      <section className="relative w-full aspect-[21/9] min-h-[360px] md:min-h-[460px] bg-[#141414] border-b border-border/80 overflow-hidden">
        <OptimizedImage
          src={ride.image}
          alt={ride.imageAlt || ride.name}
          fill
          priority
          sizes="100vw"
          transformation={{ width: 1920, quality: 82, format: 'auto' }}
          className="object-cover object-center"
          fallbackText={ride.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/50 to-black/30" />

        {ride.imageCredit && (
          <span className="absolute top-4 right-4 z-10 rounded-sm border border-white/10 bg-black/50 px-2 py-1 text-[9px] leading-none text-white/50 backdrop-blur-sm">
            {ride.imageCredit}
          </span>
        )}

        <div className="container mx-auto px-4 lg:px-8 absolute inset-0 flex flex-col justify-end pb-8 md:pb-12 z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                className={cn(
                  'text-[10px] font-heading uppercase tracking-widest font-bold border rounded-sm',
                  categoryBadgeColors[ride.category] || 'bg-secondary text-white'
                )}
              >
                {ride.category}
              </Badge>
              <Badge
                className={cn(
                  'text-[10px] font-heading uppercase tracking-widest font-bold border rounded-sm',
                  difficultyColors[ride.difficulty]
                )}
              >
                {ride.difficulty} Difficulty
              </Badge>
              {ride.season && (
                <span className="inline-flex items-center gap-1 text-[11px] font-heading uppercase tracking-wider text-zinc-300 bg-black/70 px-2.5 py-0.5 border border-white/10 rounded-sm">
                  <Calendar className="w-3 h-3 text-accent" />
                  {ride.season}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-wide leading-tight mb-2">
              {ride.name}
            </h1>

            {ride.tagline && (
              <p className="text-xs sm:text-sm md:text-base font-heading tracking-wider uppercase text-accent font-semibold">
                {ride.tagline}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Dossier Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Full Briefing */}
          <div className="lg:col-span-2 space-y-8">
            {/* Telemetry HUD Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121212] p-4 border border-border/80 rounded-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <span className="text-[10px] font-heading uppercase tracking-widest text-zinc-500 block">
                    Duration
                  </span>
                  <span className="text-sm font-heading uppercase font-bold text-white tracking-wider">
                    {ride.duration}
                  </span>
                </div>
              </div>

              {ride.distance && (
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-widest text-zinc-500 block">
                      Total Distance
                    </span>
                    <span className="text-sm font-heading uppercase font-bold text-white tracking-wider">
                      {ride.distance}
                    </span>
                  </div>
                </div>
              )}

              {ride.elevation && (
                <div className="flex items-center gap-3">
                  <Mountain className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <span className="text-[10px] font-heading uppercase tracking-widest text-zinc-500 block">
                      Max Elevation
                    </span>
                    <span className="text-sm font-heading uppercase font-bold text-white tracking-wider">
                      {ride.elevation}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <span className="text-[10px] font-heading uppercase tracking-widest text-zinc-500 block">
                    Schedule Batch
                  </span>
                  <span className="text-sm font-heading uppercase font-bold text-white tracking-wider">
                    {ride.season || 'Year-round'}
                  </span>
                </div>
              </div>
            </div>

            {/* Circuit Route Breakdown */}
            {ride.route && (
              <div className="p-5 bg-[#121212] border border-border/80 rounded-sm">
                <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-accent font-bold mb-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  Official Expedition Circuit Route
                </div>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-mono bg-black/50 p-4 border border-border/60 rounded-sm">
                  {ride.route}
                </p>
              </div>
            )}

            {/* Expedition Narrative */}
            <div className="p-6 bg-[#121212] border border-border/80 rounded-sm">
              <h2 className="font-heading text-lg font-bold uppercase text-white tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-accent" />
                The Expedition Briefing
              </h2>
              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
                <p>{ride.fullDescription || ride.description}</p>
                <p className="text-xs text-zinc-400">
                  Participants receive full logistical support including route roadbooks, emergency
                  radio contact, support vehicles, mechanical inspection at each night halt, and
                  organized high-altitude medical support.
                </p>
              </div>
            </div>

            {/* Terrain Profile & Recommended Motorcycles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ride.terrain && (
                <div className="p-5 bg-[#121212] border border-border/80 rounded-sm">
                  <h3 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Terrain & Road Conditions
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ride.terrain}</p>
                </div>
              )}

              {ride.motorcycleSuitability && (
                <div className="p-5 bg-[#121212] border border-border/80 rounded-sm">
                  <h3 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-accent" />
                    Recommended Machines
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {ride.motorcycleSuitability}
                  </p>
                </div>
              )}
            </div>

            {/* Circuit Highlights */}
            {ride.highlights && ride.highlights.length > 0 && (
              <div className="p-6 bg-[#121212] border border-border/80 rounded-sm">
                <h2 className="font-heading text-base font-bold uppercase text-white tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-accent" />
                  Key Circuit Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ride.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 bg-black/40 border border-border/60 rounded-sm text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Route Gallery */}
            {ride.gallery && ride.gallery.length > 0 && (
              <div className="p-6 bg-[#121212] border border-border/80 rounded-sm">
                <h2 className="font-heading text-base font-bold uppercase text-white tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-accent" />
                  On the Route
                </h2>
                <p className="text-[11px] text-zinc-500 mb-4">
                  Landmarks and road conditions you will meet along this expedition.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ride.gallery.map((photo) => (
                    <figure
                      key={photo.src}
                      className="group relative overflow-hidden rounded-sm border border-border/60 bg-black/40"
                    >
                      <div className="relative aspect-[4/3]">
                        <OptimizedImage
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          transformation={{ width: 900, quality: 78, format: 'auto' }}
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          fallbackText={ride.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        {photo.credit && (
                          <figcaption className="absolute bottom-0 left-0 right-0 p-2.5 text-[9px] leading-snug text-zinc-400">
                            {photo.credit}
                          </figcaption>
                        )}
                      </div>
                    </figure>
                  ))}
                </div>
                {ride.imageCredit && (
                  <p className="mt-3 text-[10px] leading-relaxed text-zinc-500">
                    Hero photograph: {ride.imageCredit}. Route photography via Wikimedia Commons,
                    used under the credited Creative Commons licences.
                  </p>
                )}
              </div>
            )}

            {/* Official Support & Inclusions */}
            {ride.inclusions && ride.inclusions.length > 0 && (
              <div className="p-6 bg-[#121212] border border-border/80 rounded-sm">
                <h2 className="font-heading text-base font-bold uppercase text-white tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-accent" />
                  What’s Included in Official Expedition
                </h2>
                <ul className="space-y-2.5">
                  {ride.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Showroom Booking & Assistance Box */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="sticky top-24 bg-[#141414] border border-border p-6 rounded-sm shadow-xl">
              <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-accent font-bold block mb-1">
                Royal Enfield Bhairahawa
              </span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide mb-3">
                Join {ride.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Register through our official Bhairahawa showroom. Our team provides complete
                assistance with route prep, vehicle inspection, genuine parts installation, and
                acclimatization guidelines.
              </p>

              {/* Direct WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md hover:shadow-lg mb-3"
              >
                <WhatsAppIcon className="w-4 h-4 text-black" />
                Book via WhatsApp
              </a>

              {/* Showroom Call */}
              <a
                href={`tel:${siteConfig.location.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-zinc-800 text-white font-heading font-bold uppercase tracking-wider text-xs border border-border rounded-sm transition-colors mb-6"
              >
                <PhoneCall className="w-3.5 h-3.5 text-accent" />
                Call Showroom Hotline
              </a>

              {/* Showroom Info Box */}
              <div className="pt-4 border-t border-border/60 text-xs text-zinc-400 space-y-2 font-sans">
                <div>
                  <span className="font-heading uppercase text-[10px] tracking-wider text-zinc-500 block">
                    Showroom Address
                  </span>
                  <span className="text-zinc-200">{siteConfig.location.address}</span>
                </div>
                <div>
                  <span className="font-heading uppercase text-[10px] tracking-wider text-zinc-500 block">
                    Contact Phone
                  </span>
                  <span className="text-zinc-200">{siteConfig.location.phone}</span>
                </div>
                <div>
                  <span className="font-heading uppercase text-[10px] tracking-wider text-zinc-500 block">
                    Opening Hours
                  </span>
                  <span className="text-zinc-200">Sun – Fri: 9:00 AM – 7:00 PM</span>
                </div>
              </div>

              {/* Rider Prep Checklist Box */}
              <div className="mt-6 p-4 bg-black/50 border border-border/70 rounded-sm">
                <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2">
                  Mandatory Rider Kit
                </h4>
                <ul className="text-[11px] text-zinc-400 space-y-1.5 list-disc pl-4">
                  <li>Valid Driving License & Motorcycle Registration</li>
                  <li>ECE/DOT Approved Full-Face or Adventure Helmet</li>
                  <li>CE-Certified Armored Riding Jacket & Pants</li>
                  <li>Over-the-ankle Riding Boots & Gauntlet Gloves</li>
                  <li>Waterproof Rain Liner & Thermal Under-layers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* More Expeditions */}
        <div className="mt-14 pt-10 border-t border-border/70">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-accent font-bold block mb-1">
                Keep Exploring
              </span>
              <h2 className="font-heading text-2xl font-bold uppercase text-white tracking-wide">
                More Nepal Expeditions
              </h2>
            </div>
            <Link
              href="/rides"
              className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors group/all"
            >
              All six rides
              <ChevronRight className="w-4 h-4 text-accent transition-transform group-hover/all:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedRides.map((other) => (
              <Link
                key={other.id}
                href={other.href}
                className="group overflow-hidden rounded-sm border border-border bg-[#111111] transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-[#161616]">
                  <OptimizedImage
                    src={other.image}
                    alt={other.imageAlt || other.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    transformation={{ width: 800, quality: 75, format: 'auto' }}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    fallbackText={other.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/20 pointer-events-none" />
                  <Badge
                    className={cn(
                      'absolute top-2.5 left-2.5 text-[9px] font-heading uppercase tracking-widest font-bold border rounded-sm',
                      categoryBadgeColors[other.category] || 'bg-secondary text-white'
                    )}
                  >
                    {other.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-base font-bold uppercase text-white tracking-wide transition-colors group-hover:text-accent">
                    {other.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-heading uppercase tracking-wider text-zinc-500">
                    {other.duration}
                    {other.distance ? ` · ${other.distance}` : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
