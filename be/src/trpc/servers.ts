import { z } from 'zod';
import { protectedProcedure, router } from './context';
import { db } from '../db';
import { memberships, servers } from '../db/schema';
import { ensureUserExists } from './ensureUserExists';
import { eq, and } from 'drizzle-orm';

// Zod schemas
export const createServerInput = z.object({
  name: z.string().trim().min(1).max(64),
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
      return db.transaction(async (tx) => {
        await ensureUserExists(tx, userId);

        const [server] = await tx
          .insert(servers)
          .values({
            name: input.name,
            ownerId: userId,
            visibility: input.visibility,
          })
          .returning();

        await tx.insert(memberships).values({
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
      });
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

  listPublic: protectedProcedure
    .output(listServersOutput)
    .query(async () => {
      // Authz: user must be authenticated (enforced by protectedProcedure)
      // Only public servers, regardless of membership
      const rows = await db
        .select({
          id: servers.id,
          name: servers.name,
          ownerId: servers.ownerId,
          visibility: servers.visibility,
          createdAt: servers.createdAt,
        })
        .from(servers)
        .where(eq(servers.visibility, 'public'));
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        ownerId: row.ownerId,
        visibility: row.visibility as 'public' | 'private',
        createdAt: row.createdAt,
      }));
    }),

  joinPublic: protectedProcedure
    .input(z.object({ serverId: z.string().uuid() }))
    .output(serverOutput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user!.id;
      // Only allow joining if the server is public and exists, but do not leak private existence
      const [server] = await db
        .select({
          id: servers.id,
          name: servers.name,
          ownerId: servers.ownerId,
          visibility: servers.visibility,
          createdAt: servers.createdAt,
        })
        .from(servers)
        .where(and(eq(servers.id, input.serverId), eq(servers.visibility, 'public')));
      if (!server) throw new Error('SERVER_NOT_FOUND');
      // Check if already a member (race-safe: try insert, catch unique error)
      await ensureUserExists(db, userId);
      try {
        await db.insert(memberships).values({
          userId,
          serverId: server.id,
          role: 'member',
        });
      } catch (err: any) {
        // Drizzle/PG unique violation
        if (err.code === '23505') {
          throw new Error('ALREADY_MEMBER');
        }
        throw err;
      }
      return {
        id: server.id,
        name: server.name,
        ownerId: server.ownerId,
        visibility: server.visibility as 'public' | 'private',
        createdAt: server.createdAt,
      };
    }),
});

