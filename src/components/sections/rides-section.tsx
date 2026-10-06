// src/components/sections/rides-section.tsx
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rides } from '@/lib/constants/motorcycles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { buildRideExpeditionWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

const difficultyColors: Record<string, string> = {
  Easy: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
  Moderate: 'bg-amber-950/80 text-amber-400 border-amber-800',
  Challenging: 'bg-orange-950/80 text-orange-400 border-orange-800',
  Extreme: 'bg-red-950/80 text-red-400 border-red-800',
};

export function RidesSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#090909] border-t border-border/70">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Expeditions & Tours"
          title="Epic Rides & Community"
          description="Join official Royal Enfield Bhairahawa group rides, Himalayan expeditions, and weekend escapes across Nepal and beyond."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {rides.map((ride) => (
            <Card
              key={ride.id}
              className="group relative bg-card border border-border hover:border-accent/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual ImageKit block */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#161616] border-b border-border/60">
                  <OptimizedImage
                    src={ride.image}
                    alt={ride.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    transformation={{
                      width: 700,
                      quality: 80,
                      format: 'auto',
                    }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackText="EXPEDITION"
                  />

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
                </div>

                <CardContent className="p-5">
                  <h3 className="font-heading text-xl font-bold uppercase text-white mb-2 group-hover:text-accent transition-colors tracking-wide">
                    {ride.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {ride.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-heading uppercase tracking-wider text-zinc-400">
                    {ride.duration && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary border border-border rounded-sm">
                        <Clock className="w-3 h-3 text-accent" />
                        {ride.duration}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>

              <div className="px-5 pb-5 pt-0 border-t border-border/40 mt-auto pt-3 flex items-center justify-between gap-2">
                <a
                  href={buildWhatsAppUrl(buildRideExpeditionWhatsAppMessage(ride))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider px-3 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-black rounded-sm transition-colors shadow-sm"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-black" />
                  Book on WhatsApp
                </a>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors group/link"
                >
                  Showroom
                  <ArrowRight className="w-3.5 h-3.5 text-accent transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
