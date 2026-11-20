// src/app/accessories/page.tsx
import { AccessoriesCatalog } from '@/components/accessories/accessories-catalog';
import { SectionHeading } from '@/components/shared/section-heading';
import { accessories, accessoryBikes, accessoryCategories } from '@/lib/constants/accessories';
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
            label="Showroom Accessories"
            title="Genuine Royal Enfield Accessories (GMA)"
            description="Official accessories engineered specifically for your motorcycle model. Add items to your inquiry cart and connect directly with our Bhairahawa showroom owner on WhatsApp for availability and fitment."
            align="center"
          />

          <div className="mt-2 mx-auto max-w-3xl grid grid-cols-3 border border-border bg-card/60 divide-x divide-border rounded-sm">
            {[
              { value: String(accessories.length), label: 'Genuine Parts' },
              { value: String(accessoryBikes.length - 1), label: 'Motorcycles' },
              { value: '100%', label: 'OEM Fitment' },
            ].map((stat) => (
              <div key={stat.label} className="py-4 text-center">
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-heading uppercase tracking-[0.25em] text-zinc-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
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
