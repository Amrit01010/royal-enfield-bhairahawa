// src/app/page.tsx
import { HeroSection } from '@/components/sections/hero-section';
import { MotorcycleLineup } from '@/components/sections/motorcycle-lineup';
// import { RidesSection } from '@/components/sections/rides-section'; // using this in future
import { CTASection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MotorcycleLineup />
      {/* <RidesSection /> */}
      <CTASection />
    </>
  );
}
