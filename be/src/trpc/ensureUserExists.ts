import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Ensures a user exists in the users table, inserting a default if missing.
 * Transaction-safe: pass tx if inside a transaction, otherwise pass db.
 * Returns a Promise that resolves when the user exists.
 */
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';

export async function ensureUserExists(
  tx: NodePgDatabase<Record<string, never>> | PgTransaction<any, any, any>,
  userId: string
) {
  const existingUser = await tx
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (existingUser.length === 0) {
    await tx.insert(users).values({
      id: userId,
      email: `${userId}@sleck.local`,
      displayName: `Demo User ${userId.slice(0, 8)}`,
    });
  }
}
