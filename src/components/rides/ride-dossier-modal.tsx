// src/components/rides/ride-dossier-modal.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Clock,
  Compass,
  Mountain,
  MapPin,
  Calendar,
  CheckCircle2,
  Wrench,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import { Ride } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildRideExpeditionWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface RideDossierModalProps {
  ride: Ride | null;
  isOpen: boolean;
  onClose: () => void;
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

export function RideDossierModal({ ride, isOpen, onClose }: RideDossierModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !ride) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-ride-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-border/80 shadow-2xl rounded-sm overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with image banner */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full shrink-0 overflow-hidden bg-[#181818] border-b border-border">
          <OptimizedImage
            src={ride.image}
            alt={ride.imageAlt || ride.name}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            transformation={{ width: 1400, quality: 78, format: 'auto' }}
            className="object-cover object-center"
            fallbackText={ride.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges and titles overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-heading uppercase tracking-wider text-zinc-300 bg-black/60 px-2 py-0.5 border border-white/10 rounded-sm">
                  <Calendar className="w-3 h-3 text-accent" />
                  {ride.season}
                </span>
              )}
            </div>

            <h2
              id="modal-ride-title"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white tracking-wide"
            >
              {ride.name}
            </h2>
            {ride.tagline && (
              <p className="text-xs sm:text-sm font-heading tracking-wider uppercase text-accent font-medium mt-0.5">
                {ride.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-zinc-300">
          {/* Telemetry HUD Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#171717] p-3.5 border border-border/80 rounded-sm">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-zinc-500">Duration</p>
                <p className="text-xs sm:text-sm font-heading uppercase font-bold text-white tracking-wider">
                  {ride.duration}
                </p>
              </div>
            </div>

            {ride.distance && (
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] font-heading uppercase tracking-widest text-zinc-500">Distance</p>
                  <p className="text-xs sm:text-sm font-heading uppercase font-bold text-white tracking-wider">
                    {ride.distance}
                  </p>
                </div>
              </div>
            )}

            {ride.elevation && (
              <div className="flex items-center gap-2.5">
                <Mountain className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] font-heading uppercase tracking-widest text-zinc-500">Max Altitude</p>
                  <p className="text-xs sm:text-sm font-heading uppercase font-bold text-white tracking-wider">
                    {ride.elevation}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-heading uppercase tracking-widest text-zinc-500">Best Season</p>
                <p className="text-xs sm:text-sm font-heading uppercase font-bold text-white tracking-wider">
                  {ride.season || 'Year-round batches'}
                </p>
              </div>
            </div>
          </div>

          {/* Route Overview */}
          {ride.route && (
            <div className="p-3.5 bg-black/40 border border-border/60 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-accent font-bold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Expedition Waypoint Circuit
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                {ride.route}
              </p>
            </div>
          )}

          {/* Expedition Narrative */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-accent" />
              Expedition Overview
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {ride.fullDescription || ride.description}
            </p>
          </div>

          {/* Terrains & Machine Suitability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ride.terrain && (
              <div className="p-3.5 bg-secondary/40 border border-border/70 rounded-sm">
                <h5 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-1.5 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                  Terrain Profile
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">{ride.terrain}</p>
              </div>
            )}

            {ride.motorcycleSuitability && (
              <div className="p-3.5 bg-secondary/40 border border-border/70 rounded-sm">
                <h5 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-1.5 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-accent" />
                  Recommended Machines
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">{ride.motorcycleSuitability}</p>
              </div>
            )}
          </div>

          {/* Highlights & Inclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ride.highlights && ride.highlights.length > 0 && (
              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-accent" />
                  Circuit Highlights
                </h4>
                <ul className="space-y-1.5">
                  {ride.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ride.inclusions && ride.inclusions.length > 0 && (
              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-accent" />
                  Support & Official Inclusions
                </h4>
                <ul className="space-y-1.5">
                  {ride.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-border/80 bg-[#0E0E0E] flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span className="text-zinc-200 font-semibold">Official Royal Enfield Bhairahawa</span>
            <span className="block text-[11px] text-zinc-500">
              {siteConfig.location.address} · Tel: {siteConfig.location.phone}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={ride.href}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-secondary hover:bg-secondary/80 border border-border rounded-sm transition-colors flex-1 sm:flex-initial"
            >
              Full Briefing
              <ExternalLink className="w-3 h-3 text-accent" />
            </Link>

            <a
              href={buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold rounded-sm transition-all shadow-md hover:shadow-lg flex-1 sm:flex-initial"
            >
              <WhatsAppIcon className="w-4 h-4 text-black" />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
