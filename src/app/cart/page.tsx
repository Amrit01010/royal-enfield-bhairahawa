import { CartView } from '@/components/cart/cart-view';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata = {
  title: 'Inquiry Cart | Genuine Accessories',
  description:
    'Review your selected genuine Royal Enfield accessories and contact our showroom owner directly via WhatsApp for quotation and fitting.',
};

export default function CartPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          label="Showroom Inquiry"
          title="Your Selected Accessories"
          description="Review your genuine Royal Enfield accessories and riding gear. Message our Bhairahawa showroom owner directly on WhatsApp to verify stock availability, request official pricing, and schedule fitting."
        />
        <CartView />
      </div>
    </div>
  );
}
