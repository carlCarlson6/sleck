"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUserContext = mockUserContext;
exports.mockNoUserContext = mockNoUserContext;
if (!process.env.DATABASE_URL) {
    globalThis.__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}
function mockUserContext(userId) {
    return { user: { id: userId } };
}
function mockNoUserContext() {
    return { user: null };
}
