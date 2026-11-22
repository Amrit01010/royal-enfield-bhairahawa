// src/app/api/auth/[...path]/route.ts
import { auth } from '@/lib/auth/server';

export const { GET, POST, PUT, DELETE, PATCH } = auth.handler();
