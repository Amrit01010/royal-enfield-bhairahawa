'use server';

import { revalidatePath } from 'next/cache';
import { getMotorcycleColor, motorcycles } from '@/lib/constants/motorcycles';
import { auth } from '@/lib/auth/server';
import { sql } from '@/lib/db';

export type BookTestRideState = {
  success: boolean;
  error?: string;
  field?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

function isPastDate(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${value}T00:00:00`) < today;
}

export async function bookTestRide(
  _prevState: BookTestRideState,
  formData: FormData
): Promise<BookTestRideState> {
  const motorcycleId = readString(formData, 'motorcycleId');
  const motorcycleColorId = readString(formData, 'motorcycleColor');
  const firstName = readString(formData, 'firstName') || readString(formData, 'fName');
  const lastName = readString(formData, 'lastName') || readString(formData, 'lName');
  const name =
    readString(formData, 'name') ||
    [firstName, lastName].filter(Boolean).join(' ');
  const email = readString(formData, 'email');
  const phone = readString(formData, 'phone') || readString(formData, 'mobile');
  const preferredDate = readString(formData, 'preferredDate');
  const preferredTime = readString(formData, 'preferredTime') || null;
  const rawNotes = readString(formData, 'notes');
  const chkAgree = formData.get('chkAgree') || formData.get('termsAccepted');

  if (!motorcycleId || !motorcycles.some((moto) => moto.id === motorcycleId)) {
    return { success: false, error: 'Please select a motorcycle model.', field: 'motorcycleId' };
  }
  const selectedColor = getMotorcycleColor(motorcycleId, motorcycleColorId);
  if (!name) {
    return { success: false, error: 'Please enter your first and last name.', field: firstName ? 'lastName' : 'firstName' };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { success: false, error: 'Please enter a valid email address.', field: 'email' };
  }
  if (!phone || phone.replace(/\D/g, '').length < 7) {
    return { success: false, error: 'Please enter a valid mobile number.', field: 'phone' };
  }
  if (!preferredDate || !isValidDate(preferredDate)) {
    return { success: false, error: 'Please choose a preferred date.', field: 'preferredDate' };
  }
  if (isPastDate(preferredDate)) {
    return { success: false, error: 'Preferred date cannot be in the past.', field: 'preferredDate' };
  }
  if (chkAgree === null && formData.has('chkAgree')) {
    return { success: false, error: 'Please accept the terms and conditions.', field: 'chkAgree' };
  }

  const compiledNotes = [
    `Showroom: Royal Enfield Bhairahawa`,
    selectedColor ? `Colour: ${selectedColor.name}` : '',
    rawNotes ? `Notes: ${rawNotes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const { data: session } = await auth.getSession();
    const user = session?.user;

    if (!user) {
      return {
        success: false,
        error: 'You must be signed in to book a test ride.',
      };
    }

    await sql`
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
        ${user.id},
        ${motorcycleId},
        ${preferredDate},
        ${preferredTime},
        ${name},
        ${email},
        ${phone},
        ${compiledNotes || null},
        'pending'
      )
    `;

    revalidatePath('/account');
    revalidatePath('/book');
    revalidatePath(`/models/${motorcycleId}`);

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to book test ride';
    return { success: false, error: message };
  }
}
