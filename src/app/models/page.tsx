// src/app/models/page.tsx
import { MotorcycleLineup } from '@/components/sections/motorcycle-lineup';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata = {
  title: 'Motorcycles',
  description: 'Explore the complete Royal Enfield lineup available at our Bhairahawa showroom.',
};

export default function ModelsPage() {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <SectionHeading
          label="Showroom"
          title="Motorcycles"
          align="center"
        />
      </div>
      <MotorcycleLineup />
    </div>
  );
}
