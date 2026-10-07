// src/components/rides/test-ride-form.tsx
'use client';

import { useRef, useState, useTransition } from 'react';
import {
  Calendar,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Bike,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { useAuth } from '@/hooks/use-auth';
import { motorcycles } from '@/lib/constants/motorcycles';
import { siteConfig } from '@/config/site';
import { buildTestRideWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { bookTestRide } from '@/lib/rides/actions';
import { TestRideTermsModal } from '@/components/rides/test-ride-terms-modal';
import { OptimizedImage } from '@/components/shared/optimized-image';
import { cn } from '@/lib/utils';

function todayIsoDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

interface TestRideFormProps {
  motorcycleId?: string;
  lockMotorcycle?: boolean;
  className?: string;
}

export function TestRideForm({
  motorcycleId,
  lockMotorcycle = false,
  className,
}: TestRideFormProps) {
  const { user, profile } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  // Model Selection
  const initialMoto = motorcycles.find((m) => m.id === motorcycleId) || motorcycles[0];
  const [selectedMotoId, setSelectedMotoId] = useState<string>(initialMoto?.id || '');
  const activeMotorcycle = motorcycles.find((m) => m.id === selectedMotoId) || initialMoto;

  // Form Fields State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  // Modals & Submission Feedback
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  // Pre-fill profile info if user is authenticated
  const handlePreFill = () => {
    if (profile?.full_name && !firstName && !lastName) {
      const parts = profile.full_name.trim().split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
    if ((profile?.email || user?.email) && !email) {
      setEmail(profile?.email || user?.email || '');
    }
    if (profile?.phone && !phone) {
      setPhone(profile.phone);
    }
  };

  if (user && (!firstName || !email) && (profile?.full_name || profile?.email || user?.email)) {
    handlePreFill();
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);

    if (!form.reportValidity()) return;

    const chosenMoto = motorcycles.find((m) => m.id === selectedMotoId) || activeMotorcycle;

    // Build formatted WhatsApp message for Royal Enfield Bhairahawa
    const message = buildTestRideWhatsAppMessage({
      motorcycleName: chosenMoto ? `${chosenMoto.name} (${chosenMoto.tagline})` : undefined,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredDate: preferredDate,
      termsAccepted: true,
    });

    const waUrl = buildWhatsAppUrl(message, siteConfig.location.whatsapp);
    setSubmittedWhatsAppUrl(waUrl);

    // If logged in, record the test ride in Supabase database in background
    if (user) {
      const formData = new FormData(form);
      formData.set('motorcycleId', selectedMotoId);
      formData.set('name', `${firstName.trim()} ${lastName.trim()}`);
      formData.set('email', email.trim());
      formData.set('phone', phone.trim());
      formData.set('preferredDate', preferredDate);
      formData.set('termsAccepted', 'true');

      startTransition(async () => {
        try {
          await bookTestRide({ success: false }, formData);
        } catch {
          // Non-blocking for WhatsApp redirection
        }
      });
    }

    // Direct redirect to WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={cn('relative bg-[#0F0F0F] border border-border rounded-sm overflow-hidden shadow-2xl', className)}>
        {/* Showroom Identification Header Banner */}
        <div className="bg-[#161616] border-b border-border/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-heading font-black tracking-[0.2em] text-accent uppercase">
                  Royal Enfield Nepal
                </span>
                <span className="text-zinc-600 text-xs">•</span>
                <span className="text-[10px] font-heading font-semibold tracking-wider text-zinc-400 uppercase">
                  Bhairahawa Showroom
                </span>
              </div>
              <h3 className="font-heading text-base sm:text-lg font-bold uppercase text-white tracking-wide">
                Royal Enfield Bhairahawa
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-heading uppercase tracking-wider text-[11px] text-zinc-300">
              Test Ride Slots Open
            </span>
          </div>
        </div>

        {/* Showroom Location Strip */}
        <div className="px-6 py-3 bg-[#131313] border-b border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{siteConfig.location.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Showroom: {siteConfig.location.phone}</span>
          </div>
        </div>

        {/* Main Test Ride Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-6"
          noValidate={false}
        >
          {/* Model Selector Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="motorcycleId" className="block text-xs font-heading uppercase tracking-wider text-white font-bold">
                Select Model *
              </label>
              {activeMotorcycle && (
                <span className="text-[11px] font-heading text-accent uppercase tracking-wider font-semibold">
                  {activeMotorcycle.category}{activeMotorcycle.specs?.engine ? ` · ${activeMotorcycle.specs.engine}` : ''}
                </span>
              )}
            </div>

            {lockMotorcycle && activeMotorcycle ? (
              <div className="flex items-center gap-4 p-3 bg-secondary/80 border border-border rounded-sm">
                <div className="relative w-20 h-14 bg-black/40 rounded-sm overflow-hidden shrink-0">
                  <OptimizedImage
                    src={activeMotorcycle.image}
                    alt={activeMotorcycle.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase text-white">
                    {activeMotorcycle.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{activeMotorcycle.tagline}</p>
                </div>
                <input type="hidden" name="motorcycleId" value={activeMotorcycle.id} />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Visual model cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {motorcycles.map((moto) => {
                    const isSelected = selectedMotoId === moto.id;
                    return (
                      <button
                        key={moto.id}
                        type="button"
                        onClick={() => setSelectedMotoId(moto.id)}
                        className={cn(
                          'p-2.5 rounded-sm border text-left flex flex-col justify-between transition-all group relative',
                          isSelected
                            ? 'bg-accent/15 border-accent shadow-md ring-1 ring-accent/50'
                            : 'bg-secondary/40 border-border/70 hover:border-zinc-600 hover:bg-secondary/70'
                        )}
                      >
                        <div className="relative aspect-[16/10] w-full mb-1.5 bg-black/20 rounded-xs overflow-hidden">
                          <OptimizedImage
                            src={moto.image}
                            alt={moto.name}
                            fill
                            className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="font-heading text-xs font-bold uppercase text-white tracking-wide truncate">
                            {moto.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate">
                            {moto.tagline}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dropdown fallback for accessibility / select */}
                <select
                  id="motorcycleId"
                  name="motorcycleId"
                  required
                  value={selectedMotoId}
                  onChange={(e) => setSelectedMotoId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-secondary/80 border border-border rounded-sm text-white text-xs font-heading uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select a Royal Enfield Model *</option>
                  {motorcycles.map((moto) => (
                    <option key={moto.id} value={moto.id}>
                      {moto.name} — {moto.tagline} ({moto.category})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Rider Name (First Name + Last Name) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fName" className="block text-xs font-heading uppercase tracking-wider text-white font-semibold mb-1.5">
                First name *
              </label>
              <Input
                id="fName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name*"
                className="bg-[#141414] border-border text-sm"
              />
            </div>
            <div>
              <label htmlFor="lName" className="block text-xs font-heading uppercase tracking-wider text-white font-semibold mb-1.5">
                Last name *
              </label>
              <Input
                id="lName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name*"
                className="bg-[#141414] border-border text-sm"
              />
            </div>
          </div>

          {/* Contact Details (Email + Mobile Number) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-heading uppercase tracking-wider text-white font-semibold mb-1.5">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address*"
                className="bg-[#141414] border-border text-sm"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-xs font-heading uppercase tracking-wider text-white font-semibold mb-1.5">
                Mobile number *
              </label>
              <Input
                id="mobile"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="bg-[#141414] border-border text-sm"
              />
            </div>
          </div>

          {/* Date Picker (Date Only - NO Time field!) */}
          <div>
            <label htmlFor="preferredDate" className="block text-xs font-heading uppercase tracking-wider text-white font-semibold mb-1.5">
              Preferred Date * (Showroom Working Hours: 10:00 AM – 6:30 PM)
            </label>
            <div className="relative">
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                required
                min={todayIsoDate()}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="bg-[#141414] border-border text-sm pl-10"
              />
              <Calendar className="w-4 h-4 text-accent absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Disclaimer & Minimal Terms and Conditions (Matching Official Royal Enfield Nepal) */}
          <div className="space-y-3 pt-2 border-t border-border/60">
            {/* Disclaimer Text */}
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed text-left">
              <span className="font-bold text-zinc-300">Disclaimer:</span> By signing this form/checking this box, you acknowledge and agree that we may use the information you share with us, to communicate with you through WhatsApp, text messages, calls, and emails, in order to provide test ride scheduling, confirmation, and motorcycle related assistance for Royal Enfield Bhairahawa. All information provided will be secured and processed as per our privacy standards.
            </p>

            {/* Terms and Conditions Checkbox */}
            <div className={cn(
              'p-3.5 rounded-sm border transition-colors',
              termsError
                ? 'bg-red-950/20 border-red-500/80 ring-1 ring-red-500/40'
                : 'bg-secondary/40 border-border/80'
            )}>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="chkAgree"
                  name="chkAgree"
                  required
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="mt-0.5 h-4 w-4 rounded-xs border-zinc-600 text-accent focus:ring-accent bg-zinc-900 cursor-pointer accent-[#D9232D]"
                />
                <span className="text-xs text-zinc-300 leading-normal">
                  Please accept the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTermsModalOpen(true);
                    }}
                    className="text-white font-semibold underline underline-offset-2 hover:text-accent transition-colors"
                  >
                    terms and conditions
                  </button>{' '}
                  as well as ride safety regulations (valid driving license & helmet mandatory).
                </span>
              </label>

              {termsError && (
                <p className="text-[11px] text-red-400 font-medium mt-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  Kindly agree to the Terms & Conditions in order to proceed with the test ride.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button (WhatsApp Direct Confirmation) */}
          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-heading text-sm uppercase font-black tracking-wider h-13 rounded-sm transition-all shadow-lg hover:shadow-xl shadow-[#25D366]/15 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-black" />
              <span>Book Test Ride via WhatsApp</span>
              <ChevronRight className="w-4 h-4 text-black stroke-[3]" />
            </Button>

            <p className="text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              Directly routes your booking to Royal Enfield Bhairahawa ({siteConfig.location.phone}) on WhatsApp for immediate confirmation.
            </p>
          </div>
        </form>

        {/* WhatsApp Redirection Feedback Notification Panel */}
        {submittedWhatsAppUrl && (
          <div className="p-6 bg-emerald-950/40 border-t border-emerald-800/80 m-4 rounded-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <h4 className="font-heading text-sm font-bold uppercase text-white tracking-wide">
                  WhatsApp Booking Prepared!
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Your test ride request for the <strong className="text-white">{activeMotorcycle?.name}</strong> at <strong className="text-white">Royal Enfield Bhairahawa</strong> has been composed. If WhatsApp did not open automatically, click below to open your chat:
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-black font-heading font-bold uppercase text-xs rounded-sm hover:bg-[#20ba5a] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-black" />
                    Open WhatsApp Chat Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedWhatsAppUrl(null)}
                    className="text-xs text-zinc-400 hover:text-white underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions Modal */}
      <TestRideTermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          setTermsAccepted(true);
          setTermsError(false);
        }}
      />
    </>
  );
}
