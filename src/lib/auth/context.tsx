// src/lib/auth/context.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { authClient } from '@/lib/auth/client';
import type { Profile } from '@/lib/types/db';

export type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: string | Date;
  created_at?: string | Date;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    try {
      setProfileLoading(true);
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile ?? null);
      } else {
        setProfile(null);
      }
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    let active = true;
    if (session?.user) {
      fetch('/api/profile')
        .then((res) => (res.ok ? res.json() : { profile: null }))
        .then((data) => {
          if (active) {
            setProfile(data.profile ?? null);
          }
        })
        .catch(() => {
          if (active) {
            setProfile(null);
          }
        });
    }
    return () => {
      active = false;
    };
  }, [session?.user]);

  const sessionUser = session?.user;
  const user: User | null = sessionUser
    ? {
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.name,
        image: sessionUser.image,
        emailVerified: sessionUser.emailVerified,
        createdAt: sessionUser.createdAt,
        created_at:
          'created_at' in sessionUser && sessionUser.created_at
            ? (sessionUser.created_at as string | Date)
            : sessionUser.createdAt,
      }
    : null;

  const currentProfile = user ? profile : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: currentProfile,
        loading: isPending || profileLoading,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
