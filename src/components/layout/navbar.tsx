// src/components/layout/navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, getMotorcycle, getMotorcycleStudioColor } from '@/lib/constants/motorcycles';
import { rides } from '@/lib/constants/rides';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { getImageKitUrl } from '@/lib/imagekit';
import { prefetchEngine } from '@/lib/image-prefetch';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { user, profile } = useAuth();
  const { itemCount, hydrated } = useCart();

  const handleNavHover = (href: string) => {
    if (href.startsWith('/models/')) {
      const slug = href.replace('/models/', '');
      const color = getMotorcycleStudioColor(slug);
      const moto = getMotorcycle(slug);
      const img = color?.image ?? moto?.image;
      if (img) {
        prefetchEngine.prefetchImmediate(
          getImageKitUrl(img, { width: 1200, quality: 85, format: 'auto' })
        );
      }
    } else if (href.startsWith('/rides/')) {
      const slug = href.replace('/rides/', '');
      const ride = rides.find((r) => r.id === slug);
      if (ride?.image) {
        prefetchEngine.prefetchImmediate(
          getImageKitUrl(ride.image, { width: 1400, quality: 78, format: 'auto' })
        );
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.08] py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-white/[0.03] py-4'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Official Royal Enfield Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-7 bg-accent rounded-[1px] group-hover:scale-y-110 transition-transform duration-300" />
              <div className="flex flex-col leading-none">
                <Image
                  src="/logo.svg"
                  width="100"
                  height="26"
                  alt="Royal Enfield Logo"
                  className="h-5 w-auto object-contain brightness-95 group-hover:brightness-100 transition-all"
                  priority
                />
                <span className="mt-1 font-mono text-[9px] tracking-[0.3em] text-zinc-400 group-hover:text-accent uppercase font-medium transition-colors">
                  Bhairahawa
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isItemActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 font-heading text-xs uppercase tracking-[0.16em] font-semibold transition-colors relative group/nav',
                      isItemActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200 text-zinc-500 group-hover/nav:text-white',
                          activeDropdown === item.label && 'rotate-180 text-accent'
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'absolute bottom-0 left-4 right-4 h-0.5 bg-accent transition-transform duration-200',
                        isItemActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover/nav:scale-x-100'
                      )}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-[#0F0F0F]/95 backdrop-blur-2xl border border-white/10 rounded-sm p-1.5 shadow-2xl animate-scale-in">
                      <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-accent uppercase font-semibold">
                          {item.label === 'Rides' ? 'Nepal Expeditions' : `${item.label} Range`}
                        </span>
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onMouseEnter={() => handleNavHover(child.href)}
                          onFocus={() => handleNavHover(child.href)}
                          className="block px-3 py-2 text-xs font-heading uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-sm transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-300 hover:text-white relative hover:bg-white/[0.06] transition-colors"
              asChild
            >
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingCart className="w-4 h-4" />
                {hydrated && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-accent text-white text-[10px] font-bold leading-4 text-center font-heading shadow-sm shadow-accent/50">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-white/15 bg-white/[0.03] hover:border-accent hover:bg-accent/10 font-heading uppercase tracking-wider text-xs h-9 px-3.5"
                  asChild
                >
                  <Link href="/account">
                    <User className="w-3.5 h-3.5 mr-1.5 text-accent" />
                    {profile?.full_name?.split(' ')[0] || 'Rider'}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-300 hover:text-white sm:hidden"
                  asChild
                >
                  <Link href="/account" aria-label="Account">
                    <User className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-white/15 bg-white/[0.03] hover:border-accent hover:bg-accent/10 font-heading uppercase tracking-wider text-xs h-9 px-3.5"
                asChild
              >
                <Link href="/login">
                  <User className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  Login
                </Link>
              </Button>
            )}

            {/* Book Test Ride is the single filled primary CTA in desktop header */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider text-xs font-semibold px-4 h-9 shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all rounded-sm"
              asChild
            >
              <Link href="/book">Test Ride</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/[0.06]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-[#0F0F0F]/98 backdrop-blur-2xl border border-white/10 rounded-sm p-4 animate-scale-in shadow-2xl">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 font-heading text-sm uppercase tracking-wider text-white hover:bg-secondary rounded-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-6 py-2 text-xs font-heading uppercase tracking-wide text-zinc-400 hover:text-white hover:bg-secondary/50 rounded-sm transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border mt-3 pt-3 flex flex-col gap-2">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider"
                  asChild
                >
                  <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                    Book a Test Ride
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border bg-secondary text-white font-heading uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2 text-accent" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border bg-secondary text-zinc-300"
                    asChild
                  >
                    <Link href="/cart" aria-label="Shopping cart" onClick={() => setIsMobileMenuOpen(false)}>
                      <ShoppingCart className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
