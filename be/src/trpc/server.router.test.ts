import { serverRouter } from './server.router';
import { db } from './db';
import { servers, serverMemberships, channels } from './schema.server';

export * from './server.router';

export const testServerRouter = serverRouter;

// --- CHANNEL TESTS ---

describe('channel management', () => {
  let ownerCtx: any;
  let memberCtx: any;
  let nonMemberCtx: any;
  let serverId: string;
  let channelId: string;

  beforeAll(async () => {
    // Setup: create server, owner, member, non-member
    ownerCtx = { user: { id: 'owner1', email: 'owner1@example.com' } };
    memberCtx = { user: { id: 'member1', email: 'member1@example.com' } };
    nonMemberCtx = { user: { id: 'nonmember1', email: 'nonmember1@example.com' } };
    // Insert server
    const [server] = await db.insert(servers).values({
      name: 'Test Server',
      description: 'desc',
      isPublic: false,
      ownerId: ownerCtx.user.id,
    }).returning();
    serverId = server.id;
    // Insert memberships
    await db.insert(serverMemberships).values({ serverId, userId: ownerCtx.user.id, role: 'owner' });
    await db.insert(serverMemberships).values({ serverId, userId: memberCtx.user.id, role: 'member' });
  });

  afterAll(async () => {
    await db.delete(channels).where((channels.serverId as any).eq(serverId));
    await db.delete(serverMemberships).where((serverMemberships.serverId as any).eq(serverId));
    await db.delete(servers).where((servers.id as any).eq(serverId));
  });

  it('owner can create channel', async () => {
    const input = { serverId, name: 'General', description: 'Main' };
    const result = await serverRouter.createChannel({ ctx: ownerCtx, input });
    expect(result.id).toBeDefined();
    channelId = result.id;
  });

  it('member cannot create channel', async () => {
    const input = { serverId, name: 'Random', description: 'Chatter' };
    await expect(serverRouter.createChannel({ ctx: memberCtx, input })).rejects.toThrow();
  });

  it('non-member cannot create channel', async () => {
    const input = { serverId, name: 'Secret', description: 'Hidden' };
    await expect(serverRouter.createChannel({ ctx: nonMemberCtx, input })).rejects.toThrow();
  });

  it('member can list channels', async () => {
    const input = { serverId };
    const result = await serverRouter.listChannels({ ctx: memberCtx, input });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe('General');
  });

  it('non-member cannot list channels', async () => {
    const input = { serverId };
    await expect(serverRouter.listChannels({ ctx: nonMemberCtx, input })).rejects.toThrow();
  });

  it('owner can update channel', async () => {
    const input = { channelId, name: 'General Updated', description: 'Updated' };
    const result = await serverRouter.updateChannel({ ctx: ownerCtx, input });
    expect(result.success).toBe(true);
  });

  it('member cannot update channel', async () => {
    const input = { channelId, name: 'Should Fail' };
    await expect(serverRouter.updateChannel({ ctx: memberCtx, input })).rejects.toThrow();
  });

  it('owner can delete channel', async () => {
    const input = { channelId };
    const result = await serverRouter.deleteChannel({ ctx: ownerCtx, input });
    expect(result.success).toBe(true);
  });

  it('member cannot delete channel', async () => {
    // Recreate channel for this test
    const createInput = { serverId, name: 'Temp', description: '' };
    const { id: tempChannelId } = await serverRouter.createChannel({ ctx: ownerCtx, input: createInput });
    const input = { channelId: tempChannelId };
    await expect(serverRouter.deleteChannel({ ctx: memberCtx, input })).rejects.toThrow();
  });

  it('owner can reorder channels', async () => {
    // Create two channels
    const c1 = await serverRouter.createChannel({ ctx: ownerCtx, input: { serverId, name: 'A', description: '' } });
    const c2 = await serverRouter.createChannel({ ctx: ownerCtx, input: { serverId, name: 'B', description: '' } });
    const input = { serverId, channelIds: [c2.id, c1.id] };
    const result = await serverRouter.reorderChannels({ ctx: ownerCtx, input });
    expect(result.success).toBe(true);
    // Check order
    const listed = await serverRouter.listChannels.resolve({ ctx: ownerCtx, input: { serverId } });
    expect(listed[0].id).toBe(c2.id);
    expect(listed[1].id).toBe(c1.id);
  });

  it('member cannot reorder channels', async () => {
    const listed = await serverRouter.listChannels.resolve({ ctx: ownerCtx, input: { serverId } });
    const input = { serverId, channelIds: listed.map((c: any) => c.id) };
    await expect(serverRouter.reorderChannels({ ctx: memberCtx, input })).rejects.toThrow();
  });
});
