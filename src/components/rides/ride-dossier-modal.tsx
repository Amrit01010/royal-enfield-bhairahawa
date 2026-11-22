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
  Bike,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Ride } from '@/lib/types';
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

const difficultyConfig: Record<string, { label: string; dot: string }> = {
  Easy: { label: 'Easy', dot: 'bg-emerald-400' },
  Moderate: { label: 'Moderate', dot: 'bg-amber-400' },
  Challenging: { label: 'Challenging', dot: 'bg-orange-400' },
  Extreme: { label: 'Extreme', dot: 'bg-red-500' },
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
        className="relative w-full max-w-3xl bg-[#111111] border border-white/[0.08] shadow-2xl rounded-sm overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Close Button */}
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full shrink-0 overflow-hidden bg-[#161616] border-b border-white/[0.08]">
          <OptimizedImage
            src={ride.image}
            alt={ride.imageAlt || ride.name}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            transformation={{ width: 1400, quality: 78, format: 'auto' }}
            className="object-cover object-center"
            fallbackText={ride.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Clean metadata chips */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 rounded-sm">
                {ride.category}
              </span>

              {ride.difficulty && (
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 rounded-sm flex items-center gap-1.5">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      difficultyConfig[ride.difficulty]?.dot || 'bg-zinc-400'
                    )}
                  />
                  {ride.difficulty}
                </span>
              )}

              {ride.season && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-300 bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/10 rounded-sm">
                  <Calendar className="w-3 h-3 text-accent" />
                  {ride.season}
                </span>
              )}
            </div>

            <h2
              id="modal-ride-title"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white tracking-wide leading-tight"
            >
              {ride.name}
            </h2>
            {ride.tagline && (
              <p className="text-xs sm:text-sm font-heading tracking-wider uppercase text-accent font-semibold mt-0.5">
                {ride.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-zinc-300">
          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#171717] p-3 border border-white/[0.06] rounded-sm">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-heading uppercase tracking-wider text-zinc-400">Duration</p>
                <p className="text-xs font-heading uppercase font-bold text-white tracking-wider">
                  {ride.duration}
                </p>
              </div>
            </div>

            {ride.distance && (
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] font-heading uppercase tracking-wider text-zinc-400">Distance</p>
                  <p className="text-xs font-heading uppercase font-bold text-white tracking-wider">
                    {ride.distance}
                  </p>
                </div>
              </div>
            )}

            {ride.elevation && (
              <div className="flex items-center gap-2.5">
                <Mountain className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <p className="text-[10px] font-heading uppercase tracking-wider text-zinc-400">Altitude</p>
                  <p className="text-xs font-heading uppercase font-bold text-white tracking-wider">
                    {ride.elevation}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-[10px] font-heading uppercase tracking-wider text-zinc-400">Season</p>
                <p className="text-xs font-heading uppercase font-bold text-white tracking-wider">
                  {ride.season || 'Year-round'}
                </p>
              </div>
            </div>
          </div>

          {/* Route Stops */}
          {ride.route && (
            <div>
              <p className="text-xs font-heading uppercase tracking-wider text-zinc-400 font-bold mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Route Waypoints
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-200">
                {ride.route.split(/\s*[-–]\s*/).map((stop, idx, arr) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-[#181818] border border-white/[0.08] rounded-sm text-white">
                      {stop}
                    </span>
                    {idx < arr.length - 1 && (
                      <span className="text-accent font-bold">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview Paragraph */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-1.5">
              Overview
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {ride.fullDescription || ride.description}
            </p>
          </div>

          {/* Terrain & Recommended Motorcycle */}
          {(ride.terrain || ride.motorcycleSuitability) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ride.terrain && (
                <div className="p-3 bg-[#161616] border border-white/[0.06] rounded-sm">
                  <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-white font-bold mb-1">
                    <Shield className="w-3.5 h-3.5 text-accent" />
                    Terrain
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ride.terrain}</p>
                </div>
              )}

              {ride.motorcycleSuitability && (
                <div className="p-3 bg-[#161616] border border-white/[0.06] rounded-sm">
                  <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-white font-bold mb-1">
                    <Bike className="w-3.5 h-3.5 text-accent" />
                    Recommended Bikes
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ride.motorcycleSuitability}</p>
                </div>
              )}
            </div>
          )}

          {/* Highlights & Inclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {ride.highlights && ride.highlights.length > 0 && (
              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2">
                  Trip Highlights
                </h4>
                <ul className="space-y-1.5">
                  {ride.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ride.inclusions && ride.inclusions.length > 0 && (
              <div>
                <h4 className="font-heading text-xs uppercase tracking-wider text-white font-bold mb-2">
                  What’s Included
                </h4>
                <ul className="space-y-1.5">
                  {ride.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0c0c0c] flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span className="text-zinc-200 font-semibold">Royal Enfield Bhairahawa</span>
            <span className="block text-[11px] text-zinc-400">
              Hotline: {siteConfig.location.phone}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={ride.href}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-white hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 rounded-sm transition-colors flex-1 sm:flex-initial cursor-pointer"
            >
              View Full Route
              <ArrowRight className="w-3.5 h-3.5 text-accent" />
            </Link>

            <a
              href={buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-sm transition-all shadow-md flex-1 sm:flex-initial cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-black" />
              Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
