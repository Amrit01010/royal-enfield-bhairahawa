// src/components/sections/rides-section.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Compass,
  Mountain,
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/constants/rides';
import { Ride, RideCategory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildRideExpeditionWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { RideDossierModal } from '@/components/rides/ride-dossier-modal';
import { getImageKitUrl } from '@/lib/imagekit';
import { prefetchEngine } from '@/lib/image-prefetch';
import { useImagePrefetch } from '@/hooks/use-image-prefetch';

const difficultyConfig: Record<string, { label: string; dot: string }> = {
  Easy: { label: 'Easy', dot: 'bg-emerald-400' },
  Moderate: { label: 'Moderate', dot: 'bg-amber-400' },
  Challenging: { label: 'Challenging', dot: 'bg-orange-400' },
  Extreme: { label: 'Extreme', dot: 'bg-red-500' },
};

type FilterCategory = 'ALL' | RideCategory;

interface RidesSectionProps {
  condensed?: boolean;
}

export function RidesSection({ condensed = false }: RidesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalRide, setActiveModalRide] = useState<Ride | null>(null);

  const categories = useMemo(() => {
    const allCategories: { label: string; value: FilterCategory; count: number }[] = [
      { label: 'All', value: 'ALL', count: rides.length },
      {
        label: 'Marquee',
        value: 'Marquee',
        count: rides.filter((r) => r.category === 'Marquee').length,
      },
      {
        label: 'Himalayan',
        value: 'Himalayan Adventure',
        count: rides.filter((r) => r.category === 'Himalayan Adventure').length,
      },
      {
        label: 'Discovery',
        value: 'Discovery',
        count: rides.filter((r) => r.category === 'Discovery').length,
      },
      {
        label: 'Community',
        value: 'Community & Festival',
        count: rides.filter((r) => r.category === 'Community & Festival').length,
      },
      {
        label: 'Training',
        value: 'Training',
        count: rides.filter((r) => r.category === 'Training').length,
      },
    ];

    return allCategories.filter((c) => c.value === 'ALL' || c.count > 0);
  }, []);

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      // Category match
      if (selectedCategory !== 'ALL' && ride.category !== selectedCategory) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'ALL' && ride.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = ride.name.toLowerCase().includes(query);
        const matchesTagline = ride.tagline?.toLowerCase().includes(query) || false;
        const matchesRoute = ride.route?.toLowerCase().includes(query) || false;
        const matchesDesc = ride.description.toLowerCase().includes(query);
        const matchesCategory = ride.category.toLowerCase().includes(query);
        return matchesName || matchesTagline || matchesRoute || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'ALL' || selectedDifficulty !== 'ALL' || searchQuery.trim().length > 0;

  const photoCredits = useMemo(() => {
    const credits = new Set<string>();

    rides.forEach((ride) => {
      if (ride.imageCredit) credits.add(ride.imageCredit);
      ride.gallery?.forEach((photo) => {
        if (photo.credit) credits.add(photo.credit);
      });
    });

    return Array.from(credits);
  }, []);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setSearchQuery('');
  };

  // Pre-generate deterministic card image URLs for all rides
  const rideCardUrls = useMemo(() => {
    return rides.map((r) =>
      getImageKitUrl(r.image, { width: 900, quality: 78, format: 'auto' })
    );
  }, []);

  // Idle background prefetch of ride card thumbnails
  useImagePrefetch(rideCardUrls, { priority: 20 });

  const handleCategoryHover = (catValue: FilterCategory) => {
    const targetRides = catValue === 'ALL' ? rides : rides.filter((r) => r.category === catValue);
    targetRides.slice(0, 3).forEach((r) => {
      prefetchEngine.prefetchImmediate(
        getImageKitUrl(r.image, { width: 900, quality: 78, format: 'auto' })
      );
    });
  };

  const handleRideHover = (ride: Ride) => {
    // Prefetch high-res modal banner so modal opens with 0ms visual delay
    prefetchEngine.prefetchImmediate(
      getImageKitUrl(ride.image, { width: 1400, quality: 78, format: 'auto' })
    );
    if (ride.gallery?.[0]?.src) {
      prefetchEngine.prefetchImmediate(
        getImageKitUrl(ride.gallery[0].src, { width: 900, quality: 78, format: 'auto' })
      );
    }
  };

  const displayRides = condensed ? rides.slice(0, 3) : filteredRides;

  return (
    <section className="relative py-16 lg:py-24 bg-[#090909] border-t border-border/70">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading
          label={condensed ? 'Curated Routes' : 'Expeditions'}
          title="Rides & Tours"
          align="center"
          variant={condensed ? 'clean' : 'accent'}
        />

        {!condensed && (
          <>
            {/* Category Tabs */}
            <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    onMouseEnter={() => handleCategoryHover(cat.value)}
                    onFocus={() => handleCategoryHover(cat.value)}
                    aria-pressed={isActive}
                    className={cn(
                      'px-3.5 py-2 text-xs font-heading uppercase tracking-wider font-semibold rounded-sm whitespace-nowrap transition-all border shrink-0 cursor-pointer',
                      isActive
                        ? 'bg-accent text-white border-accent shadow-sm'
                        : 'bg-[#141414] text-zinc-400 hover:text-white border-border/80 hover:border-zinc-700'
                    )}
                  >
                    {cat.label}
                    <span
                      className={cn(
                        'ml-1.5 px-1.5 py-0.2 rounded-sm text-[10px]',
                        isActive ? 'bg-black/30 text-white' : 'bg-black/50 text-zinc-500'
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & Filter Controls Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-[#111111]/80 backdrop-blur-md p-3 border border-white/10 rounded-sm shadow-md">
              {/* Search box */}
              <div className="relative flex-1">
                <label htmlFor="ride-search" className="sr-only">
                  Search expeditions
                </label>
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="ride-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search expeditions by name, route, or terrain..."
                  className="w-full bg-[#161616] border border-white/[0.08] text-white placeholder-zinc-500 text-xs pl-9 pr-9 py-2.5 rounded-sm focus:outline-none focus:border-accent transition-colors [&::-webkit-search-cancel-button]:hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Difficulty Dropdown Filter */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <label
                  htmlFor="ride-difficulty"
                  className="text-[11px] font-heading uppercase tracking-wider text-zinc-400 whitespace-nowrap"
                >
                  Difficulty:
                </label>
                <select
                  id="ride-difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#161616] border border-white/[0.08] text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="ALL">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Extreme">Extreme</option>
                </select>
              </div>
            </div>

            {/* Result summary */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <p aria-live="polite" className="text-[11px] font-heading uppercase tracking-widest text-zinc-400">
                Showing <span className="text-zinc-200 font-semibold">{filteredRides.length}</span> of{' '}
                <span className="text-zinc-200 font-semibold">{rides.length}</span> expeditions
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-heading uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Clear filters
                </button>
              )}
            </div>
          </>
        )}

        {/* Expeditions Grid */}
        {displayRides.length === 0 ? (
          <div className="text-center py-16 bg-[#121212] border border-border/60 rounded-sm p-8">
            <p className="font-heading text-lg uppercase text-white font-bold mb-2">
              No Expeditions Match Your Filter
            </p>
            <p className="text-xs text-zinc-400 mb-4">
              Try adjusting your category selection, difficulty level, or search terms.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 bg-secondary text-white text-xs font-heading uppercase tracking-wider hover:bg-accent rounded-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayRides.map((ride, index) => (
              <Card
                key={ride.id}
                onMouseEnter={() => handleRideHover(ride)}
                onFocusCapture={() => handleRideHover(ride)}
                className="group relative bg-[#121212] border border-white/[0.08] hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1"
              >
                <div>
                  {/* Visual Image Block */}
                  <Link
                    href={ride.href}
                    aria-label={`Open the ${ride.name} expedition briefing`}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#161616] border-b border-border/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <OptimizedImage
                      src={ride.image}
                      alt={ride.imageAlt || ride.name}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      transformation={{ width: 900, quality: 78, format: 'auto' }}
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      fallbackText={ride.name}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40 pointer-events-none" />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 rounded-sm z-10">
                      {ride.category}
                    </span>

                    {/* Difficulty Badge */}
                    {ride.difficulty && (
                      <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm z-10 flex items-center gap-1.5 text-zinc-300">
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            difficultyConfig[ride.difficulty]?.dot || 'bg-zinc-400'
                          )}
                        />
                        {ride.difficulty}
                      </span>
                    )}

                    {/* Elevation Pill on Image */}
                    {ride.elevation && (
                      <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/10 rounded-sm z-10 flex items-center gap-1 text-[10px] font-heading uppercase tracking-wider text-zinc-300">
                        <Mountain className="w-3 h-3 text-accent" />
                        {ride.elevation}
                      </div>
                    )}

                    {/* Hover cue */}
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-white">
                        View briefing
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </Link>

                  <CardContent className="p-5">
                    {/* Tagline */}
                    {ride.tagline && (
                      <p className="font-heading text-[11px] tracking-[0.18em] text-accent uppercase font-semibold mb-1 line-clamp-1">
                        {ride.tagline}
                      </p>
                    )}

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold uppercase text-white mb-3 tracking-wide">
                      <Link
                        href={ride.href}
                        className="transition-colors group-hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {ride.name}
                      </Link>
                    </h3>

                    {/* Route Preview */}
                    {ride.route && (
                      <div className="flex items-center gap-2 text-xs text-zinc-300 mb-3 bg-[#171717] px-3 py-2 rounded-sm border border-white/[0.06]">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{ride.route.replace(/ - /g, ' → ')}</span>
                      </div>
                    )}

                    {/* Telemetry Stats Bar */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-heading uppercase tracking-wider text-zinc-400">
                      {ride.duration && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#171717] border border-border rounded-sm">
                          <Clock className="w-3 h-3 text-accent" />
                          {ride.duration}
                        </span>
                      )}

                      {ride.distance && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#171717] border border-border rounded-sm">
                          <Compass className="w-3 h-3 text-accent" />
                          {ride.distance}
                        </span>
                      )}
                    </div>

                    {/* Season */}
                    {ride.season && (
                      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <Calendar className="w-3 h-3 text-accent shrink-0" />
                        <span className="line-clamp-1">{ride.season}</span>
                      </p>
                    )}
                  </CardContent>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-border/50 mt-auto flex items-center gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-wider text-xs h-9 rounded-sm cursor-pointer"
                    asChild
                  >
                    <Link href={ride.href}>
                      Briefing
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>

                  <button
                    type="button"
                    onClick={() => setActiveModalRide(ride)}
                    aria-haspopup="dialog"
                    className="h-9 px-3 bg-secondary hover:bg-zinc-800 text-zinc-300 hover:text-white border border-border rounded-sm transition-colors text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    title="Expedition Dossier"
                  >
                    <Info className="w-3.5 h-3.5 text-accent" />
                    <span className="hidden sm:inline">Dossier</span>
                  </button>

                  <a
                    href={buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inquire about ${ride.name} on WhatsApp`}
                    className="h-9 w-9 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 hover:border-[#25D366] rounded-sm transition-all flex items-center justify-center shrink-0"
                    title="Book on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Condensed View "View All" Button */}
        {condensed && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-secondary hover:bg-accent text-white border border-white/10 hover:border-accent font-heading uppercase tracking-wider text-xs font-bold px-8 h-11 rounded-sm transition-all cursor-pointer group"
              asChild
            >
              <Link href="/rides">
                View All 6 Nepal Expeditions
                <ArrowRight className="w-4 h-4 ml-2 text-accent group-hover:text-white transition-colors" />
              </Link>
            </Button>
          </div>
        )}

        {/* Photography attribution */}
        {!condensed && (
          <details className="group/credits mt-10 border-t border-border/60 pt-4">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[10px] font-heading uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-200 [&::-webkit-details-marker]:hidden">
              <span className="h-1 w-1 bg-accent" />
              Photography credits
              <ChevronRight className="h-3 w-3 transition-transform group-open/credits:rotate-90" />
            </summary>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {photoCredits.map((credit) => (
                <li key={credit} className="text-[10px] leading-relaxed text-zinc-400">
                  {credit}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
              Ride photography sourced from Wikimedia Commons under the credited Creative Commons
              licences. Additional credits appear on each expedition page.
            </p>
          </details>
        )}
      </div>

      {/* Interactive Expedition Dossier Modal */}
      <RideDossierModal
        ride={activeModalRide}
        isOpen={Boolean(activeModalRide)}
        onClose={() => setActiveModalRide(null)}
      />
    </section>
  );
}
