// src/api/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
// TODO: Wire AppRouter type from backend when available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<any>();

export function getTrpcBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:4000';
}
