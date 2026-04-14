import { describe, it, expect, beforeEach } from '@jest/globals';
import { appRouter } from '../src/trpc/root';
import { mockUserContext, mockNoUserContext } from './auth-helpers';
import { db } from '../src/db';
import { clearDb } from './db-setup';
import { servers, memberships } from '../src/db/schema';
import { eq } from 'drizzle-orm';

const testUserId = '00000000-0000-0000-0000-000000000001';
const otherUserId = '00000000-0000-0000-0000-000000000002';

describe('serversRouter', () => {
  beforeEach(async () => {
    await clearDb?.();
  });

  it('rejects unauthenticated creation', async () => {
    const caller = appRouter.createCaller(mockNoUserContext() as any);
    await expect(
      caller.servers.create({
        name: 'Test Server',
        visibility: 'public',
      })
    ).rejects.toThrow(/UNAUTHORIZED/);
  });

  it('creates a server with owner membership and correct visibility', async () => {
    const caller = appRouter.createCaller(mockUserContext(testUserId) as any);
    const result = await caller.servers.create({
      name: 'My Server',
      visibility: 'private',
    })

    expect(result.name).toBe('My Server');
    expect(result.visibility).toBe('private');
    expect(result.ownerId).toBe(testUserId);
    expect(result.id).toMatch(/[0-9a-fA-F-]{36}/);

    // Check DB: server exists
    const dbServerArr = await db.select().from(servers).where(eq(servers.id, result.id));
    expect(dbServerArr.length).toBe(1);
    const dbServer = dbServerArr[0];
    expect(dbServer.visibility).toBe('private');
    // Check DB: owner membership exists
    const ownerMembershipArr = await db.select().from(memberships).where(eq(memberships.serverId, result.id));
    expect(ownerMembershipArr.length).toBe(1);
    const ownerMembership = ownerMembershipArr[0];
    expect(ownerMembership.userId).toBe(testUserId);
    expect(ownerMembership.role).toBe('owner');
  });

  it('lists only servers the user is a member of', async () => {
    // User 1 creates a server
    const caller1 = appRouter.createCaller(mockUserContext(testUserId) as any);
    const s1 = await caller1.servers.create({
      name: 'S1',
      visibility: 'public',
    })
    // User 2 creates a server
    const caller2 = appRouter.createCaller(mockUserContext(otherUserId) as any);
    const s2 = await caller2.servers.create({
      name: 'S2',
      visibility: 'private',
    })
    // User 1 is not a member of s2
    const list1 = await caller1.servers.listMine()
    expect(list1.map((s: any) => s.id)).toContain(s1.id);
    expect(list1.map((s: any) => s.id)).not.toContain(s2.id);
    // User 2 sees only s2
    const list2 = await caller2.servers.listMine()
    expect(list2.map((s: any) => s.id)).toContain(s2.id);
    expect(list2.map((s: any) => s.id)).not.toContain(s1.id);
  });

  it('lists only public servers in discovery, never private', async () => {
    const caller1 = appRouter.createCaller(mockUserContext(testUserId) as any);
    const caller2 = appRouter.createCaller(mockUserContext(otherUserId) as any);
    // User 1 creates public and private
    const pub = await caller1.servers.create({ name: 'Pub', visibility: 'public' });
    const priv = await caller1.servers.create({ name: 'Priv', visibility: 'private' });
    // User 2 creates public
    const pub2 = await caller2.servers.create({ name: 'Pub2', visibility: 'public' });
    // Discovery: both users see only public
    const disc1 = await caller1.servers.listPublic();
    const disc2 = await caller2.servers.listPublic();
    expect(disc1.map((s: any) => s.id)).toContain(pub.id);
    expect(disc1.map((s: any) => s.id)).toContain(pub2.id);
    expect(disc1.map((s: any) => s.id)).not.toContain(priv.id);
    expect(disc2.map((s: any) => s.id)).toContain(pub.id);
    expect(disc2.map((s: any) => s.id)).toContain(pub2.id);
    expect(disc2.map((s: any) => s.id)).not.toContain(priv.id);
  });

  it('rejects unauthenticated discovery and join', async () => {
    const caller = appRouter.createCaller(mockNoUserContext() as any);
    await expect(caller.servers.listPublic()).rejects.toThrow(/UNAUTHORIZED/);
    await expect(caller.servers.joinPublic({ serverId: '00000000-0000-0000-0000-000000000001' })).rejects.toThrow(/UNAUTHORIZED/);
  });

  it('allows joining a public server, creates member membership', async () => {
    const caller1 = appRouter.createCaller(mockUserContext(testUserId) as any);
    const caller2 = appRouter.createCaller(mockUserContext(otherUserId) as any);
    const pub = await caller1.servers.create({ name: 'Pub', visibility: 'public' });
    // User 2 joins
    const joinRes = await caller2.servers.joinPublic({ serverId: pub.id });
    expect(joinRes.id).toBe(pub.id);
    // Membership exists
    const mems = await db.select().from(memberships).where(eq(memberships.serverId, pub.id));
    expect(mems.some((m) => m.userId === otherUserId && m.role === 'member')).toBe(true);
  });

  it('rejects joining a private server', async () => {
    const caller1 = appRouter.createCaller(mockUserContext(testUserId) as any);
    const caller2 = appRouter.createCaller(mockUserContext(otherUserId) as any);
    const priv = await caller1.servers.create({ name: 'Priv', visibility: 'private' });
    await expect(caller2.servers.joinPublic({ serverId: priv.id })).rejects.toThrow(/SERVER_NOT_PUBLIC/);
  });

  it('rejects joining a nonexistent server', async () => {
    const caller = appRouter.createCaller(mockUserContext(testUserId) as any);
    await expect(caller.servers.joinPublic({ serverId: '00000000-0000-0000-0000-0000000000ff' })).rejects.toThrow(/SERVER_NOT_FOUND/);
  });

  it('rejects joining twice or as owner', async () => {
    const caller1 = appRouter.createCaller(mockUserContext(testUserId) as any);
    const caller2 = appRouter.createCaller(mockUserContext(otherUserId) as any);
    const pub = await caller1.servers.create({ name: 'Pub', visibility: 'public' });
    // Owner tries to join
    await expect(caller1.servers.joinPublic({ serverId: pub.id })).rejects.toThrow(/ALREADY_MEMBER/);
    // Member joins, then tries again
    await caller2.servers.joinPublic({ serverId: pub.id });
    await expect(caller2.servers.joinPublic({ serverId: pub.id })).rejects.toThrow(/ALREADY_MEMBER/);
  });
});

