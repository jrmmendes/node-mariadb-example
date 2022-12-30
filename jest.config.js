/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  silent: true,
  coveragePathIgnorePatterns: [
    "index.ts",
    "src/(application|ioc|routes|server).ts"
  ],
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
};
