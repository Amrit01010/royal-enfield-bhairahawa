// src/lib/types/db.ts
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type TestRide = {
  id: string;
  user_id: string;
  motorcycle_id: string;
  preferred_date: string;
  preferred_time: string | null;
  rider_name: string | null;
  rider_email: string | null;
  rider_phone: string | null;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
};
