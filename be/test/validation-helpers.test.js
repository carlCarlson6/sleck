"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_helpers_1 = require("./validation-helpers");
const zod_1 = require("zod");
describe('validation-helpers', () => {
    it('should catch ZodError', () => {
        const schema = zod_1.z.object({ foo: zod_1.z.string() });
        const fn = () => schema.parse({ foo: 123 });
        const err = (0, validation_helpers_1.expectZodError)(fn);
        expect(err).toBeInstanceOf(zod_1.z.ZodError);
    });
});
