// src/components/sections/rides-section.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Compass,
  Mountain,
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/constants/motorcycles';
import { Ride, RideCategory } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildRideExpeditionWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { RideDossierModal } from '@/components/rides/ride-dossier-modal';

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

type FilterCategory = 'ALL' | RideCategory;

export function RidesSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalRide, setActiveModalRide] = useState<Ride | null>(null);

  const categories: { label: string; value: FilterCategory; count: number }[] = useMemo(() => {
    return [
      { label: 'All Expeditions', value: 'ALL', count: rides.length },
      {
        label: 'Marquee Flagships',
        value: 'Marquee',
        count: rides.filter((r) => r.category === 'Marquee').length,
      },
      {
        label: 'Himalayan Adventures',
        value: 'Himalayan Adventure',
        count: rides.filter((r) => r.category === 'Himalayan Adventure').length,
      },
      {
        label: 'Discovery Tours',
        value: 'Discovery',
        count: rides.filter((r) => r.category === 'Discovery').length,
      },
      {
        label: 'Community & Festivals',
        value: 'Community & Festival',
        count: rides.filter((r) => r.category === 'Community & Festival').length,
      },
      {
        label: 'Training Academy',
        value: 'Training',
        count: rides.filter((r) => r.category === 'Training').length,
      },
    ];
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

  return (
    <section className="relative py-16 lg:py-24 bg-[#090909] border-t border-border/70">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading
          label="Official Royal Enfield Calendar"
          title="The OG Rides & Expeditions"
          description="Explore the legendary marquee expeditions, Himalayan conquests, discovery tours, and global gatherings straight from the official Royal Enfield brotherhood. Book through our Bhairahawa showroom."
          align="center"
        />

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8 mb-12 p-3 sm:p-4 bg-[#121212] border border-border/70 rounded-sm">
          <div className="text-center p-2 border-r border-border/50 last:border-r-0">
            <span className="font-heading text-xl sm:text-2xl font-black text-white tracking-wider block">
              12
            </span>
            <span className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-zinc-400">
              Official Circuits
            </span>
          </div>
          <div className="text-center p-2 border-r border-border/50 md:border-r last:border-r-0">
            <span className="font-heading text-xl sm:text-2xl font-black text-accent tracking-wider block">
              18,380 FT
            </span>
            <span className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-zinc-400">
              Khardung La Peak
            </span>
          </div>
          <div className="text-center p-2 border-r border-border/50 last:border-r-0">
            <span className="font-heading text-xl sm:text-2xl font-black text-white tracking-wider block">
              60+
            </span>
            <span className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-zinc-400">
              Countries One Ride
            </span>
          </div>
          <div className="text-center p-2">
            <span className="font-heading text-xl sm:text-2xl font-black text-emerald-400 tracking-wider block">
              100%
            </span>
            <span className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-zinc-400">
              RE Factory Support
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-[#121212] p-3 border border-border/70 rounded-sm">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by expedition name, terrain, or route (e.g. Mustang, Zanskar, Bhutan)..."
              className="w-full bg-[#181818] border border-border/80 text-white placeholder-zinc-500 text-xs pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Difficulty Dropdown Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[11px] font-heading uppercase tracking-wider text-zinc-400 whitespace-nowrap">
              Difficulty:
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#181818] border border-border/80 text-white text-xs px-2.5 py-2 rounded-sm focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="ALL">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
              <option value="Extreme">Extreme</option>
            </select>
          </div>
        </div>

        {/* Expeditions Grid */}
        {filteredRides.length === 0 ? (
          <div className="text-center py-16 bg-[#121212] border border-border/60 rounded-sm p-8">
            <p className="font-heading text-lg uppercase text-white font-bold mb-2">
              No Expeditions Match Your Filter
            </p>
            <p className="text-xs text-zinc-400 mb-4">
              Try adjusting your category selection, difficulty level, or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedDifficulty('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-secondary text-white text-xs font-heading uppercase tracking-wider hover:bg-accent rounded-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRides.map((ride) => (
              <Card
                key={ride.id}
                className="group relative bg-[#121212] border border-border hover:border-accent/70 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  {/* Visual Image Block */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#161616] border-b border-border/60">
                    <OptimizedImage
                      src={ride.image}
                      alt={ride.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fallbackText={ride.name}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />

                    {/* Category Badge */}
                    <Badge
                      className={cn(
                        'absolute top-3 left-3 text-[10px] font-heading uppercase tracking-widest font-bold border rounded-sm z-10',
                        categoryBadgeColors[ride.category] || 'bg-secondary text-white'
                      )}
                    >
                      {ride.category}
                    </Badge>

                    {/* Difficulty Badge */}
                    {ride.difficulty && (
                      <Badge
                        className={cn(
                          'absolute top-3 right-3 text-[10px] font-heading uppercase tracking-widest font-bold border rounded-sm z-10',
                          difficultyColors[ride.difficulty]
                        )}
                      >
                        {ride.difficulty}
                      </Badge>
                    )}

                    {/* Bottom Elevation / Season Pill on Image */}
                    {ride.elevation && (
                      <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/10 rounded-sm z-10 flex items-center gap-1 text-[10px] font-heading uppercase tracking-wider text-zinc-300">
                        <Mountain className="w-3 h-3 text-accent" />
                        {ride.elevation}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">
                    {/* Tagline */}
                    {ride.tagline && (
                      <p className="font-heading text-[11px] tracking-[0.18em] text-accent uppercase font-semibold mb-1 line-clamp-1">
                        {ride.tagline}
                      </p>
                    )}

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold uppercase text-white mb-2 group-hover:text-accent transition-colors tracking-wide">
                      {ride.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {ride.description}
                    </p>

                    {/* Route Preview */}
                    {ride.route && (
                      <div className="flex items-start gap-1.5 p-2 bg-black/40 border border-border/50 rounded-sm mb-4">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="text-[11px] text-zinc-300 line-clamp-1 font-mono">
                          {ride.route}
                        </span>
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
                  </CardContent>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-border/50 mt-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider px-3 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-sm transition-colors shadow-sm"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-black" />
                      Book on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveModalRide(ride)}
                      className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider px-2.5 py-2 bg-secondary hover:bg-zinc-800 text-zinc-300 hover:text-white border border-border rounded-sm transition-colors cursor-pointer"
                      title="View Expedition Dossier"
                    >
                      <Info className="w-3.5 h-3.5 text-accent" />
                      Dossier
                    </button>
                  </div>

                  <Link
                    href={ride.href}
                    className="inline-flex items-center gap-0.5 text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors group/link shrink-0"
                  >
                    Briefing
                    <ChevronRight className="w-3.5 h-3.5 text-accent transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
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
