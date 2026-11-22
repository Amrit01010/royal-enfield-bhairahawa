import { auth } from '@/lib/auth/server';
import { sql } from '@/lib/db';
import type { TestRide } from '@/lib/types/db';

export type { TestRide };

export async function getUserTestRides(): Promise<TestRide[]> {
  try {
    const { data: session } = await auth.getSession();
    const user = session?.user;

    if (!user) return [];

    const rows = await sql`
      SELECT id, user_id, motorcycle_id, preferred_date, preferred_time, rider_name, rider_email, rider_phone, notes, status, created_at
      FROM public.test_rides
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;

    return rows as TestRide[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to load test rides:', message);
    return [];
  }
}
