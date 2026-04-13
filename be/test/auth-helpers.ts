// Test helpers for auth context
export function mockUserContext(userId: string) {
  return { user: { id: userId } };
}

export function mockNoUserContext() {
  return { user: null };
}
