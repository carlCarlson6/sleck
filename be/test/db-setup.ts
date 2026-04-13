import { db } from '../src/db';

export async function clearDb() {
  // Truncate all tables for test isolation
  await db.execute(`TRUNCATE users, servers, memberships, channels, invites, messages RESTART IDENTITY CASCADE`);
}
