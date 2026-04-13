module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFiles: [], // dotenv-safe/config removed for test flexibility
  modulePathIgnorePatterns: ['<rootDir>/test/validation-helpers.ts', '<rootDir>/test/auth-helpers.ts', '<rootDir>/test/db-setup.ts'],
};
