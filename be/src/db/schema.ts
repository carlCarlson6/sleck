import { pgTable, serial, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  displayName: text('display_name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const servers = pgTable('servers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const memberships = pgTable('memberships', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  serverId: uuid('server_id').notNull().references(() => servers.id),
  role: text('role').notNull(), // 'owner', 'member', 'invitee'
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const channels = pgTable('channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  serverId: uuid('server_id').notNull().references(() => servers.id),
  name: text('name').notNull(),
  isPrivate: integer('is_private').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const invites = pgTable('invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  serverId: uuid('server_id').notNull().references(() => servers.id),
  email: text('email').notNull(),
  invitedBy: uuid('invited_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').notNull().references(() => channels.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
