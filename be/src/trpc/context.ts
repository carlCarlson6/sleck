import type { Request } from 'express';
import { clerkClient, getAuth } from '@clerk/express';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export type AuthUser = {
  id: string;
  email: string | null;
  clerkUser: {
    id: string;
    emailAddresses: { emailAddress: string }[];
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
};

export type SleckContext = {
  req: Request;
  user: AuthUser | null;
};

export async function createContext({ req }: CreateExpressContextOptions): Promise<SleckContext> {
    const { userId } = getAuth(req);

  if (!userId) {
    return { req, user: null };
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  return {
    req,
    user: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? null,
      clerkUser: {
        id: clerkUser.id,
        emailAddresses: clerkUser.emailAddresses.map((emailAddress) => ({
          emailAddress: emailAddress.emailAddress,
        })),
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      },
    },
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
