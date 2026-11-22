// src/components/layout/footer.tsx
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { motorcycles } from '@/lib/constants/motorcycles';
import { rides } from '@/lib/constants/rides';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '@/components/icons/social-icons';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#070707]">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Dealership Identity */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1 h-7 bg-accent rounded-[1px]" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-bold tracking-wider text-white">
                  ROYAL ENFIELD
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase font-medium">
                  Bhairahawa
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans">
              Authorized Royal Enfield dealership and certified service center for Bhairahawa, Butwal, and Lumbini Province.
            </p>
            <div className="flex gap-2">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Follow Royal Enfield Bhairahawa on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Follow Royal Enfield Bhairahawa on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Subscribe to Royal Enfield on YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent('Namaste Royal Enfield Bhairahawa!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                aria-label="Chat directly with showroom on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Real Motorcycles Links */}
          <div>
            <h4 className="font-heading text-xs font-bold text-white mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent rounded-[0.5px]" />
              Motorcycles
            </h4>
            <ul className="space-y-2.5">
              {motorcycles.map((moto) => (
                <li key={moto.id}>
                  <Link
                    href={moto.href}
                    className="text-xs font-sans text-zinc-400 hover:text-white transition-colors block"
                  >
                    {moto.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/accessories"
                  className="text-xs font-sans text-zinc-400 hover:text-accent transition-colors block pt-1 border-t border-white/[0.06]"
                >
                  Genuine Accessories (GMA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Nepal Expeditions Links */}
          <div>
            <h4 className="font-heading text-xs font-bold text-white mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent rounded-[0.5px]" />
              Nepal Expeditions
            </h4>
            <ul className="space-y-2.5">
              {rides.map((ride) => (
                <li key={ride.id}>
                  <Link
                    href={ride.href}
                    className="text-xs font-sans text-zinc-400 hover:text-white transition-colors block truncate"
                  >
                    {ride.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Operating Hours */}
          <div>
            <h4 className="font-heading text-xs font-bold text-white mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-1 h-3 bg-accent rounded-[0.5px]" />
              Showroom
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {siteConfig.location.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-xs text-zinc-300 font-sans">
                  Sun – Fri: 10:00 AM – 6:30 PM (Sat Closed)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`tel:${siteConfig.location.phone}`}
                  className="text-xs text-zinc-300 hover:text-white transition-colors font-sans"
                >
                  {siteConfig.location.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`mailto:${siteConfig.location.email}`}
                  className="text-xs text-zinc-300 hover:text-white transition-colors font-sans"
                >
                  {siteConfig.location.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px] font-mono">
          <p>© {new Date().getFullYear()} Royal Enfield Bhairahawa. Dealership Code: NEP-BHW-01.</p>
          <p className="uppercase tracking-widest text-zinc-500">Made Like A Gun · Since 1901</p>
        </div>
      </div>
    </footer>
  );
}
