// src/api/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../be/src/trpc/root';

export const trpc = createTRPCReact<AppRouter>();

export function getTrpcBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:4000';
}
