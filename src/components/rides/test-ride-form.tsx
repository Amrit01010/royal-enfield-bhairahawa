// src/components/rides/test-ride-form.tsx
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useAuth } from '@/hooks/use-auth';
import { motorcycles } from '@/lib/constants/motorcycles';
import { buildTestRideWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';

const fieldClassName =
  'w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors';

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function TestRideForm({
  motorcycleId,
  lockMotorcycle = false,
}: {
  motorcycleId?: string;
  lockMotorcycle?: boolean;
}) {
  const { user, profile } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const selectedMotorcycle = motorcycles.find((moto) => moto.id === motorcycleId);
  const [selectedMotoId, setSelectedMotoId] = useState(motorcycleId ?? '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const chosenMotoId =
      (formData.get('motorcycleId') as string) || selectedMotoId || motorcycleId || '';
    const moto = motorcycles.find((m) => m.id === chosenMotoId) || selectedMotorcycle;

    const message = buildTestRideWhatsAppMessage({
      motorcycleName: moto ? moto.name : undefined,
      preferredDate: (formData.get('preferredDate') as string) || undefined,
      preferredTime: (formData.get('preferredTime') as string) || undefined,
      riderName: (formData.get('name') as string) || profile?.full_name || undefined,
      phone: (formData.get('phone') as string) || profile?.phone || undefined,
      notes: (formData.get('notes') as string) || undefined,
    });

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 bg-card border border-border rounded-sm p-6 sm:p-8"
    >
      <div>
        <label htmlFor="motorcycleId" className="block text-sm font-medium text-white mb-2">
          Motorcycle *
        </label>
        {lockMotorcycle && selectedMotorcycle ? (
          <>
            <input type="hidden" name="motorcycleId" value={selectedMotorcycle.id} />
            <div className={fieldClassName}>
              {selectedMotorcycle.name} — {selectedMotorcycle.tagline}
            </div>
          </>
        ) : (
          <select
            id="motorcycleId"
            name="motorcycleId"
            required
            value={selectedMotoId}
            onChange={(e) => setSelectedMotoId(e.target.value)}
            className={fieldClassName}
          >
            <option value="">Choose a motorcycle</option>
            {motorcycles.map((moto) => (
              <option key={moto.id} value={moto.id}>
                {moto.name} — {moto.tagline}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={profile?.full_name ?? ''}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={profile?.email ?? user?.email ?? ''}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
            Contact Phone *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={profile?.phone ?? ''}
            placeholder="+977 9800000000"
          />
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-white mb-2">
            Preferred Date *
          </label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={todayIsoDate()}
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium text-white mb-2">
          Preferred Time *
        </label>
        <Input id="preferredTime" name="preferredTime" type="time" required />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${fieldClassName} resize-none`}
          placeholder="Anything we should know before your ride (experience, riding gear, questions)..."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading text-sm uppercase font-bold tracking-wider h-12 rounded-sm transition-all shadow-md hover:shadow-lg shadow-[#25D366]/10 flex items-center justify-center gap-2 cursor-pointer"
      >
        <WhatsAppIcon className="w-5 h-5 text-black" />
        Book Test Ride via WhatsApp
      </Button>

      <p className="text-center text-xs text-zinc-400">
        Directly sends your test ride booking to Royal Enfield Bhairahawa ({siteConfig.location.phone}) on WhatsApp for immediate confirmation.
      </p>
    </form>
  );
}
