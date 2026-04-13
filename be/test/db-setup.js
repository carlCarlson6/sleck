"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDb = clearDb;
const db_1 = require("../src/db");
if (!process.env.DATABASE_URL) {
    globalThis.__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}
async function clearDb() {
    // Truncate all tables for test isolation
    await db_1.db.execute(`TRUNCATE users, servers, memberships, channels, invites, messages RESTART IDENTITY CASCADE`);
}
