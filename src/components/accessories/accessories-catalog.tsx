'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ProductCard } from '@/components/accessories/product-card';
import { Input } from '@/components/ui/input';
import { accessories, accessoryCategories } from '@/lib/constants/accessories';
import type { AccessoryCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'name' | 'name-desc' | 'category';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'category', label: 'Category' },
];

export function AccessoriesCatalog({
  initialCategory,
  initialQuery,
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [category, setCategory] = useState<AccessoryCategory | 'All'>(
    accessoryCategories.includes(initialCategory as AccessoryCategory)
      ? (initialCategory as AccessoryCategory)
      : 'All'
  );
  const [sort, setSort] = useState<SortOption>('featured');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: accessories.length };
    for (const item of accessories) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = accessories.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        !needle ||
        item.name.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.details.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
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
  }, [category, query, sort]);

  const hasFilters = category !== 'All' || query.trim() !== '';

  const reset = () => {
    setQuery('');
    setCategory('All');
    setSort('featured');
  };

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="bg-card/95 backdrop-blur border border-border border-t-2 border-t-accent rounded-sm p-4 lg:p-5 mb-8 sticky top-20 z-20 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guards, luggage, seats, mirrors..."
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
                  {counts[item] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result summary */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-xs font-heading uppercase tracking-widest text-zinc-400">
          <span className="text-white">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'Accessory' : 'Accessories'}
          {category !== 'All' && (
            <>
              {' '}
              in <span className="text-accent">{category}</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-zinc-400 hover:text-accent transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-sm p-12 text-center">
          <p className="text-white font-heading text-lg uppercase font-bold mb-2">
            No Matching Accessories
          </p>
          <p className="text-xs text-zinc-400 mb-6">
            Try a different search keyword or category filter.
          </p>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-sm border border-accent text-accent hover:bg-accent hover:text-white transition-colors text-xs font-heading font-bold uppercase tracking-wider"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((accessory) => (
            <ProductCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      )}
    </div>
  );
}
