import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, BadgeCheck, CheckCircle2, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { ProductCard } from '@/components/accessories/product-card';
import { AccessoryProductActions } from '@/components/accessories/product-actions';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/shared/optimized-image';
import {
  accessories,
  accessoryCategorySlugs,
  formatBikeName,
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
    title: `${accessory.name} | Royal Enfield Bhairahawa`,
    description: accessory.details,
  };
}

const assurances = [
  { icon: BadgeCheck, title: 'Genuine GMA', text: 'Official Royal Enfield part' },
  { icon: Wrench, title: 'Showroom Fitting', text: 'Installation in Bhairahawa' },
  { icon: ShieldCheck, title: 'Manufacturer Warranty', text: 'Royal Enfield warranty' },
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

  const isUniversal =
    !accessory.compatibleBikes ||
    accessory.compatibleBikes.length === 0 ||
    accessory.compatibleBikes.includes('all');

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
            <span aria-hidden className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent/40 z-10" />
            <span aria-hidden className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40 z-10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-[#121212] shadow-2xl">
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

            {/* Genuine GMA Hallmark */}
            <div className="mt-4 flex items-center justify-between p-3.5 bg-[#121212] border border-white/[0.08] rounded-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                  Genuine Motorcycle Accessory (GMA)
                </span>
              </div>
              {accessory.partNumber && (
                <span className="text-[11px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded-xs border border-white/10">
                  {accessory.partNumber}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-black/80 text-accent border border-accent/30 text-[10px] font-heading font-bold uppercase tracking-wider rounded-sm">
                {accessory.category}
              </Badge>
              {accessory.partNumber && (
                <span className="text-xs font-mono text-zinc-400 tracking-wider">
                  PART #{accessory.partNumber}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold uppercase text-white tracking-wide mb-4">
              {accessory.name}
            </h1>

            <div className="border-l-2 border-accent pl-4 mb-6">
              <p className="text-zinc-300 leading-relaxed text-sm">
                {accessory.details}
              </p>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
              {accessory.description}
            </p>

            {/* Motorcycle Fitment Section */}
            <div className="bg-[#121212] border border-white/[0.08] rounded-sm p-4 mb-6">
              <h4 className="text-[11px] font-heading font-bold uppercase tracking-widest text-zinc-300 mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Motorcycle Compatibility:
              </h4>
              <div className="flex flex-wrap gap-2">
                {isUniversal ? (
                  <span className="bg-white/5 border border-white/10 text-white text-xs font-mono uppercase px-2.5 py-1 rounded-xs">
                    Universal Fit (All Royal Enfield Models)
                  </span>
                ) : (
                  accessory.compatibleBikes.map((bikeId) => (
                    <span
                      key={bikeId}
                      className="bg-black/60 border border-white/10 text-zinc-200 text-xs font-mono uppercase tracking-wide px-2.5 py-1 rounded-xs"
                    >
                      {formatBikeName(bikeId)}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Specifications Box (Material / Warranty) */}
            {(accessory.material || accessory.warranty) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {accessory.material && (
                  <div className="p-3.5 bg-[#121212] border border-white/[0.08] rounded-sm">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Material / Construction
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      {accessory.material}
                    </p>
                  </div>
                )}
                {accessory.warranty && (
                  <div className="p-3.5 bg-[#121212] border border-white/[0.08] rounded-sm">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Showroom Guarantee
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      {accessory.warranty}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Inquiry Cart & WhatsApp Direct Action */}
            <div className="bg-[#121212] border border-white/10 border-t-2 border-t-accent rounded-sm p-6 mb-8 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span className="font-heading font-bold uppercase tracking-wider text-white text-xs">
                  Bhairahawa Showroom Inquiry
                </span>
              </div>

              {/* Client Product Actions */}
              <AccessoryProductActions accessory={accessory} />
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] rounded-sm bg-[#101010]/60">
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
