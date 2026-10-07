// src/components/rides/test-ride-terms-modal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestRideTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function TestRideTermsModal({ isOpen, onClose, onAccept }: TestRideTermsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl max-h-[90vh] bg-[#121212] border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-[#181818]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <div>
              <h3 id="terms-modal-title" className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Test Ride Terms & Conditions
              </h3>
              <p className="text-[11px] font-heading tracking-widest uppercase text-zinc-400">
                Royal Enfield Bhairahawa • Siddharthanagar-08
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
            aria-label="Close terms dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-200">
              Please review our safety regulations and eligibility guidelines before participating in an official Royal Enfield test ride.
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                1. Valid Driving License
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                Rider must present an original, valid motorcycle driving license issued by the Department of Transport Management (DoTM), Nepal, or a valid International Driving Permit upon arrival at the showroom.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                2. Minimum Age Requirement
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                The rider must be at least 18 years of age at the time of the scheduled test ride.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                3. Mandatory Protective Safety Gear
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                An approved crash helmet (ISI/DOT certified) and sturdy closed footwear are mandatory. The showroom reserves the right to deny the ride if proper safety gear is not worn. Sanitized helmets can be provided upon request.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                4. Designated Route & Supervision
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                The test ride will be conducted strictly along the designated dealership test route under the direction of our certified showroom ride marshals.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                5. Sobriety & Road Regulations
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                Riding under the influence of alcohol, medications, or any impairing substances is strictly prohibited. Riders must follow all Nepal traffic rules and regulations.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-heading uppercase text-white font-bold text-xs tracking-wider">
                6. Communication Consent
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                By booking, you agree that Royal Enfield Bhairahawa may contact you via WhatsApp, phone calls, or emails for slot confirmation and ride coordination.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#181818] border-t border-border flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs uppercase font-heading text-zinc-400 hover:text-white"
          >
            Close
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="bg-accent hover:bg-accent/90 text-white font-heading font-bold text-xs uppercase tracking-wider gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
