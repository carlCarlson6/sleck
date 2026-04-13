import { db } from '../src/db';

declare global {
  // eslint-disable-next-line no-var
  var __TEST_DATABASE_URL__: string | undefined;
}
if (!process.env.DATABASE_URL) {
  (globalThis as any).__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}

export async function clearDb() {
  // Truncate all tables for test isolation
  // Use a raw query for Drizzle
  // @ts-ignore
  await db.session.client.query("TRUNCATE TABLE memberships, servers, users, channels, invites, messages RESTART IDENTITY CASCADE;");
}
