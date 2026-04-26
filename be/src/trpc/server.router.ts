import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from './trpc';
import { db } from './db';
import { servers, serverMemberships, serverInvites } from './schema.server';
import { eq, and, or } from 'drizzle-orm';

// Zod schemas
const createServerInput = z.object({
  name: z.string().min(2).max(64),
  description: z.string().max(256).optional(),
  isPublic: z.boolean(),
});

const updateServerInput = z.object({
  serverId: z.string().uuid(),
  name: z.string().min(2).max(64).optional(),
  description: z.string().max(256).optional(),
  isPublic: z.boolean().optional(),
});

const inviteInput = z.object({
  serverId: z.string().uuid(),
  email: z.string().email(),
});

const joinPublicInput = z.object({
  serverId: z.string().uuid(),
});

const acceptInviteInput = z.object({
  inviteId: z.string().uuid(),
});

export const serverRouter = router({
  // Discover public servers (no private data leak)
  discover: publicProcedure.query(async () => {
    const result = await db.select().from(servers).where(eq(servers.isPublic, true));
    return result.map(({ id, name, description }) => ({ id, name, description }));
  }),

  // Create server (user becomes owner and member)
  create: protectedProcedure.input(createServerInput).mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const [server] = await db.insert(servers).values({
      name: input.name,
      description: input.description,
      isPublic: input.isPublic,
      ownerId: userId,
    }).returning();
    await db.insert(serverMemberships).values({
      serverId: server.id,
      userId,
      role: 'owner',
    });
    return { id: server.id };
  }),

  // Get server details (must be member)
  get: protectedProcedure.input(z.object({ serverId: z.string().uuid() })).query(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const membership = await db.query.serverMemberships.findFirst({
      where: and(eq(serverMemberships.serverId, input.serverId), eq(serverMemberships.userId, userId)),
    });
    if (!membership) throw new Error('Not a member');
    const server = await db.query.servers.findFirst({ where: eq(servers.id, input.serverId) });
    if (!server) throw new Error('Server not found');
    return server;
  }),

  // Update server (only owner)
  update: protectedProcedure.input(updateServerInput).mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const server = await db.query.servers.findFirst({ where: eq(servers.id, input.serverId) });
    if (!server) throw new Error('Server not found');
    if (server.ownerId !== userId) throw new Error('Not owner');
    await db.update(servers).set({
      ...(input.name && { name: input.name }),
      ...(input.description && { description: input.description }),
      ...(input.isPublic !== undefined && { isPublic: input.isPublic }),
    }).where(eq(servers.id, input.serverId));
    return { success: true };
  }),

  // Delete server (only owner)
  delete: protectedProcedure.input(z.object({ serverId: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const server = await db.query.servers.findFirst({ where: eq(servers.id, input.serverId) });
    if (!server) throw new Error('Server not found');
    if (server.ownerId !== userId) throw new Error('Not owner');
    await db.delete(servers).where(eq(servers.id, input.serverId));
    return { success: true };
  }),

  // Join public server (must not already be member)
  joinPublic: protectedProcedure.input(joinPublicInput).mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const server = await db.query.servers.findFirst({ where: eq(servers.id, input.serverId) });
    if (!server || !server.isPublic) throw new Error('Not a public server');
    const existing = await db.query.serverMemberships.findFirst({
      where: and(eq(serverMemberships.serverId, input.serverId), eq(serverMemberships.userId, userId)),
    });
    if (existing) throw new Error('Already a member');
    await db.insert(serverMemberships).values({
      serverId: input.serverId,
      userId,
      role: 'member',
    });
    return { success: true };
  }),

  // Invite to private server (only owner, only if private)
  invite: protectedProcedure.input(inviteInput).mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;
    const server = await db.query.servers.findFirst({ where: eq(servers.id, input.serverId) });
    if (!server) throw new Error('Server not found');
    if (server.ownerId !== userId) throw new Error('Not owner');
    if (server.isPublic) throw new Error('Cannot invite to public server');
    await db.insert(serverInvites).values({
      serverId: input.serverId,
      invitedEmail: input.email,
      invitedBy: userId,
    });
    return { success: true };
  }),

  // Accept invite (must match user email, not already member)
  acceptInvite: protectedProcedure.input(acceptInviteInput).mutation(async ({ ctx, input }) => {
    const { id: userId, email } = ctx.user;
    const invite = await db.query.serverInvites.findFirst({ where: eq(serverInvites.id, input.inviteId) });
    if (!invite) throw new Error('Invite not found');
    if (invite.acceptedBy) throw new Error('Invite already used');
    if (invite.invitedEmail !== email) throw new Error('Invite not for this user');
    const existing = await db.query.serverMemberships.findFirst({
      where: and(eq(serverMemberships.serverId, invite.serverId), eq(serverMemberships.userId, userId)),
    });
    if (existing) throw new Error('Already a member');
    await db.insert(serverMemberships).values({
      serverId: invite.serverId,
      userId,
      role: 'member',
    });
    await db.update(serverInvites).set({
      acceptedBy: userId,
      acceptedAt: new Date(),
    }).where(eq(serverInvites.id, input.inviteId));
    return { success: true };
  }),

  // List my servers (member or owner)
  listMine: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const memberships = await db.query.serverMemberships.findMany({ where: eq(serverMemberships.userId, userId) });
    const serverIds = memberships.map((m) => m.serverId);
    if (serverIds.length === 0) return [];
    const result = await db.select().from(servers).where(or(...serverIds.map((id) => eq(servers.id, id))));
    return result;
  }),
});
