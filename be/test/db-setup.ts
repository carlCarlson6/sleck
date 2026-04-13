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
  await db.execute(`TRUNCATE users, servers, memberships, channels, invites, messages RESTART IDENTITY CASCADE`);
}
