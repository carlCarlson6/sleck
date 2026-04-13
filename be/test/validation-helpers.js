"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectZodError = expectZodError;
const zod_1 = require("zod");
if (!process.env.DATABASE_URL) {
    globalThis.__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}
function expectZodError(fn) {
    try {
        fn();
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            return e;
        }
        throw e;
    }
    throw new Error('Expected ZodError');
}
