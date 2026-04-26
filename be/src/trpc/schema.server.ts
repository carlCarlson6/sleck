import { pgTable, serial, text, boolean, timestamp, primaryKey, integer, unique, uuid } from 'drizzle-orm/pg-core';

export const servers = pgTable('servers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  isPublic: boolean('is_public').notNull().default(false),
  ownerId: text('owner_id').notNull(), // Clerk user id
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const serverMemberships = pgTable('server_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  serverId: uuid('server_id').notNull().references(() => servers.id),
  userId: text('user_id').notNull(), // Clerk user id
  role: text('role').notNull().default('member'), // 'owner' | 'member'
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  uniqueServerUser: unique().on(table.serverId, table.userId),
}));

export const serverInvites = pgTable('server_invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  serverId: uuid('server_id').notNull().references(() => servers.id),
  invitedEmail: text('invited_email').notNull(),
  invitedBy: text('invited_by').notNull(), // Clerk user id
  acceptedBy: text('accepted_by'), // Clerk user id
  acceptedAt: timestamp('accepted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'),
}, (table) => ({
  uniqueServerEmail: unique().on(table.serverId, table.invitedEmail),
}));
