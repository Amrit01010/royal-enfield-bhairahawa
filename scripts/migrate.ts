import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in environment');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function migrate() {
  console.log('Running database migrations on Neon Postgres...');

  // Create public.profiles table
  await sql`
    CREATE TABLE IF NOT EXISTS public.profiles (
      id text PRIMARY KEY,
      email text NOT NULL,
      full_name text,
      phone text,
      avatar_url text,
      created_at timestamp with time zone DEFAULT now(),
      updated_at timestamp with time zone DEFAULT now()
    );
  `;
  console.log('✓ Checked/created public.profiles');

  // Create public.test_rides table
  await sql`
    CREATE TABLE IF NOT EXISTS public.test_rides (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id text NOT NULL,
      motorcycle_id text NOT NULL,
      preferred_date text NOT NULL,
      preferred_time text,
      rider_name text,
      rider_email text,
      rider_phone text,
      notes text,
      status text NOT NULL DEFAULT 'pending',
      created_at timestamp with time zone DEFAULT now()
    );
  `;
  console.log('✓ Checked/created public.test_rides');

  console.log('Migration complete!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
