// src/components/sections/hero-section.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Camera,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { heroSlides, getMotorcycleStudioColor } from '@/lib/constants/motorcycles';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { useImagePrefetch } from '@/hooks/use-image-prefetch';
import { getImageKitUrl } from '@/lib/imagekit';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'studio' | 'action'>('studio');
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const SLIDE_DURATION = 7000;
  const UPDATE_INTERVAL = 50;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setProgress(0);
      setViewMode('studio'); // Reset to studio view on slide change
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Handle play/pause progress timer
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const step = (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
    progressIntervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide();
            return 0;
          }
          return prev + step;
        });
      }
    }, UPDATE_INTERVAL);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = heroSlides[currentSlide] || heroSlides[0];
  const studioColor = getMotorcycleStudioColor(slide.id);
  const studioImage = studioColor?.image ?? slide.image;
  const activeImage =
    viewMode === 'action' && slide.actionImage ? slide.actionImage : studioImage;

  // Pre-generate deterministic URLs for both studio and action views of all hero slides
  const slideUrls = heroSlides.map((s) => {
    const sColor = getMotorcycleStudioColor(s.id);
    const sImg = sColor?.image ?? s.image;
    return getImageKitUrl(sImg, { width: 1400, quality: 88, format: 'auto' });
  });

  const { prefetchOnDemand } = useImagePrefetch(slideUrls, {
    activeIndex: currentSlide,
    priority: 50,
  });

  // Also prefetch the active slide's alternate view (action view if studio, studio if action)
  useEffect(() => {
    const altSrc = viewMode === 'studio' ? slide.actionImage : studioImage;
    if (altSrc) {
      prefetchOnDemand(
        getImageKitUrl(altSrc, { width: 1400, quality: 88, format: 'auto' })
      );
    }
  }, [currentSlide, viewMode, slide.actionImage, studioImage, prefetchOnDemand]);

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-[#0A0A0A] flex flex-col justify-between pt-20 lg:pt-24 select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      aria-label="Royal Enfield Bhairahawa Hero Showcase"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC BACKDROP LAYER (Subtle ambient landscape & mechanical grid) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient landscape backdrop (mount current & adjacent next only to eliminate network congestion) */}
        {heroSlides.map((s, index) => {
          const isCurrent = index === currentSlide;
          const isNext = index === (currentSlide + 1) % heroSlides.length;
          if (!isCurrent && !isNext) return null;

          const bgSrc = s.actionImage || s.image;
          return (
            <div
              key={`bg-${s.id}`}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-in-out',
                isCurrent ? 'opacity-20 z-1' : 'opacity-0 z-0'
              )}
            >
              {bgSrc && (
                <OptimizedImage
                  src={bgSrc}
                  alt=""
                  fill
                  priority={index === 0}
                  transformation={{
                    width: 1920,
                    quality: 70,
                    blur: 2,
                    format: 'auto',
                  }}
                  className="object-cover object-center scale-105"
                  fallbackText=""
                />
              )}
            </div>
          );
        })}

        {/* Ambient Dark Gradient Vignette for perfect legibility */}
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/90" />
        <div className="absolute inset-0 z-2 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />

        {/* Dynamic Radial Spotlight beam behind the motorcycle stage */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(216,35,42,0.16)_0%,rgba(216,35,42,0.03)_50%,transparent_75%)] blur-3xl z-2 pointer-events-none" />

        {/* Mechanical Engineering Grid */}
        <div className="absolute inset-0 z-3 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Ghost Typographic Architectural Watermark in the background */}
        <div
          key={`ghost-${slide.id}`}
          className="absolute -bottom-8 right-2 sm:right-8 text-[12vw] sm:text-[14vw] font-heading font-black text-white/[0.03] select-none pointer-events-none tracking-tighter uppercase leading-none z-3 transition-opacity duration-700"
        >
          {slide.title.replace('NEW ', '')}
        </div>
      </div>

      {/* Tactile Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-1" />

      {/* ========================================================================= */}
      {/* 2. MAIN VIEWPORT: DUAL-ZONE STAGE (Left: Intel & Specs | Right: Bike Stage) */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex-1 container mx-auto px-4 lg:px-8 py-6 lg:py-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* --------------------------------------------------------------------- */}
          {/* LEFT ZONE: Brand Lineage, Model Title, Specs HUD & CTAs (Col 1-5)      */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            {/* Heritage & Dealership Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-sm shadow-sm shadow-accent/10">
                <span className="font-heading text-xs tracking-[0.25em] text-accent uppercase font-bold">
                  PURE MOTORCYCLING · SINCE 1901
                </span>
              </div>
              <span className="text-zinc-600 font-mono text-xs hidden sm:inline">/</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-sm">
                <span className="font-heading text-[11px] tracking-[0.2em] text-zinc-300 uppercase font-semibold">
                  SHOWROOM BHAIRAHAWA
                </span>
              </div>
            </div>

            {/* Model Subcategory / Series Indicator */}
            <div className="flex items-center gap-2 mb-2 animate-slide-up">
              <span className="w-2 h-3.5 bg-accent rounded-[1px]" />
              <span className="font-heading text-xs sm:text-sm tracking-[0.22em] text-accent font-bold uppercase">
                {slide.category || 'Official Showroom Fleet'}
              </span>
            </div>

            {/* Main Model Headline (Bold Oswald, properly proportioned to never overlap) */}
            <h1
              key={`title-${slide.id}`}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-black tracking-tight text-white uppercase leading-[0.92] mb-3 animate-slide-up"
            >
              {slide.title}
            </h1>

            {/* Tagline */}
            <p
              key={`subtitle-${slide.id}`}
              className="text-lg sm:text-xl font-heading text-zinc-200 tracking-wide mb-2 animate-slide-up delay-100"
            >
              {slide.subtitle}
            </p>

            {/* Short Narrative Copy */}
            <p
              key={`desc-${slide.id}`}
              className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-xl mb-6 line-clamp-3 animate-slide-up delay-200"
            >
              {slide.description}
            </p>

            {/* Precision Mechanical Telemetry HUD (Key Rider Specs) */}
            {slide.specs && (
              <div
                key={`specs-${slide.id}`}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-7 animate-slide-up delay-300"
              >
                <div className="bg-[#141414]/90 border border-border/80 rounded-sm p-2.5 hover:border-accent/40 transition-colors">
                  <span className="block font-heading text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Engine
                  </span>
                  <span className="block font-heading text-sm sm:text-base font-bold text-white tracking-wider">
                    {slide.specs.displacement}
                  </span>
                </div>

                <div className="bg-[#141414]/90 border border-border/80 rounded-sm p-2.5 hover:border-accent/40 transition-colors">
                  <span className="block font-heading text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Power
                  </span>
                  <span className="block font-heading text-sm sm:text-base font-bold text-white tracking-wider">
                    {slide.specs.power}
                  </span>
                </div>

                <div className="bg-[#141414]/90 border border-border/80 rounded-sm p-2.5 hover:border-accent/40 transition-colors">
                  <span className="block font-heading text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Torque
                  </span>
                  <span className="block font-heading text-sm sm:text-base font-bold text-white tracking-wider">
                    {slide.specs.torque}
                  </span>
                </div>

                <div className="bg-[#141414]/90 border border-border/80 rounded-sm p-2.5 hover:border-accent/40 transition-colors">
                  <span className="block font-heading text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Gearbox
                  </span>
                  <span className="block font-heading text-sm sm:text-base font-bold text-white tracking-wider">
                    {slide.specs.transmission}
                  </span>
                </div>
              </div>
            )}

            {/* Action Triggers (CTAs) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-slide-up delay-400">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-wider px-7 h-12 text-sm group shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all rounded-sm"
                asChild
              >
                <Link href={`/book?motorcycle=${slide.id}`}>
                  {slide.cta || 'Book Test Ride'}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-border bg-secondary hover:border-white/40 hover:bg-secondary/80 text-white font-heading uppercase tracking-wider text-sm h-12 px-6 rounded-sm transition-all"
                asChild
              >
                <Link href={slide.href}>Explore Model</Link>
              </Button>

              <Link
                href="/models"
                className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-zinc-400 hover:text-white transition-colors ml-1"
              >
                <span>All 7 Models</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              </Link>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT ZONE: THE DEDICATED MOTORCYCLE SHOWCASE STAGE (Col 6-12)          */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            {/* Precision Mechanical Framing Corner Markers */}
            <div className="absolute -top-2.5 -left-2.5 text-zinc-600 font-mono text-xs select-none pointer-events-none hidden sm:block">
              +
            </div>
            <div className="absolute -top-2.5 -right-2.5 text-zinc-600 font-mono text-xs select-none pointer-events-none hidden sm:block">
              +
            </div>
            <div className="absolute -bottom-2.5 -left-2.5 text-zinc-600 font-mono text-xs select-none pointer-events-none hidden sm:block">
              +
            </div>
            <div className="absolute -bottom-2.5 -right-2.5 text-zinc-600 font-mono text-xs select-none pointer-events-none hidden sm:block">
              +
            </div>

            {/* Stage Header Info Strip & View Mode Switcher */}
            <div className="flex items-center justify-between gap-2 mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-heading text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
                  Official Showroom Unit · Bhairahawa
                </span>
              </div>

              {/* Studio vs Action Toggle Pill (if action banner exists) */}
              {slide.actionImage && (
                <div className="inline-flex items-center bg-[#141414] border border-border/80 rounded-sm p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('studio')}
                    onMouseEnter={() => prefetchOnDemand(getImageKitUrl(studioImage, { width: 1400, quality: 88, format: 'auto' }))}
                    onFocus={() => prefetchOnDemand(getImageKitUrl(studioImage, { width: 1400, quality: 88, format: 'auto' }))}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-heading text-[10px] uppercase tracking-wider transition-all',
                      viewMode === 'studio'
                        ? 'bg-accent text-white font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    )}
                    aria-label="Showroom Studio View"
                  >
                    <Camera className="w-3 h-3" />
                    <span className="hidden sm:inline">Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('action')}
                    onMouseEnter={() => slide.actionImage && prefetchOnDemand(getImageKitUrl(slide.actionImage, { width: 1400, quality: 88, format: 'auto' }))}
                    onFocus={() => slide.actionImage && prefetchOnDemand(getImageKitUrl(slide.actionImage, { width: 1400, quality: 88, format: 'auto' }))}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-heading text-[10px] uppercase tracking-wider transition-all',
                      viewMode === 'action'
                        ? 'bg-accent text-white font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    )}
                    aria-label="Action Scenery View"
                  >
                    <Compass className="w-3 h-3" />
                    <span className="hidden sm:inline">Action</span>
                  </button>
                </div>
              )}
            </div>

            {/* The Elevated Motorcycle Presentation Viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#121212]/80 border border-border/80 shadow-2xl backdrop-blur-sm group">
              {/* Radial Spotlight directly behind the motorcycle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,35,42,0.18)_0%,rgba(14,14,14,0)_70%)] pointer-events-none z-1" />

              {/* Colourway glow echoing the studio platform rim */}
              {viewMode === 'studio' && studioColor && (
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 opacity-25 blur-3xl pointer-events-none z-1 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 78%, ${studioColor.hex}, transparent 60%)`,
                  }}
                />
              )}

              {/* Showroom Floor Shadow Gradient (action view only — studio shots include their own platform) */}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-2 transition-opacity duration-500',
                  viewMode === 'studio' && 'opacity-0'
                )}
              />

              {/* The Motorcycle Image Presentation */}
              <div
                key={`img-${slide.id}-${viewMode}`}
                className="absolute inset-0 transition-all duration-700 ease-out animate-scale-in"
              >
                {activeImage ? (
                  <OptimizedImage
                    src={activeImage}
                    alt={
                      viewMode === 'action'
                        ? slide.title
                        : `${slide.title} in ${studioColor?.name ?? 'official colourway'}`
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    transformation={{
                      width: 1400,
                      quality: 88,
                      format: 'auto',
                    }}
                    className={cn(
                      'transition-transform duration-700 ease-out',
                      viewMode === 'studio'
                        ? 'object-contain p-2 sm:p-4 group-hover:scale-[1.02]'
                        : 'object-cover object-center group-hover:scale-[1.03]'
                    )}
                    fallbackText={slide.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-heading text-2xl text-zinc-600">
                    ROYAL ENFIELD
                  </div>
                )}
              </div>

              {/* Top-Right Badge: Dealership Status */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-white/10 rounded-sm font-heading text-[10px] tracking-widest text-zinc-300 uppercase backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Ready For Delivery
                </span>
              </div>

              {/* Bottom-Left Metadata HUD Tag */}
              <div className="absolute bottom-3 left-3 z-10">
                <div className="px-2.5 py-1 bg-black/85 border border-white/10 rounded-sm backdrop-blur-md">
                  <span className="font-heading text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
                    Nepal Spec · Dual ABS · 2026 Fleet
                  </span>
                </div>
              </div>

              {/* Interactive Hover Indicator */}
              <Link
                href={`/book?motorcycle=${slide.id}`}
                className="absolute bottom-3 right-3 z-10 px-3 py-1 bg-accent/90 hover:bg-accent text-white rounded-sm font-heading text-[10px] uppercase tracking-wider font-bold shadow-md transition-all sm:opacity-0 sm:group-hover:opacity-100"
              >
                Book This Bike →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM FLEET NAVIGATOR & SLIDE SWITCHER                                */}
      {/* ========================================================================= */}
      <div className="relative z-20 border-t border-border/80 bg-[#0E0E0E]/95 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Interactive Model Selection Chips */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {heroSlides.map((s, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => prefetchOnDemand(slideUrls[index])}
                    onTouchStart={() => prefetchOnDemand(slideUrls[index])}
                    onFocus={() => prefetchOnDemand(slideUrls[index])}
                    className={cn(
                      'relative flex flex-col items-start px-3.5 py-1.5 rounded-sm transition-all group font-heading uppercase shrink-0 border',
                      isActive
                        ? 'bg-secondary/90 border-accent/40 text-white'
                        : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-secondary/40'
                    )}
                    aria-label={`Select ${s.title}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-[10px] font-mono tracking-wider',
                          isActive ? 'text-accent font-bold' : 'text-zinc-500'
                        )}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          'text-xs tracking-wider font-semibold transition-colors',
                          isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                        )}
                      >
                        {s.title.replace('NEW ', '')}
                      </span>
                    </div>

                    {/* Active Slide Animated Countdown Progress Line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800 overflow-hidden rounded-b-sm">
                        <div
                          className="h-full bg-accent transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Deck Controls (Counter, Play/Pause, Prev/Next) */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center justify-center h-8 w-8 rounded-sm bg-secondary border border-border text-zinc-400 hover:text-white hover:border-accent/40 transition-colors"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Direct Slide Counter */}
              <div className="font-heading text-xs uppercase tracking-widest text-zinc-400 font-semibold px-2">
                <span className="text-white font-bold">0{currentSlide + 1}</span>
                <span className="text-zinc-600 mx-1">/</span>
                <span>0{heroSlides.length}</span>
              </div>

              {/* Chevron Buttons */}
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  onMouseEnter={() => prefetchOnDemand(slideUrls[(currentSlide - 1 + heroSlides.length) % heroSlides.length])}
                  onTouchStart={() => prefetchOnDemand(slideUrls[(currentSlide - 1 + heroSlides.length) % heroSlides.length])}
                  className="border-border bg-secondary hover:border-accent hover:bg-accent/10 text-white h-8 w-8 rounded-sm transition-all"
                  aria-label="Previous motorcycle"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  onMouseEnter={() => prefetchOnDemand(slideUrls[(currentSlide + 1) % heroSlides.length])}
                  onTouchStart={() => prefetchOnDemand(slideUrls[(currentSlide + 1) % heroSlides.length])}
                  className="border-border bg-secondary hover:border-accent hover:bg-accent/10 text-white h-8 w-8 rounded-sm transition-all"
                  aria-label="Next motorcycle"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
