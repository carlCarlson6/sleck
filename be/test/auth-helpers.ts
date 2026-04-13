// Test helpers for auth context
declare global {
  // eslint-disable-next-line no-var
  var __TEST_DATABASE_URL__: string | undefined;
}
if (!process.env.DATABASE_URL) {
  (globalThis as any).__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}

export function mockUserContext(userId: string) {
  return { user: { id: userId } };
}

export function mockNoUserContext() {
  return { user: null };
}
