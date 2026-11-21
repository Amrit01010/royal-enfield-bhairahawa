// src/components/accessories/accessories-catalog.tsx
'use client';

import { useMemo, useState } from 'react';
import { Filter, RotateCcw, Search, X } from 'lucide-react';
import { ProductCard } from '@/components/accessories/product-card';
import { Input } from '@/components/ui/input';
import {
  accessories,
  accessoryBikes,
  accessoryCategories,
  formatBikeName,
} from '@/lib/constants/accessories';
import type { AccessoryCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getImageKitUrl } from '@/lib/imagekit';
import { useImagePrefetch } from '@/hooks/use-image-prefetch';

type SortOption = 'featured' | 'name' | 'name-desc' | 'category';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured Accessories' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'category', label: 'Category' },
];

export function AccessoriesCatalog({
  initialCategory,
  initialBike,
  initialQuery,
}: {
  initialCategory?: string;
  initialBike?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [selectedBike, setSelectedBike] = useState<string>(
    accessoryBikes.some((b) => b.id === initialBike) ? (initialBike as string) : 'all'
  );
  const [category, setCategory] = useState<AccessoryCategory | 'All'>(
    accessoryCategories.includes(initialCategory as AccessoryCategory)
      ? (initialCategory as AccessoryCategory)
      : 'All'
  );
  const [sort, setSort] = useState<SortOption>('featured');

  // Pre-generate deterministic URLs for top catalog accessories
  const initialThumbUrls = useMemo(() => {
    return accessories.slice(0, 8).map((a) =>
      getImageKitUrl(a.image, { width: 700, quality: 80, format: 'auto' })
    );
  }, []);
  useImagePrefetch(initialThumbUrls, { priority: 15 });

  // Filtered by selected bike first to derive category counts accurately
  const bikeFilteredAccessories = useMemo(() => {
    if (selectedBike === 'all') return accessories;
    return accessories.filter(
      (item) =>
        item.compatibleBikes.includes(selectedBike) ||
        item.compatibleBikes.includes('all')
    );
  }, [selectedBike]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: bikeFilteredAccessories.length };
    for (const item of bikeFilteredAccessories) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [bikeFilteredAccessories]);

  const bikeCounts = useMemo(() => {
    const map: Record<string, number> = { all: accessories.length };
    for (const bike of accessoryBikes) {
      if (bike.id === 'all') continue;
      map[bike.id] = accessories.filter(
        (item) =>
          item.compatibleBikes.includes(bike.id) ||
          item.compatibleBikes.includes('all')
      ).length;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = accessories.filter((item) => {
      const matchesBike =
        selectedBike === 'all' ||
        item.compatibleBikes.includes(selectedBike) ||
        item.compatibleBikes.includes('all');

      const matchesCategory = category === 'All' || item.category === category;

      const matchesQuery =
        !needle ||
        item.name.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.details.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle) ||
        (item.partNumber && item.partNumber.toLowerCase().includes(needle)) ||
        item.compatibleBikes.some((b) => formatBikeName(b).toLowerCase().includes(needle));

      return matchesBike && matchesCategory && matchesQuery;
    });

    const sorted = [...next];
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'category')
      sorted.sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      );
    return sorted;
  }, [category, query, selectedBike, sort]);

  const hasFilters = selectedBike !== 'all' || category !== 'All' || query.trim() !== '';

  const reset = () => {
    setQuery('');
    setSelectedBike('all');
    setCategory('All');
    setSort('featured');
  };

  return (
    <div>
      {/* Motorcycle Selector (Official Showroom Style) */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-accent" />
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-zinc-300">
              Filter by Motorcycle
            </h2>
          </div>
          {selectedBike !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedBike('all')}
              className="text-[11px] font-heading font-semibold text-accent hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              Show all motorcycles
            </button>
          )}
        </div>

        {/* Bike Badges / Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {accessoryBikes.map((bike) => {
            const isSelected = selectedBike === bike.id;
            const count = bikeCounts[bike.id] ?? 0;
            return (
              <button
                key={bike.id}
                type="button"
                onClick={() => setSelectedBike(bike.id)}
                className={cn(
                  'relative flex flex-col items-start p-2.5 sm:p-3 rounded-sm border text-left transition-all duration-200 group',
                  isSelected
                    ? 'bg-accent/15 border-accent text-white shadow-md shadow-accent/5'
                    : 'bg-card border-border text-zinc-400 hover:text-white hover:border-zinc-700'
                )}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider line-clamp-1 group-hover:text-white">
                  {bike.shortName}
                </span>
                <span className="text-[10px] text-zinc-500 mt-1">
                  {count} {count === 1 ? 'part' : 'parts'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sticky search & category filter bar */}
      <div className="bg-card/95 backdrop-blur border border-border border-t-2 border-t-accent rounded-sm p-4 lg:p-5 mb-8 sticky top-20 z-20 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guards, seats, luggage, part numbers..."
              className="pl-10 pr-10 h-11 py-0"
              aria-label="Search accessories"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 px-4 bg-secondary border border-border rounded-sm text-white font-heading text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors lg:w-56"
            aria-label="Sort accessories"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category chips: horizontal scroll on mobile, wrap on desktop */}
        <div className="flex gap-2 mt-4 overflow-x-auto sm:flex-wrap sm:overflow-visible -mx-1 px-1 pb-1 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(['All', ...accessoryCategories] as const).map((item) => {
            const active = category === item;
            const count = categoryCounts[item] ?? 0;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  'shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-heading font-bold tracking-wider uppercase border transition-colors',
                  active
                    ? 'bg-accent text-white border-accent'
                    : 'border-border bg-secondary text-zinc-400 hover:text-white hover:border-white/30'
                )}
              >
                {item}
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-px rounded-sm',
                    active ? 'bg-black/25 text-white' : 'bg-black/30 text-zinc-500'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result summary & Active filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-heading uppercase tracking-widest text-zinc-400">
          <span className="text-white font-bold">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'Genuine Accessory' : 'Genuine Accessories'}
          {selectedBike !== 'all' && (
            <>
              {' '}
              for <span className="text-white font-bold">{formatBikeName(selectedBike)}</span>
            </>
          )}
          {category !== 'All' && (
            <>
              {' '}
              in <span className="text-accent font-bold">{category}</span>
            </>
          )}
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-zinc-400 hover:text-accent transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Catalog Grid */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-sm p-12 text-center">
          <p className="text-white font-heading text-lg uppercase font-bold mb-2">
            No Accessories Found
          </p>
          <p className="text-xs text-zinc-400 mb-6">
            We couldn&apos;t find matching genuine gear for the selected filters.
          </p>
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2.5 rounded-sm border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors text-xs font-heading font-bold uppercase tracking-wider"
          >
            Show All Genuine Accessories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 [content-visibility:auto]">
          {filtered.map((accessory) => (
            <ProductCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      )}
    </div>
  );
}
