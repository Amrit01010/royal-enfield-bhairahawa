import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Wrench } from 'lucide-react';
import { TestRideForm } from '@/components/rides/test-ride-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { getMotorcycle, getMotorcycleStudioColor, motorcycles } from '@/lib/constants/motorcycles';
import { OptimizedImage } from '@/components/shared/optimized-image';

export function generateStaticParams() {
  return motorcycles.map((motorcycle) => ({ slug: motorcycle.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motorcycle = getMotorcycle(slug);
  if (!motorcycle) {
    return { title: 'Motorcycles' };
  }
  return {
    title: motorcycle.name,
    description: motorcycle.description,
  };
}

export default async function MotorcyclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const motorcycle = getMotorcycle(slug);
  if (!motorcycle) notFound();

  const studioColor = getMotorcycleStudioColor(motorcycle.id);
  const studioImage = studioColor?.image ?? motorcycle.image;

  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Link
          href="/models"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All motorcycles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(ellipse_at_50%_72%,#222_0%,#0c0c0c_75%)] shadow-2xl">
            {studioColor && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-25 blur-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 82%, ${studioColor.hex}, transparent 65%)`,
                }}
              />
            )}

            {/* Pedestal Reflection Line */}
            <div className="absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <OptimizedImage
              src={studioImage}
              alt={`Royal Enfield ${motorcycle.name} in ${studioColor?.name ?? 'official colourway'}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              transformation={{
                width: 1200,
                quality: 85,
                format: 'auto',
              }}
              className="object-contain p-4 sm:p-6"
              fallbackText="ROYAL ENFIELD"
            />
            {motorcycle.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-white text-[10px] font-heading tracking-widest font-bold border-none rounded-xs z-10 shadow-sm">
                NEW MODEL
              </Badge>
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1 h-3 bg-accent rounded-[0.5px]" />
              <span className="font-heading text-xs tracking-[0.2em] text-accent uppercase font-bold">
                {motorcycle.subcategory} · {motorcycle.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black uppercase text-white tracking-tight mb-2 leading-none">
              {motorcycle.name}
            </h1>
            <p className="font-heading text-lg text-accent uppercase tracking-wider mb-6 font-semibold">
              {motorcycle.tagline}
            </p>
            <p className="text-zinc-300 leading-relaxed mb-8 text-sm">
              {motorcycle.description}
            </p>
            {motorcycle.specs && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {Object.entries(motorcycle.specs).map(([key, value]) => (
                  <div key={key} className="bg-[#121212] border border-white/[0.08] rounded-sm p-4 hover:border-white/20 transition-colors">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase mb-1">
                      {key}
                    </p>
                    <p className="text-white font-heading text-base font-bold uppercase tracking-wider">{value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-[#121212] border border-white/[0.08] p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-bold uppercase text-white text-sm">
                    Genuine {motorcycle.name} Accessories
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Factory crash guards, touring seats, luggage, and custom styling.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 bg-white/[0.03] hover:border-accent hover:bg-accent/10 text-white font-heading text-xs uppercase tracking-wider shrink-0"
                asChild
              >
                <Link href={`/accessories?bike=${motorcycle.id}`}>
                  View Accessories
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-accent" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <SectionHeading
            label="Test Ride"
            title={`Book a ${motorcycle.name} test ride`}
            align="center"
          />
          <TestRideForm motorcycleId={motorcycle.id} lockMotorcycle />
        </div>
      </div>
    </div>
  );
}