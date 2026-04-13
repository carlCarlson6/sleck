module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.ts'],
  setupFiles: [], // dotenv-safe/config removed for test flexibility
};
