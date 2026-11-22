// src/app/accessories/page.tsx
import { AccessoriesCatalog } from '@/components/accessories/accessories-catalog';
import { SectionHeading } from '@/components/shared/section-heading';
import { accessoryBikes, accessoryCategories } from '@/lib/constants/accessories';
import type { AccessoryCategory } from '@/lib/types';

export const metadata = {
  title: 'Genuine Accessories & Gear',
  description:
    'Explore genuine Royal Enfield accessories tailored to each motorcycle. Add items to your cart and request quotation and fitment directly via WhatsApp.',
};

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; bike?: string; q?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = accessoryCategories.includes(
    params.category as AccessoryCategory
  )
    ? params.category
    : undefined;

  const initialBike = accessoryBikes.some((b) => b.id === params.bike)
    ? params.bike
    : undefined;

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative pt-32 pb-14 border-b border-border overflow-hidden">
        {/* subtle grid texture, uses the existing border colour */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent pointer-events-none"
        />
        {/* corner brackets */}
        <span aria-hidden className="absolute top-24 left-4 lg:left-8 w-6 h-6 border-t-2 border-l-2 border-accent/60" />
        <span aria-hidden className="absolute top-24 right-4 lg:right-8 w-6 h-6 border-t-2 border-r-2 border-accent/60" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            label="Genuine Accessories"
            title="Accessories & Gear"
            align="center"
          />
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pt-10">
        <AccessoriesCatalog
          initialCategory={initialCategory}
          initialBike={initialBike}
          initialQuery={params.q}
        />
      </div>
    </div>
  );
}
