import { z } from 'zod';
import { protectedProcedure, router } from './context';
import { db } from '../db';
import { servers, memberships } from '../db/schema';
import { eq } from 'drizzle-orm';

// Zod schemas
export const createServerInput = z.object({
  name: z.string().min(1).max(64),
  visibility: z.enum(['public', 'private']),
});

export const serverOutput = z.object({
  id: z.string().uuid(),
  name: z.string(),
  ownerId: z.string().uuid(),
  visibility: z.enum(['public', 'private']),
  createdAt: z.date(),
});

export const listServersOutput = z.array(serverOutput);

export const serversRouter = router({
  create: protectedProcedure
    .input(createServerInput)
    .output(serverOutput)
    .mutation(async ({ ctx, input }) => {
      // Authz: user must be authenticated (enforced by protectedProcedure)
      const userId = ctx.user!.id;
      // Insert server
      const [server] = await db
        .insert(servers)
        .values({
          name: input.name,
          ownerId: userId,
          visibility: input.visibility,
        })
        .returning();
      // Insert owner membership
      await db.insert(memberships).values({
        userId,
        serverId: server.id,
        role: 'owner',
      });
      return {
        id: server.id,
        name: server.name,
        ownerId: server.ownerId,
        visibility: server.visibility as 'public' | 'private',
        createdAt: server.createdAt,
      };
    }),

  listMine: protectedProcedure
    .output(listServersOutput)
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id;
      // Only servers where user is a member
      const rows = await db
        .select({
          id: servers.id,
          name: servers.name,
          ownerId: servers.ownerId,
          visibility: servers.visibility,
          createdAt: servers.createdAt,
        })
        .from(servers)
        .innerJoin(memberships, eq(servers.id, memberships.serverId))
        .where(eq(memberships.userId, userId));
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        ownerId: row.ownerId,
        visibility: row.visibility as 'public' | 'private',
        createdAt: row.createdAt,
      }));
    }),
});
