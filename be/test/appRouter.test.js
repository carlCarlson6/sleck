"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../src/trpc/root");
describe('appRouter', () => {
    it('should be defined and empty for now', () => {
        expect(root_1.appRouter).toBeDefined();
        expect(typeof root_1.appRouter).toBe('object');
    });
});
