import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
// Environment is loaded in src/index.ts (app entrypoint)
if (!process.env.DATABASE_URL) {
  // Allow test helpers to set DATABASE_URL before import
  if (typeof (globalThis as any).__TEST_DATABASE_URL__ !== 'undefined' && (globalThis as any).__TEST_DATABASE_URL__) {
    process.env.DATABASE_URL = (globalThis as any).__TEST_DATABASE_URL__;
  } else if (process.env.NODE_ENV === 'test') {
    process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/sleck_test';
  } else {
    throw new Error('DATABASE_URL is required');
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
