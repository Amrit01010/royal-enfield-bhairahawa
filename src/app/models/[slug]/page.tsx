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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-[radial-gradient(ellipse_at_50%_68%,#242424_0%,#0c0c0c_75%)]">
            {studioColor && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-20 blur-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 82%, ${studioColor.hex}, transparent 65%)`,
                }}
              />
            )}

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
              <Badge className="absolute top-4 left-4 bg-accent text-white text-[10px] font-heading tracking-widest font-bold border-none rounded-sm z-10">
                NEW MODEL
              </Badge>
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-sm">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span className="font-heading text-[11px] tracking-[0.2em] text-accent uppercase font-semibold">
                {motorcycle.subcategory} · {motorcycle.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold uppercase text-white tracking-wide mb-2">
              {motorcycle.name}
            </h1>
            <p className="font-heading text-lg text-accent uppercase tracking-wider mb-6 font-semibold">
              {motorcycle.tagline}
            </p>
            <p className="text-zinc-300 leading-relaxed mb-8 text-sm">
              {motorcycle.description}
            </p>
            {motorcycle.specs && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(motorcycle.specs).map(([key, value]) => (
                  <div key={key} className="bg-card border border-border rounded-sm p-3.5">
                    <p className="font-heading text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-medium mb-1">
                      {key}
                    </p>
                    <p className="text-white font-heading text-base font-bold uppercase">{value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-5 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/60 p-4 rounded-sm border border-border">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-bold uppercase text-white text-sm">
                    Genuine {motorcycle.name} Accessories
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Explore factory crash guards, touring seats, luggage, and custom styling.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:border-accent text-white font-heading text-xs uppercase tracking-wider shrink-0"
                asChild
              >
                <Link href={`/accessories?bike=${motorcycle.id}`}>
                  View Accessories
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <SectionHeading
            label="Test Ride"
            title={`Book a ${motorcycle.name} test ride`}
            description="Experience this motorcycle at our Bhairahawa showroom. Book directly via WhatsApp for instant confirmation."
            align="center"
          />
          <TestRideForm motorcycleId={motorcycle.id} lockMotorcycle />
        </div>
      </div>
    </div>
  );
}