import { db } from '../src/db';

declare global {
  // eslint-disable-next-line no-var
  var __TEST_DATABASE_URL__: string | undefined;
}
if (!process.env.DATABASE_URL) {
  (globalThis as any).__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}

export async function clearDb() {
  // This is a helper, not a test. Do not call in test runner directly.
  // Use drizzle-orm raw SQL helper if needed in real test suites.
  // Example: await db.execute(sql.raw('TRUNCATE ...'));
  // (Left as a placeholder for future test setup.)
}
