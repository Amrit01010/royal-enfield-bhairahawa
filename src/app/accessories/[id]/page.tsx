import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, BadgeCheck, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { ProductCard } from '@/components/accessories/product-card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/shared/optimized-image';
import {
  accessoryCategorySlugs,
  accessories,
  getAccessory,
} from '@/lib/constants/accessories';

export function generateStaticParams() {
  return accessories.map((accessory) => ({ id: accessory.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accessory = getAccessory(id);
  if (!accessory) {
    return { title: 'Accessories' };
  }
  return {
    title: accessory.name,
    description: accessory.details,
  };
}

const assurances = [
  { icon: BadgeCheck, title: 'Genuine', text: 'Official Royal Enfield accessory' },
  { icon: Wrench, title: 'Perfect fit', text: 'Engineered for your motorcycle' },
  { icon: ShieldCheck, title: 'Warranty', text: 'Backed by manufacturer warranty' },
];

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryFromSlug = accessoryCategorySlugs[id];
  if (categoryFromSlug) {
    redirect(`/accessories?category=${encodeURIComponent(categoryFromSlug)}`);
  }

  const accessory = getAccessory(id);
  if (!accessory) notFound();

  const related = accessories
    .filter((item) => item.category === accessory.category && item.id !== accessory.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-zinc-400 mb-8">
          <Link
            href="/accessories"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All accessories
          </Link>
          <span className="text-zinc-600">/</span>
          <Link
            href={`/accessories?category=${encodeURIComponent(accessory.category)}`}
            className="hover:text-accent transition-colors"
          >
            {accessory.category}
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative lg:sticky lg:top-28 self-start">
            <span aria-hidden className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent z-10" />
            <span aria-hidden className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent z-10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-[#141414]">
              <OptimizedImage
                src={accessory.image}
                alt={accessory.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                transformation={{
                  width: 1200,
                  quality: 85,
                  format: 'auto',
                }}
                className="object-cover"
                priority
                fallbackText="GEAR"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <Badge className="bg-black/80 text-accent border border-accent/30 text-[10px] font-heading font-bold uppercase tracking-wider mb-4 rounded-sm">
              {accessory.category}
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold uppercase text-white tracking-wide mb-6">
              {accessory.name}
            </h1>

            <div className="border-l-2 border-accent pl-4 mb-6">
              <p className="text-zinc-300 leading-relaxed text-sm">
                {accessory.details}
              </p>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
              {accessory.description}
            </p>

            {/* Showroom CTA (replaces price and cart) */}
            <div className="bg-card border border-border border-t-2 border-t-accent rounded-sm p-5 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-bold uppercase tracking-wide text-white text-sm">
                    Available at our showroom
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Visit us for pricing, availability and professional fitting
                    for your motorcycle.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 h-11 bg-accent text-white border border-accent rounded-sm font-heading text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
              >
                Enquire at showroom
              </Link>
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border rounded-sm">
              {assurances.map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-4">
                  <Icon className="w-4 h-4 text-accent mb-2" />
                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                    {title}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading font-bold uppercase tracking-wide text-white text-xl sm:text-2xl">
                More in {accessory.category}
              </h2>
              <span className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((item) => (
                <ProductCard key={item.id} accessory={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
