// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { authClient } from '@/lib/auth/client';
import { AUTH_ERRORS } from '@/lib/constants/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setErrorMessage(AUTH_ERRORS.WEAK_PASSWORD);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: fullName.trim(),
      });

      if (error) {
        const msg =
          error.message?.includes('already exists') ||
          error.message?.includes('already registered')
            ? AUTH_ERRORS.EMAIL_TAKEN
            : error.message || AUTH_ERRORS.GENERIC;
        setErrorMessage(msg);
        setLoading(false);
        return;
      }

      if (data?.user) {
        document.cookie = `re_session_started_at=${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
        router.push('/account');
        router.refresh();
      } else {
        setErrorMessage(AUTH_ERRORS.GENERIC);
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : AUTH_ERRORS.GENERIC;
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <SectionHeading
            label="Account"
            title="Create Account"
            description="Join the Royal Enfield community in Bhairahawa."
            align="center"
          />

          {errorMessage && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-[#121212] border border-white/[0.08] shadow-2xl rounded-sm p-6 sm:p-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                className="w-full px-4 py-2.5 bg-[#181818] border border-white/10 rounded-sm text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Rider Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-[#181818] border border-white/10 rounded-sm text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="rider@royalenfield.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Contact Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="w-full px-4 py-2.5 bg-[#181818] border border-white/10 rounded-sm text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                placeholder="+977 9800000000"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-heading uppercase tracking-wider font-semibold text-zinc-300 mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 bg-[#181818] border border-white/10 rounded-sm text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors pr-12"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1.5 font-sans">
                Must be at least 6 characters
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-heading uppercase tracking-wider font-bold h-11 text-xs cursor-pointer shadow-md shadow-accent/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Rider Account...
                </>
              ) : (
                'Create Rider Account'
              )}
            </Button>

            <p className="text-center text-xs text-zinc-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-accent hover:underline font-heading font-semibold uppercase tracking-wider"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
