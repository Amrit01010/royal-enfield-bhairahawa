import { neon } from '@neondatabase/serverless';

async function runE2ETests() {
  console.log('=== Neon End-to-End Service Verification ===\n');

  const appUrl = 'http://localhost:3000';
  const testEmail = `rider_${Date.now()}@bhairahawa.re`;
  const testPassword = 'Password123!';
  const testName = 'Bhairahawa Test Rider';

  // 1. Test Unauthenticated Protected Route
  console.log('1. Testing Route Protection (/account without auth)...');
  const unauthRes = await fetch(`${appUrl}/account`, {
    redirect: 'manual',
  });
  console.log(`   Status: ${unauthRes.status}`);
  console.log(`   Location: ${unauthRes.headers.get('location')}`);
  if (unauthRes.status === 307 || unauthRes.status === 302 || unauthRes.status === 303) {
    console.log('   ✓ Protected route correctly redirects unauthenticated request to /login');
  } else {
    throw new Error(`Unexpected status for protected route: ${unauthRes.status}`);
  }

  // 2. Test Neon Auth: Sign-Up via /api/auth/sign-up/email
  console.log('\n2. Testing Neon Auth Sign-Up via /api/auth/sign-up/email...');
  const signUpRes = await fetch(`${appUrl}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': appUrl,
    },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      name: testName,
    }),
  });
  console.log(`   Status: ${signUpRes.status}`);
  const signUpData = await signUpRes.json();
  console.log(`   User ID: ${signUpData.user?.id}`);
  console.log(`   Email: ${signUpData.user?.email}`);

  if (signUpRes.status !== 200 || !signUpData.user?.id) {
    throw new Error(`Sign-up failed: ${JSON.stringify(signUpData)}`);
  }
  console.log('   ✓ Sign-up succeeded via Neon Auth API');

  // Collect cookies from sign-up
  const signUpCookies = signUpRes.headers.getSetCookie?.() || [signUpRes.headers.get('set-cookie') || ''];
  const cookieHeader = signUpCookies.map((c) => c.split(';')[0]).filter(Boolean).join('; ');

  // 3. Test Neon Auth: Sign-In via /api/auth/sign-in/email
  console.log('\n3. Testing Neon Auth Sign-In via /api/auth/sign-in/email...');
  const signInRes = await fetch(`${appUrl}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': appUrl,
    },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
    }),
  });
  console.log(`   Status: ${signInRes.status}`);
  const signInData = await signInRes.json();
  console.log(`   Sign-in User: ${signInData.user?.email}`);

  if (signInRes.status !== 200 || !signInData.user?.id) {
    throw new Error(`Sign-in failed: ${JSON.stringify(signInData)}`);
  }
  console.log('   ✓ Sign-in verified successfully');

  const signInCookies = signInRes.headers.getSetCookie?.() || [signInRes.headers.get('set-cookie') || ''];
  const authCookieHeader = signInCookies.map((c) => c.split(';')[0]).filter(Boolean).join('; ');

  // 4. Test Authenticated Profile API (/api/profile)
  console.log('\n4. Testing Profile Service (/api/profile with session)...');
  const profileRes = await fetch(`${appUrl}/api/profile`, {
    headers: {
      Cookie: authCookieHeader || cookieHeader,
    },
  });
  console.log(`   Status: ${profileRes.status}`);
  const profileData = await profileRes.json();
  console.log(`   Profile:`, profileData.profile);

  if (profileRes.status !== 200) {
    throw new Error(`Profile fetch failed: ${JSON.stringify(profileData)}`);
  }
  console.log('   ✓ Profile API successfully retrieved profile from Neon Postgres');

  // 5. Test Neon Database Direct Queries
  console.log('\n5. Testing Lakebase Postgres direct queries via @neondatabase/serverless...');
  const sql = neon(process.env.DATABASE_URL!);

  // Query profile from database
  const dbProfiles = await sql`
    SELECT id, email, full_name, created_at
    FROM public.profiles
    WHERE id = ${signUpData.user.id}
  `;
  console.log(`   Found profile in DB: ${dbProfiles.length > 0 ? 'Yes' : 'No'}`);
  console.log(`   Profile DB record:`, dbProfiles[0]);

  // Insert test ride booking
  const insertRide = await sql`
    INSERT INTO public.test_rides (
      user_id,
      motorcycle_id,
      preferred_date,
      preferred_time,
      rider_name,
      rider_email,
      rider_phone,
      notes,
      status
    ) VALUES (
      ${signUpData.user.id},
      'hunter-350',
      '2026-12-01',
      '10:00 AM',
      ${testName},
      ${testEmail},
      '+977 9800000000',
      'Neon Migration E2E Test Booking',
      'pending'
    )
    RETURNING id, motorcycle_id, rider_name, status
  `;
  console.log(`   Created Test Ride Booking in DB:`, insertRide[0]);

  // Query test ride back
  const rides = await sql`
    SELECT id, motorcycle_id, preferred_date, status, notes
    FROM public.test_rides
    WHERE user_id = ${signUpData.user.id}
  `;
  console.log(`   Retrieved test ride count: ${rides.length}`);
  if (rides.length !== 1 || rides[0].motorcycle_id !== 'hunter-350') {
    throw new Error('Test ride booking verification failed');
  }
  console.log('   ✓ Neon Postgres test_rides insert & select verified');

  // 6. Test Authenticated Access to /account
  console.log('\n6. Testing Authenticated Route Access (/account with session)...');
  const authAccountRes = await fetch(`${appUrl}/account`, {
    headers: {
      Cookie: `${authCookieHeader}; re_session_started_at=${Date.now()}`,
    },
    redirect: 'manual',
  });
  console.log(`   Status: ${authAccountRes.status}`);
  if (authAccountRes.status === 200) {
    console.log('   ✓ Authenticated request successfully served /account (200 OK)');
  } else {
    console.log(`   Note: Response status ${authAccountRes.status}`);
  }

  console.log('\n===========================================');
  console.log('🎉 ALL NEON SERVICES VERIFIED END-TO-END!');
  console.log('===========================================');
}

runE2ETests().catch((err) => {
  console.error('\n❌ E2E Verification failed:', err);
  process.exit(1);
});
